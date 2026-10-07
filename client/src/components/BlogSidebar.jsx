import { Link } from 'react-router-dom';
import StayConnectedCard from './StayConnectedCard';

const SIDEBAR_LINK =
  'text-[#00aeef] hover:text-center hover:text-[#2b3990] hover:font-semibold hover:no-underline duration-300 ease-in-out';

/** Article sidebar: recent posts, categories, author and the social card (25% column on desktop). */
export default function BlogSidebar({ recent = [], categories = [], author }) {
  return (
    <div className="w-full md:w-[25%]">
      <div className="py-3 px-4 shadow-md border-[1px] border-[#e0e0e0]">
        <p className="text-[20px] leading-[22px] text-black font-600" data-aos="flip-up">
          Recent Posts
        </p>
        {recent.map((post) => (
          <div key={post.slug}>
            <div className="grid grid-cols-7 gap-2 py-[10px]">
              <img src={post.image} alt={post.title} className="col-span-2 w-full h-full" />
              <p className="my-0 col-span-5 text-xs">
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-[#00aeef] hover:text-[#2b3990] duration-300 ease-in-out"
                >
                  {post.title}
                </Link>
              </p>
            </div>
            <div className="w-full h-[1px] bg-gray-300" />
          </div>
        ))}
      </div>
      <div className="py-3 px-4 text-left w-full mt-4 shadow-md border-[1px] border-[#e0e0e0]" data-aos="fade-right">
        <p className="text-[20px] leading-[22px] text-black font-600 pb-2" data-aos="flip-up">
          Categories
        </p>
        {categories.map((category) => (
          <div key={category.slug} className="grid grid-cols-7 gap-2">
            <img src={category.image} alt={category.name} className="m-auto col-span-2" />
            <p className="py-2 my-0 col-span-5">
              <Link to={`/blog?category=${category.slug}`} className={SIDEBAR_LINK}>
                {category.name}
              </Link>
            </p>
          </div>
        ))}
      </div>
      {author && (
        <div className="py-3 px-4 text-left w-full mt-4 shadow-md border-[1px] border-[#e0e0e0]" data-aos="fade-right">
          <p className="text-[20px] leading-[22px] text-black font-600" data-aos="flip-up">
            Blog Author
          </p>
          <div className="flex gap-2 items-center mt-2" data-aos="fade-right">
            <div className="w-14 h-14 overflow-hidden flex items-center justify-center">
              <img src={author.photo} alt={author.name} className="w-12 h-12 rounded-full" />
            </div>
            <div>
              <span className="text-[#00aeef]">{author.name}</span>
            </div>
          </div>
        </div>
      )}
      <StayConnectedCard />
    </div>
  );
}
