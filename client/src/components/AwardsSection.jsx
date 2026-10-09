import Accent from '../content/Accent';
import { useSection } from '../content/SiteContent';

// Cell borders / corner dots belong to the six grid positions (design), the images and links come from the CMS.
const POSITIONS = [
  {
    cell: 'md:border-b-[1px] md:border-x-[1px]',
    dots: ['-bottom-[4px] -left-[4px]', '-bottom-[4px] -right-[5px]'],
  },
  { cell: 'md:border-b-[1px] md:border-x-[1px]', dots: ['-bottom-[4px] -right-[5px]'] },
  { cell: 'md:border-b-[1px] md:border-l-[1px]', dots: [] },
  { cell: 'md:border-l-[1px]', dots: [] },
  { cell: 'md:border-x-[1px]', dots: [] },
  { cell: 'md:border-l-[1px]', dots: [] },
];

/** "Achievements & Awards" card with the six award badges. */
export default function AwardsSection() {
  const { heading, badges } = useSection('home', 'awards');
  return (
    <div className="bg-[#F0F6FF] relative font-poppins z-30">
      <div className="col-md-8 mx-auto md:mx-[20px]">
        <div className="py-[70px] sm:py-[150px]">
          <div className="grid grid-cols-1 xl:grid-cols-9 gap-[40px] sm:gap-[70px] border-[1px] border-[#E0E0E0] py-4 px-8 md:pl-16 md:pr-0 bg-white">
            <div className="col-span-4 flex items-center justify-center">
              <p
                className="my-0 text-[24px] sm:text-[40px] sm:leading-[44px] text-[#001017] font-600"
                data-aos="fade-right"
              >
                <Accent text={heading} />
              </p>
            </div>
            <div className="col-span-5 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-0">
              {badges.slice(0, POSITIONS.length).map((badge, i) => {
                const award = POSITIONS[i];
                const image = <img src={badge.image} alt={badge.alt} className="w-[150px] m-auto" width="400" height="400" />;
                return (
                <div key={`${badge.image}-${i}`} className={`relative w-full md:border-[#e0e0e0] ${award.cell}`}>
                  {badge.link ? (
                    <a href={badge.link} target="_blank" rel="noopener noreferrer">
                      {image}
                    </a>
                  ) : (
                    image
                  )}
                  {award.dots.map((position) => (
                    <div
                      key={position}
                      className={`w-[8px] h-[8px] bg-[#2b3990] hidden lg:block absolute ${position} z-30 rounded-full`}
                    />
                  ))}
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
