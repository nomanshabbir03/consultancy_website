import { getSupabase } from '../config/supabase.js';
import ApiError from '../utils/ApiError.js';
import { unwrap } from '../utils/db.js';

const SUMMARY_COLUMNS = 'id, slug, title, excerpt_html, featured_image, published_at, blog_categories ( name, slug )';

export const RELATED_COUNT = 3;

const toSummary = (row) => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  excerptHtml: row.excerpt_html,
  image: row.featured_image,
  publishedAt: row.published_at,
  category: row.blog_categories?.name ?? null,
  categorySlug: row.blog_categories?.slug ?? null,
});

/** Newest first (same-day posts keep their original order). `limit` is optional. */
export async function listBlogs({ limit } = {}) {
  let query = getSupabase()
    .from('blogs')
    .select(SUMMARY_COLUMNS)
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .order('sort_order', { ascending: true });
  if (limit) query = query.limit(limit);
  return unwrap(await query).map(toSummary);
}

export async function getBlogBySlug(slug) {
  const row = unwrap(
    await getSupabase()
      .from('blogs')
      .select(`${SUMMARY_COLUMNS}, category_id, content, meta_description, updated_at, authors ( name, slug, photo_url )`)
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle()
  );
  if (!row) throw ApiError.notFound('Blog post not found');
  return {
    ...toSummary(row),
    related: await getRelated(row),
    content: row.content,
    metaDescription: row.meta_description,
    updatedAt: row.updated_at,
    author: row.authors && { name: row.authors.name, slug: row.authors.slug, photo: row.authors.photo_url },
  };
}

export async function listCategories() {
  const rows = unwrap(
    await getSupabase().from('blog_categories').select('id, name, slug, image_url').order('sort_order', { ascending: true })
  );
  return rows.map((r) => ({ id: r.id, name: r.name, slug: r.slug, image: r.image_url }));
}

/**
 * Related articles (RELATED_COUNT): the ones the admin picked for this post first, then newest posts of the same category,
 * then the newest remaining posts. Never the post itself, never duplicates, drafts excluded. Computed on every request, so a
 * newly published article is picked up immediately.
 */
async function getRelated(post) {
  const supabase = getSupabase();
  const picked = [];
  const seen = new Set([post.id]);
  const take = (rows) => {
    for (const row of rows ?? []) {
      if (picked.length >= RELATED_COUNT) return;
      if (!seen.has(row.id)) {
        seen.add(row.id);
        picked.push(toSummary(row));
      }
    }
  };
  const published = () => supabase.from('blogs').select(SUMMARY_COLUMNS).eq('is_published', true).neq('id', post.id);

  // The column is added by the admin migration; before it exists there are simply no hand-picked articles.
  const { data: manual } = await supabase.from('blogs').select('related_blog_ids').eq('id', post.id).maybeSingle();
  const ids = manual?.related_blog_ids ?? [];
  if (ids.length) {
    const { data } = await published().in('id', ids);
    take(ids.map((id) => data?.find((r) => r.id === id)).filter(Boolean)); // keep the admin's order
  }
  if (picked.length < RELATED_COUNT && post.category_id) {
    const { data } = await published()
      .eq('category_id', post.category_id)
      .order('published_at', { ascending: false })
      .limit(RELATED_COUNT + 2);
    take(data);
  }
  if (picked.length < RELATED_COUNT) {
    const { data } = await published().order('published_at', { ascending: false }).limit(RELATED_COUNT + 2);
    take(data);
  }
  return picked;
}
