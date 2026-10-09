import { DEFAULTS } from './defaults.js';
import { PAGE_META } from './pageMeta.js';
import PAGE_DEFAULTS from './pageDefaults.json' with { type: 'json' };
import { PAGE_SECTIONS } from './pageSections.js';
import SERVICE from './servicePages.json' with { type: 'json' };
import { withDefaults } from './validate.js';

/**
 * The CMS content model. Every editable page is listed here with its sections and typed fields.
 * The admin forms are generated from this registry (it is served by GET /api/admin/cms/schema) and the API validates
 * every save against it, so the two can never disagree. Only content is described - nothing about colours, fonts,
 * spacing or layout. A future page = one entry below (plus the page component reading its sections).
 */

const text = (key, label, extra = {}) => ({ key, type: 'text', label, ...extra });
const textarea = (key, label, extra = {}) => ({ key, type: 'textarea', label, ...extra });
const url = (key, label, extra = {}) => ({ key, type: 'url', label, ...extra });
const image = (key, label, extra = {}) => ({ key, type: 'image', label, ...extra });
const list = (key, label, fields, extra = {}) => ({ key, type: 'list', label, fields, ...extra });

const LINK_FIELDS = [text('label', 'Label', { required: true, max: 60 }), url('to', 'Link', { required: true, help: 'e.g. /about-us or https://…' })];

const PLATFORMS = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'tiktok', label: 'TikTok' },
];

const navbarCheck = (c) => {
  const errors = {};
  const menus = c.items.filter((i) => i.type === 'menu').length;
  if (menus > 1) errors.items = 'Only one item can open the "Our Business" mega menu.';
  c.items.forEach((item, i) => {
    if (item.type === 'link' && !item.to) errors[`items.${i}.to`] = 'Link is required.';
  });
  return errors;
};

const GLOBAL_SECTIONS = [
  {
    key: 'navbar',
    title: 'Navbar',
    description: 'Logo, main navigation, the "Our Business" mega menu and the header button.',
    check: navbarCheck,
    fields: [
      image('logo', 'Logo', { required: true }),
      image('logoWhite', 'Logo on the home-page hero (white version)', { required: true }),
      text('logoAlt', 'Logo alt text', { required: true, max: 120 }),
      list(
        'items',
        'Main navigation',
        [
          text('label', 'Label', { required: true, max: 40 }),
          {
            key: 'type',
            type: 'select',
            label: 'Type',
            options: [
              { value: 'link', label: 'Link' },
              { value: 'menu', label: '"Our Business" mega menu' },
            ],
          },
          url('to', 'Link', { help: 'Not used for the mega menu item.' }),
        ],
        { maxItems: 8, required: true, itemLabel: 'label', itemNoun: 'menu item', help: 'Order here is the order in the header. Remove or add items as needed.' }
      ),
      textarea('menuTagline', 'Mega menu tagline', { max: 120, help: 'Each line break becomes a new line.' }),
      list(
        'menuGroups',
        'Mega menu groups',
        [...LINK_FIELDS, list('children', 'Links in this group', LINK_FIELDS, { maxItems: 10, itemLabel: 'label', itemNoun: 'link' })],
        { maxItems: 4, itemLabel: 'label', itemNoun: 'group' }
      ),
      list('menuAside', 'Mega menu side links', LINK_FIELDS, { maxItems: 6, itemLabel: 'label', itemNoun: 'link' }),
      text('ctaLabel', 'Header button text', { required: true, max: 40 }),
      url('ctaUrl', 'Header button link', { required: true }),
    ],
  },
  {
    key: 'footer',
    title: 'Footer',
    description: 'Footer link columns, the certification badge and the copyright line.',
    fields: [
      list(
        'columns',
        'Link columns',
        [text('title', 'Column title', { required: true, max: 40 }), list('links', 'Links', LINK_FIELDS, { maxItems: 10, itemLabel: 'label', itemNoun: 'link' })],
        { maxItems: 3, itemLabel: 'title', itemNoun: 'column', help: 'The footer grid fits up to three link columns next to the contact column.' }
      ),
      text('contactTitle', 'Contact column title', { required: true, max: 40 }),
      image('isoImage', 'Certification badge image'),
      text('isoAlt', 'Certification badge alt text', { max: 120 }),
      text('copyrightPrefix', 'Copyright text', { required: true, max: 120 }),
      text('copyrightBrand', 'Company name (shown in bold after the copyright text)', { max: 80 }),
    ],
  },
  {
    key: 'company',
    title: 'Contact information',
    description: 'Phone, email and address. Shown in the footer wherever contact details appear.',
    fields: [
      text('phone', 'Phone', { required: true, max: 40 }),
      text('email', 'Email', { required: true, max: 120 }),
      text('address', 'Address', { required: true, max: 200 }),
      url('mapUrl', 'Map link', { help: 'Opened when visitors click the address.' }),
    ],
  },
  {
    key: 'social',
    title: 'Social links',
    description: 'Shown in the footer, the blog and job sidebars, the Contact page and the job share button.',
    fields: [
      list(
        'items',
        'Social profiles',
        [
          { key: 'platform', type: 'select', label: 'Network', options: PLATFORMS },
          url('url', 'Profile link', { required: true, help: 'https://…' }),
        ],
        { maxItems: 4, itemLabel: 'platform', itemNoun: 'profile', help: 'Up to four networks (the share button on job pages has four slots).' }
      ),
    ],
  },
  {
    key: 'cta',
    title: 'Call-to-action band',
    description: 'The dark "Ready to start your project" band used on several pages. Changing it updates every page that uses it.',
    toggle: true,
    fields: [
      text('title', 'Title', { required: true, max: 120 }),
      text('buttonLabel', 'Button text', { required: true, max: 40 }),
      url('buttonUrl', 'Button link', { required: true }),
    ],
  },
];

