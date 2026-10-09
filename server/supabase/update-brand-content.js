// One-off content update: rebrands stored text to "Cornerstone Medical Solutions" and applies the leadership-team changes.
// Dry run by default (prints counts only); pass --apply to write.
//   node supabase/update-brand-content.js          (preview)
//   node supabase/update-brand-content.js --apply  (update Supabase)
import { getSupabase } from '../src/config/supabase.js';

const APPLY = process.argv.includes('--apply');
const BRAND = 'Cornerstone Medical Solutions';
const EMAIL = 'cmsolutions180@gmail.com';
const supabase = getSupabase();

// Order matters: emails first, then the long legal name, then the short forms. Domains (24-7consultancy.pk/.com) are left alone.
const RULES = [
  [/[\w.+-]+@24-7consultancy\.(com|pk)/gi, EMAIL],
  [/Twenty[ -]Four[ -]Seven Consultancy(?: \(SMC-PVT\))?(?: LTD)?/gi, BRAND],
  [/24[-/ ]?7[ -]?Consult(?:ancy|ing)(?!\.(?:pk|com))/gi, BRAND],
];
const rebrand = (text) => RULES.reduce((out, [pattern, to]) => out.replace(pattern, to), text);

const TABLES = ['blogs', 'blog_categories', 'authors', 'careers', 'faqs', 'team_members', 'success_stories', 'site_settings'];

for (const table of TABLES) {
  const { data: rows, error } = await supabase.from(table).select('*');
  if (error) { console.log(`${table.padEnd(16)} skipped (${error.code})`); continue; }
  let changedRows = 0;
  for (const row of rows) {
    const patch = {};
    for (const [key, value] of Object.entries(row)) {
      if (typeof value === 'string' && !['id', 'slug'].includes(key)) {
        const next = rebrand(value);
        if (next !== value) patch[key] = next;
      }
    }
    if (!Object.keys(patch).length) continue;
    changedRows += 1;
    if (APPLY) {
      const { error: updateError } = await supabase.from(table).update(patch).eq('id', row.id);
      if (updateError) throw new Error(`${table}: ${updateError.message}`);
    }
  }
  console.log(`${table.padEnd(16)} ${String(rows.length).padStart(3)} rows, ${String(changedRows).padStart(3)} ${APPLY ? 'updated' : 'would change'}`);
}

// Leadership team.
const team = [
  { match: 'Naeem Abbas', patch: { role: 'Co-founder', sort_order: 1 } },
  { match: 'Huma Naeem', patch: { role: 'CFO', sort_order: 3 } },
  {
    match: 'Danish Ather',
    patch: {
      name: 'Umer Rafique',
      role: 'Co-founder',
      bio: "Umer Rafique is a Co-founder of Cornerstone Medical Solutions, helping lead the company's growth, operations and client relationships.",
      photo_url: '/assets/pics/team/umerrafiqueblack.jpeg',
      sort_order: 2,
      facebook_url: null,
      instagram_url: null,
      linkedin_url: 'https://www.linkedin.com/in/umer-rafique-925b5326b/',
    },
  },
  { match: 'Umer Rafique', patch: { photo_url: '/assets/pics/team/umerrafiqueblack.jpeg' } },
];
for (const { match, patch } of team) {
  const { data: found } = await supabase.from('team_members').select('id').eq('name', match);
  const label = `team: ${match}`.padEnd(24);
  if (!found?.length) { console.log(`${label} not found (already updated?)`); continue; }
  if (APPLY) {
    const { error } = await supabase.from('team_members').update(patch).eq('name', match);
    if (error) throw new Error(`team_members: ${error.message}`);
  }
  console.log(`${label} ${APPLY ? 'updated' : 'would update'}`);
}
