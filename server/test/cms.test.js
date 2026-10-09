// Run with: npm test --prefix server   (Node's built-in test runner; no database needed)
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { test } from 'node:test';
import { PAGE_DEFAULTS, PAGE_LAYOUTS } from '../../client/src/content/pageDefaults.js';
import { PAGE_META as clientMeta } from '../../client/src/routes/pageMeta.js';
import { PAGE_META as serverMeta } from '../src/cms/pageMeta.js';
import { PAGES, defaultContent, getSectionDef } from '../src/cms/registry.js';
import { cleanImage, cleanUrl, sameContent, validateContent } from '../src/cms/validate.js';
import { detectImage } from '../src/services/storageService.js';
import { imageSize } from '../src/utils/imageInfo.js';
import { sanitizeRichText } from '../src/utils/sanitize.js';

const section = (page, key) => getSectionDef(page, key);

test('server fallback SEO values are identical to the client pageMeta.js', () => {
  assert.deepEqual(serverMeta, clientMeta);
});

test('every public page with a CMS entry has fallback SEO', () => {
  for (const p of PAGES.filter((x) => x.path)) assert.ok(serverMeta[p.path], `missing pageMeta for ${p.path}`);
});

test('built-in defaults satisfy their own schema (nothing the live site shows today is rejected)', () => {
  for (const page of PAGES) {
    for (const s of page.sections) {
      const content = defaultContent(page.slug, s.key);
      assert.doesNotThrow(() => validateContent(s.fields, content, s), `${page.slug}/${s.key}`);
    }
  }
});

test('navbar defaults keep the existing navigation', () => {
  const nav = defaultContent('global', 'navbar');
  assert.deepEqual(nav.items.map((i) => i.label), ['Home', 'About', 'Our Business', 'Blogs', 'Career', 'Contact Us']);
  assert.equal(nav.menuGroups.length, 3);
});

test('URL validation accepts site paths / https / mailto / tel and rejects script URLs', () => {
  for (const ok of ['/about-us', '/blog?x=1', '#top', 'https://example.com/a', 'mailto:a@b.co', 'tel:+92 333 0327865', '']) assert.notEqual(cleanUrl(ok), null, ok);
  for (const bad of ['javascript:alert(1)', 'JaVaScRiPt:alert(1)', 'data:text/html,x', '//evil.com', 'vbscript:x', 'ftp://x', '/a b', 'https://a.com/ x']) {
    assert.equal(cleanUrl(bad), null, bad);
  }
  assert.equal(cleanImage('javascript:alert(1)'), null);
  assert.equal(cleanImage('data:image/svg+xml;base64,AAAA'), null);
  assert.equal(cleanImage('/assets/pics/a.webp'), '/assets/pics/a.webp');
});

test('validation drops unknown keys, enforces limits and reports field paths', () => {
  const def = section('global', 'cta');
  const ok = validateContent(def.fields, { title: ' Hello ', buttonLabel: 'Go', buttonUrl: '/contact-us', evil: '<script>', _enabled: false }, def);
  assert.deepEqual(ok, { title: 'Hello', buttonLabel: 'Go', buttonUrl: '/contact-us', _enabled: false });
  try {
    validateContent(def.fields, { title: '', buttonLabel: 'x'.repeat(100), buttonUrl: 'javascript:alert(1)' }, def);
    assert.fail('should have thrown');
  } catch (err) {
    assert.equal(err.status, 400);
    assert.deepEqual(Object.keys(err.errors).sort(), ['buttonLabel', 'buttonUrl', 'title']);
  }
});

test('lists are validated item by item and limited in size', () => {
  const def = section('global', 'social');
  const tooMany = Array.from({ length: 5 }, () => ({ platform: 'facebook', url: 'https://facebook.com/x' }));
  assert.throws(() => validateContent(def.fields, { items: tooMany }, def), (e) => Boolean(e.errors.items));
  assert.throws(() => validateContent(def.fields, { items: [{ platform: 'myspace', url: 'https://x.com' }] }, def), (e) => Boolean(e.errors['items.0.platform']));
  assert.throws(() => validateContent(def.fields, { items: [{ platform: 'facebook', url: 'javascript:1' }] }, def), (e) => Boolean(e.errors['items.0.url']));
});

test('navbar allows only one mega menu item and requires links', () => {
  const def = section('global', 'navbar');
  const base = defaultContent('global', 'navbar');
  const twoMenus = { ...base, items: [...base.items, { label: 'Another', type: 'menu', to: '' }] };
  assert.throws(() => validateContent(def.fields, twoMenus, def), (e) => Boolean(e.errors.items));
  const noLink = { ...base, items: [{ label: 'Broken', type: 'link', to: '' }] };
  assert.throws(() => validateContent(def.fields, noLink, def), (e) => Boolean(e.errors['items.0.to']));
});

test('footer grid is limited to three columns', () => {
  const def = section('global', 'footer');
  const base = defaultContent('global', 'footer');
  assert.throws(() => validateContent(def.fields, { ...base, columns: [...base.columns, { title: 'Four', links: [] }] }, def), (e) => Boolean(e.errors.columns));
});

test('SEO fields: robots must be index/noindex', () => {
  const def = section('about-us', 'seo');
  assert.equal(validateContent(def.fields, { robots: 'noindex' }, def).robots, 'noindex');
  assert.throws(() => validateContent(def.fields, { robots: 'nofollow-everything' }, def), (e) => Boolean(e.errors.robots));
});

