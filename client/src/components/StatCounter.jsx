import { useEffect, useRef, useState } from 'react';

const DURATION_MS = 2000;

/** Counts from 0 up to `target` (eased) once the number scrolls into view, then shows target + suffix. */
export default function StatCounter({ target, suffix = '+', className = '' }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    let timer;
    let started = false;

    const run = () => {
      const begin = Date.now();
      timer = setInterval(() => {
        const progress = Math.min((Date.now() - begin) / DURATION_MS, 1);
        const eased = 1 - (1 - progress) ** 3;
        setValue(Math.round(target * eased));
        if (progress >= 1) clearInterval(timer);
      }, 30);
    };

    if (typeof IntersectionObserver === 'undefined') {
      run();
      return () => clearInterval(timer);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, [target]);

  return (
    <p ref={ref} className={`counter ${className}`}>
      {value}
      {suffix}
    </p>
  );
}
