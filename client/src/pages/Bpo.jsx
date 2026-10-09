import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import CtaBanner from '../components/CtaBanner';
import { Fragment } from 'react';
import Accent from '../content/Accent';
import { useLayout, useSection } from '../content/SiteContent';
import { DEFAULTS, LAYOUT } from '../content/service/bpo';

// Markup, classes and animations of every section are unchanged; only texts, links and images come from the CMS
// (built-in content: content/service/bpo.js, used whenever nothing is published or the API is unavailable).
const PAGE = 'bpo';

function BlockHero() {
  const c = useSection(PAGE, 'hero', DEFAULTS['hero']);
  return (
    <div className="bg-[#2b3990] relative overflow-hidden">
      <div className="col-md-8 m-auto">
        <div className="pt-[80px] sm:pt-[250px] pb-[70px] sm:pb-[150px] relative">
          <div className="sm:text-center m-auto relative z-40 py-[50px]">
            <h1
              className="text-[#fff] text-[36px] xl:text-[54px] font-600 relative my-0 pb-[30px]"
              data-aos="fade-right"
            ><Accent text={c.heading} /></h1>
            <p className="text-[16px] sm:text-[20px] text-[#fff] my-0" data-aos="fade-up"><Accent text={c.title} /></p>
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
      <div className="absolute z-30 left-0 bottom-0 flex h-[100px] bg-[#1A308D] py-[2px]">
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990] rotate-[180deg]"></div>
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990] rotate-[-90deg]"></div>
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990] rotate-[180deg]"></div>
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990] rotate-[-90deg]"></div>
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990] rotate-[180deg]"></div>
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990] rotate-[-90deg]"></div>
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990] rotate-[180deg]"></div>
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990] rotate-[-90deg]"></div>
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990] rotate-[180deg]"></div>
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990] rotate-[-90deg]"></div>
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990] rotate-[180deg]"></div>
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990] rotate-[-90deg]"></div>
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990] rotate-[180deg]"></div>
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990] rotate-[-90deg]"></div>
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990] rotate-[180deg]"></div>
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990] rotate-[-90deg]"></div>
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-full bg-[#2b3990]"></div>
        <div className="aspect-square rounded-br-full rounded-tr-full bg-[#2b3990] rotate-[180deg]"></div>
      </div>
    </div>
  );
}

