import { useEffect, useState } from 'react';
import AOS from 'aos';

/** Runs `loader(signal)` on mount / when deps change and tracks loading + error state. */
export default function useApiData(loader, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });
    loader(controller.signal)
      .then((data) => {
        setState({ data, loading: false, error: null });
        // New content (e.g. the blog article) must be picked up by the scroll animations.
        setTimeout(() => AOS.refreshHard(), 50);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ data: null, loading: false, error });
      });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
