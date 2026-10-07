import { Link } from 'react-router-dom';
import CtaBanner from '../components/CtaBanner';

export default function DigitalMarketing() {
  return (
    <>
      <div className="bg-[#fff] relative">
        <img
          src="/assets/pics/bg-pattern-2.webp"
          alt=""
          className="absolute top-0 left-0 z-20 opacity-[5%]"
        />{' '}
        <div className="col-md-8 m-auto">
          <div className="grid grid-cols-1 xl:grid-cols-7 m-auto gap-[80px] pt-[70px] sm:pt-[200px] pb-[70px] sm:pb-[150px]">
            <div className="xl:col-span-4 text-left m-auto pb-[50px] relative z-40">
              <h1
                className="text-[#001017] text-[24px] xl:text-[40px] font-600 relative pb-[30px] my-0"
                data-aos="fade-right"
              >
                Drive Your Business On the Wheels Of <span className="text-[#00aeef]">Digitalization</span>
              </h1>
              <p className="text-[16px] sm:text-[20px] text-[#001017] pb-[50px] my-0" data-aos="flip-up">
                Revolutionizing businesses with cutting-edge digital solutions. We bring your brand to the
                forefront of the digital world through our innovative services.
              </p>
              <div className="flex items-center" data-aos="flip-up">
                <Link
                  to="/contact-us"
                  className="relative flex gap-4 items-center justify-center w-[250px] h-[49px] border-[2px] border-[#2b3990] transform hover:scale-90 transition duration-500 ease-in-out hover:no-underline hover:text-[#2b3990] text-[#2b3990] text-[16px] 2xl:text-[18px] font-semibold"
                >
                  <p className="my-auto h-7">Free Consultation</p>
                  <p className="text-xl my-auto">
                    <i className="fa-solid fa-arrow-right"></i>
                  </p>
                </Link>
              </div>
            </div>
            <div className="xl:col-span-3 m-auto">
              <div data-aos="fade-up">
                <img src="/assets/pics/parent/dm-hero.webp" alt="Digital marketing services" className="m-auto" />
              </div>
              <div className="grid grid-cols-5 gap-[10px] md:w-[460px] m-auto pt-[50px] relative z-40">
                <img
                  src="/assets/pics/icons/ai.svg"
                  alt=""
                  className="m-auto p-[7px] md:p-[15px] bg-[#fff] shadow-[0_0px_6px_5px_rgba(71,65,166,.03)]"
                  data-aos="flip-right"
                />{' '}
                <img
                  src="/assets/pics/icons/au.svg"
                  alt=""
                  className="m-auto p-[7px] md:p-[15px] bg-[#fff] shadow-[0_0px_6px_5px_rgba(71,65,166,.03)]"
                  data-aos="flip-left"
                />{' '}
                <img
                  src="/assets/pics/icons/af.svg"
                  alt=""
                  className="m-auto p-[7px] md:p-[15px] bg-[#fff] shadow-[0_0px_6px_5px_rgba(71,65,166,.03)]"
                  data-aos="flip-right"
                />{' '}
                <img
                  src="/assets/pics/icons/ps.svg"
                  alt=""
                  className="m-auto p-[7px] md:p-[15px] bg-[#fff] shadow-[0_0px_6px_5px_rgba(71,65,166,.03)]"
                  data-aos="flip-left"
                />{' '}
                <img
                  src="/assets/pics/icons/xd.svg"
                  alt=""
                  className="m-auto p-[7px] md:p-[15px] bg-[#fff] shadow-[0_0px_6px_5px_rgba(71,65,166,.03)]"
                  data-aos="flip-right"
                />{' '}
                <img
                  src="/assets/pics/icons/lara.svg"
                  alt=""
                  className="m-auto p-[7px] md:p-[15px] bg-[#fff] shadow-[0_0px_6px_5px_rgba(71,65,166,.03)]"
                  data-aos="flip-left"
                />{' '}
                <img
                  src="/assets/pics/icons/react.svg"
                  alt=""
                  className="m-auto p-[7px] md:p-[15px] bg-[#fff] shadow-[0_0px_6px_5px_rgba(71,65,166,.03)]"
                  data-aos="flip-right"
                />{' '}
                <img
                  src="/assets/pics/icons/cs.svg"
                  alt=""
                  className="m-auto p-[7px] md:p-[15px] bg-[#fff] shadow-[0_0px_6px_5px_rgba(71,65,166,.03)]"
                  data-aos="flip-left"
                />{' '}
                <img
                  src="/assets/pics/icons/py.svg"
                  alt=""
                  className="m-auto p-[7px] md:p-[15px] bg-[#fff] shadow-[0_0px_6px_5px_rgba(71,65,166,.03)]"
                  data-aos="flip-right"
                />{' '}
                <img
                  src="/assets/pics/icons/java.svg"
                  alt=""
                  className="m-auto p-[7px] md:p-[15px] bg-[#fff] shadow-[0_0px_6px_5px_rgba(71,65,166,.03)]"
                  data-aos="flip-left"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F0F6FF] relative z-40">
        <div className="col-md-8 m-auto">
          <div className="py-[70px] sm:py-[150px]">
            <div className="grid grid-cols-1 2xl:grid-cols-7 gap-[80px]">
              <div className="2xl:col-span-4 m-auto">
                <p
                  className="pb-[20px] my-0 text-[24px] sm:text-[40px] font-600 text-[#001017] "
                  data-aos="fade-right"
                >
                  About<span className="text-[#00aeef]">Digitalization</span>
                </p>
                <p
                  className="text-[14px] my-0 sm:text-[18px] text-left sm:leading-[30px] text-[#001017] "
                  data-aos="fade-up"
                >
                  Cornerstone Medical Solutions is a full-service digital marketing agency that provides comprehensive
                  solutions for businesses of all sizes. In addition to digital marketing, we offer graphic
                  designing and web development services to help businesses establish a strong online
                  presence. Our data-driven approach and skilled team deliver measurable results through SEO,
                  PPC, social media, email, and content marketing. Whether you need a website designed or a
                  social media campaign managed, we have the expertise to help you succeed. Our commitment to
                  transparency and excellent customer service ensures that our clients are always informed and
                  satisfied with our services. Our ultimate goal is to help businesses grow and achieve their
                  objectives through strategic digital marketing campaigns, graphic designing, and web
                  development.
                </p>
              </div>
              <div className="2xl:col-span-3 m-auto" data-aos="flip-right">
                <img src="/assets/pics/parent/dm-about.webp" alt="About our digital marketing team" className="mt-6 md:mt-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#fff] relative z-40">
        <div className="col-md-8 m-auto">
          <div className="py-[70px] sm:py-[150px]">
            <div className="text-center">
              <p className="my-0 text-[24px] sm:text-[40px] font-600 text-[#001017]" data-aos="fade-right">
                Our<span className="text-[#00aeef]">Services</span>
              </p>
              <p
                className="text-[14px] sm:text-[18px] text-[#001017] pt-[20px] xl:px-[20px] my-0"
                data-aos="flip-up"
              >
                Looking for exceptional digital solutions for your business? Look no further than our
                comprehensive services at Cornerstone Medical Solutions. Our team of experts specializes in UI/UX design,
                web development, graphic designing, search engine optimization, and social media marketing to
                provide you with everything you need to take your business to the next level. With our
                cutting-edge technology and innovative strategies, we can help you achieve your digital goals
                and grow your business in today's competitive market. Trust us to deliver outstanding results
                that will exceed your expectations.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-[30px] m-auto pt-[80px] div1">
              <div className="p-[20px] border-[1px] border-[#E0E0E0] relative bg-white">
                <div className="md:pt-[50px]">
                  <p
                    className="text-[24px] sm:text-[36px] sm:leading-[40px] text-[#001017] pt-[20px] my-0"
                    style={{ fontWeight: '600' }}
                  >
                    Our Expectational Services
                  </p>
                </div>
                <p
                  className="text-[14px] sm:text-[16px] text-[#001017] pt-[20px] my-0"
                  style={{ fontWeight: '400' }}
                  data-aos="fade-right"
                >
                  Tailored just for you!
                </p>
                <div className="flex items-center mt-[30px]" data-aos="flip-up">
                  <Link
                    to="/contact-us"
                    className="relative flex gap-4 items-center justify-center w-[200px] h-[49px] border-[2px] border-[#2b3990] transform hover:scale-90 transition duration-500 ease-in-out hover:no-underline hover:text-[#2b3990] text-[#2b3990] text-[16px] 2xl:text-[18px] font-semibold"
                  >
                    <p className="my-auto h-7">Get In Touch</p>
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
                    <img src="/assets/pics/newicon/figma.svg" alt="" />
                  </div>
                  <p
                    className="text-[18px] sm:text-[24px] sm:leading-[30px] text-[#001017] pt-[20px] my-0"
                    style={{ fontWeight: '600' }}
                  >
                    UI/UX Design
                  </p>
                </div>
                <p
                  className="text-[14px] sm:text-[16px] text-[#001017] py-[20px] my-0"
                  style={{ fontWeight: '400' }}
                  data-aos="fade-right"
                >
                  UI/UX design is the process of creating user-friendly and engaging interfaces for digital
                  products or services. Our team of experts is skilled in designing interfaces that provide a
                  seamless and intuitive user experience.
                </p>{' '}
                <Link
                  to="/ui-ux-designing"
                  className="hover:no-underline hover:text-[#00aeef] text-[14px] sm:text-[16px] text-center text-[#2b3990] gap-2 flex items-center"
                >
                  <p className="">Read More</p>
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
                    <img src="/assets/pics/newicon/web.svg" alt="" />
                  </div>
                  <p
                    className="text-[18px] sm:text-[24px] sm:leading-[30px] text-[#001017] pt-[20px] my-0"
                    style={{ fontWeight: '600' }}
                  >
                    Web Development
                  </p>
                </div>
                <p
                  className="text-[14px] sm:text-[16px] text-[#001017] py-[20px] my-0"
                  style={{ fontWeight: '400' }}
                  data-aos="fade-right"
                >
                  Our web development team has the expertise to build responsive and scalable websites that
                  meet the needs of businesses of all sizes.
                </p>{' '}
                <Link
                  to="/web-development"
                  className="hover:no-underline hover:text-[#00aeef] text-[14px] sm:text-[16px] text-center text-[#2b3990] gap-2 flex items-center"
                >
                  <p className="">Read More</p>
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
                    <img src="/assets/pics/newicon/graphic-design.svg" alt="" />
                  </div>
                  <p
                    className="text-[18px] sm:text-[24px] sm:leading-[30px] text-[#001017] pt-[20px] my-0"
                    style={{ fontWeight: '600' }}
                  >
                    Graphic Designing
                  </p>
                </div>
                <p
                  className="text-[14px] sm:text-[16px] text-[#001017] py-[20px] my-0"
                  style={{ fontWeight: '400' }}
                  data-aos="fade-right"
                >
                  Our graphic designing team creates visually appealing designs that effectively communicate
                  our clients brand identity and messaging.
                </p>{' '}
                <Link
                  to="/graphic-designing"
                  className="hover:no-underline hover:text-[#00aeef] text-[14px] sm:text-[16px] text-center text-[#2b3990] gap-2 flex items-center"
                >
                  <p className="">Read More</p>
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
                    <img src="/assets/pics/newicon/seo-optimization.svg" alt="" />
                  </div>
                  <p
                    className="text-[18px] sm:text-[24px] sm:leading-[30px] text-[#001017] pt-[20px] my-0"
                    style={{ fontWeight: '600' }}
                  >
                    Search Engine Optimization
                  </p>
                </div>
                <p
                  className="text-[14px] sm:text-[16px] text-[#001017] py-[20px] my-0"
                  style={{ fontWeight: '400' }}
                  data-aos="fade-right"
                >
                  Our team of SEO specialists implements a variety of methods to enhance search engine
                  rankings and generate website traffic for our clients.
                </p>{' '}
                <Link
                  to="/search-engine-optimization"
                  className="hover:no-underline hover:text-[#00aeef] text-[14px] sm:text-[16px] text-center text-[#2b3990] gap-2 flex items-center"
                >
                  <p className="">Read More</p>
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
                    <img src="/assets/pics/newicon/social-media.svg" alt="" />
                  </div>
                  <p
                    className="text-[18px] sm:text-[24px] sm:leading-[30px] text-[#001017] pt-[20px] my-0"
                    style={{ fontWeight: '600' }}
                  >
                    Social Media Marketing
                  </p>
                </div>
                <p
                  className="text-[14px] sm:text-[16px] text-[#001017] py-[20px] my-0"
                  style={{ fontWeight: '400' }}
                  data-aos="fade-right"
                >
                  Twenty-Four Seven’s media marketing team creates engaging content and uses targeted
                  advertising to connect with our clients audiences and achieve their marketing goals.
                </p>{' '}
                <Link
                  to="/social-media-marketing"
                  className="hover:no-underline hover:text-[#00aeef] text-[14px] sm:text-[16px] text-center text-[#2b3990] gap-2 flex items-center"
                >
                  <p className="">Read More</p>
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
      <div className="bg-[#F0F6FF] relative z-40">
        <div className="col-md-8 m-auto">
          <div className="py-[70px] sm:py-[150px]">
            <div className="text-center">
              <div>
                <p className="my-0 text-[24px] sm:text-[40px] font-600 text-[#001017] " data-aos="fade-right">
                  Our<span className="text-[#00aeef]">Process</span>
                </p>
                <p className="text-[14px] sm:text-[18px] my-0 text-[#001017] xl:px-[20px]" data-aos="flip-up">
                  At our company, we follow a streamlined process to ensure that our clients receive the
                  highest quality services and products. Our process is divided into the following steps:
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-[20px] sm:gap-[40px] pt-[50px]">
              <div className="border-[2px] border-[#C0C4DE] rounded-[18px] relative" data-aos="flip-up">
                <div className="px-[30px] py-[24px]">
                  <p className="my-0 pb-[8px]">
                    <i className="text-[24px] text-[#00aeef] fa-brands fa-searchengin"></i>
                  </p>
                  <p className="text-[14px] m-auto sm:text-[16px] text-[#001017]">Research</p>
                </div>
                <div className="w-[25px] h-[2px] bg-[#2b3990] absolute -bottom-[2px] left-1/2 -translate-x-1/2"></div>
              </div>
              <div className="border-[2px] border-[#C0C4DE] rounded-[18px] relative" data-aos="flip-down">
                <div className="w-[25px] h-[2px] bg-[#00aeef] absolute -top-[2px] left-1/2 -translate-x-1/2"></div>
                <div className="px-[30px] py-[24px]">
                  <p className="my-0 pb-[8px]">
                    <i className="text-[24px] text-[#00aeef] fa-brands fa-figma"></i>
                  </p>
                  <p className="text-[14px] m-auto sm:text-[16px] text-[#001017]">UI/UX Design</p>
                </div>
                <div className="w-[25px] h-[2px] bg-[#2b3990] absolute -bottom-[2px] left-1/2 -translate-x-1/2"></div>
              </div>
              <div className="border-[2px] border-[#C0C4DE] rounded-[18px] relative" data-aos="flip-up">
                <div className="w-[25px] h-[2px] bg-[#2b3990] absolute -top-[2px] left-1/2 -translate-x-1/2"></div>
                <div className="px-[30px] py-[24px]">
                  <p className="my-0 pb-[8px]">
                    <i className="text-[24px] text-[#00aeef] fa-solid fa-file-invoice"></i>
                  </p>
                  <p className="text-[14px] m-auto sm:text-[16px] text-[#001017]">Branding</p>
                </div>
                <div className="w-[25px] h-[2px] bg-[#00aeef] absolute -bottom-[2px] left-1/2 -translate-x-1/2"></div>
              </div>
              <div className="border-[2px] border-[#C0C4DE] rounded-[18px] relative" data-aos="flip-down">
                <div className="w-[25px] h-[2px] bg-[#00aeef] absolute -top-[2px] left-1/2 -translate-x-1/2"></div>
                <div className="px-[30px] py-[24px]">
                  <p className="my-0 pb-[8px]">
                    <i className="text-[24px] text-[#00aeef] fa-solid fa-users"></i>
                  </p>
                  <p className="text-[14px] m-auto sm:text-[16px] text-[#001017]">User Testing</p>
                </div>
                <div className="w-[25px] h-[2px] bg-[#2b3990] absolute -bottom-[2px] left-1/2 -translate-x-1/2"></div>
              </div>
              <div className="border-[2px] border-[#C0C4DE] rounded-[18px] relative" data-aos="flip-up">
                <div className="w-[25px] h-[2px] bg-[#2b3990] absolute -top-[2px] left-1/2 -translate-x-1/2"></div>
                <div className="px-[30px] py-[24px]">
                  <p className="my-0 pb-[8px]">
                    <i className="text-[24px] text-[#00aeef] fa-solid fa-code"></i>
                  </p>
                  <p className="text-[14px] m-auto sm:text-[16px] text-[#001017]">Development</p>
                </div>
                <div className="w-[25px] h-[2px] bg-[#00aeef] absolute -bottom-[2px] left-1/2 -translate-x-1/2"></div>
              </div>
              <div className="border-[2px] border-[#C0C4DE] rounded-[18px] relative" data-aos="flip-down">
                <div className="w-[25px] h-[2px] bg-[#00aeef] absolute -top-[2px] left-1/2 -translate-x-1/2"></div>
                <div className="px-[30px] py-[24px]">
                  <p className="my-0 pb-[8px]">
                    <i className="text-[24px] text-[#00aeef] fa-solid fa-shop"></i>
                  </p>
                  <p className="text-[14px] m-auto sm:text-[16px] text-[#001017]">Marketing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#fff] relative z-40">
        <div className="col-md-8 m-auto">
          <div className="py-[70px] sm:py-[150px]">
            <div className="text-center">
              <p className="my-0 text-[24px] sm:text-[40px] font-600 text-[#001017] " data-aos="fade-right">
                Featured <span className="text-[#00aeef]">Work</span>
              </p>
              <p
                className="text-[14px] sm:text-[18px] text-[#001017] pt-[20px] xl:px-[20px] my-0"
                data-aos="flip-up"
              >
                At Cornerstone Medical Solutions, we take pride in delivering exceptional results for our clients. Our featured work
                showcases our ability to deliver innovative solutions that meet and exceed our clients'
                expectations. We collaborate with our clients to understand their business objectives and
                develop custom strategies that align with their goals. Our team of experts uses their
                technical expertise, creative thinking, and industry knowledge to deliver solutions that are
                tailored to each client's unique needs.
              </p>
            </div>
            <div className="pt-[50px] grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-[20px]">
              <div className="grayscale-[80%] hover:grayscale-0" data-aos="fade-right">
                <img
                  src="/assets/pics/parent/quickbill-collection-logo.jpg.webp"
                  alt="QuickBill Collection logo"
                  className=""
                />
              </div>
              <div className="grayscale-[80%] hover:grayscale-0" data-aos="flip-right">
                <img
                  src="/assets/pics/parent/precise-medical-billing-logo.jpg.webp"
                  alt="Precise Medical Billing logo"
                  className=""
                />
              </div>
              <div className="grayscale-[80%] hover:grayscale-0" data-aos="fade-right">
                <img src="/assets/pics/parent/myndfull-care-logo.jpg.webp" alt="Myndfull Care logo" className="" />
              </div>
              <div className="grayscale-[80%] hover:grayscale-0" data-aos="fade-right">
                <img
                  src="/assets/pics/parent/urgentcare-of-kansas-website-1.jpg.webp"
                  alt="Urgent Care of Kansas website"
                  className=""
                />
              </div>
              <div className="grayscale-[80%] hover:grayscale-0" data-aos="flip-right">
                <img
                  src="/assets/pics/parent/medbilling-transcription-logo.jpg.webp"
                  alt="MedBilling Transcription logo"
                  className=""
                />
              </div>
              <div className="grayscale-[80%] hover:grayscale-0" data-aos="fade-right">
                <img src="/assets/pics/parent/scribealign-logo.jpg.webp" alt="ScribeAlign logo" className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F0F6FF] relative z-40">
        <div className="col-md-8 m-auto">
          <div className="py-[70px] sm:py-[150px]">
            <div className="grid grid-cols-1 2xl:grid-cols-9 gap-[80px]">
              <div className="m-auto 2xl:col-span-5">
                <h2
                  className="text-[#001017] text-[24px] xl:text-[40px] font-600 relative pt-[20px] sm:pt-0 pb-[20px] my-0"
                  data-aos="fade-right"
                >
                  Why Choose Cornerstone Medical Solutions for BPO Call{' '}
                  <span className="text-[#00aeef]">Center Services?</span>
                </h2>
                <div className="flex flex-col gap-[20px]">
                  <div className="text-[14px] sm:text-[18px] text-left sm:leading-[30px] text-[#001017] flex gap-3">
                    <p className="my-0">
                      <i className="fa-solid fa-compact-disc font-600 text-[#2b3990]"></i>
                    </p>
                    <p
                      className="my-0 text-[14px] sm:text-[18px] text-[#001017] sm:leading-[22px]"
                      data-aos="fade-right"
                    >
                      Comprehensive Solutions: We provide a full range of digital marketing services.
                    </p>
                  </div>
                  <div className="text-[14px] sm:text-[18px] text-left sm:leading-[30px] text-[#001017] flex gap-3">
                    <p className="my-0">
                      <i className="fa-solid fa-compact-disc font-600 text-[#2b3990]"></i>
                    </p>
                    <p
                      className="my-0 text-[14px] sm:text-[18px] text-[#001017] sm:leading-[22px]"
                      data-aos="fade-right"
                    >
                      Skilled Team: Our team has years of experience in the digital marketing industry.
                    </p>
                  </div>
                  <div className="text-[14px] sm:text-[18px] text-left sm:leading-[30px] text-[#001017] flex gap-3">
                    <p className="my-0">
                      <i className="fa-solid fa-compact-disc font-600 text-[#2b3990]"></i>
                    </p>
                    <p
                      className="my-0 text-[14px] sm:text-[18px] text-[#001017] sm:leading-[22px]"
                      data-aos="fade-right"
                    >
                      Measurable Results: We take a data-driven approach to digital marketing.
                    </p>
                  </div>
                  <div className="text-[14px] sm:text-[18px] text-left sm:leading-[30px] text-[#001017] flex gap-3">
                    <p className="my-0">
                      <i className="fa-solid fa-compact-disc font-600 text-[#2b3990]"></i>
                    </p>
                    <p
                      className="my-0 text-[14px] sm:text-[18px] text-[#001017] sm:leading-[22px]"
                      data-aos="fade-right"
                    >
                      Excellent Customer Service: We are committed to transparency and excellent customer
                      service.
                    </p>
                  </div>
                  <div className="text-[14px] sm:text-[18px] text-left sm:leading-[30px] text-[#001017] flex gap-3">
                    <p className="my-0">
                      <i className="fa-solid fa-compact-disc font-600 text-[#2b3990]"></i>
                    </p>
                    <p
                      className="my-0 text-[14px] sm:text-[18px] text-[#001017] sm:leading-[22px]"
                      data-aos="fade-right"
                    >
                      Competitive Pricing: We offer cost-effective solutions without compromising on quality.
                    </p>
                  </div>
                </div>
              </div>
              <div className="2xl:col-span-4 m-auto" data-aos="flip-up">
                <img src="/assets/pics/parent/why.webp" alt="Why choose our outsourcing services" className="mt-6 md:mt-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <CtaBanner />
      <div className="bg-[#fff] relative z-40">
        <div className="col-md-8 m-auto">
          <div className="py-[70px] sm:py-[100px]">
            <div className="grid grid-cols-3 xl:grid-cols-5 gap-[20px] sm:gap-[30px] m-auto">
              <img
                src="/assets/pics/logos/1.webp"
                alt="Client logo"
                className="m-auto xl:w-[210px] grayscale-[90%] hover:grayscale-0 px-2"
                data-aos="fade-right"
              />{' '}
              <img
                src="/assets/pics/logos/2.webp"
                alt="Client logo"
                className="m-auto xl:w-[210px] grayscale-[90%] hover:grayscale-0 px-2"
                data-aos="fade-up"
              />{' '}
              <img
                src="/assets/pics/logos/3.webp"
                alt="Client logo"
                className="m-auto xl:w-[210px] grayscale-[90%] hover:grayscale-0 px-2"
                data-aos="fade-down"
              />{' '}
              <img
                src="/assets/pics/logos/4.webp"
                alt="Client logo"
                className="hidden xl:block m-auto xl:w-[210px] grayscale-[90%] hover:grayscale-0 px-2"
                data-aos="flip-right"
              />{' '}
              <img
                src="/assets/pics/logos/5.webp"
                alt="Client logo"
                className="hidden xl:block m-auto xl:w-[210px] grayscale-[90%] hover:grayscale-0 px-2"
                data-aos="flip-up"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F0F6FF] border-y-[1px] border-[#e0e0e0] relative font-poppins z-30">
        <div className="px-0 w-full grid grid-cols-12">
          <div className="col-span-1 sm:col-span-2"></div>
          <div className="col-span-12 px-[20px] sm:col-span-8 desktop:col-span-4 w-full desktop:pr-16 desktop:border-r-[1px] border-[#e0e0e0]">
            <div className="py-[70px] desktop:py-[100px]">
              <div className="pt-[30px] sm:pt-[50px]">
                <link
                  rel="stylesheet"
                  href="../cdn.jsdelivr.net/npm/intl-tel-input%4019.5.6/build/css/intlTelInput.css"
                />
                <form
                  method="POST"
                  action="https://24-7consultancy.pk/contact-form"
                  encType="multipart/form-data"
                  className="w-full"
                >
                  <input
                    type="hidden"
                    name="_token"
                    value="FBZVvnQkexEjbZwUKpMKznxLV4Aw6GX2mfKcl4vE"
                    autoComplete="off"
                  />
                  <div>
                    <select
                      className="w-full border-[#e0e0e0] border-[1px] p-3 text-[#001017]"
                      name="services"
                      id="frm-services"
                    >
                      <option value="">Please select service ...</option>
                      <option value="BPO">BPO</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Software Development">Software Development</option>
                    </select>
                  </div>
                  <div className="w-full flex gap-3 my-[20px]">
                    <input
                      className="w-full border-[#e0e0e0] border-[1px] p-3 text-[#001017]"
                      type="text"
                      name="name"
                      placeholder="Your Name ..."
                    />
                    <input
                      className="w-full border-[#e0e0e0] border-[1px] p-3 text-[#001017]"
                      type="text"
                      name="email"
                      placeholder="Your Email ..."
                    />
                  </div>
                  <div className="w-full grid grid-cols-2 gap-3 my-[20px]">
                    <input
                      className="w-full border-[#e0e0e0] border-[1px] py-3 text-[#001017]"
                      id="phone"
                      type="tel"
                      name="number"
                    />
                    <input
                      className="w-full border-[#e0e0e0] border-[1px] p-3 text-[#001017]"
                      type="text"
                      name="subject"
                      placeholder="Enter Subject ..."
                    />
                  </div>
                  <div className="w-full grid grid-cols-1 gap-3 my-[20px]">
                    <textarea
                      className="w-full border-[#e0e0e0] border-[1px] p-3 text-[#001017]"
                      name="description"
                      id="description"
                      cols="30"
                      rows="5"
                      placeholder="Project Description"
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="relative flex gap-4 items-center justify-center px-[20px] h-[49px] border-[2px] border-[#2b3990] transform hover:scale-90 transition duration-500 ease-in-out hover:no-underline hover:text-[#00aeef] text-[#2b3990] text-[16px] 2xl:text-[18px]"
                    >
                      <p className="my-auto h-7">Submit</p>
                      <p className="text-xl my-auto">
                        <i className="fa-solid fa-arrow-right"></i>
                      </p>
                    </button>
                  </div>
                </form>
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
              >
                Consult with Cornerstone BPO <span className="text-[#00aeef]">Today!</span>
              </p>
              <p className="text-[14px] sm:text-[18px] text-[#001017] py-[20px] my-0" data-aos="fade-up">
                Founded in 2021, we have 03 years of experience in the industry and are committed to providing
                top-quality service to our clients.
              </p>
              <div>
                <p
                  className="text-[14px] sm:text-[18px] text-left text-[#001017] pb-[10px] flex gap-[10px]"
                  data-aos="fade-right"
                >
                  <span>
                    <i className="text-[#00aeef] fa-solid fa-envelope pr-3"></i>
                  </span>{' '}
                  cmsolutions180@gmail.com
                </p>
                <p
                  className="text-[14px] sm:text-[18px] text-left text-[#001017] pb-[10px] flex gap-[10px]"
                  data-aos="fade-right"
                >
                  <span>
                    <i className="text-[#00aeef] fa-solid fa-location-dot pr-3"></i>
                  </span>{' '}
                  11-C Judicial Colony, Lahore, Punjab 54400.
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-1 sm:col-span-2 bg-white"></div>
        </div>
      </div>
    </>
  );
}
