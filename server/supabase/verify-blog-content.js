// Compares each stored blog body with the live article text (FNV-1a hash of whitespace-normalised text).
// Hashes were captured from https://24-7consultancy.pk/blog/<slug> (`.p-4` article body).
import * as cheerio from 'cheerio';
import { getSupabase } from '../src/config/supabase.js';

const live = {
  'social-media-marketing-dos-and-donts-for-brands': 'dd140622',
  'social-media-tactics-boost-brand-loyalty-customer-trust': '374ebe60',
  'digital-marketing-roi-key-metrics': '346981a0',
  'risk-management-strategies-healthcare': '789cb121',
  'figma-vs-adobe-xd-ui-ux-tool-comparison': '3da18b6',
  'digital-marketing-kpis-vs-metrics': 'e1a2e1f7',
  'choosing-between-in-house-and-outsourced-billing': 'fa0f840a',
  'avoiding-compliance-pitfalls-diy-medical-transcription': 'e320a0ae',
  'healthcare-transcription-future-ai-humans': '2aa6573b',
  '24-7-management-solutions-for-healthcare-facilities': '3e563ed5',
  'selecting-a-bpo-provider-aligned': 'b0a09836',
  'web-development': '6628d1e6',
  'bpo-sms-support': 'a831def8',
  'the-power-of-seo': '38085da7',
  'boost-your-business-with-bpo-outbound-call': '904bd3a7',
};
const fnv = (s) => {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16);
};
const { data, error } = await getSupabase().from('blogs').select('slug, content, author_id, meta_description, excerpt_html');
if (error) throw new Error(error.message);
let bad = 0;
for (const b of data) {
  const text = cheerio.load(`<div class="p-4">${b.content}</div>`)('.p-4').text().replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
  const ok = fnv(text) === live[b.slug];
  if (!ok) bad += 1;
  console.log(`${ok ? 'PASS' : 'DIFF'}  ${b.slug}  author=${!!b.author_id} meta=${!!b.meta_description} excerptHtml=${!!b.excerpt_html}`);
}
console.log(bad ? `${bad} post(s) differ` : 'All 15 bodies match the live site text');
