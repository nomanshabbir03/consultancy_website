import { Router } from 'express';
import env from '../config/env.js';
import { getSupabase, isSupabaseConfigured } from '../config/supabase.js';
import { PAGES } from '../cms/registry.js';
import { PAGE_META } from '../cms/pageMeta.js';
import { seoFor, siteContent } from '../services/cmsService.js';

const router = Router();

const SITE_NAME = 'Cornerstone Medical Solutions';
const SCHEMA = 'https://schema.org';
const DEFAULT_OG_IMAGE = '/assets/pics/company_logo.png';

// Every public page that has a CMS entry (single source of truth: cms/registry.js).
const STATIC_PATHS = PAGES.filter((p) => p.path).map((p) => p.path);

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
  let hidden = new Set();
  try {
    const site = await siteContent();
    hidden = new Set(Object.entries(site.seo).filter(([, seo]) => seo.robots === 'noindex').map(([path]) => path));
  } catch (err) {
    console.error('[sitemap seo]', err.message);
  }
  const urls = [...STATIC_PATHS.filter((path) => !hidden.has(path)).map((path) => ({ path })), ...dynamic]
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
    .send(`User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /admin\n\nSitemap: ${siteOrigin(req)}/sitemap.xml\n`);
};

/** Loads the built SPA shell so article/job pages can be served with their own head tags for crawlers. */
let lastShell = null; // last good index.html: served if the shell cannot be fetched (so the crawler-facing pages stay up)

async function loadShell(origin) {
  try {
    lastShell = await fetchShell(origin);
    return lastShell;
  } catch (err) {
    if (lastShell) return lastShell;
    throw err;
  }
}

async function fetchShell(origin) {
  // CLIENT_URL is injected by the Vercel service binding (internal URL of the `client` service); the public origin is the fallback.
  const sources = [process.env.CLIENT_URL && new URL('index.html', process.env.CLIENT_URL.replace(/\/?$/, '/')).href, `${origin}/index.html`].filter(Boolean);
  let lastError;
  for (const url of sources) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(4000) });
      if (response.ok) return response.text();
      lastError = new Error(`index.html ${response.status}`);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

function injectHead(html, { title, description, canonical, image, type, jsonLd, ogTitle, ogDescription, robots, site }) {
  const shareTitle = ogTitle || title;
  const shareDescription = ogDescription || description;
  const tags = [
    `<link rel="canonical" href="${esc(canonical)}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${esc(shareTitle)}" />`,
    `<meta property="og:description" content="${esc(shareDescription)}" />`,
    `<meta property="og:url" content="${esc(canonical)}" />`,
    image ? `<meta property="og:image" content="${esc(image)}" />` : '',
    `<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`,
    `<meta name="twitter:title" content="${esc(shareTitle)}" />`,
    `<meta name="twitter:description" content="${esc(shareDescription)}" />`,
    image ? `<meta name="twitter:image" content="${esc(image)}" />` : '',
    jsonLd ? `<script type="application/ld+json" data-seo="server">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>` : '',
    // Published CMS content for the first paint (non-executable data block, so it is allowed by the CSP): avoids a flash of default navbar/footer.
    site ? `<script type="application/json" id="cms-site">${JSON.stringify(site).replace(/</g, '\\u003c')}</script>` : '',
  ]
    .filter(Boolean)
    .join('\n    ');
  let out = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${esc(description)}" />`);
  if (robots === 'noindex') out = out.replace(/<meta\s+name="robots"[\s\S]*?\/>/, '<meta name="robots" content="noindex, follow" />');
  return out.replace('</head>', `    ${tags}\n  </head>`);
}

async function servePage(req, res, build, { requireShell = false } = {}) {
  const origin = siteOrigin(req);
  let html;
  try {
    html = await loadShell(origin);
  } catch (err) {
    console.error('[seo shell]', err.message);
    // Blog / job pages can fall back to the client-side route. Static pages cannot (their own path is the route), so report it.
    if (requireShell) return res.status(503).set('Retry-After', '30').type('text/plain').send('Temporarily unavailable. Please try again shortly.');
    return res.redirect(302, '/'); // cannot build the shell: let the SPA handle the route client-side
  }
  try {
    const meta = isSupabaseConfigured() ? await build(origin) : null;
    if (meta) {
      const site = await siteContent().catch(() => null);
      // Embed only this page's own sections (global content + SEO are small and needed everywhere).
      const own = meta.pageSlug && site?.pages?.[meta.pageSlug] ? { [meta.pageSlug]: site.pages[meta.pageSlug] } : {};
      const ownSeo = meta.pagePath && site?.seo?.[meta.pagePath] ? { [meta.pagePath]: site.seo[meta.pagePath] } : {};
      html = injectHead(html, { ...meta, site: site && { ...site, pages: own, seo: ownSeo } });
    }
  } catch (err) {
    console.error('[seo page]', err.message); // fall back to the plain SPA shell
  }
  res.type('html').set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300').send(html);
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

/**
 * Public pages with CMS-managed SEO: published CMS values, falling back to the built-in pageMeta.js values.
 * If the database or the CMS tables are unavailable the fallbacks are used, so these pages never depend on the CMS being healthy.
 */
const staticPage = (path) => (req, res) =>
  servePage(
    req,
    res,
    async (origin) => {
      let seo;
      try {
        seo = await seoFor(path);
      } catch (err) {
        console.error('[seo cms]', err.message);
        seo = { ...(PAGE_META[path] ?? PAGE_META['/']), canonical: '', ogTitle: '', ogDescription: '', ogImage: '', robots: 'index' };
      }
      return {
        title: seo.title,
        description: seo.description,
        canonical: seo.canonical || origin + (path === '/' ? '/' : path),
        image: absolute(origin, seo.ogImage || DEFAULT_OG_IMAGE),
        type: 'website',
        ogTitle: seo.ogTitle,
        ogDescription: seo.ogDescription,
        robots: seo.robots,
        pageSlug: PAGES.find((p) => p.path === path)?.slug,
        pagePath: path,
      };
    },
    { requireShell: true }
  );

for (const path of STATIC_PATHS) router.get(path, staticPage(path));
// Alias used for testing / non-Vercel hosting: /api/seo/page?path=/about-us
router.get('/api/seo/page', (req, res, next) => (STATIC_PATHS.includes(req.query.path) ? staticPage(req.query.path)(req, res) : next()));

// Reachable by their public paths (Vercel rewrites keep the original URL) and by the /api/seo/* aliases.
router.get(['/sitemap.xml', '/api/seo/sitemap'], sitemap);
router.get(['/robots.txt', '/api/seo/robots'], robots);
router.get(['/blog/:slug', '/api/seo/blog/:slug'], blogPage);
router.get(['/career/:slug', '/api/seo/career/:slug'], careerPage);

export default router;
