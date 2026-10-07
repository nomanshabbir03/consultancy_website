import { useEffect, useState } from 'react';

/** Counts from 0 to `target` in ~1s (100 steps, 10ms apart) when mounted, then shows target + suffix. */
export default function StatCounter({ target, suffix = '+', className = '' }) {
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    let count = 0;
    const step = target / 100;
    const timer = setInterval(() => {
      count += step;
      if (count >= target) {
        clearInterval(timer);
        setDisplay(`${target}${suffix}`);
      } else {
        setDisplay(`${Math.ceil(count)}${suffix}`);
      }
    }, 10);
    return () => clearInterval(timer);
  }, [target, suffix]);

  return <p className={`counter ${className}`}>{display}</p>;
}
