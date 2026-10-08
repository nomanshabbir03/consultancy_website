import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';
import { safeHtml } from '../utils/safeHtml';

export default function BlogCard({ post }) {
  const href = `/blog/${post.slug}`;
  return (
    <div className="border-[1px] shadow-xl border-[#e0e0e0] transform hover:scale-95 transition duration-500 ease-in-out relative overflow-hidden">
      <Link to={href} className="text-[#fff] hover:text-[#fff] hover:no-underline">
        <div className="grid bg-[#2b3990] grid-cols-1 gap-[5px] p-[20px] lg:h-[350px]">
          <div className="flex items-center">
            <div>
              <p className="text-[18px] text-[#fff] sm:leading-[28px] sm:text-[24px] my-0 font-600">{post.title}</p>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full h-[150px] flex justify-center items-center">
              <img
                src={post.image}
                alt={post.title}
                className="rounded-[20px] absolute -right-[10%]"
                style={{ border: '5px solid #fff' }}
              />
            </div>
          </div>
        </div>
        <div className="bg-[#fff] p-[20px] text-[#001017]">
          <div className="flex justify-between items-center my-0">
            <p className="text-[14px] font-600 sm:text-[16px] leading-[20px] sm:leading-[26px] my-0 text-[#001017]">
              {formatDate(post.publishedAt)}
            </p>
            <p className="text-[14px] text-[#2b3990]">{post.category}</p>
          </div>
          {/* The start of the article, clamped to three lines by .wrapme (as on the original). */}
          <div className="wrapme" dangerouslySetInnerHTML={{ __html: safeHtml(post.excerptHtml) }} />
        </div>
      </Link>
      <div className="px-[20px] pb-[20px]">
        <Link
          to={href}
          className="hover:no-underline hover:text-[#00aeef] text-[14px] sm:text-[16px] text-center text-[#2b3990] gap-2 flex items-center"
        >
          <p>Read More</p>
          <p className="mt-[2px]">
            <i className="fa-solid fa-angle-right" />
          </p>
        </Link>
      </div>
    </div>
  );
}
