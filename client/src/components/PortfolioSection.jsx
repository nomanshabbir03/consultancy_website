import { useEffect, useState } from 'react';
import { PORTFOLIO } from '../data/portfolio';

const LABEL_CLASS = 'text-xl text-[#2b3990] hover:text-[#00aeef] duration-300 hover:no-underline';

/** "Our Portfolio" with Web / Graphic / UI-UX tabs. `variant` picks the dataset (see data/portfolio.js). */
export default function PortfolioSection({ variant = 'design' }) {
  const { tabs, preview: hasPreview } = PORTFOLIO[variant];
  const [active, setActive] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (!previewImage) return undefined;
    document.body.classList.add('overflow-hidden');
    const onKey = (e) => e.key === 'Escape' && setPreviewImage(null);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('overflow-hidden');
      window.removeEventListener('keydown', onKey);
    };
  }, [previewImage]);

  return (
    <div className="bg-[#F0F6FF] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className={`grids grid grid-cols-1 2xl:grid-cols-9 m-auto ${previewImage ? 'blur' : ''}`}>
            <div className="text-left xl:col-span-3">
              <p className="my-0 pb-[20px] text-[24px] sm:text-[40px] font-600 text-[#001017]" data-aos="fade-right">
                Our <span className="text-[#00aeef]">Portfolio</span>
              </p>
              <p className="my-0 text-[14px] sm:text-[18px] sm:leading-[30px] text-[#001017]" data-aos="flip-up">
                Take a look at some of our completed projects.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-[20px] mt-[20px] sm:mt-0 xl:col-span-6" role="tablist">
              {tabs.map((tab, i) => (
                <button
                  key={tab.label}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => setActive(i)}
                  className={`w-full md:h-[48px] py-[10px] px-[5px] text-center border-[1px] border-[#e0e0e0] relative my-auto ${
                    active === i ? 'bg-[#2b3990] text-[#fff]' : 'bg-[#fff]'
                  }`}
                  data-aos="flip-right"
                >
                  <h3 className="my-auto font-semibold text-[12px] sm:text-[16px]">
                    {tab.label === 'UI/UX Designing' ? (
                      <>
                        UI/UX
                        <br className="sm:hidden" />
                        Designing
                      </>
                    ) : (
                      tab.label
                    )}
                  </h3>
                  {active === i && (
                    <p className="absolute -bottom-[63%] left-[50%]">
                      <i className="fa-solid fa-caret-down text-[#2b3990]" />
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className={`pt-[50px] m-auto ${previewImage ? 'blur' : ''}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]" key={active}>
              {tabs[active].items.map((item) => (
                <div key={item.image} className="child" data-aos="flip-right">
                  {hasPreview ? (
                    <button type="button" onClick={() => setPreviewImage(item.image)}>
                      <img
                        src={item.image}
                        alt={item.label}
                        className="xl:w-[895px] mx-auto"
                        {...(item.sized ? { width: 460, height: 370 } : {})}
                      />
                    </button>
                  ) : (
                    <img
                      src={item.image}
                      alt={item.label}
                      className="xl:w-[895px] mx-auto"
                      {...(item.sized ? { width: 460, height: 370 } : {})}
                    />
                  )}
                  <div className="bg-[#fff] mt-[20px] w-full h-[50px] py-[12px] text-center text-[#1e1e1e] border-[1px] border-[#e0e0e0]">
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className={LABEL_CLASS}>
                        {item.label}
                      </a>
                    ) : (
                      <p className={LABEL_CLASS}>{item.label}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {previewImage && (
        <div id="portfolio-preview" onClick={() => setPreviewImage(null)} role="dialog" aria-label="Project preview">
          <button
            type="button"
            aria-label="Close preview"
            className="gradient-text text-lg md:text-2xl transform hover:scale-[150%] transition duration-300 ease-in-out fixed top-[5%] right-[10%] md:right-[12%]"
          >
            <i className="fa-regular fa-circle-xmark" />
          </button>
          <img id="portfolio-preview-image" src={previewImage} alt="Project preview" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
