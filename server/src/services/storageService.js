import crypto from 'node:crypto';
import { getSupabase } from '../config/supabase.js';
import ApiError from '../utils/ApiError.js';

export const IMAGE_BUCKET = 'site-images';
export const MAX_IMAGE_BYTES = 3 * 1024 * 1024; // Vercel functions reject request bodies above ~4.5 MB

let bucketReady;

/** Creates the public image bucket on first use (public read; writes only ever happen through the server key). */
async function ensureBucket() {
  bucketReady ??= (async () => {
    const supabase = getSupabase();
    const { data } = await supabase.storage.getBucket(IMAGE_BUCKET);
    if (!data) {
      const { error } = await supabase.storage.createBucket(IMAGE_BUCKET, { public: true, fileSizeLimit: MAX_IMAGE_BYTES });
      if (error && !/already exists/i.test(error.message)) throw error;
    }
  })().catch((err) => {
    bucketReady = undefined;
    throw err;
  });
  return bucketReady;
}

/** Real file signature -> extension. Client-supplied names and MIME types are never trusted. */
export function detectImage(b) {
  if (b.length > 12 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return { ext: 'jpg', type: 'image/jpeg' };
  if (b.length > 8 && b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return { ext: 'png', type: 'image/png' };
  if (b.length > 12 && b.subarray(0, 4).toString('latin1') === 'RIFF' && b.subarray(8, 12).toString('latin1') === 'WEBP') return { ext: 'webp', type: 'image/webp' };
  if (b.length > 6 && ['GIF87a', 'GIF89a'].includes(b.subarray(0, 6).toString('latin1'))) return { ext: 'gif', type: 'image/gif' };
  return null;
}

export async function uploadImage(file, folder = 'blogs', { cacheControl = '31536000' } = {}) {
  if (!file) throw ApiError.badRequest('Please choose an image.');
  const kind = detectImage(file.buffer);
  if (!kind) throw ApiError.badRequest('Only JPG, PNG, WebP or GIF images are allowed.');
  await ensureBucket();
  const supabase = getSupabase();
  const path = `${folder}/${new Date().getUTCFullYear()}/${crypto.randomUUID()}.${kind.ext}`;
  const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(path, file.buffer, { contentType: kind.type, cacheControl });
  if (error) {
    console.error('[storage]', error.message);
    throw new ApiError(500, 'Could not store the image');
  }
  return { path, url: supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl };
}

/** Storage object path when `url` points at our own public bucket, otherwise null (static / external images are never touched). */
export function ownedPath(url) {
  const marker = `/storage/v1/object/public/${IMAGE_BUCKET}/`;
  const i = typeof url === 'string' ? url.indexOf(marker) : -1;
  return i === -1 ? null : decodeURIComponent(url.slice(i + marker.length).split('?')[0]);
}

export async function removeOwnedImage(url) {
  const path = ownedPath(url);
  if (path) await getSupabase().storage.from(IMAGE_BUCKET).remove([path]).catch(() => {});
}

/** Overwrites an existing object in place (same path, so every reference keeps working). The new file must be the same image type. */
export async function replaceImage(path, file, { cacheControl = '3600' } = {}) {
  if (!file) throw ApiError.badRequest('Please choose an image.');
  const kind = detectImage(file.buffer);
  if (!kind) throw ApiError.badRequest('Only JPG, PNG, WebP or GIF images are allowed.');
  if (!path.endsWith(`.${kind.ext}`)) throw ApiError.badRequest(`The replacement must be the same type as the current image (.${path.split('.').pop()}).`);
  const { error } = await getSupabase().storage.from(IMAGE_BUCKET).upload(path, file.buffer, { contentType: kind.type, cacheControl, upsert: true });
  if (error) {
    console.error('[storage]', error.message);
    throw new ApiError(500, 'Could not store the image');
  }
  return kind;
}

export async function removeObject(path) {
  const { error } = await getSupabase().storage.from(IMAGE_BUCKET).remove([path]);
  if (error) {
    console.error('[storage]', error.message);
    throw new ApiError(500, 'Could not delete the image');
  }
}

/** Every object path in the bucket (the Storage API lists one folder at a time). */
export async function listAllObjects(prefix = '') {
  await ensureBucket();
  const bucket = getSupabase().storage.from(IMAGE_BUCKET);
  const out = [];
  const { data, error } = await bucket.list(prefix, { limit: 1000 });
  if (error) throw error;
  for (const entry of data ?? []) {
    const full = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.id) out.push({ path: full, size: entry.metadata?.size ?? null, mime: entry.metadata?.mimetype ?? null });
    else out.push(...(await listAllObjects(full)));
  }
  return out;
}

export const publicUrlFor = (path) => getSupabase().storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
