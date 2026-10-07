import { useEffect, useState } from 'react';
import Carousel from './Carousel';

const PHOTOS = [8, 9, 10, 11, 13, 14].map((n) => `/assets/pics/slider/${n}.png`);

/**
 * "Team's wins" gallery. Desktop: accordion strip - click a collapsed photo to expand it, click the
 * expanded one to open a full-screen preview. Below 1280px: autoplaying carousel.
 */
export default function TeamGallery() {
  const [active, setActive] = useState(0);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!preview) return undefined;
    const onKey = (e) => e.key === 'Escape' && setPreview(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [preview]);

  const onItemClick = (i) => {
    if (i === active) setPreview(PHOTOS[i]);
    else setActive(i);
  };

  return (
    <>
      <div className="w-full relative pb-[70px] sm:pb-[150px] pt-[50px] px-4 bg-[#fff] overflow-hidden">
        <div className={`hidden grids xl:flex gap-[16px] ${preview ? 'blur' : ''}`}>
          {PHOTOS.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Team photo ${i + 1}`}
              className={`item ${i === active ? 'active' : ''}`}
              style={{ backgroundImage: `url("${src}")` }}
              onClick={() => onItemClick(i)}
            />
          ))}
        </div>
        <div className="xl:hidden">
          <Carousel autoplay autoplaySpeed={1500} className="w-full h-auto gap-5">
            {PHOTOS.map((src) => (
              <div key={src} className="w-full h-auto">
                <img src={src} alt="Team" />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      {preview && (
        <div id="preview" onClick={() => setPreview(null)} role="dialog" aria-label="Photo preview">
          <img id="preview-image" src={preview} alt="Team preview" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}
