import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useAos from '../hooks/useAos';
import { useSiteContent } from '../content/SiteContent';
import useDocumentMeta from '../hooks/useDocumentMeta';

const DEFAULT_OG_IMAGE = '/assets/pics/company_logo.png';

/** CMS SEO values win; empty fields fall back to the built-in page titles / descriptions (routes/pageMeta.js). */
function mergeSeo(meta, cms) {
  if (!meta) return {};
  return {
    ...meta,
    title: cms?.seoTitle || meta.title,
    description: cms?.metaDescription || meta.description,
    image: cms?.ogImage || DEFAULT_OG_IMAGE,
    canonical: cms?.canonicalUrl || undefined,
    ogTitle: cms?.ogTitle || undefined,
    ogDescription: cms?.ogDescription || undefined,
    robots: cms?.robots,
  };
}

/**
 * Shared page chrome: fixed header, page content, footer.
 * - `transparentHeader`: header floats transparent over the hero (home page only)
 * - `footerBackground`: colour band behind the footer link grid
 */
export default function MainLayout({ children, meta, transparentHeader = false, footerBackground = '#fff' }) {
  const { pathname } = useLocation();
  useAos();
  const { seo } = useSiteContent();
  useDocumentMeta(mergeSeo(meta, seo[pathname]));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header transparentOnTop={transparentHeader} />
      <main>{children}</main>
      <Footer background={footerBackground} />
    </>
  );
}
