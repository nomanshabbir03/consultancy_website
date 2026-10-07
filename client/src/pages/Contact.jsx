import { useEffect, useState } from 'react';
import ContactForm from '../components/ContactForm';
import { SOCIAL_LINKS } from '../data/navigation';

const MAP_URL =
  'https://www.google.com/maps?q=11-C+Judicial+Colony+Lahore+Punjab+54400&output=embed';

/** Types `word` one letter at a time (80ms per letter). */
function useTypedText(word, delay = 80) {
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (length >= word.length) return undefined;
    const timer = setTimeout(() => setLength((n) => n + 1), delay);
    return () => clearTimeout(timer);
  }, [length, word, delay]);

  return word.slice(0, length);
}

export default function Contact() {
  const typed = useTypedText('touch');

  return (
    <>
      <div className="bg-[#fff] relative z-40 border-y-[1px] border-[#e0e0e0]">
        <div className="col-md-8 m-auto">
          <div className="px-0 w-full grid grid-cols-1 desktop:grid-cols-10">
            <div className="px-[20px] desktop:col-span-6 w-full desktop:pr-16 desktop:border-r-[1px] border-[#e0e0e0]">
              <div className="py-[70px] desktop:pt-[150px] desktop:pb-[100px]">
                <div className="pt-[30px] sm:pt-[50px]">
                  <ContactForm id="contactForm" />
                </div>
              </div>
            </div>
            <div className="px-[20px] desktop:col-span-4 pl-[30px] pr-[30px] py-[30px] desktop:py-0 desktop:pl-[70px] flex justify-center items-center">
              <div className="w-full py-[70px] desktop:pt-[150px] desktop:pb-[100px]">
                <div className="text-left">
                  <h1
                    className="text-black text-[24px] desktop:text-[40px] font-600 relative my-0 pb-[20px]"
                    data-aos="fade-right"
                  >
                    Let’s get in
                    <br className="md:hidden" />
                    <div id="text" aria-label="touch">
                      {typed}
                    </div>
                  </h1>
                  <p className="text-[14px] sm:text-[18px] text-[#001017] my-0" data-aos="fade-up">
                    Thank you for considering Cornerstone Medical Solutions for your medical billing needs. We are here to
                    answer any questions you may have and provide you with more information about our services.
                  </p>
                </div>
                <div className="flex justify-center pt-[50px] gap-[25px] sm:w-[250px]">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <i className={`fa-brands ${social.icon} ${social.size} text-[#001017] hover:text-[#00aeef]`} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <iframe src={MAP_URL} width="100%" height="580" title="Cornerstone Medical Solutions office locations" loading="lazy" />
      </div>
    </>
  );
}
