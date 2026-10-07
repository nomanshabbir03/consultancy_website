import { Router } from 'express';
import env from '../config/env.js';
import { getSupabase, isSupabaseConfigured } from '../config/supabase.js';

const router = Router();

const SITE_NAME = 'Cornerstone Medical Solutions';
const SCHEMA = 'https://schema.org';

const STATIC_PATHS = [
  '/', '/about-us', '/bpo', '/inbound-call', '/outbound-call', '/email-and-chat', '/sms-support', '/health-care',
  '/medical-billing', '/medical-transcription', '/management-services', '/digital-marketing', '/web-development',
  '/graphic-designing', '/ui-ux-designing', '/search-engine-optimization', '/social-media-marketing',
  '/content-writing', '/blog', '/career', '/contact-us',
];

const esc = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const stripHtml = (html) => String(html ?? '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const absolute = (origin, url) => (!url ? '' : /^https?:\/\//.test(url) ? url : origin + (url.startsWith('/') ? url : `/${url}`));

/** Public origin: SITE_URL when configured, otherwise the host the request arrived on. */
function siteOrigin(req) {
  if (env.siteUrl) return env.siteUrl;
  return `${req.protocol}://${req.get('host')}`;
}

async function dynamicPaths() {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabase();
  const [blogs, jobs] = await Promise.all([
    supabase.from('blogs').select('slug, updated_at').eq('is_published', true),
    supabase.from('careers').select('slug, updated_at').eq('is_active', true),
  ]);
  return [
    ...(blogs.data ?? []).map((r) => ({ path: `/blog/${r.slug}`, lastmod: r.updated_at })),
    ...(jobs.data ?? []).map((r) => ({ path: `/career/${r.slug}`, lastmod: r.updated_at })),
  ];
}

const sitemap = async (req, res) => {
  const origin = siteOrigin(req);
  let dynamic = [];
  try {
    dynamic = await dynamicPaths();
  } catch (err) {
    console.error('[sitemap]', err.message);
  }
  const urls = [...STATIC_PATHS.map((path) => ({ path })), ...dynamic]
    .map(({ path, lastmod }) => {
      const mod = lastmod ? `<lastmod>${esc(new Date(lastmod).toISOString().slice(0, 10))}</lastmod>` : '';
      return `  <url><loc>${esc(origin + path)}</loc>${mod}</url>`;
    })
    .join('\n');
  res
    .type('application/xml')
    .set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    .send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
};

const robots = (req, res) => {
  res
    .type('text/plain')
    .set('Cache-Control', 'public, s-maxage=86400')
    .send(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${siteOrigin(req)}/sitemap.xml\n`);
};

/** Loads the built SPA shell so article/job pages can be served with their own head tags for crawlers. */
async function loadShell(origin) {
  const response = await fetch(`${origin}/index.html`, { signal: AbortSignal.timeout(4000) });
  if (!response.ok) throw new Error(`index.html ${response.status}`);
  return response.text();
}

function injectHead(html, { title, description, canonical, image, type, jsonLd }) {
  const tags = [
    `<link rel="canonical" href="${esc(canonical)}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${esc(canonical)}" />`,
    image ? `<meta property="og:image" content="${esc(image)}" />` : '',
    `<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    image ? `<meta name="twitter:image" content="${esc(image)}" />` : '',
    `<script type="application/ld+json" data-seo="server">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
  ]
    .filter(Boolean)
    .join('\n    ');
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${esc(description)}" />`)
    .replace('</head>', `    ${tags}\n  </head>`);
}

async function servePage(req, res, build) {
  const origin = siteOrigin(req);
  let html;
  try {
    html = await loadShell(origin);
  } catch (err) {
    console.error('[seo shell]', err.message);
    return res.redirect(302, '/'); // cannot build the shell: let the SPA handle the route client-side
  }
  try {
    const meta = isSupabaseConfigured() ? await build(origin) : null;
    if (meta) html = injectHead(html, meta);
  } catch (err) {
    console.error('[seo page]', err.message); // fall back to the plain SPA shell
  }
  res.type('html').set('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=86400').send(html);
}

const blogPage = (req, res) =>
  servePage(req, res, async (origin) => {
    const { data: row } = await getSupabase()
      .from('blogs')
      .select('slug, title, meta_description, excerpt_html, featured_image, published_at, updated_at, authors ( name )')
      .eq('slug', req.params.slug)
      .eq('is_published', true)
      .maybeSingle();
    if (!row) return null;
    const canonical = `${origin}/blog/${row.slug}`;
    const description = row.meta_description || stripHtml(row.excerpt_html).slice(0, 160);
    const image = absolute(origin, row.featured_image);
    return {
      title: row.title,
      description,
      canonical,
      image,
      type: 'article',
      jsonLd: {
        '@context': SCHEMA,
        '@type': 'BlogPosting',
        headline: row.title,
        description,
        ...(image && { image }),
        datePublished: row.published_at,
        dateModified: row.updated_at,
        ...(row.authors?.name && { author: { '@type': 'Person', name: row.authors.name } }),
        publisher: { '@type': 'Organization', name: SITE_NAME },
        mainEntityOfPage: canonical,
      },
    };
  });

const careerPage = (req, res) =>
  servePage(req, res, async (origin) => {
    const { data: row } = await getSupabase()
      .from('careers')
      .select('slug, title, location, description, last_date, created_at')
      .eq('slug', req.params.slug)
      .eq('is_active', true)
      .maybeSingle();
    if (!row) return null;
    const canonical = `${origin}/career/${row.slug}`;
    const description = `${row.title} at ${SITE_NAME} - ${row.location}. ${stripHtml(row.description)}`.slice(0, 160);
    return {
      title: `${row.title} - ${SITE_NAME}`,
      description,
      canonical,
      type: 'website',
      jsonLd: {
        '@context': SCHEMA,
        '@type': 'JobPosting',
        title: row.title,
        description: row.description,
        datePosted: String(row.created_at).slice(0, 10),
        validThrough: row.last_date,
        hiringOrganization: { '@type': 'Organization', name: SITE_NAME, sameAs: origin },
        jobLocation: {
          '@type': 'Place',
          address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressRegion: 'Punjab', addressCountry: 'PK' },
        },
      },
    };
  });

// Reachable by their public paths (Vercel rewrites keep the original URL) and by the /api/seo/* aliases.
router.get(['/sitemap.xml', '/api/seo/sitemap'], sitemap);
router.get(['/robots.txt', '/api/seo/robots'], robots);
router.get(['/blog/:slug', '/api/seo/blog/:slug'], blogPage);
router.get(['/career/:slug', '/api/seo/career/:slug'], careerPage);

export default router;
