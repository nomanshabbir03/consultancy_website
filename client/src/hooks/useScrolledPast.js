import { useEffect, useState } from 'react';

/** True once the window has scrolled past a fixed or dynamically measured offset. */
export default function useScrolledPast(offset) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const threshold = typeof offset === 'function' ? offset() : offset;
      setScrolled(window.scrollY >= threshold);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [offset]);

  return scrolled;
}
