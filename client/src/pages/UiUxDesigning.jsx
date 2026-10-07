import { Link } from 'react-router-dom';
import PortfolioSection from '../components/PortfolioSection';

export default function UiUxDesigning() {
  return (
    <>
      <div className="bg-[#2b3990] bg-opacity-[80%] relative">
        <img src="/assets/pics/innerbg/ui-ux.png" alt="" className="bg-hero" />{' '}
        <div className="col-md-8 m-auto">
          <div className="pt-[80px] sm:pt-[250px] pb-[70px] sm:pb-[150px] relative">
            <div className="sm:text-center m-auto relative z-40 bg-[#2b3990] bg-opacity-[70%] py-[50px]">
              <h1
                className="text-[#fff] text-[24px] xl:text-[40px] font-600 relative pb-[30px] 2xl:px-[50px] my-0"
                data-aos="fade-right"
              >
                Welcome to Cornerstone Medical Solutions's UI/UX Designing Services
              </h1>
              <p className="text-[14px] sm:text-[18px] text-[#fff] 2xl:px-[100px] m-auto" data-aos="fade-up">
                We believe that a great design can make all the difference in attracting and retaining users,
                driving engagement and conversions, and ultimately, achieving your business goals.
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
            <div className="grid grid-cols-1 2xl:grid-cols-5 gap-[100px]">
              <div className="2xl:col-span-3">
                <h2
                  className="text-[#001017] text-[24px] xl:text-[40px] font-600 relative pb-[20px] my-0"
                  data-aos="fade-right"
                >
                  Experience the Power of Great Design with{' '}
                  <span className="text-[#00aeef]">Cornerstone Medical Solutions</span>
                </h2>
                <p className="text-[14px] sm:text-[18px] text-left my-0 text-[#001017]" data-aos="fade-up">
                  With years of experience in designing and developing websites and applications, we can help
                  you create a design that not only looks great but also functions seamlessly. Our team of
                  designers and developers has a deep understanding of the latest UI/UX design trends, tools,
                  and technologies, and can deliver customized solutions that cater to the needs of your
                  business.
                </p>
              </div>
              <div className="2xl:col-span-2 m-auto relative">
                <div className="p-4 bg-[#5F3B92] bg-opacity-[30%] rounded-xl">
                  <img
                    src="/assets/pics/inner/ui-ux.webp"
                    alt="UI/UX design process"
                    className="m-auto"
                    data-aos="flip-right"
                  />
                </div>
                <div className="flex gap-[20px] mt-[20px] justify-center tool-row">
                  <img
                    src="/assets/pics/inner/xd.webp"
                    alt="Adobe XD"
                    className=""
                    width="60"
                    height="60"
                    data-aos="flip-right"
                  />{' '}
                  <img
                    src="/assets/pics/inner/ps.webp"
                    alt="Adobe Photoshop"
                    className=""
                    width="60"
                    height="60"
                    data-aos="flip-right"
                  />{' '}
                  <img
                    src="/assets/pics/inner/uiux.webp"
                    alt="UI/UX design"
                    className=""
                    width="60"
                    height="60"
                    data-aos="flip-right"
                  />{' '}
                  <img
                    src="/assets/pics/inner/fig.webp"
                    alt="Figma"
                    className=""
                    width="60"
                    height="60"
                    data-aos="flip-right"
                  />{' '}
                  <img
                    src="/assets/pics/inner/ai.webp"
                    alt="Adobe Illustrator"
                    className=""
                    width="60"
                    height="60"
                    data-aos="flip-right"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F0F6FF] relative z-40">
        <div className="col-md-8 m-auto">
          <div className="py-[70px] sm:py-[150px]">
            <div>
              <div className="2xl:w-[996px] m-auto text-center">
                <p
                  className="pb-[20px] my-0 text-[24px] sm:text-[40px] font-600 text-[#001017]"
                  data-aos="fade-right"
                >
                  Designing Your <span className="text-[#00aeef]">Digital Dream</span>
                </p>
              </div>
              <p className="text-[14px] sm:text-[18px] my-0 text-[#001017]" data-aos="flip-up">
                We offer a wide range of UI/UX designing services that cater to the needs of businesses of all
                sizes. Our services include:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] pt-[50px] m-auto">
              <div className="p-[30px] bg-[#fff] border-[1px] border-[#e0e0e0]" data-aos="flip-right">
                <div className="w-[60px]">
                  <div className="p-[10px] border-[1px] border-[#e0e0e0]">
                    <img src="/assets/pics/inner/icons/user-research.png" alt="" />
                  </div>
                </div>
                <div className="pt-[10px]">
                  <p className="pb-[10px] my-0 text-[18px] font-600 sm:text-[24px] text-[#001017]">
                    User Research and <span className="text-[#00aeef]">Analysis</span>
                  </p>
                  <p className="my-0 text-[14px] sm:text-[18px] text-[#001017]" data-aos="flip-up">
                    We conduct in-depth research to understand your target audience and their needs. This
                    helps us create a design that not only looks good but also caters to the needs of your
                    users. Our user research and analysis process includes identifying user personas, mapping
                    user journeys, conducting usability testing, and analyzing user feedback.
                  </p>
                </div>
              </div>
              <div className="p-[30px] bg-[#fff] border-[1px] border-[#e0e0e0]" data-aos="flip-right">
                <div className="w-[60px]">
                  <div className="p-[10px] border-[1px] border-[#e0e0e0]">
                    <img src="/assets/pics/inner/icons/information.png" alt="" />
                  </div>
                </div>
                <div className="pt-[10px]">
                  <p className="pb-[10px] my-0 text-[18px] font-600 sm:text-[24px] text-[#001017]">
                    Information <span className="text-[#00aeef]">Architecture</span>
                  </p>
                  <p className="my-0 text-[14px] sm:text-[18px] text-[#001017]" data-aos="flip-up">
                    We create a clear and logical structure for your website or application that helps users
                    easily navigate through the content. Our information architecture process includes
                    defining the site map, creating the navigation structure, and organizing the content into
                    meaningful categories.
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
            <div className="m-auto">
              <div className="grid grid-cols-1 xl:grid-cols-11 gap-0.5 xl:gap-0">
                <div className="mr-[10px] xl:col-span-4 xl:pr-2">
                  <h2
                    className="text-[#001017] text-[30px] xl:text-[40px] font-600 relative pb-[30px]"
                    data-aos="fade-right"
                  >
                    Your Vision,
                    <br />
                    <span className="text-[#00aeef]">Our Design!</span> <br />
                    Customized Solutions for Your Business
                  </h2>
                </div>
                <div
                  className="xl:col-span-3 bg-[#F0F6FF] px-[30px] py-[25px] mt-[20px] sm:mt-0"
                  data-aos="flip-up"
                >
                  <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]">Discover Your Audience</p>
                  <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]">
                    Boost your conversion rate, increase user engagement, and strengthen custom2r loyalty by
                    putting human-centered design first.
                  </p>
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
                  <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]">Wire-Framing</p>
                  <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]">
                    Our wire-framing process includes creating low-fidelity and high-fidelity wire2frames that
                    reflect the visual and functional aspects of your design.
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
              <div className="grid grid-cols-1 xl:grid-cols-8 gap-0.5 xl:gap-0 m-auto">
                <div
                  className="xl:col-span-2 bg-[#F0F6FF] px-[30px] py-[25px] mt-[20px] sm:mt-0"
                  data-aos="flip-up"
                >
                  <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]">Visual Design</p>
                  <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]">
                    Our visual design process includes defining the visual style, creating the color palette,
                    choosing the typography, and designing the user interface elements such as buttons, icons,
                    and forms.
                  </p>
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
                  <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]">Prototyping</p>
                  <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]">
                    We create interactive prototypes that allow you to test the functionality of your website
                    or application before it is developed. Our prototyping process includes creating clickable
                    prototypes.
                  </p>
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
                  <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]">Design Audit</p>
                  <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]">
                    Find the gaps in your design and get consistent design solutions for improv2ment quickly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PortfolioSection variant="design" />
      <div className="bg-[#fff] relative z-40">
        <div className="col-md-8 m-auto">
          <div className="py-[70px] sm:py-[150px]">
            <div className="text-center">
              <p
                className="text-[24px] 2xl:px-[100px] m-auto sm:leading-[45px] sm:text-[40px] font-600 text-[#001017]"
                data-aos="fade-right"
              >
                Why Choose Cornerstone Medical Solutions for{' '}
                <span className="text-[#00aeef]">UI/UX Designing Services?</span>
              </p>
              <p
                className="text-[14px] sm:text-[18px] text-[#001017] py-[20px] 2xl:px-[80px] my-0"
                data-aos="fade-up"
              >
                At Cornerstone Medical Solutions, we understand that effective design is essential for building a
                successful brand. Here are some reasons to choose us for your UI/Ux Designing needs:
              </p>
            </div>
            <div className="grid grid-cols-1 2xl:grid-cols-7 gap-[20px]">
              <div className="2xl:col-span-4">
                <div className="pt-[20px]">
                  <div className="pb-[30px] md:flex gap-[30px]">
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
                      <p className="my-0 text-[18px] sm:text-[22px] font-semibold">Experienced Team</p>
                      <p className="my-0 text-[14px] sm:text-[18px]">
                        Our team of designers and developers has years of experience in designing and
                        developing websites and applications. We have worked with clients from various
                        industries and have a proven track record of delivering high-quality designs that meet
                        their business goals.
                      </p>
                    </div>
                  </div>
                  <div className="pb-[30px] md:flex gap-[30px]">
                    <div>
                      <div
                        className="w-16 h-16 flex justify-center items-center border-[1px] border-[#e0e0e0] bg-[#fff]"
                        data-aos="flip-right"
                      >
                        <img
                          src="/assets/pics/inner/icons/transforming.png"
                          alt=""
                          className="w-10 h-10"
                        />
                      </div>
                    </div>
                    <div className="" data-aos="fade-right">
                      <p className="my-0 text-[18px] sm:text-[22px] font-semibold">
                        Transforming Your Vision into a Stunning Reality
                      </p>
                      <p className="my-0 text-[14px] sm:text-[18px]">
                        We understand that every business is unique and has different needs. That is why we
                        offer customized solutions that cater to the needs of your business. We work closely
                        with you to understand your business goals, target audience, and brand identity, and
                        create a design that aligns with your vision.
                      </p>
                    </div>
                  </div>
                  <div className="pb-[30px] md:flex gap-[30px]">
                    <div>
                      <div
                        className="w-16 h-16 flex justify-center items-center border-[1px] border-[#e0e0e0] bg-[#fff]"
                        data-aos="flip-right"
                      >
                        <img
                          src="/assets/pics/inner/icons/your-business.png"
                          alt=""
                          className="w-10 h-10"
                        />
                      </div>
                    </div>
                    <div className="" data-aos="fade-right">
                      <p className="my-0 text-[18px] sm:text-[22px] font-semibold">
                        Your Business Deserves the Best Design, and We Deliver It!
                      </p>
                      <p className="my-0 text-[14px] sm:text-[18px]">
                        We believe that great design should be accessible to everyone, regardless of their
                        budget. That is why we offer affordable pricing without compromising on the quality of
                        our services. We offer transparent pricing with no hidden fees and work within your
                        budget to deliver the best value for your investment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="2xl:col-span-3 my-auto" data-aos="fade-up">
                <img src="/assets/pics/inner/UI-UX-opt.webp" alt="UI/UX design" className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
