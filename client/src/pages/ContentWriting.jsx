import { Link } from 'react-router-dom';
import CtaBanner from '../components/CtaBanner';

export default function ContentWriting() {
  return (
    <>
      <div className="bg-[#2b3990] bg-opacity-[100%] relative">
        <img src="/assets/pics/innerbg/content-opt.webp" alt="" className="bg-hero" />{' '}
        <div className="col-md-8 m-auto">
          <div className="pt-[80px] sm:pt-[250px] pb-[70px] sm:pb-[150px] relative">
            <div className="sm:text-center m-auto relative z-40 bg-[#2b3990] bg-opacity-[70%] py-[50px]">
              <h1
                className="text-[#fff] text-[24px] xl:text-[40px] font-600 relative pb-[30px] 2xl:px-[50px] my-0"
                data-aos="fade-right"
              >
                Our Reliable CMS Services
              </h1>
              <p className="text-[14px] sm:text-[18px] text-[#fff] 2xl:px-[100px] my-0" data-aos="fade-up">
                Our content marketing services help your brand stand out from the crowd. We know how to craft
                stories that get people excited about your products and services and how to distribute them in
                a way that will make them more visible than ever.
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
              <div className="2xl:col-span-3 m-auto">
                <p
                  className="my-0 pb-[20px] text-[24px] sm:text-[40px] font-600 text-[#001017]"
                  data-aos="fade-right"
                >
                  Content Management <span className="text-[#00aeef]">Services</span>
                </p>
                <p
                  className="my-0 text-[14px] sm:text-[18px] text-left sm:leading-[30px] text-[#001017]"
                  data-aos="fade-up"
                >
                  In today's digital age, creating and distributing quality content is a critical part of any
                  successful marketing strategy. However, with so much content out there, it can be
                  challenging to stand out and get noticed by your target audience. At Cornerstone Medical Solutions, we
                  understand that managing your content can be a daunting task, which is why we offer a range
                  of Content Management Services to help you stay on top of your digital marketing game.
                  <br />
                  Our team of experienced digital marketing experts can help you create, manage, and promote
                  your content, so you can focus on running your business. Whether you need help with content
                  strategy, creation, promotion, or optimization, we've got you covered.
                </p>
              </div>
              <div className="m-auto relative 2xl:col-span-2" data-aos="flip-right">
                <img
                  src="/assets/pics/inner/content.webp"
                  alt="Content writing services"
                  className=""
                  width="425"
                  height="314"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F0F6FF] relative z-40">
        <div className="col-md-8 m-auto px-[20px] xl:px-[50px]">
          <div className="py-[70px] sm:py-[150px]" data-aos="fade-up">
            <div className="2xl:px-[100px] m-auto text-center">
              <p className="text-[24px] sm:text-[40px] font-600 text-[#001017]" data-aos="fade-right">
                Content <span className="text-[#00aeef]">Audit</span>
              </p>
              <p
                className="my-0 text-[14px] sm:text-[18px] sm:leading-[30px] text-[#001017]"
                data-aos="fade-up"
              >
                The first step in effective content management is understanding what you have. Our team will
                conduct a comprehensive audit of your current content to identify areas for improvement and
                opportunities for growth. By analyzing your existing content, we can determine what is
                working, what is not, and where you have gaps that need to be filled.
                <br />
                We will also assess the quality of your content, making sure it is up-to-date, accurate, and
                relevant to your target audience. Based on our findings, we will provide you with a report
                outlining our recommendations for improving your content.
              </p>
            </div>
            <div className="2xl:px-[100px] m-auto text-center pt-[70px] sm:pt-[150px]">
              <p className="text-[24px] sm:text-[40px] font-600 text-[#001017]" data-aos="fade-right">
                Content <span className="text-[#00aeef]">Strategy</span>
              </p>
              <p
                className="my-0 text-[14px] sm:text-[18px] sm:leading-[30px] text-[#001017]"
                data-aos="fade-up"
              >
                Once we have a clear understanding of your existing content, we will work with you to develop
                a strategy that aligns with your business goals. Our team will identify the topics and formats
                that resonate with your target audience and develop a plan for creating and promoting your
                content.
                <br />
                We will also help you establish metrics for measuring the success of your content, such as
                page views, engagement rates, and conversions. By tracking these metrics, we can fine-tune
                your content strategy over time, making sure it is delivering the results you want.
              </p>
            </div>
            <div className="2xl:px-[100px] m-auto text-center pt-[70px] sm:pt-[150px]">
              <p className="text-[24px] sm:text-[40px] font-600 text-[#001017]" data-aos="fade-right">
                Content <span className="text-[#00aeef]">Creation</span>
              </p>
              <p
                className="my-0 text-[14px] sm:text-[18px] sm:leading-[30px] text-[#001017]"
                data-aos="fade-up"
              >
                Our team of experienced content creators can help you bring your content strategy to life. We
                will work with you to create content that engages and informs your audience, whether it is
                blog posts, infographics, videos, or social media posts. We will also make sure your content
                is high-quality and meets the needs of your target audience. By incorporating best practices
                for content creation, such as search engine optimization (SEO) and user experience (UX)
                design, we will help you create content that stands out in a crowded digital landscape.
              </p>
            </div>
            <div className="2xl:px-[100px] m-auto text-center pt-[70px] sm:pt-[150px]">
              <p className="text-[24px] sm:text-[40px] font-600 text-[#001017]" data-aos="fade-right">
                Content <span className="text-[#00aeef]">Promotion</span>
              </p>
              <p
                className="my-0 text-[14px] sm:text-[18px] sm:leading-[30px] text-[#001017]"
                data-aos="fade-up"
              >
                Creating great content is only half the battle. Our team will help you get your content in
                front of the right people through targeted promotion on social media, email marketing
                campaigns, and other channels. We will use our expertise in digital marketing to help you
                reach your target audience and drive traffic to your website.
                <br />
                We will also help you build relationships with influencers in your industry, so you can
                amplify your reach and establish your brand as a thought leader.
              </p>
            </div>
            <div className="2xl:px-[100px] m-auto text-center pt-[70px] sm:pt-[150px]">
              <p className="text-[24px] sm:text-[40px] font-600 text-[#001017]" data-aos="fade-right">
                Content <span className="text-[#00aeef]">Optimization</span>
              </p>
              <p
                className="my-0 text-[14px] sm:text-[18px] sm:leading-[30px] text-[#001017]"
                data-aos="fade-up"
              >
                We will make sure your content is optimized for search engines and social media platforms. By
                using the right keywords and meta tags, we will help your content rank higher in search
                results and get more engagement on social media.
                <br />
                We will also make sure your content is mobile-friendly, so it looks great on any device. By
                optimizing your content for mobile, we will help you reach more people and provide a better
                user experience for your audience.
              </p>
            </div>
            <div className="2xl:px-[100px] m-auto text-center pt-[70px] sm:pt-[150px]">
              <p className="text-[24px] sm:text-[40px] font-600 text-[#001017]" data-aos="fade-right">
                Analytics and <span className="text-[#00aeef]">Reporting</span>
              </p>
              <p
                className="my-0 text-[14px] sm:text-[18px] sm:leading-[30px] text-[#001017]"
                data-aos="fade-up"
              >
                Finally, we will provide you with regular reports on your content performance, so you can see
                how your content is resonating with your audience and make informed decisions about future
                content strategy. We will track metrics such as page views, engagement rates, and conversions,
                and provide you with actionable insights on how to improve your content over time.
              </p>
            </div>
          </div>
        </div>
      </div>
      <CtaBanner />
    </>
  );
}
