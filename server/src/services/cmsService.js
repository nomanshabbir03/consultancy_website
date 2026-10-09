import { getSupabase } from '../config/supabase.js';
import { PAGE_META } from '../cms/pageMeta.js';
import { PAGES, defaultContent, getPage, getSectionDef } from '../cms/registry.js';
import { sameContent, validateContent, withDefaults } from '../cms/validate.js';
import ApiError from '../utils/ApiError.js';
import { unwrap } from '../utils/db.js';

const TABLE = 'cms_sections';

// Short in-memory cache of the PUBLISHED site payload: it is requested on every page view (and by the crawler-facing routes).
let publicCache = { at: 0, data: null };
const CACHE_MS = 10_000;
const dropCache = () => {
  publicCache = { at: 0, data: null };
};

const definition = (page, key) => {
  const def = getSectionDef(page, key);
  if (!def) throw ApiError.notFound('Unknown content section');
  return def;
};

async function allRows() {
  return unwrap(await getSupabase().from(TABLE).select('page_slug, section_key, draft, published, published_at, updated_at, updated_by'));
}

/** `default` = never saved, `published` = live and no pending edits, `changed` = a draft differs from what is live. */
function statusOf(row, fallback) {
  if (!row || (row.draft == null && row.published == null)) return 'default';
  const live = row.published ?? fallback;
  return row.draft != null && !sameContent(row.draft, live) ? 'changed' : 'published';
}

function describe(def, page, key, row) {
  const fallback = defaultContent(page, key);
  const live = row?.published ?? fallback;
  return {
    page,
    key,
    status: statusOf(row, fallback),
    content: row?.draft ?? live, // what the editor shows
    live, // what visitors see
    publishedAt: row?.published_at ?? null,
    updatedAt: row?.updated_at ?? null,
    updatedBy: row?.updated_by ?? null,
  };
}

export async function getSection(page, key) {
  const def = definition(page, key);
  const row = unwrap(await getSupabase().from(TABLE).select('*').eq('page_slug', page).eq('section_key', key).maybeSingle());
  return describe(def, page, key, row);
}

export async function saveDraft(page, key, input, admin) {
  const def = definition(page, key);
  const draft = validateContent(def.fields, input, def);
  const row = unwrap(
    await getSupabase()
      .from(TABLE)
      .upsert({ page_slug: page, section_key: key, draft, updated_by: admin?.email ?? null }, { onConflict: 'page_slug,section_key' })
      .select('*')
      .single()
  );
  return describe(def, page, key, row);
}

export async function publish(page, key, admin) {
  const def = definition(page, key);
  const supabase = getSupabase();
  const row = unwrap(await supabase.from(TABLE).select('*').eq('page_slug', page).eq('section_key', key).maybeSingle());
  if (!row || row.draft == null) throw ApiError.badRequest('There are no saved changes to publish.');
  const saved = unwrap(
    await supabase
      .from(TABLE)
      .update({ published: row.draft, published_at: new Date().toISOString(), updated_by: admin?.email ?? null })
      .eq('page_slug', page)
      .eq('section_key', key)
      .select('*')
      .single()
  );
  dropCache();
  return describe(def, page, key, saved);
}

/** Throws the draft away and goes back to the last published version (or the built-in content if never published). */
export async function discard(page, key, admin) {
  const def = definition(page, key);
  const supabase = getSupabase();
  const row = unwrap(await supabase.from(TABLE).select('*').eq('page_slug', page).eq('section_key', key).maybeSingle());
  if (!row) return describe(def, page, key, null);
  const saved = unwrap(
    await supabase
      .from(TABLE)
      .update({ draft: row.published ?? null, updated_by: admin?.email ?? null })
      .eq('page_slug', page)
      .eq('section_key', key)
      .select('*')
      .single()
  );
  return describe(def, page, key, saved);
}

/** Status of every section (drives the page lists in the admin). */
export async function overview() {
  const rows = await allRows();
  const byKey = new Map(rows.map((r) => [`${r.page_slug}/${r.section_key}`, r]));
  return PAGES.map((page) => ({
    slug: page.slug,
    sections: page.sections.map((s) => {
      const row = byKey.get(`${page.slug}/${s.key}`);
      return { key: s.key, status: statusOf(row, defaultContent(page.slug, s.key)), updatedAt: row?.updated_at ?? null, publishedAt: row?.published_at ?? null };
    }),
  }));
}

/**
 * Everything the public website needs from the CMS in one payload: the global sections plus every page's SEO.
 * `preview` returns drafts (admin-only caller); otherwise only published content, falling back to the built-in defaults.
 * If the CMS tables are missing or the database is unreachable the defaults are returned, so the site never breaks.
 */
export async function siteContent({ preview = false } = {}) {
  if (!preview && publicCache.data && Date.now() - publicCache.at < CACHE_MS) return publicCache.data;
  let rows = [];
  try {
    rows = await allRows();
  } catch (err) {
    if (preview) throw err;
    console.error('[cms] using built-in content:', err.message);
  }
  const byKey = new Map(rows.map((r) => [`${r.page_slug}/${r.section_key}`, r]));
  const chosenOf = (page, key) => {
    const row = byKey.get(`${page}/${key}`);
    return preview ? row?.draft ?? row?.published : row?.published;
  };
  const pick = (page, key) => {
    const chosen = chosenOf(page, key);
    const def = getSectionDef(page, key);
    // Re-normalise against the schema; a field missing from an older row falls back to its built-in value.
    return chosen ? withSchema(def, chosen, defaultContent(page, key)) : defaultContent(page, key);
  };
  const data = { global: {}, seo: {}, pages: {} };
  for (const section of getPage('global').sections) data.global[section.key] = pick('global', section.key);
  for (const page of PAGES) {
    if (!page.path) continue;
    data.seo[page.path] = pick(page.slug, 'seo');
    const own = page.sections.filter((s) => s.kind !== 'seo');
    // Page sections: only what an admin has actually saved/published. Pages carry their built-in content themselves
    // (client fallback), so unedited sections are never sent (keeps the payload small for all 22 pages).
    const edited = own.filter((s) => chosenOf(page.slug, s.key));
    if (edited.length) data.pages[page.slug] = Object.fromEntries(edited.map((s) => [s.key, pick(page.slug, s.key)]));
  }
  if (!preview) publicCache = { at: Date.now(), data };
  return data;
}

const withSchema = (def, content, fallback = {}) => {
  const clean = withDefaults(def.fields, content, def);
  for (const f of def.fields) if (!(f.key in content) && f.key in fallback) clean[f.key] = fallback[f.key];
  return clean;
};

/** Effective SEO for a public path: CMS value when set, otherwise the built-in pageMeta.js value. */
export async function seoFor(path, { preview = false } = {}) {
  const fallback = PAGE_META[path] ?? PAGE_META['/'];
  const site = await siteContent({ preview });
  const cms = site.seo[path] ?? {};
  const title = cms.seoTitle || fallback.title;
  const description = cms.metaDescription || fallback.description;
  return {
    title,
    description,
    canonical: cms.canonicalUrl || '',
    ogTitle: cms.ogTitle || title,
    ogDescription: cms.ogDescription || description,
    ogImage: cms.ogImage || '',
    robots: cms.robots === 'noindex' ? 'noindex' : 'index',
  };
}

export const hasPagePath = (path) => PAGES.some((p) => p.path === path);
