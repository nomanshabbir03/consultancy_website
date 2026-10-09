// End-to-end API tests with an in-memory fake Supabase (no database needed).
//   node --experimental-test-module-mocks --test test/cms.integration.test.js
import assert from 'node:assert/strict';
import http from 'node:http';
import { before, after, mock, test } from 'node:test';
import { createFake } from './fakeSupabase.js';

const fake = createFake();
mock.module('../src/config/supabase.js', {
  namedExports: { getSupabase: () => fake.client, isSupabaseConfigured: () => true },
});

// A tiny static server standing in for the built client (index.html), which the crawler-facing pages load as their shell.
const SHELL = `<!doctype html><html lang="en"><head><meta charset="UTF-8" /><title>Cornerstone Medical Solutions</title>
<meta name="description" content="Default description" /><meta name="robots" content="index, follow" /></head><body><div id="root"></div></body></html>`;
const shellServer = http.createServer((req, res) => res.writeHead(200, { 'Content-Type': 'text/html' }).end(SHELL));
await new Promise((r) => shellServer.listen(0, r));
process.env.CLIENT_URL = `http://localhost:${shellServer.address().port}`;
process.env.SITE_URL = 'https://example.test';

const { default: app } = await import('../src/app.js');
const server = http.createServer(app);
await new Promise((r) => server.listen(0, r));
const base = `http://localhost:${server.address().port}`;

after(() => {
  server.close();
  shellServer.close();
});

const admin = { Cookie: 'cms_at=admin-token', 'X-Requested-With': 'admin-panel' };
const call = async (path, { method = 'GET', body, form, headers = admin } = {}) => {
  const response = await fetch(base + path, {
    method,
    headers: { ...headers, ...(body ? { 'Content-Type': 'application/json' } : {}) },
    body: form ?? (body ? JSON.stringify(body) : undefined),
  });
  const text = await response.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    /* html / xml */
  }
  return { status: response.status, json, data: json?.data, text };
};

const PNG = Buffer.concat([Buffer.from('89504e470d0a1a0a0000000d49484452000000640000003208060000', 'hex'), Buffer.alloc(64)]);
const JPG = Buffer.concat([Buffer.from([0xff, 0xd8, 0xff, 0xe0]), Buffer.alloc(64)]);
const upload = (buffer, name = 'pic.png', type = 'image/png', alt = 'A picture') => {
  const form = new FormData();
  form.append('alt', alt);
  form.append('file', new Blob([buffer], { type }), name);
  return form;
};

// ------------------------------------------------------------------ resilience (CMS tables missing)
test('public site and SEO pages keep working when the CMS tables do not exist yet', async () => {
  fake.missing.add('cms_sections');
  const site = await call('/api/content/site', { headers: {} });
  assert.equal(site.status, 200);
  assert.equal(site.data.global.navbar.items.length, 6);
  assert.equal(site.data.global.cta.title, 'READY TO START YOUR PROJECT');
  const page = await call('/about-us', { headers: {} });
  assert.equal(page.status, 200);
  assert.match(page.text, /<title>Learn About Our Mission and Values \| Cornerstone Medical Solutions<\/title>/);
  fake.missing.delete('cms_sections');
});

// ------------------------------------------------------------------ authentication / authorization
test('admin CMS endpoints reject anonymous, non-admin and CSRF-less requests', async () => {
  for (const [method, path] of [['GET', '/api/admin/cms/schema'], ['PUT', '/api/admin/cms/sections/global/cta'], ['POST', '/api/admin/media'], ['GET', '/api/admin/collections/faqs'], ['DELETE', '/api/admin/media/x']]) {
    assert.equal((await call(path, { method, headers: { 'X-Requested-With': 'admin-panel' } })).status, 401, `${method} ${path} anonymous`);
    assert.equal((await call(path, { method, headers: {} })).status, method === 'GET' ? 401 : 403, `${method} ${path} anonymous without CSRF header`);
    assert.equal((await call(path, { method, headers: { Cookie: 'cms_at=user-token', 'X-Requested-With': 'admin-panel' } })).status, 403, `${method} ${path} non-admin`);
  }
  assert.equal((await call('/api/admin/cms/sections/global/cta', { method: 'PUT', body: {}, headers: { Cookie: 'cms_at=admin-token' } })).status, 403, 'missing CSRF header');
});

