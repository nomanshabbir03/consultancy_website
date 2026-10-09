import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import AwardsSection from '../components/AwardsSection';
import ContactSection from '../components/ContactSection';
import FaqSection from '../components/FaqSection';
import TeamSection from '../components/TeamSection';
import SuccessStories from '../components/SuccessStories';
import Accent from '../content/Accent';
import { useLayout, useSection } from '../content/SiteContent';

// The markup, classes and animations of every section are unchanged; only the texts, links and images come from the CMS
// (see content/pageDefaults.js for the built-in values used when nothing is published).

const videoType = (src) => (/\.mp4(\?|$)/i.test(src) ? 'video/mp4' : 'video/webm');

function Hero() {
  const { heading, video, links } = useSection('home', 'hero');
  return (
    <div className="z-40 w-full h-screen bg-[#2b3990] flex justify-center items-center relative" id="hero-section">
      <video className="absolute z-20 top-0 left-0 object-cover w-full h-full opacity-[40%]" autoPlay loop muted playsInline>
        <source src={video} type={videoType(video)} />
        Your browser does not support the video tag.
      </video>
      <div className="col-md-8 m-auto">
        <div className="relative flex justify-center items-center">
          <div className="text-center relative z-40">
            <h1 className="text-[#fff] text-[40px] xl:text-[60px] relative w-full" style={{ fontWeight: '600' }} data-aos="fade-right">
              <Accent text={heading} />
            </h1>
            <div className="pt-[10px] sm:pt-[30px]">
              <div className="flex gap-2 sm:gap-5 items-center justify-center text-[#fff]">
                {links.map((link, i) => (
                  <Fragment key={`${link.to}-${i}`}>
                    {i > 0 && <div className="w-[8px] h-[8px] rounded-full bg-white"></div>}
                    <div>
                      <Link to={link.to} className="text-[#fff] hover:text-[#fff] text-[16px] sm:text-[24px] my-0">
                        {link.label}
                      </Link>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Solutions() {
  const { heading, intro, cards } = useSection('home', 'solutions');
  return (
    <div className="bg-[#fff] relative font-poppins z-30">
      <div className="col-md-8 mx-auto md:mx-[20px]">
        <div className="py-[70px] sm:py-[150px]">
          <div>
            <div className="">
              <p className="my-0 text-[24px] sm:text-[40px] text-[#001017]" style={{ fontWeight: '600' }} data-aos="fade-right">
                <Accent text={heading} />
              </p>
            </div>
            <p className="text-[14px] sm:text-[18px] text-[#001017] pt-[30px] sm:pt-[30px] my-0" style={{ fontWeight: '400' }} data-aos="fade-right">
              {intro}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] sm:gap-[24px] pt-[30px] sm:pt-[50px] m-auto">
            {cards
              .filter((card) => card.visible !== false)
              .map((card, c) => (
                <div key={`${card.title}-${c}`} className="border-[1px] border-[#E0E0E0] p-[20px] sm:p-[40px]" data-aos="fade-right">
                  <div className="grid desktop:grid-cols-7 gap-[30px]">
                    <div className="desktop:col-span-3">
                      <div className="w-[48px] h-[48px]">
                        <img src={card.icon} alt={card.iconAlt} width="48" height="48" />
                      </div>
                      <p className="text-[18px] sm:text-[24px] sm:leading-[30px] text-[#001017] pt-[20px] my-0" style={{ fontWeight: '600' }}>
                        {card.title}
                      </p>
                    </div>
                    <div className="desktop:col-span-4">
                      <p className="text-[14px] sm:text-[18px] text-[#001017] my-0 pb-[10px]" style={{ fontWeight: '400' }} data-aos="fade-right">
                        {card.text}
                      </p>
                      <div className="text-[14px] sm:text-[18px] text-[#001017] m-auto flex flex-col gap-[5px]" style={{ fontWeight: '400' }} data-aos="fade-right">
                        {card.links.map((link, i) => (
                          <Fragment key={`${link.to}-${i}`}>
                            {i > 0 && ' '}
                            <Link
                              to={link.to}
                              className="text-[#001017] duration-300 transform hover:no-underline hover:scale-105 hover:text-[#001017] hover:font-semibold my-0"
                            >
                              <span>
                                <i className="fa-solid fa-arrow-right-long pr-1 text-[14px] my-0 text-[#2b3990]"></i>
                              </span>{' '}
                              {link.label}
                            </Link>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Roadmap() {
  const { heading, intro, buttonLabel, buttonUrl, cards } = useSection('home', 'roadmap');
  return (
    <div className="bg-[#fff] relative font-poppins z-30">
      <div className="col-md-8 mx-auto md:mx-[20px]">
        <div className="py-[70px] sm:py-[150px]">
          <div className="grid grid-cols-1 desktop:grid-cols-8 gap-[40px] sm:gap-[70px]">
            <div className="col-span-3">
              <p className="my-0 text-[24px] sm:text-[40px] sm:leading-[44px] text-[#001017]" style={{ fontWeight: '600' }} data-aos="fade-right">
                <Accent text={heading} />
              </p>
              <p className="text-[14px] sm:text-[18px] text-[#001017] pt-[30px] sm:pt-[30px] my-0" style={{ fontWeight: '400' }} data-aos="fade-right">
                {intro}
              </p>
              <div className="mt-[50px]">
                <Link
                  to={buttonUrl}
                  className="relative flex gap-4 items-center justify-center w-[250px] h-[49px] border-[2px] border-[#2b3990] transform hover:scale-90 transition duration-500 ease-in-out hover:no-underline hover:text-[#00aeef] text-[#2b3990] text-[16px] 2xl:text-[18px]"
                >
                  <p className="my-auto h-7">{buttonLabel}</p>
                  <p className="text-xl my-auto">
                    <i className="fa-solid fa-arrow-right"></i>
                  </p>
                </Link>
              </div>
            </div>
            <div className="col-span-5 grid grid-cols-1 md:grid-cols-2 gap-[30px]">
              {cards
                .filter((card) => card.visible !== false)
                .map((card, i) => (
                  <div key={`${card.title}-${i}`} className="p-[20px] border-[1px] border-[#E0E0E0] relative bg-white">
                    <div>
                      <div className="w-[48px] h-[48px]">
                        <img src={card.icon} alt={card.iconAlt} width="48" height="48" />
                      </div>
                      <p className="text-[18px] sm:text-[24px] sm:leading-[30px] text-[#001017] pt-[20px] my-0" style={{ fontWeight: '600' }}>
                        {card.title}
                      </p>
                    </div>
                    <p className="text-[14px] sm:text-[16px] text-[#001017] pt-[20px] my-0" style={{ fontWeight: '400' }} data-aos="fade-right">
                      {card.text}
                    </p>
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
    </div>
  );
}

function Compliance() {
  const { heading, intro, badges } = useSection('home', 'compliance');
  return (
    <div className="bg-[#F0F6FF] relative z-30">
      <div className="col-md-8 py-[70px] sm:py-[150px] col-md-8 mx-auto">
        <div>
          <div className="text-center">
            <p className="text-[24px] sm:text-[40px]" style={{ fontWeight: '600' }} data-aos="fade-right">
              <Accent text={heading} />
            </p>
          </div>
          <p className="text-[14px] sm:text-[18px] text-center pt-[10px] m-auto" style={{ fontWeight: '400' }} data-aos="fade-up">
            {intro}
          </p>
        </div>
        <div className="mt-4 md:-mt-48 lg:w-[90%] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-[10px] lg:gap-[20px] xl:gap-[40px] 2xl:gap-[60px]">
            {badges.map((badge, i) => (
              <div key={`${badge.image}-${i}`} className="flex items-center justify-center">
                <img src={badge.image} alt={badge.alt} className="mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Vision() {
  const { heading, intro, goalsIntro, goals } = useSection('home', 'vision');
  return (
    <div className="bg-[#2b3990] relative font-poppins z-20">
      <div className="col-md-8 relative z-30 mx-auto md:mx-[20px]">
        <div className="w-full py-[70px] sm:py-[150px] md:px-[50px]">
          <p className="my-0 text-[24px] sm:text-[40px] sm:leading-[44px] text-[#fff]" style={{ fontWeight: '600' }} data-aos="fade-right">
            {heading}
          </p>
          <p className="text-[14px] sm:text-[18px] text-[#fff] pt-[15px] sm:pt-[30px] my-0" style={{ fontWeight: '400' }} data-aos="fade-right">
            {intro}
            {goalsIntro && (
              <>
                <br />
                {goalsIntro}
              </>
            )}
          </p>
          <div className="pt-[15px]">
            {goals.map((goal, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-[5px] h-[5px] rounded-full bg-white "></div>
                <div>
                  <p className="text-[14px] sm:text-[18px] text-[#fff] my-0" style={{ fontWeight: '400' }} data-aos="fade-right">
                    {goal.text}
                  </p>
                </div>
              </div>
            ))}
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
  );
}

const BLOCKS = {
  hero: <Hero />,
  solutions: <Solutions />,
  team: <TeamSection />,
  roadmap: <Roadmap />,
  compliance: <Compliance />,
  vision: <Vision />,
  awards: <AwardsSection />,
  stories: <SuccessStories />,
  contact: <ContactSection />,
  faq: <FaqSection />,
};

export default function Home() {
  const layout = useLayout('home');
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
