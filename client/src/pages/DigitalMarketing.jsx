import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import CtaBanner from '../components/CtaBanner';
import { Fragment } from 'react';
import Accent from '../content/Accent';
import { useLayout, useSection } from '../content/SiteContent';
import { DEFAULTS, LAYOUT } from '../content/service/digital-marketing';

// Markup, classes and animations of every section are unchanged; only texts, links and images come from the CMS
// (built-in content: content/service/digital-marketing.js, used whenever nothing is published or the API is unavailable).
const PAGE = 'digital-marketing';

function BlockHero() {
  const c = useSection(PAGE, 'hero', DEFAULTS['hero']);
  return (
    <div className="bg-[#fff] relative">
      <img
        src={c.image}
        alt={c.imageAlt}
        className="absolute top-0 left-0 z-20 opacity-[5%]"
      />{' '}
      <div className="col-md-8 m-auto">
        <div className="grid grid-cols-1 xl:grid-cols-7 m-auto gap-[80px] pt-[70px] sm:pt-[200px] pb-[70px] sm:pb-[150px]">
          <div className="xl:col-span-4 text-left m-auto pb-[50px] relative z-40">
            <h1
              className="text-[#001017] text-[24px] xl:text-[40px] font-600 relative pb-[30px] my-0"
              data-aos="fade-right"
            ><Accent text={c.heading} />
            </h1>
            <p className="text-[16px] sm:text-[20px] text-[#001017] pb-[50px] my-0" data-aos="flip-up"><Accent text={c.title} /></p>
            <div className="flex items-center" data-aos="flip-up">
              <Link
                to={c.link}
                className="relative flex gap-4 items-center justify-center w-[250px] h-[49px] border-[2px] border-[#2b3990] transform hover:scale-90 transition duration-500 ease-in-out hover:no-underline hover:text-[#2b3990] text-[#2b3990] text-[16px] 2xl:text-[18px] font-semibold"
              >
                <p className="my-auto h-7"><Accent text={c.label} /></p>
                <p className="text-xl my-auto">
                  <i className="fa-solid fa-arrow-right"></i>
                </p>
              </Link>
            </div>
          </div>
          <div className="xl:col-span-3 m-auto">
            <div data-aos="fade-up">
              <img src={c.image2} alt={c.imageAlt2} className="m-auto" />
            </div>
            <div className="grid grid-cols-5 gap-[10px] md:w-[460px] m-auto pt-[50px] relative z-40">
              {c.items.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <Fragment key={i1}>{i1 > 0 && ' '}<img
                src={it1.image}
                alt={it1.imageAlt}
                className="m-auto p-[7px] md:p-[15px] bg-[#fff] shadow-[0_0px_6px_5px_rgba(71,65,166,.03)]"
                data-aos={["flip-right", "flip-left", "flip-right", "flip-left", "flip-right", "flip-left", "flip-right", "flip-left", "flip-right", "flip-left"][i1 % 10]}
              /></Fragment>
    ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockAboutDigitalization() {
  const c = useSection(PAGE, 'about-digitalization', DEFAULTS['about-digitalization']);
  return (
    <div className="bg-[#F0F6FF] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="grid grid-cols-1 2xl:grid-cols-7 gap-[80px]">
            <div className="2xl:col-span-4 m-auto">
              <p
                className="pb-[20px] my-0 text-[24px] sm:text-[40px] font-600 text-[#001017] "
                data-aos="fade-right"
              ><Accent text={c.heading} />
              </p>
              <p
                className="text-[14px] my-0 sm:text-[18px] text-left sm:leading-[30px] text-[#001017] "
                data-aos="fade-up"
              ><Accent text={c.text} /></p>
            </div>
            <div className="2xl:col-span-3 m-auto" data-aos="flip-right">
              <img src={c.image} alt={c.imageAlt} className="mt-6 md:mt-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockOurServices() {
  const c = useSection(PAGE, 'our-services', DEFAULTS['our-services']);
  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="text-center">
            <p className="my-0 text-[24px] sm:text-[40px] font-600 text-[#001017]" data-aos="fade-right"><Accent text={c.heading} />
            </p>
            <p
              className="text-[14px] sm:text-[18px] text-[#001017] pt-[20px] xl:px-[20px] my-0"
              data-aos="flip-up"
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
            <div className="p-[20px] border-[1px] border-[#E0E0E0] relative bg-white">
              <div>
                <div className="w-[48px] h-[48px]">
                  <img src={c.image} alt={c.imageAlt} />
                </div>
                <p
                  className="text-[18px] sm:text-[24px] sm:leading-[30px] text-[#001017] pt-[20px] my-0"
                  style={{ fontWeight: '600' }}
                ><Accent text={c.title} /></p>
              </div>
              <p
                className="text-[14px] sm:text-[16px] text-[#001017] py-[20px] my-0"
                style={{ fontWeight: '400' }}
                data-aos="fade-right"
              ><Accent text={c.text4} /></p>{' '}
              <Link
                to={c.link2}
                className="hover:no-underline hover:text-[#00aeef] text-[14px] sm:text-[16px] text-center text-[#2b3990] gap-2 flex items-center"
              >
                <p className=""><Accent text={c.label2} /></p>
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
            <div className="p-[20px] border-[1px] border-[#E0E0E0] relative bg-white">
              <div>
                <div className="w-[48px] h-[48px]">
                  <img src={c.image2} alt={c.imageAlt2} />
                </div>
                <p
                  className="text-[18px] sm:text-[24px] sm:leading-[30px] text-[#001017] pt-[20px] my-0"
                  style={{ fontWeight: '600' }}
                ><Accent text={c.title2} /></p>
              </div>
              <p
                className="text-[14px] sm:text-[16px] text-[#001017] py-[20px] my-0"
                style={{ fontWeight: '400' }}
                data-aos="fade-right"
              ><Accent text={c.text5} /></p>{' '}
              <Link
                to={c.link3}
                className="hover:no-underline hover:text-[#00aeef] text-[14px] sm:text-[16px] text-center text-[#2b3990] gap-2 flex items-center"
              >
                <p className=""><Accent text={c.label3} /></p>
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
            <div className="p-[20px] border-[1px] border-[#E0E0E0] relative bg-white">
              <div>
                <div className="w-[48px] h-[48px]">
                  <img src={c.image3} alt={c.imageAlt3} />
                </div>
                <p
                  className="text-[18px] sm:text-[24px] sm:leading-[30px] text-[#001017] pt-[20px] my-0"
                  style={{ fontWeight: '600' }}
                ><Accent text={c.title3} /></p>
              </div>
              <p
                className="text-[14px] sm:text-[16px] text-[#001017] py-[20px] my-0"
                style={{ fontWeight: '400' }}
                data-aos="fade-right"
              ><Accent text={c.text6} /></p>{' '}
              <Link
                to={c.link4}
                className="hover:no-underline hover:text-[#00aeef] text-[14px] sm:text-[16px] text-center text-[#2b3990] gap-2 flex items-center"
              >
                <p className=""><Accent text={c.label4} /></p>
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
            <div className="p-[20px] border-[1px] border-[#E0E0E0] relative bg-white">
              <div>
                <div className="w-[48px] h-[48px]">
                  <img src={c.image4} alt={c.imageAlt4} />
                </div>
                <p
                  className="text-[18px] sm:text-[24px] sm:leading-[30px] text-[#001017] pt-[20px] my-0"
                  style={{ fontWeight: '600' }}
                ><Accent text={c.title4} /></p>
              </div>
              <p
                className="text-[14px] sm:text-[16px] text-[#001017] py-[20px] my-0"
                style={{ fontWeight: '400' }}
                data-aos="fade-right"
              ><Accent text={c.text7} /></p>{' '}
              <Link
                to={c.link5}
                className="hover:no-underline hover:text-[#00aeef] text-[14px] sm:text-[16px] text-center text-[#2b3990] gap-2 flex items-center"
              >
                <p className=""><Accent text={c.label5} /></p>
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
            <div className="p-[20px] border-[1px] border-[#E0E0E0] relative bg-white">
              <div>
                <div className="w-[48px] h-[48px]">
                  <img src={c.image5} alt={c.imageAlt5} />
                </div>
                <p
                  className="text-[18px] sm:text-[24px] sm:leading-[30px] text-[#001017] pt-[20px] my-0"
                  style={{ fontWeight: '600' }}
                ><Accent text={c.title5} /></p>
              </div>
              <p
                className="text-[14px] sm:text-[16px] text-[#001017] py-[20px] my-0"
                style={{ fontWeight: '400' }}
                data-aos="fade-right"
              ><Accent text={c.text8} /></p>{' '}
              <Link
                to={c.link6}
                className="hover:no-underline hover:text-[#00aeef] text-[14px] sm:text-[16px] text-center text-[#2b3990] gap-2 flex items-center"
              >
                <p className=""><Accent text={c.label6} /></p>
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
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockOurProcess() {
  const c = useSection(PAGE, 'our-process', DEFAULTS['our-process']);
  return (
    <div className="bg-[#F0F6FF] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="text-center">
            <div>
              <p className="my-0 text-[24px] sm:text-[40px] font-600 text-[#001017] " data-aos="fade-right"><Accent text={c.heading} />
              </p>
              <p className="text-[14px] sm:text-[18px] my-0 text-[#001017] xl:px-[20px]" data-aos="flip-up"><Accent text={c.text} /></p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-[20px] sm:gap-[40px] pt-[50px]">
            <div className="border-[2px] border-[#C0C4DE] rounded-[18px] relative" data-aos="flip-up">
              <div className="px-[30px] py-[24px]">
                <p className="my-0 pb-[8px]">
                  <i className="text-[24px] text-[#00aeef] fa-brands fa-searchengin"></i>
                </p>
                <p className="text-[14px] m-auto sm:text-[16px] text-[#001017]"><Accent text={c.text2} /></p>
              </div>
              <div className="w-[25px] h-[2px] bg-[#2b3990] absolute -bottom-[2px] left-1/2 -translate-x-1/2"></div>
            </div>
            {c.items.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <div key={i1} className="border-[2px] border-[#C0C4DE] rounded-[18px] relative" data-aos={["flip-down", "flip-up", "flip-down", "flip-up"][i1 % 4]}>
              <div className={["w-[25px] h-[2px] bg-[#00aeef] absolute -top-[2px] left-1/2 -translate-x-1/2", "w-[25px] h-[2px] bg-[#2b3990] absolute -top-[2px] left-1/2 -translate-x-1/2", "w-[25px] h-[2px] bg-[#00aeef] absolute -top-[2px] left-1/2 -translate-x-1/2", "w-[25px] h-[2px] bg-[#2b3990] absolute -top-[2px] left-1/2 -translate-x-1/2"][i1 % 4]}></div>
              <div className="px-[30px] py-[24px]">
                <p className="my-0 pb-[8px]">
                  <i className={["text-[24px] text-[#00aeef] fa-brands fa-figma", "text-[24px] text-[#00aeef] fa-solid fa-file-invoice", "text-[24px] text-[#00aeef] fa-solid fa-users", "text-[24px] text-[#00aeef] fa-solid fa-code"][i1 % 4]}></i>
                </p>
                <p className="text-[14px] m-auto sm:text-[16px] text-[#001017]"><Accent text={it1.text} /></p>
              </div>
              <div className={["w-[25px] h-[2px] bg-[#2b3990] absolute -bottom-[2px] left-1/2 -translate-x-1/2", "w-[25px] h-[2px] bg-[#00aeef] absolute -bottom-[2px] left-1/2 -translate-x-1/2", "w-[25px] h-[2px] bg-[#2b3990] absolute -bottom-[2px] left-1/2 -translate-x-1/2", "w-[25px] h-[2px] bg-[#00aeef] absolute -bottom-[2px] left-1/2 -translate-x-1/2"][i1 % 4]}></div>
            </div>
    ))}
            <div className="border-[2px] border-[#C0C4DE] rounded-[18px] relative" data-aos="flip-down">
              <div className="w-[25px] h-[2px] bg-[#00aeef] absolute -top-[2px] left-1/2 -translate-x-1/2"></div>
              <div className="px-[30px] py-[24px]">
                <p className="my-0 pb-[8px]">
                  <i className="text-[24px] text-[#00aeef] fa-solid fa-shop"></i>
                </p>
                <p className="text-[14px] m-auto sm:text-[16px] text-[#001017]"><Accent text={c.text3} /></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockFeaturedWork() {
  const c = useSection(PAGE, 'featured-work', DEFAULTS['featured-work']);
  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div className="text-center">
            <p className="my-0 text-[24px] sm:text-[40px] font-600 text-[#001017] " data-aos="fade-right"><Accent text={c.heading} />
            </p>
            <p
              className="text-[14px] sm:text-[18px] text-[#001017] pt-[20px] xl:px-[20px] my-0"
              data-aos="flip-up"
            ><Accent text={c.text} /></p>
          </div>
          <div className="pt-[50px] grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-[20px]">
            {c.items.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <div key={i1} className="grayscale-[80%] hover:grayscale-0" data-aos={["fade-right", "flip-right", "fade-right", "fade-right", "flip-right", "fade-right"][i1 % 6]}>
              <img
                src={it1.image}
                alt={it1.imageAlt}
                className=""
              />
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
          <div className="grid grid-cols-1 2xl:grid-cols-9 gap-[80px]">
            <div className="m-auto 2xl:col-span-5">
              <h2
                className="text-[#001017] text-[24px] xl:text-[40px] font-600 relative pt-[20px] sm:pt-0 pb-[20px] my-0"
                data-aos="fade-right"
              ><Accent text={c.heading} />
              </h2>
              <div className="flex flex-col gap-[20px]">
                {c.items.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <div key={i1} className="text-[14px] sm:text-[18px] text-left sm:leading-[30px] text-[#001017] flex gap-3">
                  <p className="my-0">
                    <i className="fa-solid fa-compact-disc font-600 text-[#2b3990]"></i>
                  </p>
                  <p
                    className="my-0 text-[14px] sm:text-[18px] text-[#001017] sm:leading-[22px]"
                    data-aos="fade-right"
                  ><Accent text={it1.text} /></p>
                </div>
    ))}
              </div>
            </div>
            <div className="2xl:col-span-4 m-auto" data-aos="flip-up">
              <img src={c.image} alt={c.imageAlt} className="mt-6 md:mt-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockSection8() {
  const c = useSection(PAGE, 'section-8', DEFAULTS['section-8']);
  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[100px]">
          <div className="grid grid-cols-3 xl:grid-cols-5 gap-[20px] sm:gap-[30px] m-auto">
            {c.items.filter((it1) => it1.visible !== false).map((it1, i1) => (
    <Fragment key={i1}>{i1 > 0 && ' '}<img
              src={it1.image}
              alt={it1.imageAlt}
              className={["m-auto xl:w-[210px] grayscale-[90%] hover:grayscale-0 px-2", "m-auto xl:w-[210px] grayscale-[90%] hover:grayscale-0 px-2", "m-auto xl:w-[210px] grayscale-[90%] hover:grayscale-0 px-2", "hidden xl:block m-auto xl:w-[210px] grayscale-[90%] hover:grayscale-0 px-2", "hidden xl:block m-auto xl:w-[210px] grayscale-[90%] hover:grayscale-0 px-2"][i1 % 5]}
              data-aos={["fade-right", "fade-up", "fade-down", "flip-right", "flip-up"][i1 % 5]}
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
              <ContactForm id="digital-marketing-contact-form" />
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
  "about-digitalization": <BlockAboutDigitalization />,
  "our-services": <BlockOurServices />,
  "our-process": <BlockOurProcess />,
  "featured-work": <BlockFeaturedWork />,
  "why-choose-cornerstone-medical-solut": <BlockWhyChooseCornerstoneMedicalSolut />,
  "cta": <CtaBanner />,
  "section-8": <BlockSection8 />,
  "consult-with-cornerstone-bpo-today": <BlockConsultWithCornerstoneBpoToday />,
};

export default function DigitalMarketing() {
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