const SEO_FIELDS = [
  text('seoTitle', 'SEO title', { max: 120, help: 'Shown in search results and the browser tab. Aim for under 60 characters.' }),
  textarea('metaDescription', 'Meta description', { max: 320, help: 'Aim for 120-160 characters.' }),
  url('canonicalUrl', 'Canonical URL', { help: 'Leave empty to use the page address. Only set this when the content lives at another address.' }),
  text('ogTitle', 'Open Graph title', { max: 120, help: 'Used when the page is shared. Defaults to the SEO title.' }),
  textarea('ogDescription', 'Open Graph description', { max: 320 }),
  image('ogImage', 'Open Graph image', { help: 'Recommended 1200 × 630.' }),
  { key: 'robots', type: 'select', label: 'Search engine indexing', options: [{ value: 'index', label: 'Allow indexing (default)' }, { value: 'noindex', label: 'Hide from search engines (noindex)' }] },
];

const seoSection = (path) => ({
  key: 'seo',
  title: 'SEO',
  description: 'Search-engine and social-sharing information. Empty fields fall back to the built-in values.',
  kind: 'seo',
  previewPath: path,
  fields: SEO_FIELDS,
});

const SEO_PAGES = [
  ['home', '/', 'Home'],
  ['about-us', '/about-us', 'About'],
  ['bpo', '/bpo', 'BPO'],
  ['inbound-call', '/inbound-call', 'Inbound Calls'],
  ['outbound-call', '/outbound-call', 'Outbound Calls'],
  ['email-and-chat', '/email-and-chat', 'Email and Chat Support'],
  ['sms-support', '/sms-support', 'SMS Support'],
  ['health-care', '/health-care', 'Health Care'],
  ['medical-billing', '/medical-billing', 'Medical Billing'],
  ['medical-transcription', '/medical-transcription', 'Medical Transcription'],
  ['management-services', '/management-services', 'Management Services'],
  ['digital-marketing', '/digital-marketing', 'Digital Marketing'],
  ['web-development', '/web-development', 'Web Development'],
  ['graphic-designing', '/graphic-designing', 'Graphic Designing'],
  ['ui-ux-designing', '/ui-ux-designing', 'UI/UX Designing'],
  ['search-engine-optimization', '/search-engine-optimization', 'Search Engine Optimization'],
  ['social-media-marketing', '/social-media-marketing', 'Social Media Marketing'],
  ['content-writing', '/content-writing', 'Content Writing'],
  ['blog', '/blog', 'Blog (listing page)'],
  ['career', '/career', 'Careers (listing page)'],
  ['contact-us', '/contact-us', 'Contact'],
];

