import { Link } from 'react-router-dom';

import { Fragment } from 'react';
import Accent from '../content/Accent';
import { useLayout, useSection } from '../content/SiteContent';
import { DEFAULTS, LAYOUT } from '../content/service/sms-support';

// Markup, classes and animations of every section are unchanged; only texts, links and images come from the CMS
// (built-in content: content/service/sms-support.js, used whenever nothing is published or the API is unavailable).
const PAGE = 'sms-support';

function BlockHero() {
  const c = useSection(PAGE, 'hero', DEFAULTS['hero']);
  return (
    <div className="bg-[#2b3990] bg-opacity-[80%] relative">
      <img src={c.image} alt={c.imageAlt} className="bg-hero" />{' '}
      <div className="col-md-8 m-auto">
        <div className="pt-[80px] sm:pt-[250px] pb-[70px] sm:pb-[150px] relative">
          <div className="sm:text-center m-auto relative z-40 bg-[#2b3990] bg-opacity-[70%] py-[50px]">
            <h1
              className="text-[#fff] capitalize text-[24px] xl:text-[40px] xl:leading-[44px] font-600 relative pb-[20px] 2xl:px-[100px] m-auto"
              data-aos="fade-right"
            ><Accent text={c.heading} /></h1>
            <p className="text-[14px] sm:text-[18px] text-[#fff] 2xl:px-[100px] m-auto" data-aos="fade-up"><Accent text={c.text} /></p>
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

function BlockSmsSupportByCornerstone() {
  const c = useSection(PAGE, 'sms-support-by-cornerstone', DEFAULTS['sms-support-by-cornerstone']);
  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-[50px]">
            <div className="m-auto">
              <p
                className="pb-[20px] my-0 text-[24px] sm:text-[40px] font-600 text-[#001017]"
                data-aos="fade-right"
              ><Accent text={c.heading} />
              </p>
              <p
                className="my-0 text-[14px] sm:text-[18px] text-left sm:leading-[30px] text-[#001017]"
                data-aos="flip-up"
              ><Accent text={c.text} /></p>
            </div>
            <div className="m-auto relative" data-aos="flip-right">
              <img src={c.image} alt={c.imageAlt} className="mt-10 sm:mt-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockSection3() {
  const c = useSection(PAGE, 'section-3', DEFAULTS['section-3']);
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
              data-aos="flip-up"
            ><Accent text={it1.text} /><br /><Accent text={it1.text2} /></p>
          </div>
    ))}
        </div>
      </div>
    </div>
  );
}

function BlockGeneralInquiries() {
  const c = useSection(PAGE, 'general-inquiries', DEFAULTS['general-inquiries']);
  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto px-[20px] xl:px-[50px]">
        <div className="py-[70px] sm:py-[150px]">
          <div className="2xl:px-[100px] m-auto text-center">
            <p
              className="pb-[20px] my-0 text-[24px] sm:text-[40px] font-600 text-[#001017]"
              data-aos="fade-right"
            ><Accent text={c.heading} />
            </p>
            <p
              className="my-0 text-[14px] sm:text-[18px] sm:leading-[30px] text-[#001017]"
              data-aos="flip-up"
            ><Accent text={c.text} /><br /><Accent text={c.text2} /></p>
          </div>
          <div className="2xl:px-[100px] m-auto text-center pt-[70px] sm:pt-[150px]">
            <h2
              className="text-[#001017] text-[24px] xl:text-[40px] font-600 relative pb-[30px]"
              data-aos="fade-right"
            ><Accent text={c.heading2} />
            </h2>
            <p
              className="my-0 text-[14px] sm:text-[18px] sm:leading-[30px] text-[#001017]"
              data-aos="flip-up"
            ><Accent text={c.text3} /></p>
          </div>
        </div>
      </div>
    </div>
  );
}

const BLOCKS = {
  "hero": <BlockHero />,
  "sms-support-by-cornerstone": <BlockSmsSupportByCornerstone />,
  "section-3": <BlockSection3 />,
  "general-inquiries": <BlockGeneralInquiries />,
};

export default function SmsSupport() {
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
