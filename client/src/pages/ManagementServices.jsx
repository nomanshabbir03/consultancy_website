import { Link } from 'react-router-dom';
import CtaBanner from '../components/CtaBanner';
import { Fragment } from 'react';
import Accent from '../content/Accent';
import { useLayout, useSection } from '../content/SiteContent';
import { DEFAULTS, LAYOUT } from '../content/service/management-services';

// Markup, classes and animations of every section are unchanged; only texts, links and images come from the CMS
// (built-in content: content/service/management-services.js, used whenever nothing is published or the API is unavailable).
const PAGE = 'management-services';

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

function BlockOurRangeOfServices() {
  const c = useSection(PAGE, 'our-range-of-services', DEFAULTS['our-range-of-services']);
  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="m-auto text-center pb-[50px]">
            <p
              className="my-0 pb-[20px] text-[24px] sm:text-[40px] font-600 text-[#001017]"
              data-aos="fade-right"
            ><Accent text={c.heading} />
            </p>
            <p
              className="2xl:px-[80px] m-auto text-[14px] sm:text-[18px] my-0 text-[#001017]"
              data-aos="flip-up"
            ><Accent text={c.text} /></p>
          </div>
          <div className="m-auto grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-[30px]">
            <div
              className="text-center py-[40px] px-[30px] rounded-[8px] bg-[#F0F6FF]"
              data-aos="flip-right"
            >
              <p className="text-[#001017] text-[16px] xl:text-[20px] font-600 pb-[20px] my-0"><Accent text={c.title} /></p>
              <p className="my-0 text-[#001017] text-[14px] xl:text-[16px]"><Accent text={c.text2} /></p>
            </div>
            {c.items.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <div key={i1}
              className="text-center py-[40px] px-[30px] rounded-[8px] bg-[#F0F6FF]"
              data-aos={["fade-right", "flip-right", "fade-right"][i1 % 3]}
            >
              <p className="text-[#001017] text-[16px] xl:text-[20px] font-600 pb-[20px] my-0"><Accent text={it1.title} /></p>
              <p className="my-0 text-[#001017] text-[14px] xl:text-[16px]"><Accent text={it1.text} /></p>
            </div>
    ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockWhyChooseCornerstoneMedicalSolut() {
  const c = useSection(PAGE, 'why-choose-cornerstone-medical-solut', DEFAULTS['why-choose-cornerstone-medical-solut']);
  return (
    <div className="bg-[#F0F6FF] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="m-auto text-center pb-[50px]">
            <h2
              className="md:w-[690px] m-auto text-[#001017] text-[24px] xl:text-[40px] font-600 relative pb-[30px]"
              data-aos="fade-right"
            ><Accent text={c.heading} />
            </h2>
            <p
              className="2xl:px-[80px] m-auto text-[14px] sm:text-[18px] my-0 text-[#001017]"
              data-aos="fade-up"
            ><Accent text={c.text} /></p>
          </div>
          <div className="m-auto grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-[30px]">
            {c.items.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <div key={i1} data-aos={["flip-up", "flip-right", "flip-right", "flip-up", "flip-right"][i1 % 5]}>
              <p className="text-[#001017] text-[24px] xl:leading-[34px] xl:text-[30px] font-600 pb-[20px] my-0"><Accent text={it1.title} />
              </p>
              <p className="text-[#001017] text-[14px] xl:text-[18px] my-0"><Accent text={it1.text} /></p>
            </div>
    ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockPartnerWith() {
  const c = useSection(PAGE, 'partner-with', DEFAULTS['partner-with']);
  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto px-[20px] xl:px-[50px]">
        <div className="py-[70px] sm:py-[150px]">
          <div className="m-auto text-center">
            <h2
              className="2xl:px-[50px] m-auto text-[#001017] text-[24px] xl:text-[40px] font-600 relative pb-[20px] my-0"
              data-aos="fade-right"
            ><Accent text={c.heading} /><br className="hidden sm:block" />{' '}<Accent text={c.heading2} />
            </h2>
            <p
              className="2xl:px-[60px] text-[14px] sm:text-[18px] sm:leading-[30px] text-[#001017] my-0"
              data-aos="flip-up"
            ><Accent text={c.text} /><br /><Accent text={c.text2} /></p>
          </div>
        </div>
      </div>
    </div>
  );
}

const BLOCKS = {
  "hero": <BlockHero />,
  "our-range-of-services": <BlockOurRangeOfServices />,
  "why-choose-cornerstone-medical-solut": <BlockWhyChooseCornerstoneMedicalSolut />,
  "partner-with": <BlockPartnerWith />,
  "cta": <CtaBanner />,
};

export default function ManagementServices() {
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