// ------------------------------------------------------------------ draft / preview / publish / discard
test('save does not change the live site; preview shows the draft; publish makes it live; discard restores', async () => {
  const live = () => call('/api/content/site', { headers: {} });
  const section = (await call('/api/admin/cms/sections/global/cta')).data;
  assert.equal(section.status, 'default');
  assert.equal(section.content.title, 'READY TO START YOUR PROJECT');
  assert.equal((await live()).data.global.cta.title, 'READY TO START YOUR PROJECT');

  const edited = { ...section.content, title: 'READY FOR YOUR NEXT PROJECT' };
  const saved = await call('/api/admin/cms/sections/global/cta', { method: 'PUT', body: edited });
  assert.equal(saved.status, 200);
  assert.equal(saved.data.status, 'changed');
  assert.equal(saved.data.live.title, 'READY TO START YOUR PROJECT', 'live content is untouched by Save');

  assert.equal((await live()).data.global.cta.title, 'READY TO START YOUR PROJECT', 'visitors still see the old content');
  assert.equal((await call('/api/admin/cms/preview/site')).data.global.cta.title, 'READY FOR YOUR NEXT PROJECT', 'preview shows the draft');
  assert.equal((await call('/api/content/site', { headers: {} })).data.global.cta.title, 'READY TO START YOUR PROJECT');
  assert.equal((await call('/api/admin/cms/preview/site', { headers: {} })).status, 401, 'preview is admin-only');

  const published = await call('/api/admin/cms/sections/global/cta/publish', { method: 'POST' });
  assert.equal(published.data.status, 'published');
  assert.equal((await live()).data.global.cta.title, 'READY FOR YOUR NEXT PROJECT', 'publish makes it live');

  await call('/api/admin/cms/sections/global/cta', { method: 'PUT', body: { ...edited, title: 'SECOND DRAFT', _enabled: false } });
  assert.equal((await live()).data.global.cta.title, 'READY FOR YOUR NEXT PROJECT');
  const discarded = await call('/api/admin/cms/sections/global/cta/discard', { method: 'POST' });
  assert.equal(discarded.data.status, 'published');
  assert.equal(discarded.data.content.title, 'READY FOR YOUR NEXT PROJECT', 'discard restores the last published version');
  assert.equal(discarded.data.content._enabled, true);
  assert.equal((await call('/api/admin/cms/sections/global/company/publish', { method: 'POST' })).status, 400, 'a never-edited section has nothing to publish');
});

test('invalid content is rejected with field errors and nothing is stored', async () => {
  const before = (await call('/api/admin/cms/sections/global/footer')).data;
  const bad = await call('/api/admin/cms/sections/global/footer', {
    method: 'PUT',
    body: { ...before.content, columns: [{ title: '<script>alert(1)</script>', links: [{ label: 'x', to: 'javascript:alert(1)' }] }], isoImage: 'data:image/svg+xml;base64,AAAA' },
  });
  assert.equal(bad.status, 400);
  assert.ok(bad.json.errors['columns.0.links.0.to']);
  assert.ok(bad.json.errors.isoImage);
  assert.equal((await call('/api/admin/cms/sections/global/footer')).data.status, 'default');
  assert.equal((await call('/api/admin/cms/sections/nope/nothing')).status, 404);
});

test('stored text stays inert: script text is saved as plain text and escaped when injected server-side', async () => {
  const seo = (await call('/api/admin/cms/sections/contact-us/seo')).data.content;
  const evil = '"><script>alert(1)</script>';
  assert.equal((await call('/api/admin/cms/sections/contact-us/seo', { method: 'PUT', body: { ...seo, seoTitle: evil, metaDescription: evil } })).status, 200);
  await call('/api/admin/cms/sections/contact-us/seo/publish', { method: 'POST' });
  const html = (await call('/contact-us', { headers: {} })).text;
  assert.ok(!html.includes('<script>alert(1)</script>'));
  assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
});

