import path from 'node:path';
import { getSupabase } from '../config/supabase.js';
import ApiError from '../utils/ApiError.js';
import { isUuid, unwrap } from '../utils/db.js';
import { imageSize } from '../utils/imageInfo.js';
import { detectImage, listAllObjects, publicUrlFor, removeObject, replaceImage, uploadImage } from './storageService.js';

const TABLE = 'media_assets';
const COLUMNS = 'id, path, url, name, alt_text, mime, size_bytes, width, height, is_builtin, created_at, updated_at';

const toDto = (r) => ({
  id: r.id,
  url: r.url,
  name: r.name,
  alt: r.alt_text ?? '',
  mime: r.mime,
  size: r.size_bytes,
  width: r.width,
  height: r.height,
  builtin: r.is_builtin,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

const altText = (value) => {
  const text = typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';
  if (text.length > 200) throw ApiError.badRequest('Alt text must be at most 200 characters.');
  return text;
};

/** Display name from an uploaded file name: base name only, no path or odd characters. */
const displayName = (original) =>
  path
    .basename(String(original || 'image'))
    .replace(/[^\w.\- ()]+/g, '_')
    .slice(0, 120) || 'image';

export async function listMedia({ q = '', source = 'all' } = {}) {
  let query = getSupabase().from(TABLE).select(COLUMNS).order('is_builtin', { ascending: true }).order('created_at', { ascending: false }).limit(2000);
  if (source === 'uploaded') query = query.eq('is_builtin', false);
  if (source === 'builtin') query = query.eq('is_builtin', true);
  const rows = unwrap(await query);
  const term = String(q).trim().toLowerCase();
  return rows.map(toDto).filter((m) => !term || `${m.name} ${m.alt} ${m.url}`.toLowerCase().includes(term));
}

async function getRow(id) {
  if (!isUuid(id)) throw ApiError.notFound('Image not found');
  const row = unwrap(await getSupabase().from(TABLE).select(COLUMNS + ', path').eq('id', id).maybeSingle());
  if (!row) throw ApiError.notFound('Image not found');
  return row;
}

export async function uploadMedia(file, body) {
  if (!file) throw ApiError.badRequest('Please choose an image.');
  const kind = detectImage(file.buffer);
  if (!kind) throw ApiError.badRequest('Only JPG, PNG, WebP or GIF images are allowed.');
  const alt = altText(body?.alt);
  const { path: storagePath, url } = await uploadImage(file, 'cms', { cacheControl: '3600' });
  const size = imageSize(file.buffer);
  const row = unwrap(
    await getSupabase()
      .from(TABLE)
      .insert({
        path: storagePath,
        url,
        name: displayName(file.originalname),
        alt_text: alt,
        mime: kind.type,
        size_bytes: file.buffer.length,
        width: size?.width ?? null,
        height: size?.height ?? null,
        is_builtin: false,
      })
      .select(COLUMNS)
      .single()
  );
  return toDto(row);
}

export async function updateMedia(id, body) {
  const row = await getRow(id);
  const patch = { alt_text: altText(body?.alt) };
  if (typeof body?.name === 'string' && body.name.trim() && !row.is_builtin) patch.name = displayName(body.name);
  return toDto(unwrap(await getSupabase().from(TABLE).update(patch).eq('id', id).select(COLUMNS).single()));
}

/** Replaces the file behind an uploaded image in place. Built-in website images are never touched. */
export async function replaceMedia(id, file) {
  const row = await getRow(id);
  if (row.is_builtin) throw ApiError.badRequest('Built-in website images cannot be replaced. Upload a new image and choose it where it is used instead.');
  const kind = await replaceImage(row.path, file);
  const size = imageSize(file.buffer);
  const updated = unwrap(
    await getSupabase()
      .from(TABLE)
      .update({ mime: kind.type, size_bytes: file.buffer.length, width: size?.width ?? null, height: size?.height ?? null })
      .eq('id', id)
      .select(COLUMNS)
      .single()
  );
  return toDto(updated);
}

/** Where an image URL is used: CMS sections (draft or published) and the existing content tables. */
export async function findUsage(url) {
  const supabase = getSupabase();
  const found = [];
  const cms = unwrap(await supabase.from('cms_sections').select('page_slug, section_key, draft, published'));
  for (const r of cms) {
    const inDraft = JSON.stringify(r.draft ?? '').includes(url);
    const inLive = JSON.stringify(r.published ?? '').includes(url);
    if (inDraft || inLive) found.push(`Website content: ${r.page_slug} / ${r.section_key}${inLive ? '' : ' (draft)'}`);
  }
  const simple = [
    ['blog_categories', 'image_url', 'name', 'Blog category'],
    ['authors', 'photo_url', 'name', 'Blog author'],
    ['team_members', 'photo_url', 'name', 'Team member'],
    ['testimonials', 'avatar_url', 'author_name', 'Testimonial'],
    ['success_stories', 'thumbnail_url', 'youtube_id', 'Success story'],
  ];
  for (const [table, column, label, kind] of simple) {
    const rows = unwrap(await supabase.from(table).select(`${column}, ${label}`));
    for (const r of rows) if (r[column] === url) found.push(`${kind}: ${r[label]}`);
  }
  const blogs = unwrap(await supabase.from('blogs').select('title, featured_image, content'));
  for (const b of blogs) if (b.featured_image === url || String(b.content ?? '').includes(url)) found.push(`Blog post: ${b.title}`);
  return found;
}

export async function getUsage(id) {
  const row = await getRow(id);
  return { usedIn: await findUsage(row.url) };
}

export async function deleteMedia(id) {
  const row = await getRow(id);
  if (row.is_builtin) throw ApiError.badRequest('Built-in website images are part of the site and cannot be deleted here.');
  const usedIn = await findUsage(row.url);
  if (usedIn.length) {
    throw new ApiError(409, `This image is still in use (${usedIn.slice(0, 3).join('; ')}${usedIn.length > 3 ? '…' : ''}). Remove it from there first.`);
  }
  await removeObject(row.path);
  unwrap(await getSupabase().from(TABLE).delete().eq('id', id));
  return { id };
}

/** Registers files that already sit in the bucket (e.g. blog images uploaded before the media library existed). */
export async function syncMedia() {
  const supabase = getSupabase();
  const known = new Set(unwrap(await supabase.from(TABLE).select('path').eq('is_builtin', false)).map((r) => r.path));
  const objects = (await listAllObjects()).filter((o) => /\.(jpe?g|png|webp|gif)$/i.test(o.path) && !known.has(o.path));
  if (!objects.length) return { added: 0 };
  const rows = objects.map((o) => ({
    path: o.path,
    url: publicUrlFor(o.path),
    name: path.basename(o.path),
    alt_text: '',
    mime: o.mime,
    size_bytes: o.size,
    is_builtin: false,
  }));
  unwrap(await supabase.from(TABLE).insert(rows));
  return { added: rows.length };
}
