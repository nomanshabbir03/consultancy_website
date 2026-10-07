import { Link } from 'react-router-dom';
import PortfolioSection from '../components/PortfolioSection';

export default function WebDevelopment() {
  return (
    <>
      <div className="bg-[#2b3990] bg-opacity-[80%] relative">
        <img src="/assets/pics/innerbg/web-development-opt.webp" alt="" className="bg-hero" />{' '}
        <div className="col-md-8 m-auto">
          <div className="pt-[80px] sm:pt-[250px] pb-[70px] sm:pb-[150px] relative">
            <div className="sm:text-center m-auto relative z-40 bg-[#2b3990] bg-opacity-[70%] py-[50px]">
              <h1
                className="text-[#fff] text-[24px] xl:text-[40px] font-600 relative pb-[30px] 2xl:px-[100px] m-auto"
                data-aos="fade-right"
              >
                Driving Growth and Success
              </h1>
              <p className="text-[14px] sm:text-[18px] text-[#fff] 2xl:px-[100px] m-auto" data-aos="fade-up">
                To differentiate yourself from other businesses in your niche, you need a website that appeals
                to customers and makes them want to purchase your products or services.
              </p>
            </div>
            <div className="flex items-center justify-center pt-[50px]" data-aos="flip-up">
              <Link
                to="/contact-us"
                className="relative flex gap-4 items-center justify-center w-[200px] h-[49px] border-[2px] border-[#fff] transform hover:scale-90 transition duration-500 ease-in-out hover:no-underline hover:text-[#fff] text-[#fff] text-[16px] 2xl:text-[18px] font-semibold"
              >
                <p className="my-auto h-7">Meet Us</p>
                <p className="text-xl my-auto">
                  <i className="fa-solid fa-arrow-right"></i>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#fff] relative z-40">
        <div className="col-md-8 m-auto">
          <div className="py-[70px] sm:py-[150px]">
            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-[50px]">
              <div className="m-auto">
                <div className="pb-[20px] flex gap-3 items-center">
                  <p
                    className="my-auto text-[24px] sm:text-[40px] font-600 text-[#001017] "
                    data-aos="fade-right"
                  >
                    Web Development with <span className="text-[#00aeef]">Cornerstone</span>
                  </p>
                </div>
                <p
                  className="text-[14px] sm:text-[18px] text-left sm:leading-[30px] text-[#001017]"
                  data-aos="fade-up"
                >
                  Cornerstone Medical Solutions offers you a seamless and intuitive user experience with secure and
                  scalable solutions. We are always looking for ways to innovate our services and meet your
                  needs.
                  <br />
                  Our team of experienced web developers will take care of every aspect of your website, from
                  the front-end design to the back-end programming, so that we can deliver a seamless
                  experience tailored to your business's needs.
                  <br />
                  We have one scalable team for start-to-finish development.
                </p>
              </div>
              <div className="m-auto relative" data-aos="flip-right">
                <img src="/assets/pics/inner/web-devep.webp" alt="Web development services" className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F0F6FF] relative z-40">
        <div className="col-md-8 m-auto">
          <div className="py-[70px] sm:py-[150px]">
            <div className="m-auto text-center">
              <p className="my-0 text-[24px] sm:text-[40px] font-600 text-[#001017] " data-aos="fade-right">
                Our Web <span className="text-[#00aeef]">Development Services</span>
              </p>
              <p
                className="my-0 text-[14px] sm:text-[18px] sm:leading-[30px] text-[#001017]"
                data-aos="flip-up"
              >
                You'll find everything you need in one place. When you come to us, you'll have access to a
                team of experts that can handle everything. Business Analysts, Product Designers, Project
                Managers, QA Engineers, and Full-stack developers will work with you to create an experience
                that works just right for your business.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[15px] pt-[50px]">
              <div
                className="px-[40px] py-[40px] bg-[#fff] border-[1px] border-[#e0e0e0]"
                data-aos="flip-right"
              >
                <div className="w-[60px]">
                  <div className="p-[10px] border-[1px] border-[#e0e0e0]">
                    <img src="/assets/pics/inner/icons/UIUX.png" alt="" />
                  </div>
                </div>
                <div className="pt-[30px]">
                  <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]">
                    UI/UX Design and Development
                  </p>
                  <div className="w-[80px] h-[2px] bg-[#2b3990] my-[10px]"></div>
                  <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]">
                    We work closely with our clients to understand their specific needs and goals for their
                    websites. Our designers create custom designs that reflect the client's brand and style.
                  </p>
                </div>
              </div>
              <div
                className="px-[40px] py-[40px] bg-[#fff] border-[1px] border-[#e0e0e0]"
                data-aos="fade-right"
              >
                <div className="w-[60px]">
                  <div className="p-[10px] border-[1px] border-[#e0e0e0]">
                    <img src="/assets/pics/inner/icons/e-commerce.png" alt="" />
                  </div>
                </div>
                <div className="pt-[30px]">
                  <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]">E-commerce Development</p>
                  <div className="w-[80px] h-[2px] bg-[#2b3990] my-[10px]"></div>
                  <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]">
                    If you want to sell products or services online, our developers integrate payment
                    gateways, manage product catalogs, and create secure checkout systems for smooth shopping
                    experience for user.
                  </p>
                </div>
              </div>
              <div
                className="px-[40px] py-[40px] bg-[#fff] border-[1px] border-[#e0e0e0]"
                data-aos="flip-right"
              >
                <div className="w-[60px]">
                  <div className="p-[10px] border-[1px] border-[#e0e0e0]">
                    <img src="/assets/pics/inner/icons/content.png" alt="" />
                  </div>
                </div>
                <div className="pt-[30px]">
                  <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]">
                    Content Management Systems
                  </p>
                  <div className="w-[80px] h-[2px] bg-[#2b3990] my-[10px]"></div>
                  <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]">
                    We create custom CMS that allows you to easily update and manage your website's content,
                    whether it's a simple blog or a complex web application.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#fff] relative z-40">
        <div className="col-md-8 m-auto">
          <div className="py-[70px] sm:py-[150px]">
            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-[50px]">
              <div className="m-auto">
                <p className="my-0 text-[24px] sm:text-[40px] font-600 text-[#001017] " data-aos="fade-right">
                  Custom <span className="text-[#00aeef]">Websites</span>
                </p>
                <p
                  className="text-[14px] my-0 sm:text-[18px] text-left sm:leading-[30px] text-[#001017]"
                  data-aos="fade-right"
                >
                  We don't just build websites. We create experiences too.
                  <br />
                  We specialize in customizing and building responsive web development solutions for our
                  clients, offering them nothing but the best of the best. Our team keeps up with the latest
                  techniques and has the tools to offer you a user-friendly, stable, and reliable website
                  tailored to your needs—without breaking your budget.
                  <br />
                  Our web developers are passionate and experienced, and their passion for creating custom
                  solutions allows us to maintain stability and expand our work.
                  <br />
                  They create reliable and stable websites. The back end of a website is simple. It's never
                  seen or interacted with, but it drives the show. Your site depends on it.
                </p>
              </div>
              <div className="m-auto relative">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-[10px] sm:gap-[40px] m-auto">
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 flex justify-center items-center bg-[#F0F6FF]"
                    data-aos="flip-right"
                  >
                    <img
                      src="/assets/pics/icons/ang.svg"
                      alt=""
                      className=""
                      width="64"
                      height="64"
                    />
                  </div>
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 flex justify-center items-center bg-[#F0F6FF]"
                    data-aos="flip-up"
                  >
                    <img
                      src="/assets/pics/icons/react.svg"
                      alt=""
                      className=""
                      width="64"
                      height="64"
                    />
                  </div>
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 flex justify-center items-center bg-[#F0F6FF]"
                    data-aos="flip-right"
                  >
                    <img
                      src="/assets/pics/icons/lara.svg"
                      alt=""
                      className=""
                      width="64"
                      height="64"
                    />
                  </div>
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 flex justify-center items-center bg-[#F0F6FF]"
                    data-aos="flip-up"
                  >
                    <img
                      src="/assets/pics/icons/njs.svg"
                      alt=""
                      className=""
                      width="64"
                      height="64"
                    />
                  </div>
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 flex justify-center items-center bg-[#F0F6FF]"
                    data-aos="flip-up"
                  >
                    <img
                      src="/assets/pics/icons/vt.svg"
                      alt=""
                      className=""
                      width="64"
                      height="64"
                    />
                  </div>
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 flex justify-center items-center bg-[#F0F6FF]"
                    data-aos="flip-right"
                  >
                    <img
                      src="/assets/pics/icons/py.svg"
                      alt=""
                      className=""
                      width="64"
                      height="64"
                    />
                  </div>
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 flex justify-center items-center bg-[#F0F6FF]"
                    data-aos="flip-up"
                  >
                    <img
                      src="/assets/pics/icons/tail.svg"
                      alt=""
                      className=""
                      width="64"
                      height="64"
                    />
                  </div>
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 flex justify-center items-center bg-[#F0F6FF]"
                    data-aos="flip-right"
                  >
                    <img
                      src="/assets/pics/icons/go.svg"
                      alt=""
                      className=""
                      width="64"
                      height="64"
                    />
                  </div>
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 flex justify-center items-center bg-[#F0F6FF]"
                    data-aos="flip-right"
                  >
                    <img
                      src="/assets/pics/icons/c.svg"
                      alt=""
                      className=""
                      width="64"
                      height="64"
                    />
                  </div>
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 flex justify-center items-center bg-[#F0F6FF]"
                    data-aos="flip-up"
                  >
                    <img
                      src="/assets/pics/icons/sw.svg"
                      alt=""
                      className=""
                      width="64"
                      height="64"
                    />
                  </div>
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 flex justify-center items-center bg-[#F0F6FF]"
                    data-aos="flip-right"
                  >
                    <img
                      src="/assets/pics/icons/and.svg"
                      alt=""
                      className=""
                      width="64"
                      height="64"
                    />
                  </div>
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 flex justify-center items-center bg-[#F0F6FF]"
                    data-aos="flip-up"
                  >
                    <img
                      src="/assets/pics/icons/cs.svg"
                      alt=""
                      className=""
                      width="64"
                      height="64"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F0F6FF] relative z-40">
        <div className="col-md-8 m-auto">
          <div className="py-[70px] sm:py-[150px]">
            <div className="2xl:w-[1244px] m-auto text-center">
              <p
                className="my-0 pb-[20px] text-[24px] sm:text-[40px] font-600 text-[#001017] "
                data-aos="fade-right"
              >
                WordPress <span className="text-[#00aeef]">Websites</span>
              </p>
              <p className="text-[14px] sm:text-[18px] sm:leading-[30px] text-[#001017]" data-aos="fade-up">
                WordPress is one of the most popular content management systems. For a good reason, it is
                well-supported and highly flexible and can be used to create almost any type of website, from
                a brochure to an e-commerce website. We create websites that get your audience's attention and
                make an impression like no other. If you want to start from scratch, we'll work with you to
                develop a custom design that fits your brand and message perfectly. Or, if you have a
                template, we can modify it to fit your needs. Either way, our goal is always to ensure your
                site looks exactly how you want it to look.
                <br />
                We offer a full range of WordPress development services, including new website development and
                redevelopments of existing websites. Our goal is to provide you with the best possible user
                experience for your website, and we're always available for consultation.
                <br />
                WordPress is one of the most popular open-source CMS platforms on the web today—and because
                it's easy to use, it's also incredibly versatile. Adding plugins to WordPress allows its
                functionality to be extended even further.
              </p>
            </div>
            <div className="pt-[50px]" data-aos="flip-right">
              <img src="/assets/pics/inner/wp.webp" alt="WordPress" className="xl:w-[1000px] m-auto" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#fff] relative z-40">
        <div className="col-md-8 m-auto">
          <div className="py-[70px] sm:py-[150px]">
            <div className="m-auto">
              <div className="grid grid-cols-1 xl:grid-cols-11 gap-3 xl:gap-0 my-0">
                <div className="mr-[50px] xl:col-span-4">
                  <p
                    className="my-0 text-[24px] sm:text-[40px] font-600 text-[#001017] "
                    data-aos="fade-right"
                  >
                    Our <span className="text-[#00aeef]">Process</span>
                  </p>
                  <p
                    className="text-[14px] sm:text-[18px] text-left sm:leading-[30px] text-[#001017]"
                    data-aos="fade-up"
                  >
                    At Cornerstone Medical Solutions, we follow a proven web development process to ensure our clients
                    receive the best possible results. Here's how it works:
                  </p>
                </div>
                <div
                  className="xl:col-span-3 shadow-[0_0px_6px_5px_rgba(71,65,166,.03)] bg-[#fff] px-[33px] py-[20px] mt-[20px] sm:mt-0"
                  data-aos="flip-right"
                >
                  <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]">Discovery</p>
                  <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]">
                    We understand your business and website goals. We conduct research to identify technical
                    requirements and understand your industry and competition.
                  </p>
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
                  <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]">Planning</p>
                  <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]">
                    We create a detailed project plan and timeline, and provide recommendations on technology,
                    design, and functionality.
                  </p>
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
                  <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]">Design</p>
                  <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]">
                    Our designers create custom designs that reflect your brand and style. We provide mockups
                    and prototypes to get your feedback and ensure your satisfaction.
                  </p>
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
                  <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]">Development</p>
                  <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]">
                    Our developers build a functional and responsive website that meets the latest web
                    standards, using the latest web technologies to ensure your website is fast, secure, and
                    user-friendly.
                  </p>
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
                  <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]">Testing</p>
                  <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]">
                    We thoroughly test your website to ensure it meets all technical requirements and is fully
                    functional. Once we are satisfied with the results, we launch your website and provide
                    ongoing support and maintenance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PortfolioSection variant="web" />
      <div className="bg-[#fff] relative z-40">
        <div className="col-md-8 m-auto">
          <div className="py-[70px] sm:py-[150px]">
            <div className="grid grid-cols-1 2xl:grid-cols-2">
              <div>
                <div>
                  <p
                    className="my-0 text-[24px] sm:text-[40px] font-600 text-[#001017]  pb-[10px]    "
                    data-aos="fade-right"
                  >
                    Why <span className="text-[#00aeef]">Choose Us</span>
                  </p>
                  <p
                    className="my-0 text-[14px] sm:text-[18px] text-left sm:leading-[30px] text-[#001017]"
                    data-aos="flip-up"
                  >
                    At Cornerstone Medical Solutions, we are committed to providing the best possible web development
                    services to our clients. Here are a few reasons why you should choose us:
                  </p>
                </div>
                <div className="pt-[20px]">
                  <div className="pb-[20px] md:flex gap-[30px]">
                    <div>
                      <div
                        className="w-16 h-16 flex justify-center items-center border-[1px] border-[#e0e0e0] bg-[#fff]"
                        data-aos="flip-right"
                      >
                        <img
                          src="/assets/pics/inner/icons/experienced-team.png"
                          alt=""
                          className="w-14 h-14"
                        />
                      </div>
                    </div>
                    <div className="" data-aos="fade-right">
                      <p className="text-[18px] sm:text-[22px] font-semibold">
                        Experienced <span className="text-[#00aeef]">Team</span>
                      </p>
                      <p className="text-[14px] sm:text-[18px]">
                        Our developers have years of experience and are skilled in the latest web technologies
                        and techniques.
                      </p>
                    </div>
                  </div>
                  <div className="pb-[20px] md:flex gap-[30px]">
                    <div>
                      <div
                        className="w-16 h-16 flex justify-center items-center border-[1px] border-[#e0e0e0] bg-[#fff]"
                        data-aos="flip-right"
                      >
                        <img
                          src="/assets/pics/inner/icons/customized.png"
                          alt=""
                          className="w-12 h-12"
                        />
                      </div>
                    </div>
                    <div className="" data-aos="fade-right">
                      <p className="text-[18px] sm:text-[22px] font-semibold">
                        Customized <span className="text-[#00aeef]">Solutions</span>
                      </p>
                      <p className="text-[14px] sm:text-[18px]">
                        We create custom solutions tailored to your specific business needs and goals.
                      </p>
                    </div>
                  </div>
                  <div className="pb-[20px] md:flex gap-[30px]">
                    <div>
                      <div
                        className="w-16 h-16 flex justify-center items-center border-[1px] border-[#e0e0e0] bg-[#fff]"
                        data-aos="flip-right"
                      >
                        <img
                          src="/assets/pics/inner/icons/proven-process.png"
                          alt=""
                          className="w-12 h-12"
                        />
                      </div>
                    </div>
                    <div className="" data-aos="fade-right">
                      <p className="text-[18px] sm:text-[22px] font-semibold">
                        Proven <span className="text-[#00aeef]">Process</span>
                      </p>
                      <p className="text-[14px] sm:text-[18px]">
                        We follow a proven web development process that ensures quality and consistency.
                      </p>
                    </div>
                  </div>
                  <div className="pb-[20px] md:flex gap-[30px]">
                    <div>
                      <div
                        className="w-16 h-16 flex justify-center items-center border-[1px] border-[#e0e0e0] bg-[#fff]"
                        data-aos="flip-right"
                      >
                        <img
                          src="/assets/pics/inner/icons/ongoing-support.png"
                          alt=""
                          className="w-12 h-12"
                        />
                      </div>
                    </div>
                    <div className="" data-aos="fade-right">
                      <p className="text-[18px] sm:text-[22px] font-semibold">
                        Ongoing <span className="text-[#00aeef]">Support</span>
                      </p>
                      <p className="text-[14px] sm:text-[18px]">
                        We provide ongoing support and maintenance to ensure your website is always up-to-date
                        and functioning smoothly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="m-auto" data-aos="fade-up">
                <img src="/assets/pics/inner/why-web-opt.webp" alt="Why choose our web development services" className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