// ------------------------------------------------------------------ SEO (server-side)
test('CMS SEO is rendered server-side with pageMeta fallbacks, noindex and canonical support', async () => {
  const fallback = (await call('/bpo', { headers: {} })).text;
  assert.match(fallback, /<title>Outsourcing Services for Business Process Optimization<\/title>/);
  assert.match(fallback, /<link rel="canonical" href="https:\/\/example.test\/bpo" \/>/);
  assert.match(fallback, /id="cms-site"/, 'embeds published global content for the first paint');

  const seo = (await call('/api/admin/cms/sections/bpo/seo')).data.content;
  await call('/api/admin/cms/sections/bpo/seo', {
    method: 'PUT',
    body: { ...seo, seoTitle: 'Custom BPO title', metaDescription: 'Custom description', canonicalUrl: 'https://example.test/outsourcing', ogTitle: 'Share title', ogImage: '/assets/pics/x.webp', robots: 'noindex' },
  });
  assert.match((await call('/bpo', { headers: {} })).text, /Outsourcing Services for Business/, 'a draft is not served');
  await call('/api/admin/cms/sections/bpo/seo/publish', { method: 'POST' });
  const html = (await call('/bpo', { headers: {} })).text;
  assert.match(html, /<title>Custom BPO title<\/title>/);
  assert.match(html, /name="description" content="Custom description"/);
  assert.match(html, /<link rel="canonical" href="https:\/\/example.test\/outsourcing" \/>/);
  assert.match(html, /property="og:title" content="Share title"/);
  assert.match(html, /property="og:image" content="https:\/\/example.test\/assets\/pics\/x.webp"/);
  assert.match(html, /name="robots" content="noindex, follow"/);
  const sitemap = (await call('/sitemap.xml', { headers: {} })).text;
  assert.ok(!sitemap.includes('https://example.test/bpo<'), 'noindex pages leave the sitemap');
  assert.ok(sitemap.includes('https://example.test/about-us<'));
  const home = (await call('/', { headers: {} })).text;
  assert.match(home, /<title>Cornerstone Medical Solutions<\/title>/);
  assert.match((await call('/blog', { headers: {} })).text, /Cornerstone Medical Solutions Blog: Learn and Grow/);
});

test('blog and career SEO pages are unchanged (still served, still fall back to the SPA when unknown)', async () => {
  fake.tables.blogs = [{ slug: 'hello', title: 'Hello Post', meta_description: 'About hello', excerpt_html: '<p>x</p>', featured_image: '/a.webp', published_at: '2026-01-01', updated_at: '2026-01-02', is_published: true, authors: { name: 'Ann' } }];
  const html = (await call('/blog/hello', { headers: {} })).text;
  assert.match(html, /<title>Hello Post<\/title>/);
  assert.match(html, /"@type":"BlogPosting"/);
  const missing = await fetch(`${base}/blog/does-not-exist`, { redirect: 'manual' });
  assert.equal(missing.status, 200); // unknown slugs return the plain SPA shell, as before
});

// ------------------------------------------------------------------ media
test('media library: upload validation, alt text, usage protection, replace, delete, sync', async () => {
  const ok = await call('/api/admin/media', { method: 'POST', form: upload(PNG) });
  assert.equal(ok.status, 201);
  assert.equal(ok.data.width, 100);
  assert.equal(ok.data.height, 50);
  assert.equal(ok.data.alt, 'A picture');
  assert.match(ok.data.url, /\/cms\/\d{4}\/[0-9a-f-]+\.png$/);
  const id = ok.data.id;

  // Security: contents decide, not the name or MIME type.
  const svg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>');
  assert.equal((await call('/api/admin/media', { method: 'POST', form: upload(svg, 'evil.png', 'image/png') })).status, 400);
  assert.equal((await call('/api/admin/media', { method: 'POST', form: upload(Buffer.from('<?php system($_GET[1]); ?>'), 'shell.php.png', 'image/png') })).status, 400);
  assert.equal((await call('/api/admin/media', { method: 'POST', form: upload(Buffer.concat([PNG, Buffer.alloc(3 * 1024 * 1024)])) })).status, 400, 'over 3 MB');
  assert.equal((await call('/api/admin/media', { method: 'POST', form: upload(PNG, 'a.png', 'image/png', 'x'.repeat(300)) })).status, 400, 'alt too long');
  assert.equal(fake.tables.media_assets.length, 1, 'rejected files leave no trace');
  assert.equal(fake.objects.size, 1);

  assert.equal((await call(`/api/admin/media/${id}`, { method: 'PUT', body: { alt: 'New alt' } })).data.alt, 'New alt');
  assert.equal((await call('/api/admin/media?q=pic')).data.length, 1);

  // Used by a draft -> cannot be deleted.
  const url = ok.data.url;
  const seo = (await call('/api/admin/cms/sections/about-us/seo')).data.content;
  await call('/api/admin/cms/sections/about-us/seo', { method: 'PUT', body: { ...seo, ogImage: url } });
  assert.deepEqual((await call(`/api/admin/media/${id}/usage`)).data.usedIn, ['Website content: about-us / seo (draft)']);
  assert.equal((await call(`/api/admin/media/${id}`, { method: 'DELETE' })).status, 409);

  // Replace in place: same type only.
  assert.equal((await call(`/api/admin/media/${id}/replace`, { method: 'POST', form: upload(JPG, 'x.jpg', 'image/jpeg') })).status, 400);
  assert.equal((await call(`/api/admin/media/${id}/replace`, { method: 'POST', form: upload(Buffer.concat([PNG, Buffer.alloc(8)]), 'y.png') })).status, 200);

  await call('/api/admin/cms/sections/about-us/seo/discard', { method: 'POST' });
  assert.equal((await call(`/api/admin/media/${id}`, { method: 'DELETE' })).status, 200);
  assert.equal(fake.objects.size, 0, 'the file is removed from storage');

  // Built-in images are read-only.
  fake.tables.media_assets.push({ id: '00000000-0000-4000-8000-0000000000aa', path: '/assets/pics/a.webp', url: '/assets/pics/a.webp', name: 'a.webp', alt_text: '', is_builtin: true, created_at: 'x', updated_at: 'x' });
  assert.equal((await call('/api/admin/media/00000000-0000-4000-8000-0000000000aa', { method: 'DELETE' })).status, 400);
  assert.equal((await call('/api/admin/media/00000000-0000-4000-8000-0000000000aa/replace', { method: 'POST', form: upload(PNG) })).status, 400);
  assert.equal((await call('/api/admin/media/00000000-0000-4000-8000-0000000000aa', { method: 'PUT', body: { alt: 'Alt for built-in' } })).data.alt, 'Alt for built-in');

  // Sync registers files already in the bucket (e.g. blog uploads).
  fake.objects.set('blogs/2026/abc.webp', { buffer: Buffer.alloc(10), contentType: 'image/webp' });
  assert.equal((await call('/api/admin/media/sync', { method: 'POST' })).data.added, 1);
  assert.equal((await call('/api/admin/media/sync', { method: 'POST' })).data.added, 0);
});

