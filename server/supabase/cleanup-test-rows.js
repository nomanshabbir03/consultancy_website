// Removes rows (and uploaded résumés) created by API verification runs (email zz-test@example.com).
// Prints counts only.
import { getSupabase } from '../src/config/supabase.js';

const db = getSupabase();

const { data: apps, error: appsError } = await db
  .from('job_applications')
  .select('id, first_name, last_name, gender, cnic, city, date_applied, resume_path, current_salary')
  .eq('email', 'zz-test@example.com');
if (appsError) throw new Error(appsError.message);
console.log(`job_applications: ${apps.length} test row(s)`, JSON.stringify(apps[0] ?? {}));
const paths = apps.map((a) => a.resume_path).filter(Boolean);
if (paths.length) {
  const { data: files } = await db.storage.from('resumes').download(paths[0]);
  console.log('resume stored in private bucket:', files ? `${files.size} bytes` : 'NOT FOUND');
  await db.storage.from('resumes').remove(paths);
}
await db.from('job_applications').delete().eq('email', 'zz-test@example.com');

const { error } = await db.from('contact_submissions').delete().eq('email', 'zz-test@example.com');
if (error) throw new Error(error.message);

for (const table of ['job_applications', 'contact_submissions']) {
  const { count } = await db.from(table).select('*', { count: 'exact', head: true });
  console.log(`${table}: ${count} row(s) after cleanup`);
}
