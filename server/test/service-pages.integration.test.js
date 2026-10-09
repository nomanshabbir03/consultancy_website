// Phase 3 API tests for each of the 16 service pages (in-memory fake Supabase, real Express app).
//   node --experimental-test-module-mocks --test test/service-pages.integration.test.js
import assert from 'node:assert/strict';
import http from 'node:http';
import { after, mock, test } from 'node:test';
import { createFake } from './fakeSupabase.js';

const fake = createFake();
mock.module('../src/config/supabase.js', { namedExports: { getSupabase: () => fake.client, isSupabaseConfigured: () => true } });

const SHELL = `<!doctype html><html lang="en"><head><meta charset="UTF-8" /><title>Cornerstone Medical Solutions</title>
<meta name="description" content="Default description" /><meta name="robots" content="index, follow" /></head><body><div id="root"></div></body></html>`;
const shellServer = http.createServer((req, res) => res.writeHead(200, { 'Content-Type': 'text/html' }).end(SHELL));
await new Promise((r) => shellServer.listen(0, r));
process.env.CLIENT_URL = `http://localhost:${shellServer.address().port}`;
process.env.SITE_URL = 'https://example.test';

const { default: app } = await import('../src/app.js');
const { PAGES } = await import('../src/cms/registry.js');
const { PAGE_META } = await import('../src/cms/pageMeta.js');
const server = http.createServer(app);
await new Promise((r) => server.listen(0, r));
const base = `http://localhost:${server.address().port}`;
after(() => {
  server.close();
  shellServer.close();
});

const GROUPS = ['bpo', 'healthcare', 'digital-marketing'];
const SERVICE = PAGES.filter((p) => GROUPS.includes(p.group));
const isContent = (s) => !s.kind || s.kind === 'content';

const admin = { Cookie: 'cms_at=admin-token', 'X-Requested-With': 'admin-panel' };
// Each test uses its own client IP (the app trusts X-Forwarded-For behind Vercel) so the real rate limiters never interfere.
let clientIp = 1;
const newClient = () => {
  clientIp += 1;
};
const call = async (path, { method = 'GET', body, headers = admin } = {}) => {
  const response = await fetch(base + path, { method, headers: { 'X-Forwarded-For': `10.1.${clientIp >> 8}.${clientIp & 255}`, ...headers, ...(body ? { 'Content-Type': 'application/json' } : {}) }, body: body ? JSON.stringify(body) : undefined });
  const text = await response.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    /* html / xml */
  }
  return { status: response.status, json, data: json?.data, text };
};
const live = async () => (await call('/api/content/site', { headers: {} })).data;

/** First plain text field of a section (searching nested lists too), and a setter that edits it. */
const firstText = (fields, v, trail = []) => {
  for (const f of fields) {
    if (f.type === 'text' && typeof v[f.key] === 'string' && v[f.key]) return [...trail, f.key];
    if (f.type === 'list' && Array.isArray(v[f.key]) && v[f.key][0]) {
      const r = firstText(f.fields, v[f.key][0], [...trail, f.key, 0]);
      if (r) return r;
    }
  }
  return null;
};
const getPath = (o, p) => p.reduce((a, k) => a?.[k], o);
const setPath = (o, p, val) => {
  const c = JSON.parse(JSON.stringify(o));
  let t = c;
  p.slice(0, -1).forEach((k) => (t = t[k]));
  t[p[p.length - 1]] = val;
  return c;
};

test('resilience: with the CMS tables missing every service page is still served with its built-in SEO and /content/site works', async () => {
  newClient();
  fake.missing.add('cms_sections');
  assert.equal((await call('/api/content/site', { headers: {} })).status, 200);
  for (const p of SERVICE) {
    const html = (await call(p.path, { headers: {} })).text;
    const expected = PAGE_META[p.path].title.replace(/&/g, '&amp;');
    assert.ok(html.includes(`<title>${expected}</title>`), `${p.slug}: built-in title missing`);
    assert.ok(html.includes('rel="canonical"'), p.slug);
  }
  fake.missing.delete('cms_sections');
});

