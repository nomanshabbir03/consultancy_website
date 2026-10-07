import { Link } from 'react-router-dom';
import CtaBanner from '../components/CtaBanner';

export default function ManagementServices() {
  return (
    <>
      <div className="bg-[#2b3990] bg-opacity-[80%] relative">
        <img src="/assets/pics/innerbg/mgt-services-opt.webp" alt="" className="bg-hero" />{' '}
        <div className="col-md-8 m-auto">
          <div className="pt-[80px] sm:pt-[250px] pb-[70px] sm:pb-[150px] relative">
            <div className="sm:text-center m-auto relative z-40 bg-[#2b3990] bg-opacity-[70%] py-[50px]">
              <h1
                className="text-[#fff] capitalize text-[24px] xl:text-[40px] xl:leading-[44px] font-600 relative pb-[30px] 2xl:px-[100px] m-auto"
                data-aos="fade-right"
              >
                Managing Medical Excellence, Around the Clock
              </h1>
              <p className="text-[14px] sm:text-[18px] text-[#fff] 2xl:px-[100px] m-auto" data-aos="fade-up">
                Welcome to Cornerstone Medical Solutions, your premier partner in comprehensive management
                services for the medical industry. We understand the challenges and demands faced by
                healthcare organizations, and we are here to provide you with round-the-clock.
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
            <div className="m-auto text-center pb-[50px]">
              <p
                className="my-0 pb-[20px] text-[24px] sm:text-[40px] font-600 text-[#001017]"
                data-aos="fade-right"
              >
                Our Range of <span className="text-[#00aeef]">Services</span>
              </p>
              <p
                className="2xl:px-[80px] m-auto text-[14px] sm:text-[18px] my-0 text-[#001017]"
                data-aos="flip-up"
              >
                At Cornerstone Medical Solutions, we specialize in delivering top-notch management solutions
                that empower medical facilities to thrive in a rapidly evolving healthcare landscape. Our team
                of experienced professionals is committed to helping you streamline operations, optimize
                resources, and enhance patient care. Our services include:
              </p>
            </div>
            <div className="m-auto grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-[30px]">
              <div
                className="text-center py-[40px] px-[30px] rounded-[8px] bg-[#F0F6FF]"
                data-aos="flip-right"
              >
                <p className="text-[#001017] text-[16px] xl:text-[20px] font-600 pb-[20px] my-0">
                  Patient Payments
                </p>
                <p className="my-0 text-[#001017] text-[14px] xl:text-[16px]">
                  Managing patient payments can be time-consuming and tedious, but it is a crucial part of
                  running a medical practice.
                </p>
              </div>
              <div
                className="text-center py-[40px] px-[30px] rounded-[8px] bg-[#F0F6FF]"
                data-aos="fade-right"
              >
                <p className="text-[#001017] text-[16px] xl:text-[20px] font-600 pb-[20px] my-0">
                  Patients Calls
                </p>
                <p className="my-0 text-[#001017] text-[14px] xl:text-[16px]">
                  We transcribe audio recordings of patient consultations, enabling healthcare providers to
                  review and analyze critical information during the decision-making process.
                </p>
              </div>
              <div
                className="text-center py-[40px] px-[30px] rounded-[8px] bg-[#F0F6FF]"
                data-aos="flip-right"
              >
                <p className="text-[#001017] text-[16px] xl:text-[20px] font-600 pb-[20px] my-0">
                  Insurance Eligibility
                </p>
                <p className="my-0 text-[#001017] text-[14px] xl:text-[16px]">
                  Dealing with insurance companies can be complicated, time-consuming, and frustrating. Our
                  insurance eligibility service will help streamline the process for you.
                </p>
              </div>
              <div
                className="text-center py-[40px] px-[30px] rounded-[8px] bg-[#F0F6FF]"
                data-aos="fade-right"
              >
                <p className="text-[#001017] text-[16px] xl:text-[20px] font-600 pb-[20px] my-0">
                  Regular Reports
                </p>
                <p className="my-0 text-[#001017] text-[14px] xl:text-[16px]">
                  We understand that every healthcare organization has unique transcription needs. Contact us
                  to discuss your specific requirements, and we will tailor our services to meet your
                  expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F0F6FF] relative z-40">
        <div className="col-md-8 m-auto">
          <div className="py-[70px] sm:py-[150px]">
            <div className="m-auto text-center pb-[50px]">
              <h2
                className="md:w-[690px] m-auto text-[#001017] text-[24px] xl:text-[40px] font-600 relative pb-[30px]"
                data-aos="fade-right"
              >
                Why Choose <span className="text-[#00aeef]">Cornerstone Medical Solutions?</span>
              </h2>
              <p
                className="2xl:px-[80px] m-auto text-[14px] sm:text-[18px] my-0 text-[#001017]"
                data-aos="fade-up"
              >
                Our rigorous quality control process ensures that you receive high-quality, Management
                services every time. Our team of medical Management services has expertise in various medical
                specialties, enabling us to manage accurately and efficiently.
              </p>
            </div>
            <div className="m-auto grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-[30px]">
              <div data-aos="flip-up">
                <p className="text-[#001017] text-[24px] xl:leading-[34px] xl:text-[30px] font-600 pb-[20px] my-0">
                  Unparalleled <span className="text-[#00aeef]">Availability</span>
                </p>
                <p className="text-[#001017] text-[14px] xl:text-[18px] my-0">
                  We are available 24 hours a day, 7 days a week, because we understand that medical services
                  operate around the clock. Whether you need assistance during the day or emergency support
                  during the night, our dedicated team is here to ensure your operations run smoothly without
                  interruption.
                </p>
              </div>
              <div data-aos="flip-right">
                <p className="text-[#001017] text-[24px] xl:leading-[34px] xl:text-[30px] font-600 pb-[20px] my-0">
                  Comprehensive <span className="text-[#00aeef]">MGT Services</span>
                </p>
                <p className="text-[#001017] text-[14px] xl:text-[18px] my-0">
                  Our range of management services covers every aspect of your medical facility's operations.
                  From strategic planning and financial management to human resources and regulatory
                  compliance, we have the expertise and experience to address your unique needs effectively.
                </p>
              </div>
              <div data-aos="flip-right">
                <p className="text-[#001017] text-[24px] xl:leading-[34px] xl:text-[30px] font-600 pb-[20px] my-0">
                  Industry <span className="text-[#00aeef]">Expertise</span>
                </p>
                <p className="text-[#001017] text-[14px] xl:text-[18px] my-0">
                  With years of experience in the medical industry, we possess in-depth knowledge of the
                  challenges and trends shaping the healthcare landscape. Our team stays up to date with the
                  latest advancements, regulations, and best practices, ensuring that you receive cutting-edge
                  solutions tailored to your organization's specific requirements.
                </p>
              </div>
              <div data-aos="flip-up">
                <p className="text-[#001017] text-[24px] xl:leading-[34px] xl:text-[30px] font-600 pb-[20px] my-0">
                  Customized <span className="text-[#00aeef]">Approach</span>
                </p>
                <p className="text-[#001017] text-[14px] xl:text-[18px] my-0">
                  We understand that every medical facility is unique, and there is no one-size-fits-all
                  solution. That's why we take the time to understand your goals, challenges, and culture
                  before crafting a customized management strategy. Our approach ensures that our services
                  align perfectly with your organization's vision and values.
                </p>
              </div>
              <div data-aos="flip-right">
                <p className="text-[#001017] text-[24px] xl:leading-[34px] xl:text-[30px] font-600 pb-[20px] my-0">
                  Collaborative <span className="text-[#00aeef]">Partnership</span>
                </p>
                <p className="text-[#001017] text-[14px] xl:text-[18px] my-0">
                  We believe in building long-term, collaborative partnerships with our clients. We work hand
                  in hand with your team, fostering open communication and transparency throughout the
                  process. Together, we can achieve operational excellence, improve patient outcomes, and
                  drive sustainable growth for your medical facility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#fff] relative z-40">
        <div className="col-md-8 m-auto px-[20px] xl:px-[50px]">
          <div className="py-[70px] sm:py-[150px]">
            <div className="m-auto text-center">
              <h2
                className="2xl:px-[50px] m-auto text-[#001017] text-[24px] xl:text-[40px] font-600 relative pb-[20px] my-0"
                data-aos="fade-right"
              >
                Partner with
                <br className="hidden sm:block" />{' '}
                <span className="text-[#00aeef]">Cornerstone Medical Solutions</span>
              </h2>
              <p
                className="2xl:px-[60px] text-[14px] sm:text-[18px] sm:leading-[30px] text-[#001017] my-0"
                data-aos="flip-up"
              >
                When you choose Cornerstone Medical Solutions, you gain a trusted partner dedicated to your
                success. Our 24/7 availability, comprehensive services, industry expertise, customized
                approach, and collaborative partnership model set us apart as the premier management services
                provider for medical facilities.
                <br />
                Contact us today to learn more about how we can help your organization thrive with our
                tailored management solutions. Together, let's build a healthier future, around the clock.
              </p>
            </div>
          </div>
        </div>
      </div>
      <CtaBanner />
    </>
  );
}
