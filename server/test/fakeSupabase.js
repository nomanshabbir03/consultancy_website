// Minimal in-memory stand-in for the parts of supabase-js the CMS uses, so the API can be tested end to end without a database.
const clone = (v) => (v === undefined ? v : JSON.parse(JSON.stringify(v)));
const UNIQUE = { cms_sections: ['page_slug', 'section_key'], media_assets: ['path'], faqs: ['question'], team_members: ['name'], success_stories: ['youtube_id'], testimonials: ['author_name'] };
const PK = { cms_sections: ['page_slug', 'section_key'] };

export function createFake(seed = {}) {
  const tables = {};
  for (const [name, rows] of Object.entries(seed)) tables[name] = clone(rows);
  const objects = new Map(); // storage: path -> { buffer, contentType, cacheControl }
  let counter = 0;
  const now = () => new Date().toISOString();
  const rowsOf = (t) => (tables[t] ??= []);
  const missing = new Set(); // tables that "do not exist"

  function from(table) {
    const state = { op: 'select', filters: [], order: [], limit: null, payload: null, onConflict: null, cols: '*', single: null };
    const exec = () => {
      if (missing.has(table)) return { data: null, error: { code: 'PGRST205', message: `Could not find the table 'public.${table}'` } };
      const rows = rowsOf(table);
      const match = (r) => state.filters.every(([c, v]) => r[c] === v);
      let result;
      if (state.op === 'insert') {
        const list = [].concat(state.payload).map((p) => ({ id: p.id ?? `00000000-0000-4000-8000-${String(++counter).padStart(12, '0')}`, created_at: now(), updated_at: now(), ...clone(p) }));
        for (const r of list) {
          const keys = UNIQUE[table] ?? [];
          if (keys.length && rows.some((x) => keys.every((k) => x[k] === r[k]))) return { data: null, error: { code: '23505', message: 'duplicate' } };
        }
        rows.push(...list);
        result = list;
      } else if (state.op === 'upsert') {
        const keys = (state.onConflict ?? PK[table]?.join(',') ?? 'id').split(',');
        result = [].concat(state.payload).map((p) => {
          const existing = rows.find((x) => keys.every((k) => x[k] === p[k]));
          if (existing) {
            Object.assign(existing, clone(p), { updated_at: now() });
            return existing;
          }
          const row = { id: `00000000-0000-4000-8000-${String(++counter).padStart(12, '0')}`, created_at: now(), updated_at: now(), ...clone(p) };
          rows.push(row);
          return row;
        });
      } else if (state.op === 'update') {
        result = rows.filter(match);
        for (const r of result) Object.assign(r, clone(state.payload), { updated_at: now() });
      } else if (state.op === 'delete') {
        result = rows.filter(match);
        tables[table] = rows.filter((r) => !match(r));
      } else {
        result = rows.filter(match);
        for (const [col, asc] of [...state.order].reverse()) result = [...result].sort((a, b) => (a[col] > b[col] ? 1 : a[col] < b[col] ? -1 : 0) * (asc ? 1 : -1));
        if (state.limit != null) result = result.slice(0, state.limit);
      }
      result = clone(result);
      if (state.count) return { data: null, count: result.length, error: null };
      if (state.single === 'one') return result.length === 1 ? { data: result[0], error: null } : { data: null, error: { code: 'PGRST116', message: 'no rows' } };
      if (state.single === 'maybe') return { data: result[0] ?? null, error: null };
      return { data: result, error: null };
    };
    const api = {
      select(cols = '*', opts) {
        if (state.op === 'select') state.cols = cols;
        if (opts?.head) state.count = true;
        return api;
      },
      insert(p) { state.op = 'insert'; state.payload = p; return api; },
      upsert(p, o) { state.op = 'upsert'; state.payload = p; state.onConflict = o?.onConflict; return api; },
      update(p) { state.op = 'update'; state.payload = p; return api; },
      delete() { state.op = 'delete'; return api; },
      eq(c, v) { state.filters.push([c, v]); return api; },
      order(c, o) { state.order.push([c, o?.ascending !== false]); return api; },
      limit(n) { state.limit = n; return api; },
      maybeSingle() { state.single = 'maybe'; return api; },
      single() { state.single = 'one'; return api; },
      then: (resolve, reject) => Promise.resolve(exec()).then(resolve, reject),
    };
    return api;
  }

  const bucket = {
    upload: async (path, buffer, opts) => {
      if (objects.has(path) && !opts?.upsert) return { error: { message: 'exists' } };
      objects.set(path, { buffer, ...opts });
      return { error: null };
    },
    remove: async (paths) => {
      paths.forEach((p) => objects.delete(p));
      return { error: null };
    },
    list: async (prefix) => {
      const base = prefix ? `${prefix}/` : '';
      const seen = new Map();
      for (const [p, o] of objects) {
        if (!p.startsWith(base)) continue;
        const rest = p.slice(base.length);
        const [head, ...tail] = rest.split('/');
        seen.set(head, tail.length ? { name: head, id: null } : { name: head, id: p, metadata: { size: o.buffer.length, mimetype: o.contentType } });
      }
      return { data: [...seen.values()], error: null };
    },
    getPublicUrl: (p) => ({ data: { publicUrl: `https://fake.supabase.co/storage/v1/object/public/site-images/${p}` } }),
  };

  const client = {
    from,
    storage: {
      from: () => bucket,
      getBucket: async () => ({ data: { id: 'site-images' } }),
      createBucket: async () => ({ error: null }),
    },
    auth: {
      getUser: async (token) =>
        token === 'admin-token'
          ? { data: { user: { id: 'u1', email: 'admin@test', app_metadata: { role: 'admin' } } }, error: null }
          : token === 'user-token'
            ? { data: { user: { id: 'u2', email: 'visitor@test', app_metadata: {} } }, error: null }
            : { data: { user: null }, error: { message: 'bad token' } },
    },
  };
  return { client, tables, objects, missing };
}
