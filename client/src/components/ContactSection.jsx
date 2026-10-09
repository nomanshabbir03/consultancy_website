import Accent from '../content/Accent';
import { useSection } from '../content/SiteContent';
import ContactForm from './ContactForm';
import ReviewsCarousel from './ReviewsCarousel';

/** "Get Ready To Started?" band: inquiry form on the left, Google reviews on the right. */
export default function ContactSection() {
  const { heading } = useSection('home', 'contact');
  return (
    <div className="bg-[#F0F6FF] border-y-[1px] border-[#e0e0e0] relative font-poppins z-30">
      <div className="px-0 w-full grid grid-cols-12">
        <div className="col-span-1 sm:col-span-2" />
        <div className="col-span-12 px-[20px] sm:col-span-8 desktop:col-span-5 w-full desktop:pr-16 desktop:border-r-[1px] border-[#e0e0e0]">
          <div className="py-[70px] desktop:py-[100px]">
            <div>
              <p
                className="my-0 text-[24px] sm:text-[40px] sm:leading-[44px] text-[#001017]"
                style={{ fontWeight: '600' }}
                data-aos="fade-right"
              >
                <Accent text={heading} />
              </p>
            </div>
            <div className="pt-[30px] sm:pt-[50px]">
              <ContactForm />
            </div>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2 desktop:hidden" />
        <div className="col-span-1 bg-white sm:col-span-2 desktop:hidden" />
        <div className="bg-white col-span-12 sm:col-span-8 px-[20px] desktop:col-span-3 pl-[30px] pr-[30px] py-[30px] desktop:py-0 desktop:pl-[70px] flex justify-center items-center">
          <div className="w-full py-[70px] desktop:py-[100px]">
            <ReviewsCarousel />
          </div>
        </div>
        <div className="col-span-1 bg-white sm:col-span-2" />
      </div>
    </div>
  );
}
