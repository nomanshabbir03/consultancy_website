import { Link, useParams } from 'react-router-dom';
import ApiState from '../components/ApiState';
import BlogCard from '../components/BlogCard';
import BlogSidebar from '../components/BlogSidebar';
import TileStrip from '../components/TileStrip';
import useApiData from '../hooks/useApiData';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { fetchBlogCategories, fetchBlogPost, fetchBlogPosts } from '../services/blogService';
import { formatDate } from '../utils/formatDate';
import { safeHtml } from '../utils/safeHtml';
import NotFound from './NotFound';

const RECENT_POSTS = 5;

/** Blog article: breadcrumb hero + 75% article column + 25% sidebar (same template for every post). */
export default function BlogPost() {
  const { slug } = useParams();
  const { data, loading, error } = useApiData((signal) => fetchBlogPost(slug, signal), [slug]);
  const { data: recent } = useApiData((signal) => fetchBlogPosts(signal, RECENT_POSTS));
  const { data: categories } = useApiData(fetchBlogCategories);
  const post = data?.data;

  useDocumentMeta({
    title: post?.title,
    description: post?.metaDescription,
    image: post?.image,
    type: 'article',
    jsonLd: post && [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.metaDescription,
        image: post.image,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        ...(post.author?.name && { author: { '@type': 'Person', name: post.author.name } }),
        publisher: { '@type': 'Organization', name: 'Cornerstone Medical Solutions' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${window.location.origin}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title },
        ],
      },
    ],
  });

  if (error?.status === 404) return <NotFound />;

  return (
    <div className="bg-center z-40 relative overflow-hidden font-poppins">
      <div className="relative">
        <div className="bg-[#2b3990]">
          <div className="col-md-8 m-auto py-[100px] sm:py-[150px]">
            <div className="text-left w-full">
              <div className="w-full flex justify-between items-center">
                <div className="mt-3 text-[#fff] sm:mt-5 text-[18px] leading-[28px] md:mt-5 lg:mx-0 pb-4 font-semibold flex gap-3 items-center">
                  <Link to="/blog" className="text-[#fff] hover:text-[#fff] my-auto" data-aos="fade-right">
                    Blog
                  </Link>
                  <i className="fa-solid fa-angle-right" data-aos="fade-up" />
                  <Link to="/blog" className="text-[#fff] hover:text-[#fff] my-auto" data-aos="fade-right">
                    Category
                  </Link>
                  <i className="fa-solid fa-angle-right" data-aos="fade-up" />
                  <p className="text-[#00aeef] my-auto" data-aos="fade-left">
                    {post?.category}
                  </p>
                </div>
              </div>
              <h1
                className="text-center text-[#fff] text-[32px] md:text-[54px] font-600 leading-[38px] md:leading-[58px]"
                data-aos="flip-up"
              >
                {post?.title}
              </h1>
            </div>
          </div>
        </div>
        <TileStrip />
      </div>
      <div className="w-full py-5 col-md-8 m-auto">
        <ApiState loading={loading} error={error} className="px-2" />
        {post && (
          <div className="md:flex md:px-0 px-2 gap-[50px]">
            <div className="w-full md:w-[75%] shadow-xl border-[1px] border-[#e0e0e0]" data-aos="fade-right">
              <div className="pb-6" data-aos="fade-right">
                <img src={post.image} alt={post.title} className="m-auto" />
              </div>
              <div className="px-4 text-left">
                <p className="text-[18px] leading-[22px] text-black" data-aos="flip-up">
                  <span>
                    <b>Published Date: </b>
                  </span>{' '}
                  {formatDate(post.publishedAt)}
                </p>
              </div>
              <div className="p-4 text-left" dangerouslySetInnerHTML={{ __html: safeHtml(post.content) }} />
            </div>
            <BlogSidebar recent={recent?.data} categories={categories?.data} author={post.author} />
          </div>
        )}
        {post?.related?.length > 0 && (
          <div className="px-2 md:px-0 pt-[60px] pb-[40px]" id="related-articles">
            <p className="text-[24px] sm:text-[36px] font-600 text-[#001017] my-0" data-aos="fade-right">
              Related <span className="text-[#00aeef]">Articles</span>
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[20px] pt-[30px]">
              {post.related.map((item) => (
                <BlogCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
