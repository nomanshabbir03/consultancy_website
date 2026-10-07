import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';

/**
 * Initialises AOS once (same options as the reference site) and keeps it accurate:
 * - refreshes on route changes
 * - re-scans and re-measures whenever the page height changes (API data and images arrive after first paint, so
 *   new elements would never be initialised and cached positions of tall ones, like the blog article, would be stale).
 */
export default function useAos() {
  const { pathname } = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000 });

    let timer;
    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => AOS.refreshHard(), 150);
    });
    observer.observe(document.body);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    AOS.refreshHard();
  }, [pathname]);
}
