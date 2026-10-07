import { Link } from 'react-router-dom';
import PortfolioSection from '../components/PortfolioSection';

export default function GraphicDesigning() {
  return (
    <>
      <div className="bg-[#2b3990] bg-opacity-[80%] relative">
        <img src="/assets/pics/innerbg/graphics-design.png" alt="" className="bg-hero" />{' '}
        <div className="col-md-8 m-auto">
          <div className="pt-[80px] sm:pt-[250px] pb-[70px] sm:pb-[150px] relative">
            <div className="sm:text-center m-auto relative z-40 bg-[#2b3990] bg-opacity-[70%] py-[50px]">
              <h1
                className="text-[#fff] text-[24px] xl:text-[40px] font-600 relative pb-[30px] 2xl:px-[50px] my-0"
                data-aos="fade-right"
              >
                Bring Your Brand with Cornerstone Medical Solutions's Creative Graphic Designing Services!
              </h1>
              <p className="text-[14px] sm:text-[18px] text-[#fff] 2xl:px-[100px] m-auto" data-aos="fade-up">
                Welcome to the Graphic Designing page of Cornerstone Medical Solutions! In today's fast-paced digital
                world, effective and visually appealing design is more important than ever.
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
                  The Art of Communication <span className="text-[#00aeef]">through Visuals</span>
                </h2>
                <p className="text-[14px] sm:text-[18px] text-left my-0 text-[#001017]" data-aos="fade-up">
                  Graphic Designing is the art of creating visual content to communicate information and ideas
                  to your target audience. It involves the use of typography, color theory, imagery, and
                  layout to create designs that are not only aesthetically pleasing but also convey a message
                  effectively.
                  <br />
                  Our team of skilled designers is dedicated to helping your brand stand out from the
                  competition with custom designs that communicate your message effectively. Whether you need
                  a new logo, a website redesign, or social media graphics, we are here to help. Let us work
                  together to bring your brand to life through the power of great design.
                </p>
              </div>
              <div className="2xl:col-span-2 m-auto relative">
                <img
                  src="/assets/pics/inner/graphic-1.webp"
                  alt="Graphic design services"
                  className="mt-10 sm:mt-0"
                  width="510"
                  height="410"
                  data-aos="flip-right"
                />{' '}
                <div className="flex gap-[20px] mt-[20px] sm:-mt-6 justify-center tool-row">
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
            <div className="2xl:w-[996px] m-auto text-center">
              <p
                className="my-0 pb-[20px] text-[24px] sm:text-[40px] font-600 text-[#001017]"
                data-aos="fade-right"
              >
                Our Graphic <span className="text-[#00aeef]">Designing Services</span>
              </p>
              <p
                className="my-0 text-[14px] sm:text-[18px] sm:leading-[30px] text-[#001017]"
                data-aos="flip-up"
              >
                We Create Visuals that Leave a Lasting Impression !<br />
                At Cornerstone Medical Solutions, we offer a wide range of Graphic Designing services to help your brand
                stand out in the digital world. Here are some of the services we offer:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-5 gap-[10px] pt-[50px]">
              <div
                className="py-[30px] px-[20px] border-[1px] border-[#e0e0e0] bg-[#fff]"
                data-aos="flip-right"
              >
                <div className="w-[60px] m-auto">
                  <div className="p-[10px] border-[1px] border-[#e0e0e0]">
                    <img src="/assets/pics/inner/icons/unique.png" className="" alt="" />
                  </div>
                </div>
                <div className="pt-[30px] text-center">
                  <p className="m-auto sm:leading-[26px] text-[16px] font-600 sm:text-[20px] text-[#001017]">
                    {'Unique & Memorable Logo Design'}
                  </p>
                </div>
              </div>
              <div
                className="py-[30px] px-[20px] border-[1px] border-[#e0e0e0] bg-[#fff]"
                data-aos="fade-right"
              >
                <div className="w-[60px] m-auto">
                  <div className="p-[10px] border-[1px] border-[#e0e0e0]">
                    <img src="/assets/pics/inner/icons/comprehensive.png" className="" alt="" />
                  </div>
                </div>
                <div className="pt-[30px] text-center">
                  <p className="m-auto sm:leading-[26px] text-[16px] font-600 sm:text-[20px] text-[#001017]">
                    Comprehensive Branding Design
                  </p>
                </div>
              </div>
              <div
                className="py-[30px] px-[20px] border-[1px] border-[#e0e0e0] bg-[#fff]"
                data-aos="flip-right"
              >
                <div className="w-[60px] m-auto">
                  <div className="p-[10px] border-[1px] border-[#e0e0e0]">
                    <img src="/assets/pics/inner/icons/visually.png" className="" alt="" />
                  </div>
                </div>
                <div className="pt-[30px] text-center">
                  <p className="m-auto sm:leading-[26px] text-[16px] font-600 sm:text-[20px] text-[#001017]">
                    Visually Stunning Website Design
                  </p>
                </div>
              </div>
              <div
                className="py-[30px] px-[20px] border-[1px] border-[#e0e0e0] bg-[#fff]"
                data-aos="fade-right"
              >
                <div className="w-[60px] m-auto">
                  <div className="p-[10px] border-[1px] border-[#e0e0e0]">
                    <img src="/assets/pics/inner/icons/custom-social.png" className="" alt="" />
                  </div>
                </div>
                <div className="pt-[30px] text-center">
                  <p className="m-auto sm:leading-[26px] text-[16px] font-600 sm:text-[20px] text-[#001017]">
                    Custom Social Media Graphics
                  </p>
                </div>
              </div>
              <div
                className="py-[30px] px-[20px] border-[1px] border-[#e0e0e0] bg-[#fff]"
                data-aos="flip-right"
              >
                <div className="w-[60px] m-auto">
                  <div className="p-[10px] border-[1px] border-[#e0e0e0]">
                    <img src="/assets/pics/inner/icons/effective.png" className="" alt="" />
                  </div>
                </div>
                <div className="pt-[30px] text-center">
                  <p className="m-auto sm:leading-[26px] text-[16px] font-600 sm:text-[20px] text-[#001017]">
                    Effective Print Design
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
                <div className="mr-[50px] xl:col-span-4">
                  <h2
                    className="text-[#001017] text-[24px] xl:text-[40px] font-600 relative pb-[30px]"
                    data-aos="fade-right"
                  >
                    Our Graphic <span className="text-[#00aeef]">Designing Process</span>
                  </h2>
                  <p className="text-[14px] sm:text-[18px] text-left my-0 text-[#001017]" data-aos="fade-up">
                    We follow a streamlined process to ensure that our clients receive designs that meet their
                    requirements and exceed their expectations.
                  </p>
                </div>
                <div
                  className="xl:col-span-3 bg-[#F0F6FF] px-[30px] py-[25px] mt-[20px] sm:mt-0"
                  data-aos="flip-up"
                >
                  <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]">Discovery</p>
                  <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]">
                    We begin by understanding your brand's identity, target audience, and design requirements.
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
                  <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]">Conceptualization</p>
                  <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]">
                    Our team brainstorms ideas and creates rough sketches and mockups to present to you.
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
              <div className="grid grid-cols-1 xl:grid-cols-8 gap-0.5 xl:gap-0">
                <div
                  className="xl:col-span-2 bg-[#F0F6FF] px-[30px] py-[25px] mt-[20px] sm:mt-0"
                  data-aos="flip-up"
                >
                  <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]">Design</p>
                  <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]">
                    Once a concept is approved, our team begins the design process, carefully choosing
                    typography, color, and layout elements to create a cohesive design.
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
                  <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]">Revisions</p>
                  <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]">
                    We work closely with our clients to ensure that the final design meets their requirements,
                    making revisions as necessary.
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
                  <p className="text-[16px] font-600 sm:text-[20px] text-[#001017]">Delivery</p>
                  <p className="text-[14px] sm:text-[16px] sm:leading-[24px] text-[#001017]">
                    Once the final design is approved, we deliver the design files to our clients in various
                    formats to use across multiple platforms.
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
            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-[100px]">
              <div className="">
                <p
                  className="pb-[20px] my-0 text-[24px] sm:text-[40px] font-600 text-[#001017]"
                  data-aos="fade-right"
                >
                  Why <span className="text-[#00aeef]">Choose Us</span>
                </p>
                <p className="text-[14px] sm:text-[18px] text-left my-0 text-[#001017]" data-aos="fade-up">
                  At Cornerstone Medical Solutions, we understand that effective design is essential for building a
                  successful brand. Here are some reasons to choose us for your Graphic Designing needs:
                </p>
                <div className="pt-[20px]">
                  <div className="pb-[20px] md:flex gap-[30px]">
                    <div>
                      <div
                        className="w-16 h-16 flex justify-center items-center border-[1px] border-[#e0e0e0] bg-[#fff]"
                        data-aos="flip-right"
                      >
                        <img
                          src="/assets/pics/inner/icons/cost.png"
                          alt=""
                          className="w-10 h-10"
                        />
                      </div>
                    </div>
                    <div className="" data-aos="fade-right">
                      <p className="my-0 text-[18px] sm:text-[22px] font-semibold">Cost Savings</p>
                      <p className="my-0 text-[14px] sm:text-[18px]">
                        Outsourcing your email and chat support can be more cost-effective than maintaining an
                        in-house support team.
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
                          src="/assets/pics/inner/icons/increased.png"
                          alt=""
                          className="w-11 h-11"
                        />
                      </div>
                    </div>
                    <div className="" data-aos="fade-right">
                      <p className="my-0 text-[18px] sm:text-[22px] font-semibold">Increased Efficiency</p>
                      <p className="my-0 text-[14px] sm:text-[18px]">
                        Our dedicated email and chat support team is available 24/7, which means your
                        customers can get the help they need around the clock.
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
                          src="/assets/pics/inner/icons/affordable.png"
                          alt=""
                          className="w-12 h-12"
                        />
                      </div>
                    </div>
                    <div className="" data-aos="fade-right">
                      <p className="my-0 text-[18px] sm:text-[22px] font-semibold">Affordable Price</p>
                      <p className="my-0 text-[14px] sm:text-[18px]">
                        We offer competitive pricing for our services without compromising on quality.
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
                          src="/assets/pics/inner/icons/timely-delivery.png"
                          alt=""
                          className="w-10 h-10"
                        />
                      </div>
                    </div>
                    <div className="" data-aos="fade-right">
                      <p className="my-0 text-[18px] sm:text-[22px] font-semibold">Timely Delivery</p>
                      <p className="my-0 text-[14px] sm:text-[18px]">
                        We understand the importance of timely delivery, and we strive to deliver our designs
                        on time without compromising on quality.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="m-auto" data-aos="fade-up">
                <img src="/assets/pics/inner/why-web.webp" alt="Why choose our design services" className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