test('basic rich text profile strips scripts, handlers, styles, classes, images and unsafe links', () => {
  const dirty =
    '<p style="color:red" class="x" onclick="evil()">Hi <strong>there</strong><script>alert(1)</script><img src="x" onerror="evil()"> <a href="javascript:alert(1)">bad</a> <a href="https://ok.com" target="_blank">ok</a></p><iframe src="https://evil.com"></iframe><h1>big</h1>';
  const clean = sanitizeRichText(dirty, 'basic');
  assert.ok(!/script|onclick|onerror|style=|class=|<img|iframe|javascript:|<h1/i.test(clean), clean);
  assert.ok(clean.includes('<strong>there</strong>') && clean.includes('https://ok.com'));
});

test('stable comparison ignores key order (jsonb does not keep it)', () => {
  assert.ok(sameContent({ a: 1, b: { c: [1, { x: 1, y: 2 }] } }, { b: { c: [1, { y: 2, x: 1 }] }, a: 1 }));
  assert.ok(!sameContent({ a: 1 }, { a: 2 }));
});

test('image detection uses file signatures, not names or MIME types', () => {
  const png = Buffer.from('89504e470d0a1a0a0000000d49484452000000640000003208060000', 'hex');
  assert.equal(detectImage(Buffer.concat([png, Buffer.alloc(8)]))?.ext, 'png');
  assert.deepEqual(imageSize(Buffer.concat([png, Buffer.alloc(8)])), { width: 100, height: 50 });
  assert.equal(detectImage(Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>')), null);
  assert.equal(detectImage(Buffer.from('<?php echo 1; ?>                ')), null);
  assert.equal(detectImage(Buffer.from('GIF89a' + 'x'.repeat(10))).ext, 'gif');
});

test('vercel.json routes every CMS page through the server so crawlers get the CMS SEO', () => {
  const rewrites = JSON.parse(fs.readFileSync(new URL('../../vercel.json', import.meta.url), 'utf8')).rewrites;
  const toServer = new Set(rewrites.filter((r) => r.destination?.service === 'server').map((r) => r.source));
  for (const p of PAGES.filter((x) => x.path)) assert.ok(toServer.has(p.path), `vercel.json is missing a server rewrite for ${p.path}`);
});

test('server page defaults mirror the client built-in content (run npm run cms:sync --prefix server after editing it)', () => {
  const mirror = JSON.parse(fs.readFileSync(new URL('../src/cms/pageDefaults.json', import.meta.url), 'utf8'));
  assert.deepEqual(mirror, JSON.parse(JSON.stringify({ pages: PAGE_DEFAULTS, layouts: PAGE_LAYOUTS })));
});

test('every default of a content section exists and the layouts list every block', () => {
  for (const page of PAGES) {
    for (const s of page.sections.filter((x) => x.kind !== 'seo' && x.kind !== 'layout' && page.slug !== 'global')) {
      assert.ok(defaultContent(page.slug, s.key) && Object.keys(defaultContent(page.slug, s.key)).length, `no built-in content for ${page.slug}/${s.key}`);
    }
    if (page.blocks.length) assert.deepEqual(defaultContent(page.slug, 'layout').items.map((i) => i.key), page.blocks.map((b) => b.key));
  }
});

test('layout validation: hero stays first and visible; unknown or missing blocks are refused', () => {
  const def = section('home', 'layout');
  const base = defaultContent('home', 'layout');
  const swap = { items: [base.items[1], base.items[0], ...base.items.slice(2)] };
  assert.throws(() => validateContent(def.fields, swap, def), (e) => Boolean(e.errors.items));
  assert.throws(() => validateContent(def.fields, { items: base.items.map((i) => (i.key === 'hero' ? { ...i, visible: false } : i)) }, def), (e) => Boolean(e.errors.items));
  assert.throws(() => validateContent(def.fields, { items: base.items.slice(1) }, def), (e) => Boolean(e.errors.items));
  const moved = { items: [base.items[0], base.items[2], base.items[1], ...base.items.slice(3).map((i) => ({ ...i, visible: i.key !== 'faq' }))] };
  assert.doesNotThrow(() => validateContent(def.fields, moved, def));
});

test('accent markers and long text are accepted as plain text; HTML-looking text is stored inert', () => {
  const def = section('home', 'faq');
  const out = validateContent(def.fields, { heading: 'Common **Questions** <b>x</b>', intro: 'a' }, def);
  assert.equal(out.heading, 'Common **Questions** <b>x</b>'); // stored as text; React escapes it on render
});

test('leadership team: seed order is Naeem Abbas, Umer Rafique, Huma Naeem and every team / About photo file exists', () => {
  const team = JSON.parse(fs.readFileSync(new URL('../supabase/seed/data/team_members.json', import.meta.url), 'utf8'));
  assert.deepEqual([...team].sort((a, b) => a.sort_order - b.sort_order).map((m) => m.name), ['Naeem Abbas', 'Umer Rafique', 'Huma Naeem']);
  assert.equal(new Set(team.map((m) => m.sort_order)).size, 3);
  assert.equal(team.find((m) => m.name === 'Umer Rafique').photo_url, '/assets/pics/team/umerrafiqueupdated.jpeg');
  const aboutImage = PAGE_DEFAULTS['about-us'].leaders.people.find((p) => p.name === 'Umer Rafique').image;
  assert.equal(aboutImage, '/assets/pics/team/umerrafiqueupdated.jpeg');
  for (const url of [...team.map((m) => m.photo_url), aboutImage]) {
    assert.ok(fs.existsSync(new URL(`../../client/public${url}`, import.meta.url)), `${url} is missing from client/public`);
  }
});
