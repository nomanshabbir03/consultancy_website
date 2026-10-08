import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useAos from '../hooks/useAos';
import useDocumentMeta from '../hooks/useDocumentMeta';

/**
 * Shared page chrome: fixed header, page content, footer.
 * - `transparentHeader`: header floats transparent over the hero (home page only)
 * - `footerBackground`: colour band behind the footer link grid
 */
export default function MainLayout({ children, meta, transparentHeader = false, footerBackground = '#fff' }) {
  const { pathname } = useLocation();
  useAos();
  useDocumentMeta(meta ? { image: '/assets/pics/company_logo.png', ...meta } : {});

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
