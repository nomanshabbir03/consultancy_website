import crypto from 'node:crypto';
import { getSupabase } from '../config/supabase.js';
import ApiError from '../utils/ApiError.js';
import { isUuid, unwrap } from '../utils/db.js';
import { validateBody } from '../utils/validation.js';

export const RESUME_BUCKET = 'resumes';
const RESUME_TYPES = {
  pdf: ['application/pdf'],
  docx: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

const LIST_COLUMNS = 'id, slug, title, department, location, last_date';
const DETAIL_COLUMNS = `${LIST_COLUMNS}, shift, experience, province_country, description, created_at`;

const toJob = (row) => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  department: row.department,
  location: row.location,
  lastDate: row.last_date,
  ...('description' in row && {
    shift: row.shift,
    experience: row.experience,
    provinceCountry: row.province_country,
    description: row.description,
    postedAt: row.created_at,
  }),
});

// Mirrors the original form: phone, CNIC, city, address and the résumé are required.
const APPLICATION_RULES = {
  first_name: { required: true, max: 80 },
  last_name: { max: 80 },
  email: { required: true, email: true, max: 160 },
  gender: { oneOf: ['male', 'female', 'other'] },
  phone_number: { required: true, max: 40 },
  cnic: { required: true, max: 30 },
  city: { required: true, max: 100 },
  address: { required: true, max: 300 },
  current_salary: { number: true, max: 12 },
  expected_salary: { number: true, max: 12 },
};

export async function listJobs() {
  const rows = unwrap(
    await getSupabase().from('careers').select(LIST_COLUMNS).eq('is_active', true).order('last_date', { ascending: false })
  );
  return rows.map(toJob);
}

/** `idOrSlug` may be the career UUID or its slug. */
export async function getJob(idOrSlug) {
  const row = unwrap(
    await getSupabase()
      .from('careers')
      .select(DETAIL_COLUMNS)
      .eq(isUuid(idOrSlug) ? 'id' : 'slug', idOrSlug)
      .eq('is_active', true)
      .maybeSingle()
  );
  if (!row) throw ApiError.notFound('Job not found');
  return toJob(row);
}

function checkResume(file) {
  if (!file) throw ApiError.badRequest('Please correct the highlighted fields.', { upload_file: 'Please upload your resume.' });
  const ext = file.originalname.split('.').pop().toLowerCase();
  if (!RESUME_TYPES[ext] || !RESUME_TYPES[ext].includes(file.mimetype)) {
    throw ApiError.badRequest('Please correct the highlighted fields.', {
      upload_file: 'Please upload files having extensions .pdf or .docx only.',
    });
  }
  // Signature check: a renamed or spoofed file must really be a PDF / OOXML (zip) container.
  const head = file.buffer.subarray(0, 5);
  const isPdf = head.toString('latin1') === '%PDF-';
  const isZip = head[0] === 0x50 && head[1] === 0x4b && head[2] === 0x03 && head[3] === 0x04;
  if ((ext === 'pdf' && !isPdf) || (ext === 'docx' && !isZip)) {
    throw ApiError.badRequest('Please correct the highlighted fields.', { upload_file: 'The uploaded file is not a valid PDF or DOCX document.' });
  }
  return ext;
}

export async function submitApplication(idOrSlug, body, file) {
  const values = validateBody(body, APPLICATION_RULES);
  const ext = checkResume(file);
  const job = await getJob(idOrSlug); // 404 for unknown / inactive jobs
  const supabase = getSupabase();

  // Résumés go to a private bucket under a server-generated name (never the user's file name).
  const resumePath = `${job.id}/${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const upload = await supabase.storage.from(RESUME_BUCKET).upload(resumePath, file.buffer, { contentType: file.mimetype });
  if (upload.error) {
    console.error('[supabase storage]', upload.error.message);
    throw new ApiError(500, 'Could not store the resume');
  }

  const { error } = await supabase.from('job_applications').insert({
    career_id: job.id,
    first_name: values.first_name,
    last_name: values.last_name || null,
    email: values.email,
    gender: values.gender || 'male',
    phone: values.phone_number,
    cnic: values.cnic,
    city: values.city,
    address: values.address,
    resume_path: resumePath,
    current_salary: values.current_salary || null,
    expected_salary: values.expected_salary || null,
  });
  if (error) {
    await supabase.storage.from(RESUME_BUCKET).remove([resumePath]); // no orphaned files
    unwrap({ error });
  }
  return { message: 'Your application has been submitted successfully. Thank you for applying.' };
}
