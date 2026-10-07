import { getSupabase } from '../config/supabase.js';
import ApiError from '../utils/ApiError.js';
import { unwrap } from '../utils/db.js';

const SUMMARY_COLUMNS = 'id, slug, title, excerpt_html, featured_image, published_at, blog_categories ( name, slug )';

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
      .select(`${SUMMARY_COLUMNS}, content, meta_description, updated_at, authors ( name, slug, photo_url )`)
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle()
  );
  if (!row) throw ApiError.notFound('Blog post not found');
  return {
    ...toSummary(row),
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
