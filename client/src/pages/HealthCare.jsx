import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import CtaBanner from '../components/CtaBanner';
import { Fragment } from 'react';
import Accent from '../content/Accent';
import { useLayout, useSection } from '../content/SiteContent';
import { DEFAULTS, LAYOUT } from '../content/service/health-care';

// Markup, classes and animations of every section are unchanged; only texts, links and images come from the CMS
// (built-in content: content/service/health-care.js, used whenever nothing is published or the API is unavailable).
const PAGE = 'health-care';

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

function BlockAboutHealthCare() {
  const c = useSection(PAGE, 'about-health-care', DEFAULTS['about-health-care']);
  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="grid grid-cols-1 2xl:grid-cols-5 gap-[30px]">
            <div className="m-auto 2xl:col-span-3">
              <p
                className="my-0 pb-[20px] text-[24px] sm:text-[40px] font-600 text-[#001017] "
                data-aos="fade-right"
              ><Accent text={c.heading} />
              </p>
              <p
                className="text-[14px] sm:text-[18px] text-left sm:leading-[30px] text-[#001017]"
                data-aos="fade-down"
              ><Accent text={c.text} /><br /><Accent text={c.text2} /></p>
            </div>
            <div className="2xl:col-span-2 m-auto" data-aos="fade-up">
              <img src={c.image} alt={c.imageAlt} className="mt-6 md:mt-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockMedicalBilling() {
  const c = useSection(PAGE, 'medical-billing', DEFAULTS['medical-billing']);
  return (
    <div className="bg-[#F0F6FF] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="text-center">
            <p className="my-0 text-[24px] sm:text-[40px] font-600 text-[#001017] " data-aos="fade-right"><Accent text={c.heading} />
            </p>
            <p
              className="text-[14px] sm:text-[18px] text-[#001017] pb-[50px] pt-[20px] 2xl:px-[100px] my-0"
              data-aos="flip-down"
            ><Accent text={c.text} /></p>
          </div>
          <div className="grid grid-cols-1 2xl:grid-cols-5 gap-[20px] 2xl:gap-[50px]">
            <div className="2xl:col-span-2 m-auto" data-aos="fade-right">
              <img src={c.image} alt={c.imageAlt} className="mt-6 md:mt-0" />
            </div>
            <div className="m-auto 2xl:col-span-3">
              <h2
                className="text-[#001017] text-[24px] xl:text-[34px] xl:leading-[38px] font-600 relative pt-[20px] sm:pt-0 pb-[30px]"
                data-aos="fade-right"
              ><Accent text={c.heading2} />
              </h2>
              <p
                className="text-[14px] sm:text-[18px] text-left sm:leading-[30px] text-[#001017] pb-[35px] xl:w-[650px]"
                data-aos="fade-up"
              ><Accent text={c.text2} /></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockServiceWeProvide() {
  const c = useSection(PAGE, 'service-we-provide', DEFAULTS['service-we-provide']);
  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="">
            <div>
              <p className="my-0 text-[24px] sm:text-[40px] font-600 text-[#001017]" data-aos="fade-right"><Accent text={c.heading} />
              </p>
              <p
                className="text-[14px] sm:text-[18px] text-left text-[#001017] pt-[20px] my-0"
                data-aos="flip-up"
              ><Accent text={c.text} /></p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-[20px] pt-[50px]">
            <div
              className="border-[2px] border-[#C0C4DE] rounded-[18px] relative flex items-center justify-center px-[30px] py-[24px]"
              data-aos="fade-right"
            >
              <div className="text-center">
                <p className="">
                  <i className="text-[24px] text-[#00aeef] fa-solid fa-file"></i>
                </p>
                <p className="text-[14px] m-auto sm:text-[16px] sm:leading-[20px] text-[#001017]">
                  <Accent text={c.text2} />
                </p>
              </div>
              <div className="w-[25px] h-[2px] bg-[#2b3990] absolute -bottom-[2px] left-1/2 -translate-x-1/2"></div>
            </div>
            {c.items.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <div key={i1}
              className="border-[2px] border-[#C0C4DE] rounded-[18px] relative flex items-center justify-center px-[30px] py-[24px]"
              data-aos={["flip-right", "fade-right", "flip-right", "fade-right"][i1 % 4]}
            >
              <div className={["w-[25px] h-[2px] bg-[#00aeef] absolute -top-[2px] left-1/2 -translate-x-1/2", "w-[25px] h-[2px] bg-[#2b3990] absolute -top-[2px] left-1/2 -translate-x-1/2", "w-[25px] h-[2px] bg-[#00aeef] absolute -top-[2px] left-1/2 -translate-x-1/2", "w-[25px] h-[2px] bg-[#2b3990] absolute -top-[2px] left-1/2 -translate-x-1/2"][i1 % 4]}></div>
              <div className="text-center">
                <p className="">
                  <i className={["text-[24px] text-[#00aeef] fa-solid fa-recycle", "text-[24px] text-[#00aeef] fa-solid fa-file-invoice", "text-[24px] text-[#00aeef] fa-solid fa-circle-xmark", "text-[24px] text-[#00aeef] fa-solid fa-credit-card"][i1 % 4]}></i>
                </p>
                <p className="text-[14px] m-auto sm:text-[16px] sm:leading-[20px] text-[#001017]"><Accent text={it1.text} /></p>
              </div>
              <div className={["w-[25px] h-[2px] bg-[#2b3990] absolute -bottom-[2px] left-1/2 -translate-x-1/2", "w-[25px] h-[2px] bg-[#00aeef] absolute -bottom-[2px] left-1/2 -translate-x-1/2", "w-[25px] h-[2px] bg-[#2b3990] absolute -bottom-[2px] left-1/2 -translate-x-1/2", "w-[25px] h-[2px] bg-[#00aeef] absolute -bottom-[2px] left-1/2 -translate-x-1/2"][i1 % 4]}></div>
            </div>
    ))}
            <div
              className="border-[2px] border-[#C0C4DE] rounded-[18px] relative flex items-center justify-center px-[30px] py-[24px]"
              data-aos="flip-right"
            >
              <div className="w-[25px] h-[2px] bg-[#00aeef] absolute -top-[2px] left-1/2 -translate-x-1/2"></div>
              <div className="text-center">
                <p className="">
                  <i className="text-[24px] text-[#00aeef] fa-solid fa-house"></i>
                </p>
                <p className="text-[14px] m-auto sm:text-[16px] sm:leading-[20px] text-[#001017]"><Accent text={c.text3} /></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockMedicalTranscriptions() {
  const c = useSection(PAGE, 'medical-transcriptions', DEFAULTS['medical-transcriptions']);
  return (
    <div className="bg-[#F0F6FF] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="text-center">
            <p className="my-0 text-[24px] sm:text-[40px] font-600 text-[#001017] " data-aos="fade-right"><Accent text={c.heading} />
            </p>
            <p
              className="text-[14px] sm:text-[18px] text-[#001017] pb-[50px] pt-[20px] 2xl:px-[100px] m-auto"
              data-aos="fade-up"
            ><Accent text={c.text} /></p>
          </div>
          <div className="grid grid-cols-1 2xl:grid-cols-5 gap-[50px]">
            <div className="m-auto 2xl:col-span-3">
              <h2
                className="text-[#001017] text-[24px] xl:text-[34px] font-600 relative pt-[20px] sm:pt-0 pb-[30px] my-0"
                data-aos="fade-right"
              ><Accent text={c.heading2} />
              </h2>
              <p
                className="text-[14px] sm:text-[18px] text-left sm:leading-[30px] text-[#001017] my-0"
                data-aos="fade-up"
              ><Accent text={c.text2} /><br /><Accent text={c.text3} /></p>
            </div>
            <div className="2xl:col-span-2 m-auto" data-aos="flip-right">
              <img src={c.image} alt={c.imageAlt} className="mt-6 md:mt-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockManagementServices() {
  const c = useSection(PAGE, 'management-services', DEFAULTS['management-services']);
  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div>
            <p
              className="my-0 text-[24px] sm:text-[40px] font-600 text-[#001017]  text-center"
              data-aos="fade-right"
            ><Accent text={c.heading} />
            </p>
            <p
              className="text-[14px] sm:text-[18px] text-center text-[#001017] pb-[40px] pt-[20px] xl:px-[20px] my-0"
              data-aos="fade-up"
            ><Accent text={c.text} /></p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-[20px] 2xl:px-[100px] min-[2000px]:w-[1420px] m-auto">
            {c.items.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <div key={i1} data-aos={["fade-up", "fade-down", "fade-right", "flip-right", "fade-down"][i1 % 5]}>
              <img
                src={it1.image}
                alt={it1.imageAlt}
                className="m-auto w-[127px] h-[90px]"
              />{' '}
              <p className="text=-[16px] sm:text-[18px] sm:leading-[20px] font-600 text-[#001017] text-center pt-[20px]"><Accent text={it1.title} /></p>
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
          <div className="grid grid-cols-1 2xl:grid-cols-5 gap-[86px]">
            <div className="m-auto 2xl:col-span-3">
              <h2
                className="text-[#001017] text-[24px] xl:text-[40px] font-600 relative my-0 pt-[20px] sm:pt-0 pb-[20px]"
                data-aos="fade-right"
              ><Accent text={c.heading} />
              </h2>
              <p
                className="my-0 text-[14px] sm:text-[18px] text-left sm:leading-[30px] text-[#001017]"
                data-aos="fade-up"
              ><Accent text={c.text} /></p>
            </div>
            <div className="2xl:col-span-2 m-auto" data-aos="fade-up">
              <img src={c.image} alt={c.imageAlt} className="mt-6 md:mt-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockSection9() {
  const c = useSection(PAGE, 'section-9', DEFAULTS['section-9']);
  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[100px]">
          <div className="grid grid-cols-3 xl:grid-cols-5 gap-[20px] sm:gap-[30px] m-auto">
            {c.items.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <Fragment key={i1}>{i1 > 0 && ' '}<img
              src={it1.image}
              alt={it1.imageAlt}
              className={["m-auto xl:w-[210px] grayscale-[90%] hover:grayscale-0 px-2 px-2", "m-auto xl:w-[210px] grayscale-[90%] hover:grayscale-0 px-2 px-2", "m-auto xl:w-[210px] grayscale-[90%] hover:grayscale-0 px-2 px-2", "hidden xl:block m-auto xl:w-[210px] grayscale-[90%] hover:grayscale-0 px-2 px-2", "hidden xl:block m-auto xl:w-[210px] grayscale-[90%] hover:grayscale-0 px-2 px-2"][i1 % 5]}
              data-aos={["fade-up", "fade-down", "fade-right", "flip-up", "flip-down"][i1 % 5]}
            /></Fragment>
    ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockBookAFreeConsultation() {
  const c = useSection(PAGE, 'book-a-free-consultation', DEFAULTS['book-a-free-consultation']);
  return (
    <div className="bg-[#F0F6FF] border-y-[1px] border-[#e0e0e0] relative font-poppins z-30">
      <div className="px-0 w-full grid grid-cols-12">
        <div className="col-span-1 sm:col-span-2"></div>
        <div className="col-span-12 px-[20px] sm:col-span-8 desktop:col-span-4 w-full desktop:pr-16 desktop:border-r-[1px] border-[#e0e0e0]">
          <div className="py-[70px] desktop:py-[100px]">
            <div className="pt-[30px] sm:pt-[50px]">
              <ContactForm id="healthcare-contact-form" />
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
  "about-health-care": <BlockAboutHealthCare />,
  "medical-billing": <BlockMedicalBilling />,
  "service-we-provide": <BlockServiceWeProvide />,
  "medical-transcriptions": <BlockMedicalTranscriptions />,
  "management-services": <BlockManagementServices />,
  "why-choose-cornerstone-medical-solut": <BlockWhyChooseCornerstoneMedicalSolut />,
  "cta": <CtaBanner />,
  "section-9": <BlockSection9 />,
  "book-a-free-consultation": <BlockBookAFreeConsultation />,
};

export default function HealthCare() {
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