test('unauthorized users cannot read drafts or modify any service page', async () => {
  newClient();
  for (const p of SERVICE) {
    const section = p.sections.find(isContent);
    const url = `/api/admin/cms/sections/${p.slug}/${section.key}`;
    assert.equal((await call(url, { headers: {} })).status, 401, `${p.slug} read anonymous`);
    assert.equal((await call(url, { method: 'PUT', body: {}, headers: { 'X-Requested-With': 'admin-panel' } })).status, 401, `${p.slug} write anonymous`);
    assert.equal((await call(url, { method: 'PUT', body: {}, headers: { Cookie: 'cms_at=user-token', 'X-Requested-With': 'admin-panel' } })).status, 403, `${p.slug} write non-admin`);
    assert.equal((await call(url, { method: 'PUT', body: {}, headers: { Cookie: 'cms_at=admin-token' } })).status, 403, `${p.slug} write without CSRF header`);
    assert.equal((await call(`${url}/publish`, { method: 'POST', headers: { Cookie: 'cms_at=user-token', 'X-Requested-With': 'admin-panel' } })).status, 403, `${p.slug} publish non-admin`);
  }
  assert.equal((await call('/api/admin/cms/preview/site', { headers: {} })).status, 401);
  assert.equal((await call('/api/admin/cms/preview/site', { headers: { Cookie: 'cms_at=user-token' } })).status, 403);
});