const GROUPS = {
  site: ['home', 'about-us', 'contact-us', 'blog', 'career'],
  bpo: ['bpo', 'inbound-call', 'outbound-call', 'email-and-chat', 'sms-support'],
  healthcare: ['health-care', 'medical-billing', 'medical-transcription', 'management-services'],
  'digital-marketing': ['digital-marketing', 'web-development', 'graphic-designing', 'ui-ux-designing', 'search-engine-optimization', 'social-media-marketing', 'content-writing'],
};
const groupOf = (slug) => Object.keys(GROUPS).find((g) => GROUPS[g].includes(slug)) ?? 'site';

/** Re-order / show-hide editor for the blocks of a page (Home, About). The first (locked) block always stays first and visible. */
const layoutSection = (page, blocks) => ({
  key: 'layout',
  title: 'Section order & visibility',
  description: 'Move sections up or down and show or hide them. The hero stays at the top.',
  kind: 'layout',
  fields: [list('items', 'Sections', [text('key', 'Section', { required: true, max: 40 }), { key: 'visible', type: 'boolean', label: 'Visible' }], { required: true, maxItems: 30 })],
  check: (c) => {
    const keys = c.items.map((i) => i.key);
    const expected = blocks.map((b) => b.key);
    const errors = {};
    if (keys.length !== expected.length || new Set(keys).size !== keys.length || !expected.every((k) => keys.includes(k))) errors.items = 'The section list is out of date. Reload the page and try again.';
    else {
      blocks.forEach((b) => {
        if (b.locked && (keys.indexOf(b.key) !== 0 || !c.items.find((i) => i.key === b.key).visible)) errors.items = `"${b.title}" must stay first and visible.`;
      });
    }
    return errors;
  },
});

/** Service pages (Phase 3): sections / blocks generated from the original pages (see scripts/gen-service-pages.mjs). */
const serviceExtra = (slug) => (SERVICE.pages[slug] ? { blocks: SERVICE.pages[slug].blocks, sections: SERVICE.pages[slug].sections } : null);

const pageContent = (slug, path) => {
  const extra = PAGE_SECTIONS[slug] ?? serviceExtra(slug);
  if (!extra) return { sections: [seoSection(path)], blocks: [] };
  const content = extra.sections.map((s) => ({ ...s, previewPath: path }));
  return {
    blocks: extra.blocks,
    sections: [...(extra.blocks.length ? [{ ...layoutSection(slug, extra.blocks), previewPath: path }] : []), ...content, seoSection(path)],
  };
};

export const PAGES = [
  { slug: 'global', title: 'Global Content', group: 'global', description: 'Navbar, footer, contact details, social links and the shared call-to-action band.', sections: GLOBAL_SECTIONS, blocks: [] },
  ...SEO_PAGES.map(([slug, path, title]) => ({ slug, path, title, group: groupOf(slug), ...pageContent(slug, path) })),
];

export const getPage = (slug) => PAGES.find((p) => p.slug === slug);
export const getSectionDef = (page, key) => getPage(page)?.sections.find((s) => s.key === key);

/** The built-in content of a section (what the live site shows until something is published). */
export function defaultContent(page, key) {
  const def = getSectionDef(page, key);
  if (!def) return null;
  if (def.kind === 'seo') {
    // Empty SEO fields mean "use the built-in pageMeta.js value" (see seoFor in cmsService).
    return withDefaults(def.fields, { robots: 'index' }, def);
  }
  if (def.kind === 'layout') return withDefaults(def.fields, { items: (PAGE_DEFAULTS.layouts[page] ?? SERVICE.pages[page]?.layout ?? []).map((k) => ({ key: k, visible: true })) }, def);
  return withDefaults(def.fields, DEFAULTS[page]?.[key] ?? PAGE_DEFAULTS.pages[page]?.[key] ?? SERVICE.pages[page]?.defaults[key] ?? {}, def);
}

/** Serialisable description of the content model for the admin UI. */
export const publicSchema = () =>
  PAGES.map((p) => ({
    slug: p.slug,
    title: p.title,
    group: p.group,
    path: p.path ?? null,
    description: p.description ?? '',
    seoFallback: p.path ? PAGE_META[p.path] ?? null : null,
    blocks: p.blocks ?? [],
    sections: p.sections.map((s) => ({
      key: s.key,
      title: s.title,
      description: s.description,
      kind: s.kind ?? 'content',
      toggle: Boolean(s.toggle),
      previewPath: s.previewPath ?? p.path ?? '/',
      fields: s.fields,
    })),
  }));
