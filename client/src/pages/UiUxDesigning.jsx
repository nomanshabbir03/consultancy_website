import { Link } from 'react-router-dom';
import PortfolioSection from '../components/PortfolioSection';
import { Fragment } from 'react';
import Accent from '../content/Accent';
import { useLayout, useSection } from '../content/SiteContent';
import { DEFAULTS, LAYOUT } from '../content/service/ui-ux-designing';

// Markup, classes and animations of every section are unchanged; only texts, links and images come from the CMS
// (built-in content: content/service/ui-ux-designing.js, used whenever nothing is published or the API is unavailable).
const PAGE = 'ui-ux-designing';

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

function BlockExperienceThePowerOfGreat() {
  const c = useSection(PAGE, 'experience-the-power-of-great', DEFAULTS['experience-the-power-of-great']);
  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="grid grid-cols-1 2xl:grid-cols-5 gap-[100px]">
            <div className="2xl:col-span-3">
              <h2
                className="text-[#001017] text-[24px] xl:text-[40px] font-600 relative pb-[20px] my-0"
                data-aos="fade-right"
              ><Accent text={c.heading} />
              </h2>
              <p className="text-[14px] sm:text-[18px] text-left my-0 text-[#001017]" data-aos="fade-up"><Accent text={c.text} /></p>
            </div>
            <div className="2xl:col-span-2 m-auto relative">
              <div className="p-4 bg-[#5F3B92] bg-opacity-[30%] rounded-xl">
                <img
                  src={c.image}
                  alt={c.imageAlt}
                  className="m-auto"
                  data-aos="flip-right"
                />
              </div>
              <div className="flex gap-[20px] mt-[20px] justify-center tool-row">
                {c.items.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <Fragment key={i1}>{i1 > 0 && ' '}<img
                  src={it1.image}
                  alt={it1.imageAlt}
                  className=""
                  width="60"
                  height="60"
                  data-aos="flip-right"
                /></Fragment>
    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockDesigningYourDigitalDream() {
  const c = useSection(PAGE, 'designing-your-digital-dream', DEFAULTS['designing-your-digital-dream']);
  return (
    <div className="bg-[#F0F6FF] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div>
            <div className="2xl:w-[996px] m-auto text-center">
              <p
                className="pb-[20px] my-0 text-[24px] sm:text-[40px] font-600 text-[#001017]"
                data-aos="fade-right"
              ><Accent text={c.heading} />
              </p>
            </div>
            <p className="text-[14px] sm:text-[18px] my-0 text-[#001017]" data-aos="flip-up"><Accent text={c.text} /></p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] pt-[50px] m-auto">
            {c.items.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <div key={i1} className="p-[30px] bg-[#fff] border-[1px] border-[#e0e0e0]" data-aos="flip-right">
              <div className="w-[60px]">
                <div className="p-[10px] border-[1px] border-[#e0e0e0]">
                  <img src={it1.image} alt={it1.imageAlt} />
                </div>
              </div>
              <div className="pt-[10px]">
                <p className="pb-[10px] my-0 text-[18px] font-600 sm:text-[24px] text-[#001017]"><Accent text={it1.title} />
                </p>
                <p className="my-0 text-[14px] sm:text-[18px] text-[#001017]" data-aos="flip-up"><Accent text={it1.text} /></p>
              </div>
            </div>
    ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockYourVision() {
  const c = useSection(PAGE, 'your-vision', DEFAULTS['your-vision']);
  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="m-auto">
            <div className="grid grid-cols-1 xl:grid-cols-11 gap-0.5 xl:gap-0">
              <div className="mr-[10px] xl:col-span-4 xl:pr-2">
                <h2
                  className="text-[#001017] text-[30px] xl:text-[40px] font-600 relative pb-[30px]"
                  data-aos="fade-right"
                ><Accent text={c.heading} /><br />
                  <Accent text={c.heading2} />{' '}<br /><Accent text={c.heading3} /></h2>
              </div>
              <div
                className="xl:col-span-3 bg-[#F0F6FF] px-[30px] py-[25px] mt-[20px] sm:mt-0"
                data-aos="flip-up"
              >
                <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]"><Accent text={c.title} /></p>
                <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]"><Accent text={c.text} /></p>
              </div>
              <div
                className="hidden xl:block w-[100%] h-[2px] bg-[#001017] my-auto relative"
                data-aos="fade-right"
              >
                <div className="w-2 h-2 bg-[#001017] rounded-full absolute right-0 -top-[3px]"></div>
              </div>
              <div
                className="xl:col-span-3 bg-[#F0F6FF] px-[30px] py-[25px] mt-[20px] sm:mt-0"
                data-aos="flip-right"
              >
                <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]"><Accent text={c.title2} /></p>
                <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]"><Accent text={c.text2} /></p>
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
            <div className="grid grid-cols-1 xl:grid-cols-8 gap-0.5 xl:gap-0 m-auto">
              <div
                className="xl:col-span-2 bg-[#F0F6FF] px-[30px] py-[25px] mt-[20px] sm:mt-0"
                data-aos="flip-up"
              >
                <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]"><Accent text={c.title3} /></p>
                <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]"><Accent text={c.text3} /></p>
              </div>
              <div
                className="hidden xl:block w-[100%] h-[2px] bg-[#001017] my-auto relative"
                data-aos="fade-right"
              >
                <div className="w-2 h-2 bg-[#001017] rounded-full absolute right-0 -top-[3px]"></div>
              </div>
              <div
                className="xl:col-span-2 bg-[#F0F6FF] px-[30px] py-[25px] mt-[20px] sm:mt-0"
                data-aos="flip-right"
              >
                <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]"><Accent text={c.title4} /></p>
                <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]"><Accent text={c.text4} /></p>
              </div>
              <div
                className="hidden xl:block w-[100%] h-[2px] bg-[#001017] my-auto relative"
                data-aos="fade-right"
              >
                <div className="w-2 h-2 bg-[#001017] rounded-full absolute right-0 -top-[3px]"></div>
              </div>
              <div
                className="xl:col-span-2 bg-[#F0F6FF] px-[30px] py-[25px] mt-[20px] sm:mt-0"
                data-aos="flip-up"
              >
                <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]"><Accent text={c.title5} /></p>
                <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]"><Accent text={c.text5} /></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockWhyChooseCornerstoneMedicalSolut() {
  const c = useSection(PAGE, 'why-choose-cornerstone-medical-solut', DEFAULTS['why-choose-cornerstone-medical-solut']);
  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="text-center">
            <p
              className="text-[24px] 2xl:px-[100px] m-auto sm:leading-[45px] sm:text-[40px] font-600 text-[#001017]"
              data-aos="fade-right"
            ><Accent text={c.heading} />
            </p>
            <p
              className="text-[14px] sm:text-[18px] text-[#001017] py-[20px] 2xl:px-[80px] my-0"
              data-aos="fade-up"
            ><Accent text={c.text} /></p>
          </div>
          <div className="grid grid-cols-1 2xl:grid-cols-7 gap-[20px]">
            <div className="2xl:col-span-4">
              <div className="pt-[20px]">
                {c.items.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <div key={i1} className="pb-[30px] md:flex gap-[30px]">
                  <div>
                    <div
                      className="w-16 h-16 flex justify-center items-center border-[1px] border-[#e0e0e0] bg-[#fff]"
                      data-aos="flip-right"
                    >
                      <img
                        src={it1.image}
                        alt={it1.imageAlt}
                        className={["w-14 h-14", "w-10 h-10", "w-10 h-10"][i1 % 3]}
                      />
                    </div>
                  </div>
                  <div className="" data-aos="fade-right">
                    <p className="my-0 text-[18px] sm:text-[22px] font-semibold"><Accent text={it1.title} /></p>
                    <p className="my-0 text-[14px] sm:text-[18px]"><Accent text={it1.text} /></p>
                  </div>
                </div>
    ))}
              </div>
            </div>
            <div className="2xl:col-span-3 my-auto" data-aos="fade-up">
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
  "experience-the-power-of-great": <BlockExperienceThePowerOfGreat />,
  "designing-your-digital-dream": <BlockDesigningYourDigitalDream />,
  "your-vision": <BlockYourVision />,
  "portfolio": <PortfolioSection variant="design" page={PAGE} fallback={DEFAULTS["portfolio"]} />,
  "why-choose-cornerstone-medical-solut": <BlockWhyChooseCornerstoneMedicalSolut />,
};

export default function UiUxDesigning() {
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