for (const p of SERVICE) {
  test(`${p.path}: save does not change the live page; preview shows the draft to admins only; publish makes it live; discard restores`, async () => {
    newClient();
    const sections = p.sections.filter(isContent);
    assert.ok(sections.length >= 3, `${p.slug} has too few editable sections`);
    // use the second editable section when there is one (the first is the hero) so list sections are exercised too
    const section = sections.find((s) => s.fields.some((f) => f.type === 'list')) ?? sections[1];
    const url = `/api/admin/cms/sections/${p.slug}/${section.key}`;

    const initial = (await call(url)).data;
    assert.equal(initial.status, 'default');
    const path = firstText(section.fields, initial.content);
    assert.ok(path, `${p.slug}/${section.key} has an editable text field`);
    const original = getPath(initial.content, path);
    assert.ok(original.length > 0);

    // 1. save draft
    const edited = setPath(initial.content, path, `${original} (edited)`);
    const saved = await call(url, { method: 'PUT', body: edited });
    assert.equal(saved.status, 200);
    assert.equal(saved.data.status, 'changed');
    assert.equal(getPath(saved.data.live, path), original, 'live content untouched by Save');

    // 2. public site unchanged; server payload carries nothing for this page
    const pub1 = await live();
    assert.equal(pub1.pages[p.slug]?.[section.key], undefined, 'draft leaked into the public payload');
    const html = (await call(p.path, { headers: {} })).text;
    assert.ok(!html.includes('(edited)'), 'draft leaked into the server-rendered page');

    // 3. preview: admins see the draft; anonymous / non-admin do not
    const preview = await call('/api/admin/cms/preview/site');
    assert.equal(getPath(preview.data.pages[p.slug][section.key], path), `${original} (edited)`);
    assert.equal((await call('/api/admin/cms/preview/site', { headers: {} })).status, 401);
    assert.equal((await call('/api/admin/cms/preview/site', { headers: { Cookie: 'cms_at=user-token' } })).status, 403);

    // 4. publish
    const published = await call(`${url}/publish`, { method: 'POST' });
    assert.equal(published.data.status, 'published');
    const pub2 = await live();
    assert.equal(getPath(pub2.pages[p.slug][section.key], path), `${original} (edited)`);
    // the embedded first-paint payload carries only this page's sections
    const page = (await call(p.path, { headers: {} })).text;
    const island = JSON.parse(page.match(/id="cms-site">([^<]*)<\/script>/)[1]);
    assert.deepEqual(Object.keys(island.pages), [p.slug]);

    // 5. second draft then discard -> back to the published edit
    await call(url, { method: 'PUT', body: setPath(initial.content, path, 'SECOND DRAFT') });
    const discarded = await call(`${url}/discard`, { method: 'POST' });
    assert.equal(discarded.data.status, 'published');
    assert.equal(getPath(discarded.data.content, path), `${original} (edited)`);
    assert.equal(getPath((await live()).pages[p.slug][section.key], path), `${original} (edited)`);

    // 6. malformed / unsafe content is rejected and never stored
    const urlField = (function find(fields, v) {
      for (const f of fields) {
        if (f.type === 'url' && v[f.key]) return [f.key];
        if (f.type === 'list' && Array.isArray(v[f.key]) && v[f.key][0]) {
          const r = find(f.fields, v[f.key][0]);
          if (r) return [f.key, 0, ...r];
        }
      }
      return null;
    })(section.fields, initial.content);
    if (urlField) assert.equal((await call(url, { method: 'PUT', body: setPath(initial.content, urlField, 'javascript:alert(1)') })).status, 400);
    assert.equal((await call(url, { method: 'PUT', body: setPath(initial.content, path, 'x'.repeat(9000)) })).status, 400);
    assert.equal((await call(url, { method: 'PUT', body: 'not an object' })).status === 200 ? 0 : 1, 1, 'non-object body must not be accepted as content');
    const after = (await call(url)).data;
    assert.equal(getPath(after.content, path), `${original} (edited)`, 'rejected input must not change stored content');
  });

  test(`${p.path}: section order and visibility (hero stays first and visible)`, async () => {
    newClient();
    const layoutUrl = `/api/admin/cms/sections/${p.slug}/layout`;
    const { content } = (await call(layoutUrl)).data;
    const items = content.items;
    assert.equal(items[0].key, 'hero');
    assert.ok(items.length >= 4);
    const hidden = items[items.length - 1].key;
    const moved = [items[0], items[2], items[1], ...items.slice(3)].map((i) => ({ key: i.key, visible: i.key !== hidden }));
    assert.equal((await call(layoutUrl, { method: 'PUT', body: { items: moved } })).status, 200);
    assert.equal((await live()).pages[p.slug]?.layout, undefined, 'unpublished layout must not be public');
    await call(`${layoutUrl}/publish`, { method: 'POST' });
    const pubLayout = (await live()).pages[p.slug].layout.items;
    assert.deepEqual(pubLayout.map((i) => i.key), moved.map((i) => i.key));
    assert.equal(pubLayout.find((i) => i.key === hidden).visible, false);
    // the hero cannot be hidden or moved
    assert.equal((await call(layoutUrl, { method: 'PUT', body: { items: items.map((i) => (i.key === 'hero' ? { ...i, visible: false } : i)) } })).status, 400);
    assert.equal((await call(layoutUrl, { method: 'PUT', body: { items: [items[1], items[0], ...items.slice(2)] } })).status, 400);
    // a layout that drops or invents a block is refused
    assert.equal((await call(layoutUrl, { method: 'PUT', body: { items: items.slice(0, -1) } })).status, 400);
    assert.equal((await call(layoutUrl, { method: 'PUT', body: { items: [...items, { key: 'nope', visible: true }] } })).status, 400);
  });

  test(`${p.path}: SEO is rendered server-side from published CMS values (draft never), with pageMeta fallbacks`, async () => {
    newClient();
    const seoUrl = `/api/admin/cms/sections/${p.slug}/seo`;
    const fallback = (await call(p.path, { headers: {} })).text;
    const metaTitle = PAGE_META[p.path].title.replace(/&/g, '&amp;');
    assert.ok(fallback.includes(`<title>${metaTitle}</title>`), 'pageMeta fallback title');
    assert.ok(fallback.includes(`<link rel="canonical" href="https://example.test${p.path}" />`));
    assert.ok(fallback.includes('name="robots" content="index, follow"'));

    const seo = (await call(seoUrl)).data.content;
    const draft = { ...seo, seoTitle: `${p.title} SEO TEST`, metaDescription: `${p.title} description TEST`, canonicalUrl: `https://example.test/canonical${p.path}`, ogTitle: `${p.title} OG TEST`, ogDescription: 'OG description TEST', ogImage: '/assets/pics/company_logo.png', robots: 'noindex' };
    assert.equal((await call(seoUrl, { method: 'PUT', body: draft })).status, 200);
    const beforePublish = (await call(p.path, { headers: {} })).text;
    assert.ok(!beforePublish.includes(`${p.title} SEO TEST`) && !beforePublish.includes(`${p.title} OG TEST`), 'draft SEO must not be rendered');
    await call(`${seoUrl}/publish`, { method: 'POST' });
    const html = (await call(p.path, { headers: {} })).text;
    assert.ok(html.includes(`<title>${p.title.replace(/&/g, '&amp;')} SEO TEST</title>`));
    assert.ok(html.includes(`name="description" content="${p.title.replace(/&/g, '&amp;')} description TEST"`));
    assert.ok(html.includes(`<link rel="canonical" href="https://example.test/canonical${p.path}" />`));
    assert.ok(html.includes(`property="og:title" content="${p.title.replace(/&/g, '&amp;')} OG TEST"`));
    assert.ok(html.includes('property="og:description" content="OG description TEST"'));
    assert.ok(html.includes('property="og:image" content="https://example.test/assets/pics/company_logo.png"'));
    assert.ok(html.includes('name="robots" content="noindex, follow"'));
    const sitemap = (await call('/sitemap.xml', { headers: {} })).text;
    assert.ok(!sitemap.includes(`<loc>https://example.test${p.path}</loc>`), 'noindex page must leave the sitemap');
    // allow indexing again -> back in the sitemap
    await call(seoUrl, { method: 'PUT', body: { ...draft, robots: 'index' } });
    await call(`${seoUrl}/publish`, { method: 'POST' });
    assert.ok((await call('/sitemap.xml', { headers: {} })).text.includes(`<loc>https://example.test${p.path}</loc>`));
    assert.ok((await call(p.path, { headers: {} })).text.includes('name="robots" content="index, follow"'));
  });
}

