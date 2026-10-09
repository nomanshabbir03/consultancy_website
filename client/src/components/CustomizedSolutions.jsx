import { useState } from 'react';
import ServiceCard from './ServiceCard';
import Accent from '../content/Accent';
import { useSection } from '../content/SiteContent';

const TAB_LAYOUT = [
  { span: 'col-span-2 xl:col-span-3', aos: 'fade-right' },
  { span: 'col-span-2 xl:col-span-3', aos: 'fade-up' },
  { span: 'col-span-3 xl:col-span-3', aos: 'flip-left' },
];

/** About page "Our Customized Solutions": BPO / Health Care / Digital Marketing tabs. */
export default function CustomizedSolutions() {
  const { heading, intro, tabs } = useSection('about-us', 'solutions');
  const [active, setActive] = useState(0);
  const current = tabs[active] ?? tabs[0];

  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div>
            <p className="text-[24px] sm:text-[40px] font-600 text-[#001017] text-center my-0" data-aos="fade-right">
              <Accent text={heading} />
            </p>
            <p
              className="text-[14px] sm:text-[18px] text-center my-0 text-[#001017] pb-[40px] pt-[20px] m-auto"
              data-aos="fade-down"
            >
              {intro}
            </p>
          </div>
          <div className="grid grid-cols-7 xl:grid-cols-9" role="tablist">
            {tabs.slice(0, TAB_LAYOUT.length).map((tab, i) => (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={active === i}
                className={TAB_LAYOUT[i].span}
                data-aos={TAB_LAYOUT[i].aos}
                onClick={() => setActive(i)}
              >
                <p
                  className={`text-[18px] sm:text-[30px] text-center font-600 ${
                    active === i ? 'text-[#00aeef] underline underline-offset-8' : 'text-[#001017]'
                  }`}
                >
                  {tab.label === 'Health Care' ? (
                    <>
                      Health
                      <br className="sm:hidden" />
                      Care
                    </>
                  ) : (
                    tab.label
                  )}
                </p>
              </button>
            ))}
          </div>
          <div
            key={active}
            className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-[30px] m-auto pt-[50px] tab-panel-fade"
            role="tabpanel"
          >
            {(current?.cards ?? []).map((card, c) => (
              <ServiceCard key={`${card.to}-${c}`} {...card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