// ------------------------------------------------------------------ collections
test('collections: add (hidden by default), validate, reorder, show/hide, delete', async () => {
  const a = await call('/api/admin/collections/faqs', { method: 'POST', body: { question: 'Q one?', answer: 'A one' } });
  const b = await call('/api/admin/collections/faqs', { method: 'POST', body: { question: 'Q two?', answer: 'A two', visible: true } });
  assert.equal(a.status, 201);
  assert.equal(a.data.visible, false, 'new items stay hidden until made visible');
  assert.equal(b.data.visible, true);
  assert.equal((await call('/api/admin/collections/faqs', { method: 'POST', body: { question: 'Q one?', answer: 'dup' } })).status, 409);
  assert.equal((await call('/api/admin/collections/faqs', { method: 'POST', body: { question: '', answer: '' } })).status, 400);
  assert.deepEqual((await call('/api/admin/collections/faqs')).data.map((x) => x.question), ['Q one?', 'Q two?']);

  assert.equal((await call('/api/admin/collections/faqs/order', { method: 'PUT', body: { ids: [b.data.id, a.data.id] } })).status, 200);
  assert.deepEqual((await call('/api/admin/collections/faqs')).data.map((x) => x.question), ['Q two?', 'Q one?']);
  assert.equal((await call('/api/admin/collections/faqs/order', { method: 'PUT', body: { ids: [a.data.id] } })).status, 400, 'incomplete order is refused');

  assert.equal((await call(`/api/admin/collections/faqs/${a.data.id}/visible`, { method: 'PATCH', body: { visible: true } })).data.visible, true);
  assert.equal((await call(`/api/admin/collections/faqs/${a.data.id}`, { method: 'PUT', body: { question: 'Q one edited?', answer: 'A1', visible: false } })).data.visible, false);
  assert.equal((await call(`/api/admin/collections/faqs/${a.data.id}`, { method: 'DELETE' })).status, 200);
  assert.equal((await call(`/api/admin/collections/faqs/${a.data.id}`)).status, 404);

  const story = await call('/api/admin/collections/success-stories', { method: 'POST', body: { youtubeId: 'dQw4w9WgXcQ' } });
  assert.equal(story.data.thumbnail, 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg');
  assert.equal((await call('/api/admin/collections/success-stories', { method: 'POST', body: { youtubeId: 'not valid!' } })).status, 400);
  const member = await call('/api/admin/collections/team', { method: 'POST', body: { name: 'A B', role: 'CEO', bio: 'bio', linkedin: 'javascript:alert(1)' } });
  assert.equal(member.status, 400);
  assert.equal((await call('/api/admin/collections/nope')).status, 404);
});
