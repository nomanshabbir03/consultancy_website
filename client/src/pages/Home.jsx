import { Link } from 'react-router-dom';
import AwardsSection from '../components/AwardsSection';
import ContactSection from '../components/ContactSection';
import FaqSection from '../components/FaqSection';
import TeamSection from '../components/TeamSection';
import SuccessStories from '../components/SuccessStories';

export default function Home() {
  return (
    <>
      <div
        className="z-40 w-full h-screen bg-[#2b3990] flex justify-center items-center relative"
        id="hero-section"
      >
        <video
          className="absolute z-20 top-0 left-0 object-cover w-full h-full opacity-[40%]"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/assets/pics/web-bg.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="col-md-8 m-auto">
          <div className="relative flex justify-center items-center">
            <div className="text-center relative z-40">
              <h1
                className="text-[#fff] text-[40px] xl:text-[60px] relative w-full"
                style={{ fontWeight: '600' }}
                data-aos="fade-right"
              >
                We Are Serving Round The Clock
              </h1>
              <div className="pt-[10px] sm:pt-[30px]">
                <div className="flex gap-2 sm:gap-5 items-center justify-center text-[#fff]">
                  <div>
                    <Link to="/bpo" className="text-[#fff] hover:text-[#fff] text-[16px] sm:text-[24px] my-0">
                      BPO
                    </Link>
                  </div>
                  <div className="w-[8px] h-[8px] rounded-full bg-white"></div>
                  <div>
                    <Link
                      to="/health-care"
                      className="text-[#fff] hover:text-[#fff] text-[16px] sm:text-[24px] my-0"
                    >
                      Healthcare
                    </Link>
                  </div>
                  <div className="w-[8px] h-[8px] rounded-full bg-white"></div>
                  <div>
                    <Link
                      to="/digital-marketing"
                      className="text-[#fff] hover:text-[#fff] text-[16px] sm:text-[24px] my-0"
                    >
                      Digital Marketing
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#fff] relative font-poppins z-30">
        <div className="col-md-8 mx-auto md:mx-[20px]">
          <div className="py-[70px] sm:py-[150px]">
            <div>
              <div className="">
                <p
                  className="my-0 text-[24px] sm:text-[40px] text-[#001017]"
                  style={{ fontWeight: '600' }}
                  data-aos="fade-right"
                >
                  Optimized Business <span className="text-[#00aeef]">Solutions</span>
                </p>
              </div>
              <p
                className="text-[14px] sm:text-[18px] text-[#001017] pt-[30px] sm:pt-[30px] my-0"
                style={{ fontWeight: '400' }}
                data-aos="fade-right"
              >
                Our comprehensive suite of BPO, healthcare, and digital marketing solutions provides seamless
                and optimized services that elevate our clients' operations. With over a decade of experience
                and a proven track record of success, we strive to inspire and empower our clients to achieve
                their goals and drive sustainable growth.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] sm:gap-[24px] pt-[30px] sm:pt-[50px] m-auto">
              <div className="border-[1px] border-[#E0E0E0] p-[20px] sm:p-[40px]" data-aos="fade-right">
                <div className="grid desktop:grid-cols-7 gap-[30px]">
                  <div className="desktop:col-span-3">
                    <div className="w-[48px] h-[48px]">
                      <img src="/assets/pics/newicons/bpo.svg" alt="" width="48" height="48" />
                    </div>
                    <p
                      className="text-[18px] sm:text-[24px] sm:leading-[30px] text-[#001017] pt-[20px] my-0"
                      style={{ fontWeight: '600' }}
                    >
                      Business Process Outsourcing
                    </p>
                  </div>
                  <div className="desktop:col-span-4">
                    <p
                      className="text-[14px] sm:text-[18px] text-[#001017] my-0 pb-[10px]"
                      style={{ fontWeight: '400' }}
                      data-aos="fade-right"
                    >
                      Our BPO call center department provides top-notch customer support.
                    </p>
                    <div
                      className="text-[14px] sm:text-[18px] text-[#001017] m-auto flex flex-col gap-[5px]"
                      style={{ fontWeight: '400' }}
                      data-aos="fade-right"
                    >
                      <Link
                        to="/inbound-call"
                        className="text-[#001017] duration-300 transform hover:no-underline hover:scale-105 hover:text-[#001017] hover:font-semibold my-0"
                      >
                        <span>
                          <i className="fa-solid fa-arrow-right-long pr-1 text-[14px] my-0 text-[#2b3990]"></i>
                        </span>{' '}
                        Inbound Calls
                      </Link>{' '}
                      <Link
                        to="/outbound-call"
                        className="text-[#001017] duration-300 transform hover:no-underline hover:scale-105 hover:text-[#001017] hover:font-semibold my-0"
                      >
                        <span>
                          <i className="fa-solid fa-arrow-right-long pr-1 text-[14px] my-0 text-[#2b3990]"></i>
                        </span>{' '}
                        Outbound Calls
                      </Link>{' '}
                      <Link
                        to="/email-and-chat"
                        className="text-[#001017] duration-300 transform hover:no-underline hover:scale-105 hover:text-[#001017] hover:font-semibold my-0"
                      >
                        <span>
                          <i className="fa-solid fa-arrow-right-long pr-1 text-[14px] my-0 text-[#2b3990]"></i>
                        </span>{' '}
                        Email and Chat Support
                      </Link>{' '}
                      <Link
                        to="/sms-support"
                        className="text-[#001017] duration-300 transform hover:no-underline hover:scale-105 hover:text-[#001017] hover:font-semibold my-0"
                      >
                        <span>
                          <i className="fa-solid fa-arrow-right-long pr-1 text-[14px] my-0 text-[#2b3990]"></i>
                        </span>{' '}
                        SMS Support
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-[1px] border-[#E0E0E0] p-[20px] sm:p-[40px]" data-aos="fade-right">
                <div className="grid desktop:grid-cols-7 gap-[30px]">
                  <div className="desktop:col-span-3">
                    <div className="w-[48px] h-[48px]">
                      <img
                        src="/assets/pics/newicons/healthcare.svg"
                        alt=""
                        width="48"
                        height="48"
                      />
                    </div>
                    <p
                      className="text-[18px] sm:text-[24px] sm:leading-[30px] text-[#001017] pt-[20px] my-0"
                      style={{ fontWeight: '600' }}
                    >
                      Health Care
                    </p>
                  </div>
                  <div className="desktop:col-span-4">
                    <p
                      className="text-[14px] sm:text-[18px] text-[#001017] my-0 pb-[10px]"
                      style={{ fontWeight: '400' }}
                      data-aos="fade-right"
                    >
                      Managing patient billing and processing insurance claims are part of it.
                    </p>
                    <div
                      className="text-[14px] sm:text-[18px] text-[#001017] m-auto flex flex-col gap-[5px]"
                      style={{ fontWeight: '400' }}
                      data-aos="fade-right"
                    >
                      <Link
                        to="/medical-billing"
                        className="text-[#001017] duration-300 transform hover:no-underline hover:scale-105 hover:text-[#001017] hover:font-semibold my-0"
                      >
                        <span>
                          <i className="fa-solid fa-arrow-right-long pr-1 text-[14px] my-0 text-[#2b3990]"></i>
                        </span>{' '}
                        Medical Billing
                      </Link>{' '}
                      <Link
                        to="/medical-transcription"
                        className="text-[#001017] duration-300 transform hover:no-underline hover:scale-105 hover:text-[#001017] hover:font-semibold my-0"
                      >
                        <span>
                          <i className="fa-solid fa-arrow-right-long pr-1 text-[14px] my-0 text-[#2b3990]"></i>
                        </span>{' '}
                        Medical Transcription
                      </Link>{' '}
                      <Link
                        to="/management-services"
                        className="text-[#001017] duration-300 transform hover:no-underline hover:scale-105 hover:text-[#001017] hover:font-semibold my-0"
                      >
                        <span>
                          <i className="fa-solid fa-arrow-right-long pr-1 text-[14px] my-0 text-[#2b3990]"></i>
                        </span>{' '}
                        Management Services
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-[1px] border-[#E0E0E0] p-[20px] sm:p-[40px]" data-aos="fade-right">
                <div className="grid desktop:grid-cols-7 gap-[30px]">
                  <div className="desktop:col-span-3">
                    <div className="w-[48px] h-[48px]">
                      <img src="/assets/pics/newicons/design.svg" alt="" width="48" height="48" />
                    </div>
                    <p
                      className="text-[18px] sm:text-[24px] sm:leading-[30px] text-[#001017] pt-[20px] my-0"
                      style={{ fontWeight: '600' }}
                    >
                      Digital Marketing
                    </p>
                  </div>
                  <div className="desktop:col-span-4">
                    <p
                      className="text-[14px] sm:text-[18px] text-[#001017] my-0 pb-[10px]"
                      style={{ fontWeight: '400' }}
                      data-aos="fade-right"
                    >
                      Our digital marketing team helps businesses reach their target audience.
                    </p>
                    <div
                      className="text-[14px] sm:text-[18px] text-[#001017] m-auto flex flex-col gap-[5px]"
                      style={{ fontWeight: '400' }}
                      data-aos="fade-right"
                    >
                      <Link
                        to="/graphic-designing"
                        className="text-[#001017] duration-300 transform hover:no-underline hover:scale-105 hover:text-[#001017] hover:font-semibold my-0"
                      >
                        <span>
                          <i className="fa-solid fa-arrow-right-long pr-1 text-[14px] my-0 text-[#2b3990]"></i>
                        </span>{' '}
                        Graphic Designing
                      </Link>{' '}
                      <Link
                        to="/search-engine-optimization"
                        className="text-[#001017] duration-300 transform hover:no-underline hover:scale-105 hover:text-[#001017] hover:font-semibold my-0"
                      >
                        <span>
                          <i className="fa-solid fa-arrow-right-long pr-1 text-[14px] my-0 text-[#2b3990]"></i>
                        </span>{' '}
                        Search Engine Optimization
                      </Link>{' '}
                      <Link
                        to="/social-media-marketing"
                        className="text-[#001017] duration-300 transform hover:no-underline hover:scale-105 hover:text-[#001017] hover:font-semibold my-0"
                      >
                        <span>
                          <i className="fa-solid fa-arrow-right-long pr-1 text-[14px] my-0 text-[#2b3990]"></i>
                        </span>{' '}
                        Social Media Marketing
                      </Link>{' '}
                      <Link
                        to="/content-writing"
                        className="text-[#001017] duration-300 transform hover:no-underline hover:scale-105 hover:text-[#001017] hover:font-semibold my-0"
                      >
                        <span>
                          <i className="fa-solid fa-arrow-right-long pr-1 text-[14px] my-0 text-[#2b3990]"></i>
                        </span>{' '}
                        Content Writing
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-[1px] border-[#E0E0E0] p-[20px] sm:p-[40px]" data-aos="fade-right">
                <div className="grid desktop:grid-cols-7 gap-[30px]">
                  <div className="desktop:col-span-3">
                    <div className="w-[48px] h-[48px]">
                      <img src="/assets/pics/newicons/custom.svg" alt="" width="48" height="48" />
                    </div>
                    <p
                      className="text-[18px] sm:text-[24px] sm:leading-[30px] text-[#001017] pt-[20px] my-0"
                      style={{ fontWeight: '600' }}
                    >
                      Software Development
                    </p>
                  </div>
                  <div className="desktop:col-span-4">
                    <p
                      className="text-[14px] sm:text-[18px] text-[#001017] my-0 pb-[10px]"
                      style={{ fontWeight: '400' }}
                      data-aos="fade-right"
                    >
                      Empowering Your Vision with Expert Software/Web Development Services.
                    </p>
                    <div
                      className="text-[14px] sm:text-[18px] text-[#001017] m-auto flex flex-col gap-[5px]"
                      style={{ fontWeight: '400' }}
                      data-aos="fade-right"
                    >
                      <Link
                        to="/web-development"
                        className="text-[#001017] duration-300 transform hover:no-underline hover:scale-105 hover:text-[#001017] hover:font-semibold my-0"
                      >
                        <span>
                          <i className="fa-solid fa-arrow-right-long pr-1 text-[14px] my-0 text-[#2b3990]"></i>
                        </span>{' '}
                        Web Development
                      </Link>{' '}
                      <Link
                        to="/ui-ux-designing"
                        className="text-[#001017] duration-300 transform hover:no-underline hover:scale-105 hover:text-[#001017] hover:font-semibold my-0"
                      >
                        <span>
                          <i className="fa-solid fa-arrow-right-long pr-1 text-[14px] my-0 text-[#2b3990]"></i>
                        </span>{' '}
                        UI/UX Designing
                      </Link>{' '}
                      <Link
                        to="/web-development"
                        className="text-[#001017] duration-300 transform hover:no-underline hover:scale-105 hover:text-[#001017] hover:font-semibold my-0"
                      >
                        <span>
                          <i className="fa-solid fa-arrow-right-long pr-1 text-[14px] my-0 text-[#2b3990]"></i>
                        </span>{' '}
                        Wordpress Development
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TeamSection />
      <div className="bg-[#fff] relative font-poppins z-30">
        <div className="col-md-8 mx-auto md:mx-[20px]">
          <div className="py-[70px] sm:py-[150px]">
            <div className="grid grid-cols-1 desktop:grid-cols-8 gap-[40px] sm:gap-[70px]">
              <div className="col-span-3">
                <p
                  className="my-0 text-[24px] sm:text-[40px] sm:leading-[44px] text-[#001017]"
                  style={{ fontWeight: '600' }}
                  data-aos="fade-right"
                >
                  Our Roadmap to <span className="text-[#00aeef]">Results</span>
                </p>
                <p
                  className="text-[14px] sm:text-[18px] text-[#001017] pt-[30px] sm:pt-[30px] my-0"
                  style={{ fontWeight: '400' }}
                  data-aos="fade-right"
                >
                  Our process is a journey of discovery, collaboration, and innovation. We work with our
                  clients to understand their needs and their problems. Then, we create special solutions to
                  help them reach their goals.
                </p>
                <div className="mt-[50px]">
                  <Link
                    to="/contact-us"
                    className="relative flex gap-4 items-center justify-center w-[250px] h-[49px] border-[2px] border-[#2b3990] transform hover:scale-90 transition duration-500 ease-in-out hover:no-underline hover:text-[#00aeef] text-[#2b3990] text-[16px] 2xl:text-[18px]"
                  >
                    <p className="my-auto h-7">Book A Meeting</p>
                    <p className="text-xl my-auto">
                      <i className="fa-solid fa-arrow-right"></i>
                    </p>
                  </Link>
                </div>
              </div>
              <div className="col-span-5 grid grid-cols-1 md:grid-cols-2 gap-[30px]">
                <div className="p-[20px] border-[1px] border-[#E0E0E0] relative bg-white">
                  <div>
                    <div className="w-[48px] h-[48px]">
                      <img src="/assets/pics/newicons/vision.svg" alt="" width="48" height="48" />
                    </div>
                    <p
                      className="text-[18px] sm:text-[24px] sm:leading-[30px] text-[#001017] pt-[20px] my-0"
                      style={{ fontWeight: '600' }}
                    >
                      Uncovering Your Vision
                    </p>
                  </div>
                  <p
                    className="text-[14px] sm:text-[16px] text-[#001017] pt-[20px] my-0"
                    style={{ fontWeight: '400' }}
                    data-aos="fade-right"
                  >
                    At Cornerstone Medical Solutions, we're passionate about helping businesses succeed. That's why we
                    start by deeply understanding your unique needs and challenges.
                  </p>
                  <div className="absolute right-0 top-0 w-[40px] h-[40px] bg-[#0017a9]">
                    <div className="w-[40px] h-[40px] bg-[#1E35C8] rounded-full"></div>
                  </div>
                  <div className="absolute right-0 top-[40px] rounded-bl-full w-[40px] h-[40px] bg-[#F9B233]"></div>
                  <div className="absolute right-[40px] top-0 rounded-bl-full rounded-tl-full w-[40px] h-[40px] bg-[#00aeef]"></div>
                </div>
                <div className="p-[20px] border-[1px] border-[#E0E0E0] relative bg-white">
                  <div>
                    <div className="w-[48px] h-[48px]">
                      <img
                        src="/assets/pics/newicons/solution.svg"
                        alt=""
                        width="48"
                        height="48"
                      />
                    </div>
                    <p
                      className="text-[18px] sm:text-[24px] sm:leading-[30px] text-[#001017] pt-[20px] my-0"
                      style={{ fontWeight: '600' }}
                    >
                      Crafting Solutions
                    </p>
                  </div>
                  <p
                    className="text-[14px] sm:text-[16px] text-[#001017] pt-[20px] my-0"
                    style={{ fontWeight: '400' }}
                    data-aos="fade-right"
                  >
                    Our team of experts will carefully learn about your business needs and goals. After that,
                    we'll explore various ideas and options to find the best solutions.
                  </p>
                  <div className="absolute right-0 top-0 w-[40px] h-[40px] bg-[#0017a9]">
                    <div className="w-[40px] h-[40px] bg-[#1E35C8] rounded-full"></div>
                  </div>
                  <div className="absolute right-0 top-[40px] rounded-bl-full w-[40px] h-[40px] bg-[#F9B233]"></div>
                  <div className="absolute right-[40px] top-0 rounded-bl-full rounded-tl-full w-[40px] h-[40px] bg-[#00aeef]"></div>
                </div>
                <div className="p-[20px] border-[1px] border-[#E0E0E0] relative bg-white">
                  <div>
                    <div className="w-[48px] h-[48px]">
                      <img src="/assets/pics/newicons/success.svg" alt="" width="48" height="48" />
                    </div>
                    <p
                      className="text-[18px] sm:text-[24px] sm:leading-[30px] text-[#001017] pt-[20px] my-0"
                      style={{ fontWeight: '600' }}
                    >
                      Delivering Success
                    </p>
                  </div>
                  <p
                    className="text-[14px] sm:text-[16px] text-[#001017] pt-[20px] my-0"
                    style={{ fontWeight: '400' }}
                    data-aos="fade-right"
                  >
                    At Cornerstone Medical Solutions, the magic happens in the development and implementation phase. This
                    is where we take your vision and turn it into a reality.
                  </p>
                  <div className="absolute right-0 top-0 w-[40px] h-[40px] bg-[#0017a9]">
                    <div className="w-[40px] h-[40px] bg-[#1E35C8] rounded-full"></div>
                  </div>
                  <div className="absolute right-0 top-[40px] rounded-bl-full w-[40px] h-[40px] bg-[#F9B233]"></div>
                  <div className="absolute right-[40px] top-0 rounded-bl-full rounded-tl-full w-[40px] h-[40px] bg-[#00aeef]"></div>
                </div>
                <div className="p-[20px] border-[1px] border-[#E0E0E0] relative bg-white">
                  <div>
                    <div className="w-[48px] h-[48px]">
                      <img src="/assets/pics/newicons/innov.svg" alt="" width="48" height="48" />
                    </div>
                    <p
                      className="text-[18px] sm:text-[24px] sm:leading-[30px] text-[#001017] pt-[20px] my-0"
                      style={{ fontWeight: '600' }}
                    >
                      Empowering Innovation
                    </p>
                  </div>
                  <p
                    className="text-[14px] sm:text-[16px] text-[#001017] pt-[20px] my-0"
                    style={{ fontWeight: '400' }}
                    data-aos="fade-right"
                  >
                    Encourage a culture of innovation where employees are empowered to propose new ideas and
                    solutions.
                  </p>
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
      </div>
      <div className="bg-[#F0F6FF] relative z-30">
        <div className="col-md-8 py-[70px] sm:py-[150px] col-md-8 mx-auto">
          <div>
            <div className="text-center">
              <p className="text-[24px] sm:text-[40px]" style={{ fontWeight: '600' }} data-aos="fade-right">
                {'Commitment to Quality &'} <span className="text-[#00aeef]">Compliance</span>
              </p>
            </div>
            <p
              className="text-[14px] sm:text-[18px] text-center pt-[10px] m-auto"
              style={{ fontWeight: '400' }}
              data-aos="fade-up"
            >
              We are proud to hold ISO certifications, demonstrating our commitment to information security,
              quality management, and business continuity. These globally recognized standards ensure that
              Cornerstone Medical Solutions delivers reliable, secure, and high-quality services to all our
              clients.
            </p>
          </div>
          <div className="mt-4 md:-mt-48 lg:w-[90%] mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-[10px] lg:gap-[20px] xl:gap-[40px] 2xl:gap-[60px]">
              <div className="flex items-center justify-center">
                <img src="/assets/iso/1.png" alt="" className="mx-auto" />
              </div>
              <div className="flex items-center justify-center">
                <img src="/assets/iso/3.png" alt="" className="mx-auto" />
              </div>
              <div className="flex items-center justify-center">
                <img src="/assets/iso/2.png" alt="" className="mx-auto" />
              </div>
              <div className="flex items-center justify-center">
                <img src="/assets/iso/4.png" alt="" className="mx-auto" />
              </div>
              <div className="flex items-center justify-center">
                <img src="/assets/iso/5.png" alt="" className="mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#2b3990] relative font-poppins z-20">
        <div className="col-md-8 relative z-30 mx-auto md:mx-[20px]">
          <div className="w-full py-[70px] sm:py-[150px] md:px-[50px]">
            <p
              className="my-0 text-[24px] sm:text-[40px] sm:leading-[44px] text-[#fff]"
              style={{ fontWeight: '600' }}
              data-aos="fade-right"
            >
              Cornerstone Medical Solutions’ Vision for the Future!
            </p>
            <p
              className="text-[14px] sm:text-[18px] text-[#fff] pt-[15px] sm:pt-[30px] my-0"
              style={{ fontWeight: '400' }}
              data-aos="fade-right"
            >
              At Cornerstone Medical Solutions, we are more than just a team of experts. We are a team of visionaries
              passionate about building a better tomorrow. Technology and innovation can solve important
              problems in the world. We use our knowledge and skills to assist our clients in reaching their
              goals and making a positive difference.
              <br />
              Our goals for the future include:
            </p>
            <div className="pt-[15px]">
              <div className="flex items-center gap-3">
                <div className="w-[5px] h-[5px] rounded-full bg-white "></div>
                <div>
                  <p
                    className="text-[14px] sm:text-[18px] text-[#fff] my-0"
                    style={{ fontWeight: '400' }}
                    data-aos="fade-right"
                  >
                    Expanding our expertise and reaching new clients so that we can help even more people
                    benefit from our services.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-[5px] h-[5px] rounded-full bg-white "></div>
                <div>
                  <p
                    className="text-[14px] sm:text-[18px] text-[#fff] my-0"
                    style={{ fontWeight: '400' }}
                    data-aos="fade-right"
                  >
                    Investing in new technologies and capabilities so that we can deliver even better results
                    for our clients.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-[5px] h-[5px] rounded-full bg-white "></div>
                <div>
                  <p
                    className="text-[14px] sm:text-[18px] text-[#fff] my-0"
                    style={{ fontWeight: '400' }}
                    data-aos="fade-right"
                  >
                    Building a broader team of talented, dedicated professionals passionate about making a
                    difference.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-[5px] h-[5px] rounded-full bg-white "></div>
                <div>
                  <p
                    className="text-[14px] sm:text-[18px] text-[#fff] my-0"
                    style={{ fontWeight: '400' }}
                    data-aos="fade-right"
                  >
                    We believe that together, we can create a brighter future for all.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -top-[10%] left-0 z-20 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-[#000E64] rounded-full flex items-center justify-center">
          <div className="w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] bg-[#2b3990] rounded-full"></div>
        </div>
        <div className="absolute -bottom-[10%] right-0 z-20 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-[#000E64] rounded-full flex items-center justify-center">
          <div className="w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] bg-[#2b3990] rounded-full"></div>
        </div>
      </div>
      <AwardsSection />
      <SuccessStories />
      <ContactSection />
      <FaqSection />
    </>
  );
}
