// Registers the images that ship with the website (client/public/assets and client/public/storage) in the media library
// as read-only "built-in" assets. The files themselves are never moved, changed or deleted. Safe to re-run (upserts on path).
//   npm run db:seed-media --prefix server
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getSupabase } from '../../src/config/supabase.js';
import { imageSize } from '../../src/utils/imageInfo.js';

const publicDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../client/public');
const MIME = { '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (MIME[path.extname(entry.name).toLowerCase()]) yield full;
  }
}

const rows = [];
for (const root of ['assets', 'storage']) {
  const dir = path.join(publicDir, root);
  if (!fs.existsSync(dir)) continue;
  for (const file of walk(dir)) {
    const url = '/' + path.relative(publicDir, file).split(path.sep).join('/');
    const buffer = fs.readFileSync(file);
    const size = imageSize(buffer);
    rows.push({
      path: url,
      url,
      name: path.basename(file),
      mime: MIME[path.extname(file).toLowerCase()],
      size_bytes: buffer.length,
      width: size?.width ?? null,
      height: size?.height ?? null,
      is_builtin: true,
    });
  }
}

const supabase = getSupabase();
for (let i = 0; i < rows.length; i += 200) {
  const { error } = await supabase.from('media_assets').upsert(rows.slice(i, i + 200), { onConflict: 'path', ignoreDuplicates: false });
  if (error) throw new Error(`media_assets: ${error.message}`);
}
const { count } = await supabase.from('media_assets').select('*', { count: 'exact', head: true }).eq('is_builtin', true);
console.log(`Registered ${rows.length} built-in images (${count} built-in rows in media_assets).`);
