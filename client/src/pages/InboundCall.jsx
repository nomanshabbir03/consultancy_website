import { Link } from 'react-router-dom';

import { Fragment } from 'react';
import Accent from '../content/Accent';
import { useLayout, useSection } from '../content/SiteContent';
import { DEFAULTS, LAYOUT } from '../content/service/inbound-call';

// Markup, classes and animations of every section are unchanged; only texts, links and images come from the CMS
// (built-in content: content/service/inbound-call.js, used whenever nothing is published or the API is unavailable).
const PAGE = 'inbound-call';

function BlockHero() {
  const c = useSection(PAGE, 'hero', DEFAULTS['hero']);
  return (
    <div className="bg-[#2b3990] bg-opacity-[80%] relative">
      <img src={c.image} alt={c.imageAlt} className="bg-hero" />{' '}
      <div className="col-md-8 m-auto">
        <div className="pt-[80px] sm:pt-[250px] pb-[70px] sm:pb-[150px] relative">
          <div className="sm:text-center m-auto relative z-40 bg-[#2b3990] bg-opacity-[70%] py-[50px]">
            <h1
              className="text-[#fff] capitalize text-[24px] xl:text-[40px] xl:leading-[44px] font-600 relative pb-[30px] 2xl:px-[100px] m-auto"
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

function BlockInboundCallServicesOfferedBy() {
  const c = useSection(PAGE, 'inbound-call-services-offered-by', DEFAULTS['inbound-call-services-offered-by']);
  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="grid grid-cols-1 2xl:grid-cols-5 gap-[50px]">
            <div className="2xl:col-span-3 m-auto">
              <h2
                className="text-[#001017] text-[24px] xl:text-[40px] my-0 font-600 relative pb-[20px]"
                data-aos="fade-right"
              ><Accent text={c.heading} />
              </h2>
              <p
                className="text-[14px] my-0 sm:text-[18px] text-left sm:leading-[30px] text-[#001017]"
                data-aos="fade-down"
              ><Accent text={c.text} /></p>
            </div>
            <div className="2xl:col-span-2 m-auto relative" data-aos="fade-up">
              <img src={c.image} alt={c.imageAlt} className="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockInboundCallManagement() {
  const c = useSection(PAGE, 'inbound-call-management', DEFAULTS['inbound-call-management']);
  return (
    <div className="bg-[#F0F6FF] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-[50px]">
            <div className="">
              <p
                className="pb-[20px] my-0 text-[24px] sm:text-[40px] font-600 text-[#001017]"
                data-aos="fade-right"
              ><Accent text={c.heading} />
              </p>
              <p
                className="text-[14px] sm:text-[18px] my-0 text-left sm:leading-[30px] text-[#001017]"
                data-aos="fade-up"
              ><Accent text={c.text} /></p>
              <div className="pt-[20px]">
                <div className="pb-[20px] md:flex gap-[30px]">
                  <div>
                    <div
                      className="w-16 h-16 flex justify-center items-center border-[1px] border-[#e0e0e0] bg-[#fff]"
                      data-aos="flip-right"
                    >
                      <img
                        src={c.image}
                        alt={c.imageAlt}
                        className="w-10 h-10"
                      />
                    </div>
                  </div>
                  <div className="">
                    <p className="text-[18px] sm:text-[22px] font-semibold my-0" data-aos="fade-right"><Accent text={c.title} />
                    </p>
                    <p className="text-[14px] sm:text-[18px] my-0" data-aos="flip-up"><Accent text={c.text2} /></p>
                  </div>
                </div>
                {c.items.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <div key={i1} className={["pb-[20px] md:flex gap-[30px]", "md:flex gap-[30px]"][i1 % 2]}>
                  <div>
                    <div
                      className="w-16 h-16 flex justify-center items-center border-[1px] border-[#e0e0e0] bg-[#fff]"
                      data-aos="flip-right"
                    >
                      <img
                        src={it1.image}
                        alt={it1.imageAlt}
                        className="w-10 h-10"
                      />
                    </div>
                  </div>
                  <div className="">
                    <p className="text-[18px] sm:text-[22px] font-semibold my-0" data-aos="fade-right"><Accent text={it1.title} />
                    </p>
                    <p className="text-[14px] sm:text-[18px] my-0" data-aos="flip-up"><Accent text={it1.text} /></p>
                  </div>
                </div>
    ))}
              </div>
            </div>
            <div className="relative">
              {c.items2.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <Fragment key={i1}>{i1 > 0 && ' '}<img
                src={it1.image}
                alt={it1.imageAlt}
                className={["m-auto", "absolute top-0 right-0"][i1 % 2]}
                data-aos={["fade-right", "fade-up"][i1 % 2]}
              /></Fragment>
    ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockBenefitsOfInboundCalls() {
  const c = useSection(PAGE, 'benefits-of-inbound-calls', DEFAULTS['benefits-of-inbound-calls']);
  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="2xl:px-[100px] m-auto text-center">
            <p
              className="pb-[20px] my-0 text-[24px] sm:text-[40px] font-600 text-[#001017]"
              data-aos="fade-right"
            ><Accent text={c.heading} />
            </p>
            <p
              className="text-[14px] sm:text-[18px] my-0 sm:leading-[30px] text-[#001017]"
              data-aos="fade-up"
            ><Accent text={c.text} /></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockHipaaCompliance() {
  const c = useSection(PAGE, 'hipaa-compliance', DEFAULTS['hipaa-compliance']);
  return (
    <div className="bg-[#F0F6FF] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[100px]">
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-[80px]">
            <div className="relative after:bg-[#000] py-10 m-auto">
              {c.items.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <Fragment key={i1}>{i1 > 0 && ' '}<img
                src={it1.image}
                alt={it1.imageAlt}
                className={["m-auto", "absolute top-[10%] right-0"][i1 % 2]}
                data-aos={["fade-up", "fade-down"][i1 % 2]}
              /></Fragment>
    ))}
            </div>
            <div className="m-auto">
              <p
                className="pb-[20px] my-0 text-[24px] sm:text-[40px] font-600 text-[#001017]"
                data-aos="fade-right"
              ><Accent text={c.heading} />
              </p>
              <p
                className="text-[14px] sm:text-[18px] my-0 text-left sm:leading-[30px] text-[#001017]"
                data-aos="flip-up"
              ><Accent text={c.text} /></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const BLOCKS = {
  "hero": <BlockHero />,
  "inbound-call-services-offered-by": <BlockInboundCallServicesOfferedBy />,
  "inbound-call-management": <BlockInboundCallManagement />,
  "benefits-of-inbound-calls": <BlockBenefitsOfInboundCalls />,
  "hipaa-compliance": <BlockHipaaCompliance />,
};

export default function InboundCall() {
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
