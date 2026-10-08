import { getSupabase } from '../config/supabase.js';
import ApiError from '../utils/ApiError.js';
import { isUuid, unwrap } from '../utils/db.js';
import { escapeHtml, sanitizeRichText, stripTags } from '../utils/sanitize.js';
import { removeOwnedImage } from './storageService.js';

export const MEETING_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'];

// ------------------------------------------------------------------ helpers
const capabilityCache = new Map();

/** True when `table.column` exists (the admin migration adds blogs.related_blog_ids and contact_submissions.status). */
async function hasColumn(table, column) {
  const key = `${table}.${column}`;
  if (capabilityCache.get(key) === true) return true; // only cache positives, so running the migration needs no restart
  const { error } = await getSupabase().from(table).select(column).limit(1);
  const ok = !error;
  if (ok) capabilityCache.set(key, true);
  return ok;
}

const slugify = (text) =>
  String(text ?? '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 110);

const str = (value, max, { required = false, field = 'Field' } = {}) => {
  const text = typeof value === 'string' ? value.trim() : '';
  if (!text) {
    if (required) throw ApiError.badRequest(`${field} is required.`, { [field.toLowerCase()]: 'This field is required.' });
    return '';
  }
  if (text.length > max) throw ApiError.badRequest(`${field} must be at most ${max} characters.`);
  return text;
};

const isDate = (value) => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));

const imageUrl = (value) => {
  const text = typeof value === 'string' ? value.trim() : '';
  if (!text) return null;
  if (text.length > 1000 || !/^(https?:\/\/|\/)/i.test(text) || /\s|javascript:/i.test(text)) {
    throw ApiError.badRequest('The featured image URL is not valid.');
  }
  return text;
};

/** Sanitised rich text wrapped so the public pages can style admin-authored content without touching legacy posts. */
const richText = (html, field) => {
  const clean = sanitizeRichText(html).trim();
  if (!stripTags(clean) && !/<img\s/i.test(clean)) throw ApiError.badRequest(`${field} is required.`, { [field.toLowerCase()]: 'This field is required.' });
  return `<div class="cms-content">${clean.replace(/^<div class="cms-content">([\s\S]*)<\/div>$/, '$1')}</div>`;
};

const conflictOr = (error) => {
  if (error?.code === '23505') throw new ApiError(409, 'That slug is already in use. Please choose a different one.');
  return unwrap({ data: null, error });
};

// ---------------------------------------------------------------- dashboard
export async function getDashboard() {
  const supabase = getSupabase();
  const count = async (query) => {
    const { count: total, error } = await query;
    if (error) {
      console.error('[admin dashboard]', error.code, error.message);
      return 0;
    }
    return total ?? 0;
  };
  const head = (table) => supabase.from(table).select('*', { count: 'exact', head: true });
  const statusColumn = await hasColumn('contact_submissions', 'status');
  const [blogs, publishedBlogs, jobs, activeJobs, meetings, pendingMeetings] = await Promise.all([
    count(head('blogs')),
    count(head('blogs').eq('is_published', true)),
    count(head('careers')),
    count(head('careers').eq('is_active', true)),
    count(head('contact_submissions')),
    statusColumn ? count(head('contact_submissions').eq('status', 'pending')) : count(head('contact_submissions')),
  ]);
  return { blogs, publishedBlogs, jobs, activeJobs, meetings, pendingMeetings };
}

// -------------------------------------------------------------------- blogs
const toAdminBlog = (row) => ({
  id: row.id,
  title: row.title,
  slug: row.slug,
  excerpt: row.excerpt ?? stripTags(row.excerpt_html ?? ''),
  image: row.featured_image,
  categoryId: row.category_id,
  category: row.blog_categories?.name ?? null,
  authorId: row.author_id,
  publishedAt: row.published_at,
  isPublished: row.is_published,
  metaDescription: row.meta_description ?? '',
  content: row.content,
  relatedIds: row.related_blog_ids ?? [],
  updatedAt: row.updated_at,
});

