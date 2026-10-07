// Compares Supabase against the reference mirror (read-only) and checks relationships + RLS.
//   node supabase/verify.js "<path to reference 24-7consultancy.pk folder>"
import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';
import { createClient } from '@supabase/supabase-js';
import env from '../src/config/env.js';
import { getSupabase } from '../src/config/supabase.js';

const ref = process.argv[2];
if (!ref) throw new Error('Pass the reference site folder as the first argument.');
const read = (f) => cheerio.load(fs.readFileSync(path.join(ref, f), 'utf8'));
const clean = (s) => s.replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
const db = getSupabase();
let failures = 0;
const check = (label, ok, detail = '') => {
  if (!ok) failures += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? '  - ' + detail : ''}`);
};
const rows = async (t, cols = '*') => {
  const { data, error } = await db.from(t).select(cols);
  if (error) throw new Error(`${t}: ${error.message}`);
  return data;
};

// ---- original counts
let $ = read('blog.html');
const origBlogCards = $('#parent').children().filter((i, c) => $(c).find('a').length).length;
const origBlogSlugs = $('#parent').children().map((i, c) => ($(c).find('a').first().attr('href') || '').replace(/^blog\//, '').replace(/\.html$/, '')).get().filter(Boolean);
const origCats = new Set($('#parent').children().map((i, c) => clean($(c).find('.bg-\\[\\#fff\\] p').eq(1).text())).get().filter(Boolean));
const origBlogContent = {};
$('#parent').children().each((i, c) => {
  const slug = ($(c).find('a').first().attr('href') || '').replace(/^blog\//, '').replace(/\.html$/, '');
  if (slug) origBlogContent[slug] = clean($(c).find('.wrapme').text());
});
const origJobs = read('career.html')('#parent > a').length;
$ = read('index.html');
const origFaqs = $('ul.shadow-box > li').length;
const origReviews = $('.my-slider > div').length;
const origTeam = $('img[src^="assets/pics/team/"]').length;
const origVideos = $('button.thumbnail-btn').length;

// ---- counts
const blogs = await rows('blogs', 'id, slug, title, content, category_id, published_at, featured_image');
const cats = await rows('blog_categories');
check(`blogs: original ${origBlogCards} / supabase ${blogs.length}`, blogs.length === origBlogCards);
check(`blog categories: original ${origCats.size} / supabase ${cats.length}`, cats.length === origCats.size);
check('careers', (await rows('careers')).length === origJobs, `original ${origJobs}`);
check('faqs', (await rows('faqs')).length === origFaqs, `original ${origFaqs}`);
check('testimonials', (await rows('testimonials')).length === origReviews, `original ${origReviews}`);
check('team_members', (await rows('team_members')).length === origTeam, `original ${origTeam}`);
check('success_stories', (await rows('success_stories')).length === origVideos, `original ${origVideos}`);

// ---- content fidelity (blogs)
const bySlug = Object.fromEntries(blogs.map((b) => [b.slug, b]));
check('every original blog slug present', origBlogSlugs.every((s) => bySlug[s]));
const mismatched = origBlogSlugs.filter((s) => clean(cheerio.load(`<div>${bySlug[s]?.content ?? ''}</div>`)('div').text()) !== origBlogContent[s]);
check('blog body text identical to original (all posts)', mismatched.length === 0, mismatched.join(', '));

// ---- relationships
const catIds = new Set(cats.map((c) => c.id));
check('every blog has a valid category (FK)', blogs.every((b) => catIds.has(b.category_id)));
const missingImages = blogs.filter((b) => !fs.existsSync(path.join('..', 'client', 'public', decodeURIComponent(b.featured_image))));
check('blog featured images exist in client/public', missingImages.length === 0, missingImages.map((b) => b.slug).join(', '));

// ---- duplicates
const dup = (list, key) => new Set(list.map((r) => r[key])).size !== list.length;
check('no duplicate blog slugs', !dup(blogs, 'slug'));

// ---- RLS: the public/publishable key must see nothing
const anonKey = process.env.SUPABASE_PUBLISHABLE_KEY;
if (anonKey) {
  const anon = createClient(env.supabase.url, anonKey, { auth: { persistSession: false } });
  let leaked = 0;
  for (const t of ['blogs', 'careers', 'job_applications', 'contact_submissions', 'faqs', 'testimonials', 'team_members']) {
    const { data } = await anon.from(t).select('*').limit(1);
    leaked += data?.length ?? 0;
    const { error } = await anon.from(t).insert(t === 'contact_submissions' ? { name: 'x', email: 'x@x.co', message: 'rls probe' } : {});
    if (!error) { leaked += 1; console.log('  insert allowed on', t); }
  }
  check('RLS: publishable key can neither read nor write', leaked === 0);
} else console.log('SKIP  RLS probe (no publishable key in env)');

console.log(failures ? `\n${failures} check(s) FAILED` : '\nAll checks passed');
process.exit(failures ? 1 : 0);
