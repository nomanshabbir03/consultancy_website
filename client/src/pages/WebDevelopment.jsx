import { Link } from 'react-router-dom';
import PortfolioSection from '../components/PortfolioSection';
import { Fragment } from 'react';
import Accent from '../content/Accent';
import { useLayout, useSection } from '../content/SiteContent';
import { DEFAULTS, LAYOUT } from '../content/service/web-development';

// Markup, classes and animations of every section are unchanged; only texts, links and images come from the CMS
// (built-in content: content/service/web-development.js, used whenever nothing is published or the API is unavailable).
const PAGE = 'web-development';

function BlockHero() {
  const c = useSection(PAGE, 'hero', DEFAULTS['hero']);
  return (
    <div className="bg-[#2b3990] bg-opacity-[80%] relative">
      <img src={c.image} alt={c.imageAlt} className="bg-hero" />{' '}
      <div className="col-md-8 m-auto">
        <div className="pt-[80px] sm:pt-[250px] pb-[70px] sm:pb-[150px] relative">
          <div className="sm:text-center m-auto relative z-40 bg-[#2b3990] bg-opacity-[70%] py-[50px]">
            <h1
              className="text-[#fff] text-[24px] xl:text-[40px] font-600 relative pb-[30px] 2xl:px-[100px] m-auto"
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

function BlockWebDevelopmentWithCornerstone() {
  const c = useSection(PAGE, 'web-development-with-cornerstone', DEFAULTS['web-development-with-cornerstone']);
  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-[50px]">
            <div className="m-auto">
              <div className="pb-[20px] flex gap-3 items-center">
                <p
                  className="my-auto text-[24px] sm:text-[40px] font-600 text-[#001017] "
                  data-aos="fade-right"
                ><Accent text={c.heading} />
                </p>
              </div>
              <p
                className="text-[14px] sm:text-[18px] text-left sm:leading-[30px] text-[#001017]"
                data-aos="fade-up"
              ><Accent text={c.text} /><br /><Accent text={c.text2} /><br /><Accent text={c.text3} /></p>
            </div>
            <div className="m-auto relative" data-aos="flip-right">
              <img src={c.image} alt={c.imageAlt} className="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockOurWebDevelopmentServices() {
  const c = useSection(PAGE, 'our-web-development-services', DEFAULTS['our-web-development-services']);
  return (
    <div className="bg-[#F0F6FF] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="m-auto text-center">
            <p className="my-0 text-[24px] sm:text-[40px] font-600 text-[#001017] " data-aos="fade-right"><Accent text={c.heading} />
            </p>
            <p
              className="my-0 text-[14px] sm:text-[18px] sm:leading-[30px] text-[#001017]"
              data-aos="flip-up"
            ><Accent text={c.text} /></p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[15px] pt-[50px]">
            {c.items.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <div key={i1}
              className="px-[40px] py-[40px] bg-[#fff] border-[1px] border-[#e0e0e0]"
              data-aos={["flip-right", "fade-right", "flip-right"][i1 % 3]}
            >
              <div className="w-[60px]">
                <div className="p-[10px] border-[1px] border-[#e0e0e0]">
                  <img src={it1.image} alt={it1.imageAlt} />
                </div>
              </div>
              <div className="pt-[30px]">
                <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]"><Accent text={it1.title} /></p>
                <div className="w-[80px] h-[2px] bg-[#2b3990] my-[10px]"></div>
                <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]"><Accent text={it1.text} /></p>
              </div>
            </div>
    ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockCustomWebsites() {
  const c = useSection(PAGE, 'custom-websites', DEFAULTS['custom-websites']);
  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-[50px]">
            <div className="m-auto">
              <p className="my-0 text-[24px] sm:text-[40px] font-600 text-[#001017] " data-aos="fade-right"><Accent text={c.heading} />
              </p>
              <p
                className="text-[14px] my-0 sm:text-[18px] text-left sm:leading-[30px] text-[#001017]"
                data-aos="fade-right"
              ><Accent text={c.text} /><br /><Accent text={c.text2} /><br /><Accent text={c.text3} /><br /><Accent text={c.text4} /></p>
            </div>
            <div className="m-auto relative">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-[10px] sm:gap-[40px] m-auto">
                {c.items.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <div key={i1}
                  className="w-20 h-20 sm:w-24 sm:h-24 flex justify-center items-center bg-[#F0F6FF]"
                  data-aos={["flip-right", "flip-up", "flip-right", "flip-up", "flip-up", "flip-right", "flip-up", "flip-right", "flip-right", "flip-up", "flip-right", "flip-up"][i1 % 12]}
                >
                  <img
                    src={it1.image}
                    alt={it1.imageAlt}
                    className=""
                    width="64"
                    height="64"
                  />
                </div>
    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockWordpressWebsites() {
  const c = useSection(PAGE, 'wordpress-websites', DEFAULTS['wordpress-websites']);
  return (
    <div className="bg-[#F0F6FF] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="2xl:w-[1244px] m-auto text-center">
            <p
              className="my-0 pb-[20px] text-[24px] sm:text-[40px] font-600 text-[#001017] "
              data-aos="fade-right"
            ><Accent text={c.heading} />
            </p>
            <p className="text-[14px] sm:text-[18px] sm:leading-[30px] text-[#001017]" data-aos="fade-up"><Accent text={c.text} /><br /><Accent text={c.text2} /><br /><Accent text={c.text3} /></p>
          </div>
          <div className="pt-[50px]" data-aos="flip-right">
            <img src={c.image} alt={c.imageAlt} className="xl:w-[1000px] m-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockOurProcess() {
  const c = useSection(PAGE, 'our-process', DEFAULTS['our-process']);
  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="m-auto">
            <div className="grid grid-cols-1 xl:grid-cols-11 gap-3 xl:gap-0 my-0">
              <div className="mr-[50px] xl:col-span-4">
                <p
                  className="my-0 text-[24px] sm:text-[40px] font-600 text-[#001017] "
                  data-aos="fade-right"
                ><Accent text={c.heading} />
                </p>
                <p
                  className="text-[14px] sm:text-[18px] text-left sm:leading-[30px] text-[#001017]"
                  data-aos="fade-up"
                ><Accent text={c.text} /></p>
              </div>
              <div
                className="xl:col-span-3 shadow-[0_0px_6px_5px_rgba(71,65,166,.03)] bg-[#fff] px-[33px] py-[20px] mt-[20px] sm:mt-0"
                data-aos="flip-right"
              >
                <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]"><Accent text={c.title} /></p>
                <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]"><Accent text={c.text2} /></p>
              </div>
              <div
                className="hidden xl:block w-full h-[2px] bg-[#001017] my-auto relative"
                data-aos="fade-right"
              >
                <div className="w-2 h-2 bg-[#001017] rounded-full absolute right-0 -top-[3px]"></div>
              </div>
              <div
                className="xl:col-span-3 shadow-[0_0px_6px_5px_rgba(71,65,166,.03)] bg-[#fff] px-[33px] py-[20px] mt-[20px] sm:mt-0"
                data-aos="flip-left"
              >
                <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]"><Accent text={c.title2} /></p>
                <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]"><Accent text={c.text3} /></p>
              </div>
            </div>
            <div
              className="hidden xl:block relative w-[700px] 2xl:w-[942px] m-auto py-[50px]"
              data-aos="fade-right"
            >
              <div className="w-[2px] h-[50px] bg-[#001017] absolute bottom-0 left-0"></div>
              <div className="w-2 h-2 bg-[#001017] rounded-full absolute -right-[3px] top-0"></div>
              <div className="w-[700px] 2xl:w-[942px] h-[2px] bg-[#001017]"></div>
              <div className="w-[2px] h-[50px] bg-[#001017] absolute right-0 top-0"></div>
              <div className="w-2 h-2 bg-[#001017] rounded-full absolute -left-[3px] bottom-0"></div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-8 gap-3 xl:gap-0 mx-auto my-0">
              <div
                className="xl:col-span-2 shadow-[0_0px_6px_5px_rgba(71,65,166,.03)] bg-[#fff] px-[33px] py-[20px] mt-[20px] sm:mt-0"
                data-aos="flip-down"
              >
                <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]"><Accent text={c.title3} /></p>
                <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]"><Accent text={c.text4} /></p>
              </div>
              <div
                className="hidden xl:block md:block w-full h-[2px] bg-[#001017] my-auto relative"
                data-aos="fade-right"
              >
                <div className="w-2 h-2 bg-[#001017] rounded-full absolute right-0 -top-[3px]"></div>
              </div>
              <div
                className="xl:col-span-2 shadow-[0_0px_6px_5px_rgba(71,65,166,.03)] bg-[#fff] px-[33px] py-[20px] mt-[20px] sm:mt-0"
                data-aos="flip-right"
              >
                <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]"><Accent text={c.title4} /></p>
                <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]"><Accent text={c.text5} /></p>
              </div>
              <div
                className="hidden xl:block md:block w-full h-[2px] bg-[#001017] my-auto relative"
                data-aos="fade-right"
              >
                <div className="w-2 h-2 bg-[#001017] rounded-full absolute right-0 -top-[3px]"></div>
              </div>
              <div
                className="xl:col-span-2 shadow-[0_0px_6px_5px_rgba(71,65,166,.03)] bg-[#fff] px-[33px] py-[20px] mt-[20px] sm:mt-0"
                data-aos="flip-up"
              >
                <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]"><Accent text={c.title5} /></p>
                <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]"><Accent text={c.text6} /></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockWhyChooseUs() {
  const c = useSection(PAGE, 'why-choose-us', DEFAULTS['why-choose-us']);
  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="grid grid-cols-1 2xl:grid-cols-2">
            <div>
              <div>
                <p
                  className="my-0 text-[24px] sm:text-[40px] font-600 text-[#001017]  pb-[10px]    "
                  data-aos="fade-right"
                ><Accent text={c.heading} />
                </p>
                <p
                  className="my-0 text-[14px] sm:text-[18px] text-left sm:leading-[30px] text-[#001017]"
                  data-aos="flip-up"
                ><Accent text={c.text} /></p>
              </div>
              <div className="pt-[20px]">
                {c.items.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <div key={i1} className="pb-[20px] md:flex gap-[30px]">
                  <div>
                    <div
                      className="w-16 h-16 flex justify-center items-center border-[1px] border-[#e0e0e0] bg-[#fff]"
                      data-aos="flip-right"
                    >
                      <img
                        src={it1.image}
                        alt={it1.imageAlt}
                        className={["w-14 h-14", "w-12 h-12", "w-12 h-12", "w-12 h-12"][i1 % 4]}
                      />
                    </div>
                  </div>
                  <div className="" data-aos="fade-right">
                    <p className="text-[18px] sm:text-[22px] font-semibold"><Accent text={it1.title} />
                    </p>
                    <p className="text-[14px] sm:text-[18px]"><Accent text={it1.text} /></p>
                  </div>
                </div>
    ))}
              </div>
            </div>
            <div className="m-auto" data-aos="fade-up">
              <img src={c.image} alt={c.imageAlt} className="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const BLOCKS = {
  "hero": <BlockHero />,
  "web-development-with-cornerstone": <BlockWebDevelopmentWithCornerstone />,
  "our-web-development-services": <BlockOurWebDevelopmentServices />,
  "custom-websites": <BlockCustomWebsites />,
  "wordpress-websites": <BlockWordpressWebsites />,
  "our-process": <BlockOurProcess />,
  "portfolio": <PortfolioSection variant="web" page={PAGE} fallback={DEFAULTS["portfolio"]} />,
  "why-choose-us": <BlockWhyChooseUs />,
};

export default function WebDevelopment() {
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