export async function listBlogs() {
  const rows = unwrap(
    await getSupabase()
      .from('blogs')
      .select('id, title, slug, featured_image, published_at, is_published, updated_at, blog_categories ( name )')
      .order('published_at', { ascending: false })
      .order('created_at', { ascending: false })
  );
  return rows.map((row) => ({ ...toAdminBlog({ ...row, content: '' }), content: undefined }));
}

export async function getBlog(id) {
  if (!isUuid(id)) throw ApiError.notFound('Blog not found');
  const row = unwrap(await getSupabase().from('blogs').select('*, blog_categories ( name )').eq('id', id).maybeSingle());
  if (!row) throw ApiError.notFound('Blog not found');
  return toAdminBlog(row);
}

export async function getBlogOptions() {
  const supabase = getSupabase();
  const [categories, authors, posts] = await Promise.all([
    supabase.from('blog_categories').select('id, name').order('sort_order', { ascending: true }),
    supabase.from('authors').select('id, name').order('name', { ascending: true }),
    supabase.from('blogs').select('id, title, category_id').order('published_at', { ascending: false }),
  ]);
  return {
    categories: unwrap(categories),
    authors: unwrap(authors),
    posts: unwrap(posts).map((p) => ({ id: p.id, title: p.title, categoryId: p.category_id })),
    relatedSupported: await hasColumn('blogs', 'related_blog_ids'),
  };
}

async function buildBlogRow(body, currentId) {
  const supabase = getSupabase();
  const title = str(body.title, 200, { required: true, field: 'Title' });
  const slug = slugify(str(body.slug, 120) || title);
  if (!slug) throw ApiError.badRequest('Please enter a valid slug.');
  const excerpt = str(body.excerpt, 500);
  const content = richText(body.content, 'Content');
  if (!isUuid(body.categoryId)) throw ApiError.badRequest('Please choose a category.', { categoryid: 'Please choose a category.' });
  const category = unwrap(await supabase.from('blog_categories').select('id').eq('id', body.categoryId).maybeSingle());
  if (!category) throw ApiError.badRequest('That category does not exist.');
  const authorId = body.authorId ? body.authorId : null;
  if (authorId && !isUuid(authorId)) throw ApiError.badRequest('That author does not exist.');
  if (!isDate(body.publishedAt)) throw ApiError.badRequest('Please enter a valid publication date.', { publishedat: 'Invalid date.' });
  const related = [...new Set(Array.isArray(body.relatedIds) ? body.relatedIds : [])].filter((rid) => isUuid(rid) && rid !== currentId);
  if (related.length > 6) throw ApiError.badRequest('Please choose at most 6 related articles.');

  const fallbackExcerpt = excerpt || stripTags(content).slice(0, 220);
  const row = {
    title,
    slug,
    excerpt: excerpt || null,
    excerpt_html: `<p>${escapeHtml(fallbackExcerpt)}</p>`,
    content,
    featured_image: imageUrl(body.featuredImage),
    category_id: body.categoryId,
    author_id: authorId,
    published_at: body.publishedAt,
    is_published: body.isPublished !== false,
    meta_description: str(body.metaDescription, 300) || fallbackExcerpt.slice(0, 160) || null,
  };
  if (await hasColumn('blogs', 'related_blog_ids')) row.related_blog_ids = related;
  return row;
}

export async function createBlog(body) {
  const row = await buildBlogRow(body, null);
  const { data, error } = await getSupabase().from('blogs').insert(row).select('id').single();
  if (error) conflictOr(error);
  return getBlog(data.id);
}

export async function updateBlog(id, body) {
  if (!isUuid(id)) throw ApiError.notFound('Blog not found');
  const existing = await getBlog(id); // 404 when missing
  const row = await buildBlogRow(body, id);
  const { error } = await getSupabase().from('blogs').update(row).eq('id', id);
  if (error) conflictOr(error);
  if (existing.image && existing.image !== row.featured_image) await removeOrphanImage(existing.image, id);
  return getBlog(id);
}

/** Deletes an uploaded image from our own bucket only when no other blog still uses it. */
async function removeOrphanImage(url, exceptId) {
  const { data } = await getSupabase().from('blogs').select('id').eq('featured_image', url).neq('id', exceptId).limit(1);
  if (!data?.length) await removeOwnedImage(url);
}

