import { Link } from 'react-router-dom';
import { useSiteContent } from '../content/SiteContent';

/** Dark "READY TO START YOUR PROJECT" call-to-action band. */
export default function CtaBanner() {
  const { cta } = useSiteContent();
  if (cta._enabled === false) return null;
  return (
    <div className="bg-[#080B1C] relative">
      <div className="container px-[20px] xl:px-[170px]">
        <div className="py-[60px]">
          <div className="w-[145px] h-[115px] bg-[#1AB6F0] hidden sm:block absolute left-0 top-0" />
          <div className="w-[67px] h-[61px] bg-[#66CEF5] hidden sm:block absolute left-[100px] top-[80px]" />
          <div className="w-[145px] h-[115px] bg-[#1AB6F0] hidden sm:block absolute right-0 bottom-0" />
          <div className="w-[67px] h-[61px] bg-[#66CEF5] hidden sm:block absolute right-[100px] bottom-[80px]" />
          <div>
            <p className="text-[24px] sm:text-[40px] font-600 sm:text-center text-[#fff]" data-aos="fade-right">
              {cta.title}
            </p>
          </div>
          <div className="flex items-center justify-center" data-aos="flip-up">
            <Link
              to={cta.buttonUrl}
              className="relative flex gap-4 items-center justify-center w-[270px] h-[49px] border-[2px] border-[#fff] transform hover:scale-90 transition duration-500 ease-in-out hover:no-underline hover:text-[#fff] text-[#fff] text-[16px] 2xl:text-[18px] font-semibold"
            >
              <p className="my-auto h-7">{cta.buttonLabel}</p>
              <p className="text-xl text-[#fff] my-auto">
                <i className="fa-solid fa-arrow-right" />
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
