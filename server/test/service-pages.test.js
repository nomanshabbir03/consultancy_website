// Phase 3: the 16 service pages (no database needed).
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { test } from 'node:test';
import { PAGES, defaultContent, getSectionDef } from '../src/cms/registry.js';
import SERVICE from '../src/cms/servicePages.json' with { type: 'json' };
import { validateContent } from '../src/cms/validate.js';
import GOLDEN from './fixtures/service-original-texts.json' with { type: 'json' };

const EXPECTED = {
  bpo: ['bpo', 'inbound-call', 'outbound-call', 'email-and-chat', 'sms-support'],
  healthcare: ['health-care', 'medical-billing', 'medical-transcription', 'management-services'],
  'digital-marketing': ['digital-marketing', 'web-development', 'graphic-designing', 'ui-ux-designing', 'search-engine-optimization', 'social-media-marketing', 'content-writing'],
};
const SLUGS = Object.values(EXPECTED).flat();
const isContent = (s) => !s.kind || s.kind === 'content';
const servicePages = () => PAGES.filter((p) => SLUGS.includes(p.slug));

test('there are exactly 16 service pages (BPO 5 + Healthcare 4 + Digital Marketing 7) and they match the real routes', () => {
  assert.equal(SLUGS.length, 16);
  assert.equal(servicePages().length, 16);
  for (const [group, slugs] of Object.entries(EXPECTED)) assert.deepEqual(PAGES.filter((p) => p.group === group).map((p) => p.slug), slugs);
  // routes in the client router: every service path is a registered route, and no service route is missing from the CMS
  const routes = fs.readFileSync(new URL('../../client/src/routes/routeConfig.js', import.meta.url), 'utf8');
  const routed = [...routes.matchAll(/path: '([^']+)'/g)].map((m) => m[1]);
  const pageComponents = [...routes.matchAll(/path: '([^']+)', component: lazy\(\(\) => import\('\.\.\/pages\/(\w+)'\)\)/g)];
  for (const slug of SLUGS) assert.ok(routed.includes(`/${slug}`), `route /${slug} is missing from routeConfig.js`);
  const nonService = ['/', '/about-us', '/blog', '/blog/:slug', '/career', '/career/:slug', '/contact-us'];
  const unexpected = routed.filter((p) => !nonService.includes(p) && !SLUGS.includes(p.slice(1)));
  assert.deepEqual(unexpected, [], 'a public route exists that is neither a service page nor a known page');
  assert.equal(pageComponents.length, routed.length);
});

test('every service page has SEO, a layout with a locked hero first, and a schema for each editable section', () => {
  for (const page of servicePages()) {
    const keys = page.sections.map((s) => s.key);
    assert.equal(keys[0], 'layout', page.slug);
    assert.ok(keys.includes('seo'), `${page.slug} has no SEO section`);
    assert.equal(page.blocks[0].key, 'hero', page.slug);
    assert.ok(page.blocks[0].locked, `${page.slug}: hero must be locked`);
    const layout = defaultContent(page.slug, 'layout').items;
    assert.deepEqual(layout.map((i) => i.key), page.blocks.map((b) => b.key));
    assert.ok(layout.every((i) => i.visible));
    assert.ok(page.sections.filter(isContent).length >= 3, `${page.slug} has too few editable sections`);
    for (const s of page.sections.filter(isContent)) {
      assert.ok(s.fields.length > 0, `${page.slug}/${s.key} has no fields`);
      assert.ok(page.blocks.some((b) => b.key === s.key), `${page.slug}/${s.key} is not a layout block`);
    }
  }
});

test('built-in defaults of every section validate against their schema and survive normalisation unchanged', () => {
  let sections = 0;
  for (const page of servicePages()) {
    for (const s of page.sections.filter(isContent)) {
      sections++;
      const raw = SERVICE.pages[page.slug].defaults[s.key];
      const cleaned = validateContent(s.fields, raw, s);
      const strip = (v) => JSON.parse(JSON.stringify(v));
      assert.deepEqual(strip(cleaned), strip(defaultContent(page.slug, s.key)), `${page.slug}/${s.key}`);
      // text must be preserved character for character (the validator only trims / collapses whitespace)
      const walk = (a, b, where) => {
        if (typeof a === 'string') assert.equal(b, a, `${where} changed by validation`);
        else if (Array.isArray(a)) a.forEach((x, i) => walk(x, b[i], `${where}[${i}]`));
        else if (a && typeof a === 'object') for (const k of Object.keys(a)) if (k in b) walk(a[k], b[k], `${where}.${k}`);
      };
      walk(raw, cleaned, `${page.slug}/${s.key}`);
    }
  }
  assert.ok(sections >= 70, `only ${sections} sections`);
});

