import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { API_URL, apiRequest } from '../services/api';
import { DEFAULT_SITE, SOCIAL_STYLES } from './defaults';
import { PAGE_DEFAULTS, PAGE_LAYOUTS } from './pageDefaults';

const SiteContentContext = createContext(null);
const PREVIEW_KEY = 'cms-preview';

/** Section-by-section merge, so a missing section or field in the API response falls back to the built-in value. */
function merge(data) {
  const out = { ...DEFAULT_SITE, seo: {}, pages: {} };
  for (const key of ['navbar', 'footer', 'company', 'social', 'cta']) out[key] = { ...DEFAULT_SITE[key], ...(data?.global?.[key] ?? {}) };
  out.seo = data?.seo ?? {};
  out.pages = data?.pages ?? {};
  return out;
}

/** Content the server embedded in the page (<script type="application/json" id="cms-site">) so the first paint is already correct. */
function readEmbedded() {
  try {
    const node = document.getElementById('cms-site');
    return node ? JSON.parse(node.textContent) : null;
  } catch {
    return null;
  }
}

const readPreviewFlag = () => {
  try {
    return window.sessionStorage.getItem(PREVIEW_KEY) === '1';
  } catch {
    return false;
  }
};
const setPreviewFlag = (on) => {
  try {
    if (on) window.sessionStorage.setItem(PREVIEW_KEY, '1');
    else window.sessionStorage.removeItem(PREVIEW_KEY);
  } catch {
    /* sessionStorage unavailable: preview simply is not sticky */
  }
};

/**
 * Provides the CMS-managed global content (navbar, footer, contact details, social links, CTA band) and page SEO.
 * Published content only - unless an admin opened the site with ?cms_preview=1, in which case drafts are shown with a banner.
 */
export function SiteContentProvider({ children }) {
  const { pathname, search } = useLocation();
  const [site, setSiteState] = useState(() => merge(readEmbedded()));
  // Keep the same object when nothing changed, so navigating does not re-render the whole page chrome.
  const setSite = (next) => setSiteState((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next));
  const [preview, setPreview] = useState(false);
  const isAdminRoute = pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdminRoute) return undefined;
    if (new URLSearchParams(search).get('cms_preview') === '1') setPreviewFlag(true);
    const controller = new AbortController();
    const load = async () => {
      if (readPreviewFlag()) {
        try {
          const response = await fetch(`${API_URL}/admin/cms/preview/site`, { credentials: 'same-origin', signal: controller.signal });
          if (response.ok) {
            setSite(merge((await response.json()).data));
            setPreview(true);
            return;
          }
          setPreviewFlag(false); // not signed in as an admin: forget the preview request
        } catch (err) {
          if (err.name === 'AbortError') return;
        }
      }
      setPreview(false);
      try {
        const payload = await apiRequest('/content/site', { signal: controller.signal });
        setSite(merge(payload.data));
      } catch {
        /* keep whatever we have (embedded or built-in content) */
      }
    };
    load();
    return () => controller.abort();
    // Re-checked on every navigation so a publish shows up without a full reload.
  }, [isAdminRoute, pathname, search]);

  const value = useMemo(() => {
    const socialLinks = site.social.items
      .filter((item) => SOCIAL_STYLES[item.platform])
      .map((item) => ({ ...SOCIAL_STYLES[item.platform], href: item.url }));
    const company = { ...site.company, phoneHref: `tel:${String(site.company.phone).replace(/[^\d+]/g, '')}` };
    return { ...site, company, socialLinks, preview };
  }, [site, preview]);

  const exitPreview = () => {
    setPreviewFlag(false);
    window.location.assign(window.location.pathname);
  };

  return (
    <SiteContentContext.Provider value={value}>
      {preview && !isAdminRoute && (
        <div
          role="status"
          style={{
            position: 'fixed',
            bottom: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2147483000,
            background: '#000e64',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: 999,
            fontSize: 14,
            boxShadow: '0 4px 20px rgba(0,0,0,.35)',
            display: 'flex',
            gap: 12,
            alignItems: 'center',
          }}
        >
          <span>Draft preview - changes below are not live yet.</span>
          <button type="button" onClick={exitPreview} style={{ background: '#fff', color: '#000e64', border: 0, borderRadius: 999, padding: '2px 12px', cursor: 'pointer' }}>
            Exit preview
          </button>
        </div>
      )}
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const value = useContext(SiteContentContext);
  if (!value) throw new Error('useSiteContent must be used inside <SiteContentProvider>');
  return value;
}

/**
 * Published content of one page section, or the built-in content when the CMS has nothing (API down, row missing, old payload).
 * The returned object always has every field the component reads, so a page can never render blank because of the CMS.
 */
export function useSection(page, key, fallback) {
  const { pages } = useSiteContent();
  // `fallback` carries the built-in content of pages whose defaults live in their own (lazy) module, e.g. the service pages.
  const builtIn = fallback ?? PAGE_DEFAULTS[page][key];
  const stored = pages?.[page]?.[key];
  return stored && typeof stored === 'object' ? { ...builtIn, ...stored } : builtIn;
}

/** Ordered `{ key, visible }` list of the blocks of a page (Home, About); the built-in order when nothing is published. */
export function useLayout(page, fallbackKeys) {
  const { pages } = useSiteContent();
  const items = pages?.[page]?.layout?.items;
  return Array.isArray(items) && items.length ? items : (fallbackKeys ?? PAGE_LAYOUTS[page]).map((key) => ({ key, visible: true }));
}
