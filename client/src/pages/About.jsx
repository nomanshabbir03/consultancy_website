import { Fragment } from 'react';
import AwardsSection from '../components/AwardsSection';
import ContactSection from '../components/ContactSection';
import CtaBanner from '../components/CtaBanner';
import CustomizedSolutions from '../components/CustomizedSolutions';
import StatCounter from '../components/StatCounter';
import { fallbackPhoto } from '../utils/avatarFallback';
import TeamGallery from '../components/TeamGallery';
import Accent from '../content/Accent';
import { useLayout, useSection } from '../content/SiteContent';

// Markup, classes and animations are unchanged; only texts, links and images come from the CMS
// (built-in values: content/pageDefaults.js, used whenever nothing is published or the API is unavailable).

function Hero() {
  const { heading, text } = useSection('about-us', 'hero');
  return (
      <div className="bg-[#2b3990] relative overflow-hidden">
        <div className="col-md-8 m-auto">
          <div className="pt-[80px] sm:pt-[250px] pb-[70px] sm:pb-[250px] relative">
            <div className="sm:text-center m-auto relative z-40 py-[50px]">
              <h1
                className="text-[#fff] text-[36px] xl:text-[54px] font-600 relative my-0 pb-[30px]"
                data-aos="fade-right"
              >
                <Accent text={heading} />
              </h1>
              <p className="text-[16px] sm:text-[20px] text-[#fff] my-0" data-aos="fade-up">
                {text}
              </p>
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

function Leaders() {
  const { people } = useSection('about-us', 'leaders');
  return (
    <div className="bg-[#F0F6FF] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          {people.map((person, i) => (
            <div key={`${person.name}-${i}`} className={`grid grid-cols-1 xl:grid-cols-9 gap-[50px]${i > 0 ? ' leader-row-second' : ''}`}>
              <div className="xl:col-span-3 w-full border-[#00aeef] border-[3px] mx-auto" {...(i > 0 ? { 'data-aos': 'flip-right' } : {})}>
                {i > 0 ? (
                  <img src={person.image} alt={person.alt} className="mx-auto w-full" onError={fallbackPhoto(person.name)} />
                ) : (
                  <img src={person.image} alt={person.alt} className="mx-auto" data-aos="flip-right" />
                )}
              </div>
              <div className="xl:col-span-6 my-auto">
                <p className="text-[24px] sm:text-[40px] font-600 text-[#001017] " data-aos="fade-right">
                  <Accent text={person.heading} />
                </p>
                <p className="text-[14px] sm:text-[18px] text-left sm:leading-[30px] text-[#001017] pb-[35px]" data-aos="fade-down">
                  {person.text}
                </p>
                <p className="text-[18px] sm:text-[26px] text-left sm:leading-[30px] text-[#001017]" data-aos="fade-out">
                  {person.name} {person.role && <span className="text-[12px] sm:text-[18px]">{person.role}</span>}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Pillars() {
  const { heading, introLine1, introLine2, items } = useSection('about-us', 'pillars');
  return (
    <div className="bg-[#fff] relative z-40">
      <div className="col-md-8 m-auto">
        <div className="py-[70px] sm:py-[150px]">
          <div>
            <p className="my-0 text-[24px] sm:text-[40px] font-600 text-[#001017]" data-aos="fade-right">
              <Accent text={heading} />
            </p>
            <p className="text-[14px] sm:text-[18px] text-left text-[#001017] pt-[20px] my-0" data-aos="fade-right">
              {introLine1}
              {introLine2 && (
                <>
                  <br className="hidden xl:block" />
                  {introLine2}
                </>
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-[30px] m-auto pt-[50px]">
            {items.map((item, i) => (
              <div key={`${item.title}-${i}`} className="p-[20px] border-[1px] border-[#E0E0E0] relative bg-[#F0F6FF]">
                <div>
                  <div className="w-[48px] h-[48px] bg-[#fff] p-1 rounded">
                    <img src={item.icon} alt={item.iconAlt} />
                  </div>
                  <p className="text-[18px] sm:text-[24px] sm:leading-[30px] text-[#001017] pt-[20px] my-0" style={{ fontWeight: '600' }}>
                    {item.title}
                  </p>
                </div>
                <p className="text-[14px] sm:text-[16px] text-[#001017] py-[20px] my-0" style={{ fontWeight: '400' }} data-aos="fade-right">
                  {item.text}
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
  );
}

function Stats() {
  const { heading, counters, bandText, bandLinkLabel, bandLinkUrl } = useSection('about-us', 'stats');
  return (
    <div className="relative z-40">
      <div className="bg-[#2b3990]">
        <div className="col-md-8 m-auto">
          <div className="py-[50px] sm:py-[100px]">
            <div className="text-center m-auto pb-[50px]">
              <p className="my-0 text-[24px] sm:text-[40px] sm:leading-[44px] font-600 text-[#fff]" style={{ fontWeight: '600' }} data-aos="fade-right">
                {heading}
              </p>
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
              {counters.map((counter, i) => (
                <div key={`${counter.label}-${i}`} className="m-auto text-center" data-aos={i % 2 ? 'fade-right' : 'flip-right'}>
                  <StatCounter className="text-[30px] md:text-[40px] my-0 font-600 text-[#fff]" target={counter.target} suffix={counter.suffix} />
                  <p className="text-[16px] md:text-[18px] my-0 text-[#fff]">{counter.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#000E64]">
        <div className="col-md-8 m-auto">
          <div className="py-[30px]">
            <div className="text-center m-auto">
              <p className="my-0 text-[18px] sm:text-[24px] font-600 text-[#fff]" style={{ fontWeight: '300' }} data-aos="fade-right">
                {bandText}{' '}
                {bandLinkLabel && (
                  <span>
                    <a href={bandLinkUrl || '#'} className="text-[#fff] hover:text-[#fff] hover:underline underline-offset-4">
                      {bandLinkLabel}
                    </a>
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Gallery() {
  const { heading, headingAccent } = useSection('about-us', 'gallery');
  return (
    <>
      <div className="bg-[#fff] relative z-40">
        <div className="col-md-8 m-auto">
          <div className="pt-[70px] sm:pt-[150px]">
            <div>
              <p className="text-[24px] sm:text-[40px] font-600 text-[#001017] sm:leading-[44px] text-center my-0" data-aos="fade-right">
                {heading}{' '}
                {headingAccent && (
                  <span className="text-[#00aeef]">
                    <br />
                    {headingAccent}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <TeamGallery />
    </>
  );
}

const BLOCKS = {
  hero: <Hero />,
  leaders: <Leaders />,
  pillars: <Pillars />,
  stats: <Stats />,
  solutions: <CustomizedSolutions />,
  cta: <CtaBanner />,
  awards: <AwardsSection />,
  gallery: <Gallery />,
  contact: <ContactSection />,
};

export default function About() {
  const layout = useLayout('about-us');
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
