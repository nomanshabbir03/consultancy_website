import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';

export default function JobCard({ job }) {
  return (
    <Link
      to={`/career/${job.slug}`}
      className="hover:no-underline z-40 hover:bg-[#2b3990] text-[#001017] hover:text-[#fff] relative transform hover:scale-[98%] duration-300 ease-in-out px-[30px] py-[20px] border-[1px] border-gray-400"
    >
      <div className="relative z-30">
        <div className="flex py-2 justify-between">
          <div>
            <p className="text-[18px] sm:text-[24px] job-title sm:leading-[28px]" style={{ fontWeight: '500' }}>
              {job.title}
            </p>
            <p className="text-[14px] dpt-name leading-[14px] py-[12px]">{job.department}</p>
          </div>
        </div>
        <div>
          <p className="text-[14px] sm:text-[16px] leading-[20px] font-semibold sm:leading-[16px] pt-[12px]">
            {job.location}
          </p>
          <p className="text-[14px] sm:text-[16px] leading-[20px] sm:leading-[26px]">
            <span className="font-semibold">Last Date:</span>{' '}
            <span className="text-red-500 font-bold">{formatDate(job.lastDate)}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
