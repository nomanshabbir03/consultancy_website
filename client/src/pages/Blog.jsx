import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ApiState from '../components/ApiState';
import BlogCard from '../components/BlogCard';
import SearchHero from '../components/SearchHero';
import useApiData from '../hooks/useApiData';
import { fetchBlogPosts } from '../services/blogService';

export default function Blog() {
  const { data, loading, error } = useApiData(fetchBlogPosts);
  const [query, setQuery] = useState('');
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get('category');

  const posts = useMemo(() => {
    const term = query.trim().toLowerCase();
    const all = (data?.data ?? []).filter((post) => !categorySlug || post.categorySlug === categorySlug);
    if (!term) return all;
    return all.filter((post) => `${post.title} ${post.category}`.toLowerCase().includes(term));
  }, [data, query, categorySlug]);

  return (
    <div className="bg-[#fff] relative z-40 pb-[50px]">
      <div className="shadow-md text-left m-auto w-full">
        <SearchHero
          placeholder="Search Blog Here ... "
          value={query}
          onChange={setQuery}
          headingClass="pb-[10px]"
        >
          Blogs of <span className="text-[#00aeef]">Cornerstone</span>
        </SearchHero>
        {posts.length > 0 && (
          <div className="col-md-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[20px] m-auto pt-[50px] pb-[100px]">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
      {(loading || error || posts.length === 0) && (
        <div className="col-md-8 m-auto text-center py-[50px]">
          <ApiState loading={loading} error={error} />
          {!loading && !error && posts.length === 0 && (
            <p className="text-2xl text-danger my-auto font-semibold">No blog found</p>
          )}
        </div>
      )}
    </div>
  );
}
