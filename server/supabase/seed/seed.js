// Idempotent data migration: loads the JSON extracted from the reference site into Supabase.
// Every table is upserted on its natural unique key, so re-running never creates duplicates.
//   npm run db:seed --prefix server
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getSupabase } from '../../src/config/supabase.js';

const dataDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'data');
const load = (name) => JSON.parse(fs.readFileSync(path.join(dataDir, `${name}.json`), 'utf8'));

const supabase = getSupabase();

async function upsert(table, rows, onConflict) {
  const { error, data } = await supabase.from(table).upsert(rows, { onConflict }).select('*');
  if (error) throw new Error(`${table}: ${error.message}`);
  const { count } = await supabase.from(table).select('*', { count: 'exact', head: true });
  console.log(`${table.padEnd(18)} upserted ${String(data.length).padStart(3)}  | rows in table: ${count}`);
  return data;
}

const categories = await upsert('blog_categories', load('blog_categories'), 'slug');
const categoryId = Object.fromEntries(categories.map((c) => [c.name, c.id]));

const authors = await upsert('authors', load('authors'), 'slug');
const authorId = Object.fromEntries(authors.map((a) => [a.slug, a.id]));

const blogs = load('blogs').map(({ category, author, ...blog }, i) => {
  if (!categoryId[category]) throw new Error(`Unknown blog category: ${category}`);
  if (!authorId[author]) throw new Error(`Unknown author: ${author}`);
  return { ...blog, sort_order: i + 1, category_id: categoryId[category], author_id: authorId[author] };
});
await upsert('blogs', blogs, 'slug');

await upsert('careers', load('careers'), 'slug');
await upsert('faqs', load('faqs'), 'question');
await upsert('testimonials', load('testimonials'), 'author_name');
await upsert('team_members', load('team_members'), 'name');
await upsert('success_stories', load('success_stories'), 'youtube_id');
await upsert('site_settings', load('site_settings'), 'key');

// Private bucket for uploaded résumés (the application form collects a PDF/DOCX).
const { error: bucketError } = await supabase.storage.createBucket('resumes', { public: false, fileSizeLimit: '5MB' });
if (bucketError && !/already exists/i.test(bucketError.message)) throw new Error(`storage: ${bucketError.message}`);
console.log(`resumes bucket     ${bucketError ? 'already exists' : 'created'} (private)`);

console.log('Seed complete.');
