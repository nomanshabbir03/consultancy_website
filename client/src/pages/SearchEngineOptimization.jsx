import { Link } from 'react-router-dom';
import CtaBanner from '../components/CtaBanner';
import { Fragment } from 'react';
import Accent from '../content/Accent';
import { useLayout, useSection } from '../content/SiteContent';
import { DEFAULTS, LAYOUT } from '../content/service/search-engine-optimization';

// Markup, classes and animations of every section are unchanged; only texts, links and images come from the CMS
// (built-in content: content/service/search-engine-optimization.js, used whenever nothing is published or the API is unavailable).
const PAGE = 'search-engine-optimization';

function BlockHero() {
  const c = useSection(PAGE, 'hero', DEFAULTS['hero']);
  return (
    <div className="bg-[#2b3990] bg-opacity-[80%] relative">
      <img src={c.image} alt={c.imageAlt} className="bg-hero" />{' '}
      <div className="col-md-8 m-auto">
        <div className="pt-[80px] sm:pt-[250px] pb-[70px] sm:pb-[150px] relative">
          <div className="sm:text-center m-auto relative z-40 bg-[#2b3990] bg-opacity-[70%] py-[50px]">
            <h1
              className="text-[#fff] text-[24px] xl:text-[40px] font-600 relative pb-[30px] 2xl:px-[50px] my-0"
              data-aos="fade-right"
            ><Accent text={c.heading} /></h1>
            <p className="text-[14px] sm:text-[18px] text-[#fff] 2xl:px-[100px] m-auto" data-aos="fade-up"><Accent text={c.text} /><br /><Accent text={c.text2} /></p>
          </div>
          <div className="flex items-center justify-center pt-[50px]" data-aos="flip-up">
            <Link
              to={c.link}
              className="relative flex gap-4 items-center justify-center w-[200px] h-[49px] border-[2px] border-[#fff] transform hover:scale-90 transition duration-500 ease-in-out hover:no-underline hover:text-[#fff] text-[#fff] text-[16px] 2xl:text-[18px] font-semibold"
            >
              <p className="my-auto h-7"><Accent text={c.label} /></p>
              <p className="text-xl my-auto">
                <i className="fa-solid fa-arrow-right"></i>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockSearchEngineOptimization() {
  const c = useSection(PAGE, 'search-engine-optimization', DEFAULTS['search-engine-optimization']);
  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="grid grid-cols-1 2xl:grid-cols-5 gap-[100px]">
            <div className="m-auto 2xl:col-span-3">
              <p
                className="my-0 pb-[20px] text-[24px] sm:text-[40px] font-600 text-[#001017]"
                data-aos="fade-right"
              ><Accent text={c.heading} />
              </p>
              <p
                className="text-[14px] sm:text-[18px] text-left sm:leading-[30px] text-[#001017]"
                data-aos="fade-up"
              ><Accent text={c.text} /></p>
            </div>
            <div className="m-auto relative 2xl:col-span-2" data-aos="fade-down">
              <img src={c.image} alt={c.imageAlt} className="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockReportingAndAnalytics() {
  const c = useSection(PAGE, 'reporting-and-analytics', DEFAULTS['reporting-and-analytics']);
  return (
    <div className="bg-[#F0F6FF] relative z-40">
      <div className="col-md-8 m-auto px-[20px] xl:px-[50px]">
        <div className="py-[70px] sm:py-[150px]">
          {c.items.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <div key={i1} className={["2xl:px-[100px] m-auto text-center", "2xl:px-[100px] m-auto text-center pt-[70px] sm:pt-[150px]", "2xl:px-[100px] m-auto text-center pt-[70px] sm:pt-[150px]"][i1 % 3]}>
            <p
              className="pb-[20px] my-0 text-[24px] sm:text-[40px] font-600 text-[#001017]"
              data-aos="fade-right"
            ><Accent text={it1.heading} />
            </p>
            <p
              className="my-0 text-[14px] sm:text-[18px] sm:leading-[30px] text-[#001017]"
              data-aos="fade-up"
            ><Accent text={it1.text} /></p>
          </div>
    ))}
          <div className="2xl:px-[100px] m-auto text-center pt-[70px] sm:pt-[150px]">
            <p
              className="pb-[20px] my-0 text-[24px] sm:text-[40px] font-600 text-[#001017]"
              data-aos="fade-right"
            ><Accent text={c.heading} />
            </p>
            <p
              className="my-0 text-[14px] sm:text-[18px] sm:leading-[30px] text-[#001017]"
              data-aos="fade-up"
            ><Accent text={c.text} /><br /><Accent text={c.text2} /></p>
          </div>
        </div>
      </div>
    </div>
  );
}

const BLOCKS = {
  "hero": <BlockHero />,
  "search-engine-optimization": <BlockSearchEngineOptimization />,
  "reporting-and-analytics": <BlockReportingAndAnalytics />,
  "cta": <CtaBanner />,
};

export default function SearchEngineOptimization() {
  const layout = useLayout(PAGE, LAYOUT);
  return (
    <>
      {layout
        .filter((block) => block.visible !== false && BLOCKS[block.key])
        .map((block) => (
          <Fragment key={block.key}>{BLOCKS[block.key]}</Fragment>
        ))}
    </>
  );
}