test('sitemap lists all 16 service pages and the unrelated pages keep their SEO', async () => {
  newClient();
  const sitemap = (await call('/sitemap.xml', { headers: {} })).text;
  for (const p of SERVICE) assert.ok(sitemap.includes(`https://example.test${p.path}<`), `${p.path} missing from the sitemap`);
  assert.equal(SERVICE.length, 16);
  for (const path of ['/', '/about-us', '/contact-us', '/blog', '/career']) assert.ok((await call(path, { headers: {} })).text.includes('<title>'), path);
});

test('blog and career SEO pages are unaffected by service-page CMS content', async () => {
  fake.tables.blogs = [{ slug: 'hello', title: 'Hello Post', meta_description: 'About hello', excerpt_html: '<p>x</p>', featured_image: '/a.webp', published_at: '2026-01-01', updated_at: '2026-01-02', is_published: true, authors: { name: 'Ann' } }];
  fake.tables.careers = [{ slug: 'job-1', title: 'Sales Executive', location: 'Lahore', description: '<p>desc</p>', last_date: '2026-12-01', created_at: '2026-01-01', updated_at: '2026-01-02', is_active: true }];
  const blog = (await call('/blog/hello', { headers: {} })).text;
  assert.match(blog, /<title>Hello Post<\/title>/);
  assert.match(blog, /"@type":"BlogPosting"/);
  const job = (await call('/career/job-1', { headers: {} })).text;
  assert.match(job, /<title>Sales Executive - Cornerstone Medical Solutions<\/title>/);
  assert.match(job, /"@type":"JobPosting"/);
});