function BlockOurUniqueBpoExperience() {
  const c = useSection(PAGE, 'our-unique-bpo-experience', DEFAULTS['our-unique-bpo-experience']);
  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="grid grid-cols-1 2xl:grid-cols-5 gap-[50px] md:gap-[100px]">
            <div className="m-auto 2xl:col-span-3">
              <div className="pb-[20px]">
                <p
                  className="my-0 text-[24px] sm:text-[40px] font-600 text-[#001017] "
                  data-aos="fade-right"
                ><Accent text={c.heading} />
                </p>
              </div>
              <p
                className="text-[14px] sm:text-[18px] text-left sm:leading-[30px] text-[#001017] my-0"
                data-aos="flip-right"
              ><Accent text={c.text} /><br /><Accent text={c.text2} /><br /><Accent text={c.text3} /></p>
            </div>
            <div className="relative 2xl:col-span-2 m-auto" data-aos="fade-up">
              <img src={c.image} alt={c.imageAlt} className="w-full mt-6 md:mt-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockOurComprehensiveSuiteOfServices() {
  const c = useSection(PAGE, 'our-comprehensive-suite-of-services', DEFAULTS['our-comprehensive-suite-of-services']);
  return (
    <div className="bg-[#F0F6FF] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="text-center">
            <p className="my-0 text-[24px] sm:text-[40px] font-600 text-[#001017] " data-aos="fade-right"><Accent text={c.heading} />
            </p>
            <p
              className="my-0 text-[14px] sm:text-[18px] text-[#001017] pt-[20px] xl:px-[20px] m-auto"
              data-aos="fade-up"
            ><Accent text={c.text} /></p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-[30px] m-auto pt-[80px] div1">
            <div className="p-[20px] border-[1px] border-[#E0E0E0] relative bg-white">
              <div className="md:pt-[50px]">
                <p
                  className="text-[24px] sm:text-[36px] sm:leading-[40px] text-[#001017] pt-[20px] my-0"
                  style={{ fontWeight: '600' }}
                ><Accent text={c.text2} /></p>
              </div>
              <p
                className="text-[14px] sm:text-[16px] text-[#001017] pt-[20px] my-0"
                style={{ fontWeight: '400' }}
                data-aos="fade-right"
              ><Accent text={c.text3} /></p>
              <div className="flex items-center mt-[30px]" data-aos="flip-up">
                <Link
                  to={c.link}
                  className="relative flex gap-4 items-center justify-center w-[200px] h-[49px] border-[2px] border-[#2b3990] transform hover:scale-90 transition duration-500 ease-in-out hover:no-underline hover:text-[#2b3990] text-[#2b3990] text-[16px] 2xl:text-[18px] font-semibold"
                >
                  <p className="my-auto h-7"><Accent text={c.label} /></p>
                  <p className="text-xl my-auto">
                    <i className="fa-solid fa-arrow-right"></i>
                  </p>
                </Link>
              </div>
              <div className="absolute right-0 top-0 w-[40px] h-[40px] bg-[#0017a9]">
                <div className="w-[40px] h-[40px] bg-[#1E35C8] rounded-full"></div>
              </div>
              <div className="absolute right-0 top-[40px] rounded-bl-full w-[40px] h-[40px] bg-[#F9B233]"></div>
              <div className="absolute right-[40px] top-0 rounded-bl-full rounded-tl-full w-[40px] h-[40px] bg-[#00aeef]"></div>
            </div>
            {c.items.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <div key={i1} className="p-[20px] border-[1px] border-[#E0E0E0] relative bg-white">
              <div>
                <div className="w-[48px] h-[48px]">
                  <img src={it1.image} alt={it1.imageAlt} />
                </div>
                <p
                  className="text-[18px] sm:text-[24px] sm:leading-[30px] text-[#001017] pt-[20px] my-0"
                  style={{ fontWeight: '600' }}
                ><Accent text={it1.title} /></p>
              </div>
              <p
                className="text-[14px] sm:text-[16px] text-[#001017] py-[20px] my-0"
                style={{ fontWeight: '400' }}
                data-aos="fade-right"
              ><Accent text={it1.text} /></p>{' '}
              <Link
                to={it1.link}
                className="hover:no-underline hover:text-[#00aeef] text-[14px] sm:text-[16px] text-center text-[#2b3990] gap-2 flex items-center"
              >
                <p className=""><Accent text={it1.label} /></p>
                <p className="mt-[2px]">
                  <i className="fa-solid fa-angle-right"></i>
                </p>
              </Link>{' '}
              <div className="absolute right-0 top-0 w-[40px] h-[40px] bg-[#0017a9]">
                <div className="w-[40px] h-[40px] bg-[#1E35C8] rounded-full"></div>
              </div>
              <div className="absolute right-0 top-[40px] rounded-bl-full w-[40px] h-[40px] bg-[#F9B233]"></div>
              <div className="absolute right-[40px] top-0 rounded-bl-full rounded-tl-full w-[40px] h-[40px] bg-[#00aeef]"></div>
            </div>
    ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockWeServeTheFollowingIndustries() {
  const c = useSection(PAGE, 'we-serve-the-following-industries', DEFAULTS['we-serve-the-following-industries']);
  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div>
            <p
              className="my-0 text-center text-[24px] sm:text-[40px] font-600 text-[#001017] "
              data-aos="fade-right"
            ><Accent text={c.heading} />
            </p>
            <p
              className="text-[14px] sm:text-[18px] text-center text-[#001017] pb-[40px] pt-[20px] xl:px-[20px] my-0"
              data-aos="fade-up"
            ><Accent text={c.text} /></p>
          </div>
          <div className="pt-[40px] grid grid-cols-2 md:grid-cols-5 gap-[20px] 2xl:px-[100px] m-auto">
            {c.items.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <div key={i1} data-aos={["fade-up", "fade-down", "flip-up", "flip-down", "fade-right"][i1 % 5]}>
              <img
                src={it1.image}
                alt={it1.imageAlt}
                className="m-auto w-[127px] h-[90px]"
              />{' '}
              <p className="text=-[16px] sm:text-[18px] font-600 text-[#001017] text-center pt-[20px]"><Accent text={it1.title} /></p>
            </div>
    ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockWhyOurBpoServicesAre() {
  const c = useSection(PAGE, 'why-our-bpo-services-are', DEFAULTS['why-our-bpo-services-are']);
  return (
    <div className="bg-[#F0F6FF] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="grid grid-cols-1 2xl:grid-cols-5 gap-[86px]">
            <div className="m-auto 2xl:col-span-3">
              <div className="pb-4 flex gap-3 items-center justify-center">
                <p className="text-[24px] sm:text-[40px] font-600 text-[#001017] " data-aos="fade-right"><Accent text={c.heading} />
                </p>
              </div>
              <p className="xl:w-[750px]"></p>
              <div className="grid grid-cols-2 ">
                <ul className="">
                  {c.items.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <li key={i1} className="text-[14px] sm:text-[18px] text-left sm:leading-[30px] text-[#001017] pb-[10px] flex">
                    <p>
                      <i className="fa-solid fa-compact-disc pr-4 font-600 text-[#2b3990]"></i>
                    </p>
                    <p data-aos="fade-right"><Accent text={it1.text} /></p>
                  </li>
    ))}
                </ul>
                <ul>
                  {c.items2.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <li key={i1} className="text-[14px] sm:text-[18px] text-left sm:leading-[30px] text-[#001017] pb-[10px] flex">
                    <p>
                      <i className="fa-solid fa-compact-disc pr-4 font-600 text-[#2b3990]"></i>
                    </p>
                    <p data-aos="fade-right"><Accent text={it1.text} /></p>
                  </li>
    ))}
                </ul>
              </div>
              <p></p>
            </div>
            <div className="m-auto 2xl:col-span-2" data-aos="fade-up">
              <img src={c.image} alt={c.imageAlt} className="mt-6 md:mt-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockSection7() {
  const c = useSection(PAGE, 'section-7', DEFAULTS['section-7']);
  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[100px]" data-aos="fade-up">
          <div className="grid grid-cols-3 xl:grid-cols-5 gap-[20px] sm:gap-[30px] m-auto">
            {c.items.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <Fragment key={i1}>{i1 > 0 && ' '}<img
              src={it1.image}
              alt={it1.imageAlt}
              className={["m-auto xl:w-[210px] grayscale-[90%] hover:grayscale-0 px-2 px-2", "m-auto xl:w-[210px] grayscale-[90%] hover:grayscale-0 px-2 px-2", "m-auto xl:w-[210px] grayscale-[90%] hover:grayscale-0 px-2 px-2", "hidden xl:block m-auto xl:w-[210px] grayscale-[90%] hover:grayscale-0 px-2 px-2", "hidden xl:block m-auto xl:w-[210px] grayscale-[90%] hover:grayscale-0 px-2 px-2"][i1 % 5]}
            /></Fragment>
    ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockConsultWithCornerstoneBpoToday() {
  const c = useSection(PAGE, 'consult-with-cornerstone-bpo-today', DEFAULTS['consult-with-cornerstone-bpo-today']);
  return (
    <div className="bg-[#F0F6FF] border-y-[1px] border-[#e0e0e0] relative font-poppins z-30">
      <div className="px-0 w-full grid grid-cols-12">
        <div className="col-span-1 sm:col-span-2"></div>
        <div className="col-span-12 px-[20px] sm:col-span-8 desktop:col-span-4 w-full desktop:pr-16 desktop:border-r-[1px] border-[#e0e0e0]">
          <div className="py-[70px] desktop:py-[100px]">
            <div className="pt-[30px] sm:pt-[50px]">
              <ContactForm id="bpo-contact-form" />
            </div>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2 desktop:hidden"></div>
        <div className="col-span-1 bg-white sm:col-span-2 desktop:hidden"></div>
        <div className="bg-white col-span-12 sm:col-span-8 px-[20px] desktop:col-span-4 pl-[30px] pr-[30px] py-[30px] desktop:py-0 desktop:pl-[70px] flex justify-center items-center">
          <div>
            <p
              className="my-0 text-[24px] sm:text-[40px] sm:leading-[40px] font-600 text-[#001017]"
              data-aos="fade-right"
            ><Accent text={c.heading} />
            </p>
            <p className="text-[14px] sm:text-[18px] text-[#001017] py-[20px] my-0" data-aos="fade-up"><Accent text={c.text} /></p>
            <div>
              {c.items.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <p key={i1}
                className="text-[14px] sm:text-[18px] text-left text-[#001017] pb-[10px] flex gap-[10px]"
                data-aos="fade-right"
              >
                <span>
                  <i className={["text-[#00aeef] fa-solid fa-envelope pr-3", "text-[#00aeef] fa-solid fa-location-dot pr-3"][i1 % 2]}></i>
                </span>{' '}<Accent text={it1.text} /></p>
    ))}
            </div>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2 bg-white"></div>
      </div>
    </div>
  );
}

const BLOCKS = {
  "hero": <BlockHero />,
  "our-unique-bpo-experience": <BlockOurUniqueBpoExperience />,
  "our-comprehensive-suite-of-services": <BlockOurComprehensiveSuiteOfServices />,
  "we-serve-the-following-industries": <BlockWeServeTheFollowingIndustries />,
  "why-our-bpo-services-are": <BlockWhyOurBpoServicesAre />,
  "cta": <CtaBanner />,
  "section-7": <BlockSection7 />,
  "consult-with-cornerstone-bpo-today": <BlockConsultWithCornerstoneBpoToday />,
};

export default function Bpo() {
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
