import { Link } from 'react-router-dom';

/** Icon + title + blurb + "Read More" card with the three coloured corner tiles. */
export default function ServiceCard({ icon, iconAlt = '', title, text, to }) {
  return (
    <div className="p-[20px] border-[1px] border-[#E0E0E0] relative bg-[#F0F6FF]">
      <div>
        <div className="w-[48px] h-[48px] bg-[#fff] p-1 rounded">
          <img src={icon} alt={iconAlt} />
        </div>
        <p
          className="text-[18px] sm:text-[24px] sm:leading-[30px] text-[#001017] pt-[20px] my-0"
          style={{ fontWeight: '600' }}
        >
          {title}
        </p>
      </div>
      <p
        className="text-[14px] sm:text-[16px] text-[#001017] py-[20px] my-0"
        style={{ fontWeight: '400' }}
        data-aos="fade-right"
      >
        {text}
      </p>
      <Link
        to={to}
        className="hover:no-underline hover:text-[#00aeef] text-[14px] sm:text-[16px] text-center text-[#2b3990] gap-2 flex items-center"
      >
        <p>Read More</p>
        <p className="mt-[2px]">
          <i className="fa-solid fa-angle-right" />
        </p>
      </Link>
      <div className="absolute right-0 top-0 w-[40px] h-[40px] bg-[#0017a9]">
        <div className="w-[40px] h-[40px] bg-[#1E35C8] rounded-full" />
      </div>
      <div className="absolute right-0 top-[40px] rounded-bl-full w-[40px] h-[40px] bg-[#F9B233]" />
      <div className="absolute right-[40px] top-0 rounded-bl-full rounded-tl-full w-[40px] h-[40px] bg-[#00aeef]" />
    </div>
  );
}
