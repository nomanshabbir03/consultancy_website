import { getSupabase } from '../config/supabase.js';
import { COLLECTIONS } from '../cms/collections.js';
import { validateContent } from '../cms/validate.js';
import ApiError from '../utils/ApiError.js';
import { isUuid, unwrap } from '../utils/db.js';

const config = (name) => {
  const c = COLLECTIONS[name];
  if (!c) throw ApiError.notFound('Unknown content type');
  return c;
};

/** Serialisable description for the admin UI (regular expressions are not sent). */
export const collectionSchemas = () =>
  Object.fromEntries(
    Object.entries(COLLECTIONS).map(([name, c]) => [
      name,
      { ...c, fields: c.fields.map(({ pattern, column, ...rest }) => rest), table: undefined },
    ])
  );

const toDto = (c, row) => ({
  id: row.id,
  ...Object.fromEntries(c.fields.map((f) => [f.key, row[f.column] ?? (f.type === 'select' ? '' : '')])),
  visible: row.is_active,
  order: row.sort_order,
});

const select = (c) => ['id', 'is_active', 'sort_order', ...c.fields.map((f) => f.column)].join(', ');

const toColumns = (c, clean) => {
  const out = {};
  for (const f of c.fields) {
    const v = clean[f.key];
    out[f.column] = v === '' || v === undefined ? null : v;
  }
  return out;
};

const conflict = (error) => {
  if (error?.code === '23505') throw new ApiError(409, 'An item with that name already exists.');
  return error;
};

export async function listItems(name) {
  const c = config(name);
  const rows = unwrap(await getSupabase().from(c.table).select(select(c)).order('sort_order', { ascending: true }).order('created_at', { ascending: true }));
  return rows.map((r) => toDto(c, r));
}

export async function getItem(name, id) {
  const c = config(name);
  if (!isUuid(id)) throw ApiError.notFound('Item not found');
  const row = unwrap(await getSupabase().from(c.table).select(select(c)).eq('id', id).maybeSingle());
  if (!row) throw ApiError.notFound('Item not found');
  return toDto(c, row);
}

function prepare(c, body) {
  const clean = validateContent(c.fields, body);
  const columns = toColumns(c, clean);
  // Columns that must never be empty in the database get the same defaults the public site already uses.
  if (c.table === 'success_stories' && !columns.thumbnail_url) columns.thumbnail_url = `https://img.youtube.com/vi/${columns.youtube_id}/hqdefault.jpg`;
  if (c.table === 'testimonials') columns.rating ??= 5;
  return columns;
}

export async function createItem(name, body) {
  const c = config(name);
  const columns = prepare(c, body);
  const supabase = getSupabase();
  const last = unwrap(await supabase.from(c.table).select('sort_order').order('sort_order', { ascending: false }).limit(1));
  const { data, error } = await supabase
    .from(c.table)
    .insert({ ...columns, is_active: body?.visible === true, sort_order: (last[0]?.sort_order ?? 0) + 1 })
    .select(select(c))
    .single();
  if (error) throw unwrap({ data: null, error: conflict(error) });
  return toDto(c, data);
}

export async function updateItem(name, id, body) {
  const c = config(name);
  await getItem(name, id);
  const columns = prepare(c, body);
  const { data, error } = await getSupabase()
    .from(c.table)
    .update({ ...columns, ...(typeof body?.visible === 'boolean' ? { is_active: body.visible } : {}) })
    .eq('id', id)
    .select(select(c))
    .single();
  if (error) throw unwrap({ data: null, error: conflict(error) });
  return toDto(c, data);
}

export async function setVisible(name, id, visible) {
  const c = config(name);
  await getItem(name, id);
  return toDto(c, unwrap(await getSupabase().from(c.table).update({ is_active: Boolean(visible) }).eq('id', id).select(select(c)).single()));
}

export async function deleteItem(name, id) {
  const c = config(name);
  await getItem(name, id);
  unwrap(await getSupabase().from(c.table).delete().eq('id', id));
  return { id };
}

/** `ids` is the complete list in the new order. */
export async function reorder(name, ids) {
  const c = config(name);
  if (!Array.isArray(ids) || !ids.length || !ids.every(isUuid) || new Set(ids).size !== ids.length) throw ApiError.badRequest('Invalid order.');
  const existing = unwrap(await getSupabase().from(c.table).select('id'));
  if (existing.length !== ids.length || !existing.every((r) => ids.includes(r.id))) throw ApiError.badRequest('The list changed. Reload and try again.');
  await Promise.all(ids.map((id, i) => getSupabase().from(c.table).update({ sort_order: i + 1 }).eq('id', id).then(unwrap)));
  return { ids };
}