export async function deleteBlog(id) {
  const blog = await getBlog(id);
  unwrap(await getSupabase().from('blogs').delete().eq('id', id));
  await removeOrphanImage(blog.image, id);
  return { id };
}

// --------------------------------------------------------------------- jobs
const toAdminJob = (row) => ({
  id: row.id,
  title: row.title,
  slug: row.slug,
  department: row.department,
  location: row.location,
  lastDate: row.last_date,
  isActive: row.is_active,
  shift: row.shift ?? '',
  experience: row.experience ?? '',
  provinceCountry: row.province_country ?? '',
  description: row.description ?? '',
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export async function listJobs() {
  const rows = unwrap(
    await getSupabase()
      .from('careers')
      .select('id, title, slug, department, location, last_date, is_active, shift, created_at, updated_at')
      .order('created_at', { ascending: false })
  );
  return rows.map(toAdminJob);
}

export async function getJob(id) {
  if (!isUuid(id)) throw ApiError.notFound('Job not found');
  const row = unwrap(await getSupabase().from('careers').select('*').eq('id', id).maybeSingle());
  if (!row) throw ApiError.notFound('Job not found');
  return toAdminJob(row);
}

function buildJobRow(body) {
  const title = str(body.title, 200, { required: true, field: 'Title' });
  const slug = slugify(str(body.slug, 120) || title);
  if (!slug) throw ApiError.badRequest('Please enter a valid slug.');
  if (!isDate(body.lastDate)) throw ApiError.badRequest('Please enter a valid last date.', { lastdate: 'Invalid date.' });
  return {
    title,
    slug,
    department: str(body.department, 120, { required: true, field: 'Department' }),
    location: str(body.location, 160, { required: true, field: 'Location' }),
    last_date: body.lastDate,
    is_active: body.isActive !== false,
    shift: str(body.shift, 60) || null,
    experience: str(body.experience, 100) || null,
    province_country: str(body.provinceCountry, 120) || null,
    description: richText(body.description, 'Description'),
  };
}

export async function createJob(body) {
  const { data, error } = await getSupabase().from('careers').insert(buildJobRow(body)).select('id').single();
  if (error) conflictOr(error);
  return getJob(data.id);
}

export async function updateJob(id, body) {
  await getJob(id);
  const { error } = await getSupabase().from('careers').update(buildJobRow(body)).eq('id', id);
  if (error) conflictOr(error);
  return getJob(id);
}

export async function deleteJob(id) {
  await getJob(id);
  const { count, error } = await getSupabase().from('job_applications').select('*', { count: 'exact', head: true }).eq('career_id', id);
  if (error) unwrap({ error });
  if (count > 0) {
    throw new ApiError(409, `This job has ${count} application${count === 1 ? '' : 's'}. Set it to Inactive instead of deleting, so the applications are kept.`);
  }
  unwrap(await getSupabase().from('careers').delete().eq('id', id));
  return { id };
}

// ----------------------------------------------------------------- meetings
// "Book A Meeting" opens the Contact Us form, so booking requests are the rows of contact_submissions.
const toMeeting = (row) => ({
  id: row.id,
  name: row.name,
  email: row.email,
  phone: row.phone,
  service: row.service,
  subject: row.subject,
  message: row.message,
  status: row.status ?? 'pending',
  createdAt: row.created_at,
});

export async function listMeetings() {
  const rows = unwrap(await getSupabase().from('contact_submissions').select('*').order('created_at', { ascending: false }).limit(500));
  return { items: rows.map(toMeeting), statusSupported: await hasColumn('contact_submissions', 'status') };
}

export async function updateMeetingStatus(id, status) {
  if (!isUuid(id)) throw ApiError.notFound('Meeting not found');
  if (!MEETING_STATUSES.includes(status)) throw ApiError.badRequest('Please choose a valid status.');
  if (!(await hasColumn('contact_submissions', 'status'))) {
    throw new ApiError(409, 'Meeting statuses are not enabled yet. Run the admin migration SQL in Supabase first.');
  }
  const row = unwrap(await getSupabase().from('contact_submissions').update({ status }).eq('id', id).select('*').maybeSingle());
  if (!row) throw ApiError.notFound('Meeting not found');
  return toMeeting(row);
}