test('original copy is preserved: every text, image and link of the original pages exists in the built-in content', () => {
  for (const slug of SLUGS) {
    const defaults = SERVICE.pages[slug].defaults;
    const blob = JSON.stringify(defaults).replace(/\*\*/g, '');
    const text = (v) => JSON.stringify(v).slice(1, -1);
    const missingTexts = GOLDEN[slug].texts.filter((t) => !blob.includes(text(t)));
    assert.deepEqual(missingTexts, [], `${slug}: original text missing from the built-in content`);
    // an accent word / run may be split across text nodes, so joined runs are also acceptable for images and links
    for (const img of GOLDEN[slug].images) assert.ok(blob.includes(img), `${slug}: image ${img} missing`);
    for (const link of GOLDEN[slug].links) assert.ok(blob.includes(link), `${slug}: link ${link} missing`);
  }
});

test('client built-in content mirrors the server schema defaults (run npm run cms:gen after changing a page)', async () => {
  for (const slug of SLUGS) {
    const mod = await import(`../../client/src/content/service/${slug}.js`);
    assert.deepEqual(JSON.parse(JSON.stringify(mod.DEFAULTS)), SERVICE.pages[slug].defaults, `${slug} defaults drifted`);
    assert.deepEqual(mod.LAYOUT, SERVICE.pages[slug].layout, `${slug} layout drifted`);
    assert.deepEqual(mod.LAYOUT, SERVICE.pages[slug].blocks.map((b) => b.key));
  }
});

test('accent markers are balanced and never left half-open in the built-in content', () => {
  for (const slug of SLUGS) {
    const walk = (v, where) => {
      if (typeof v === 'string') assert.ok((v.match(/\*\*/g) ?? []).length % 2 === 0, `${where}: unbalanced ** in "${v.slice(0, 60)}"`);
      else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${where}[${i}]`));
      else if (v && typeof v === 'object') Object.entries(v).forEach(([k, x]) => walk(x, `${where}.${k}`));
    };
    walk(SERVICE.pages[slug].defaults, slug);
  }
});

test('invalid content is rejected on every service page (bad URL, bad image URL, oversize text, malformed list)', () => {
  let checks = 0;
  for (const page of servicePages()) {
    for (const s of page.sections.filter(isContent)) {
      const base = defaultContent(page.slug, s.key);
      const find = (fields, v, type) => {
        for (const f of fields) {
          if (f.type === type) return [f.key, v];
          if (f.type === 'list' && Array.isArray(v[f.key]) && v[f.key][0]) {
            const r = find(f.fields, v[f.key][0], type);
            if (r) return r;
          }
        }
        return null;
      };
      const mutate = (type, bad) => {
        const copy = JSON.parse(JSON.stringify(base));
        const hit = find(s.fields, copy, type);
        if (!hit) return null;
        hit[1][hit[0]] = bad;
        return copy;
      };
      for (const [type, bad] of [['url', 'javascript:alert(1)'], ['image', 'data:image/svg+xml;base64,AAAA'], ['text', 'x'.repeat(5000)]]) {
        const bent = mutate(type, bad);
        if (bent) checks++, assert.throws(() => validateContent(s.fields, bent, s), (e) => e.status === 400, `${page.slug}/${s.key} accepted bad ${type}`);
      }
      const lists = s.fields.filter((f) => f.type === 'list');
      for (const l of lists) {
        const tooMany = { ...JSON.parse(JSON.stringify(base)), [l.key]: Array.from({ length: l.maxItems + 1 }, () => ({})) };
        assert.throws(() => validateContent(s.fields, tooMany, s), (e) => e.status === 400, `${page.slug}/${s.key}.${l.key} accepted too many items`);
        checks++;
      }
    }
  }
  assert.ok(checks > 150, `only ${checks} invalid-content checks ran`);
});

test('layout rules hold for every service page: hero stays first and visible, blocks cannot be dropped or invented', () => {
  for (const page of servicePages()) {
    const def = getSectionDef(page.slug, 'layout');
    const items = defaultContent(page.slug, 'layout').items;
    assert.doesNotThrow(() => validateContent(def.fields, { items }, def));
    assert.throws(() => validateContent(def.fields, { items: items.map((i) => (i.key === 'hero' ? { ...i, visible: false } : i)) }, def));
    assert.throws(() => validateContent(def.fields, { items: [items[1], items[0], ...items.slice(2)] }, def));
    assert.throws(() => validateContent(def.fields, { items: items.slice(1) }, def));
    assert.throws(() => validateContent(def.fields, { items: [...items, { key: 'invented', visible: true }] }, def));
    if (items.length > 2) {
      const moved = [items[0], items[2], items[1], ...items.slice(3)];
      assert.doesNotThrow(() => validateContent(def.fields, { items: moved.map((i) => ({ ...i, visible: i.key !== items[items.length - 1].key || i.key === 'hero' })) }, def));
    }
  }
});

test('portfolio pages keep their three tabs and every project (Web Development, Graphic Designing, UI/UX)', () => {
  for (const slug of ['web-development', 'graphic-designing', 'ui-ux-designing']) {
    const d = SERVICE.pages[slug].defaults.portfolio;
    assert.equal(d.tabs.length, 3, slug);
    assert.ok(d.tabs.every((t) => t.items.length > 0 && t.items.every((i) => i.image && i.label)));
    assert.equal(d.heading, 'Our **Portfolio**');
  }
});
