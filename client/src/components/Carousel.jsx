import { Children, useCallback, useEffect, useRef, useState } from 'react';

/**
 * Small autoplaying carousel (replaces the reference site's Slick sliders).
 * Infinite loop is seamless: the first `slidesToShow` slides are cloned at the end of the track.
 */
export default function Carousel({
  children,
  slidesToShow = 1,
  autoplay = true,
  autoplaySpeed = 3000,
  speed = 300,
  arrows = false,
  className = '',
}) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const show = Math.min(slidesToShow, count) || 1;
  const track = [...slides, ...slides.slice(0, show)];

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const indexRef = useRef(0);
  indexRef.current = index;

  const next = useCallback(() => {
    setAnimate(true);
    setIndex((i) => i + 1);
  }, []);

  const prev = useCallback(() => {
    if (indexRef.current === 0) {
      setAnimate(false);
      setIndex(count);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          setIndex(count - 1);
        })
      );
    } else {
      setAnimate(true);
      setIndex((i) => i - 1);
    }
  }, [count]);

  useEffect(() => {
    if (!autoplay || paused || count <= show) return undefined;
    const timer = setInterval(next, autoplaySpeed);
    return () => clearInterval(timer);
  }, [autoplay, paused, autoplaySpeed, next, count, show]);

  const handleTransitionEnd = () => {
    if (index >= count) {
      setAnimate(false);
      setIndex(index - count);
    }
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex items-start"
          style={{
            transform: `translateX(-${(index * 100) / show}%)`,
            transition: animate ? `transform ${speed}ms ease` : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {track.map((slide, i) => (
            <div key={i} style={{ flex: `0 0 ${100 / show}%`, minWidth: 0 }} aria-hidden={i >= count}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      {arrows && count > show && (
        <>
          <button type="button" className="carousel-arrow-prev" onClick={prev} aria-label="Previous">
            <i className="fa-solid fa-circle-arrow-left text-lg text-[#00aeef]" />
          </button>
          <button type="button" className="carousel-arrow-next" onClick={next} aria-label="Next">
            <i className="fa-solid fa-circle-arrow-right text-lg text-[#00aeef]" />
          </button>
        </>
      )}
    </div>
  );
}
