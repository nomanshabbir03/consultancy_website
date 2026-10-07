import { useMemo, useState } from 'react';
import ApiState from '../components/ApiState';
import JobCard from '../components/JobCard';
import SearchHero from '../components/SearchHero';
import useApiData from '../hooks/useApiData';
import { fetchJobs } from '../services/careerService';

export default function Career() {
  const { data, loading, error } = useApiData(fetchJobs);
  const [query, setQuery] = useState('');

  const jobs = useMemo(() => {
    const term = query.trim().toLowerCase();
    const all = data?.data ?? [];
    if (!term) return all;
    return all.filter((job) => `${job.title} ${job.department} ${job.location}`.toLowerCase().includes(term));
  }, [data, query]);

  return (
    <div className="bg-[#fff] relative z-40" id="jobsec">
      <SearchHero
        placeholder="Search Job Here ... "
        value={query}
        onChange={setQuery}
        headingClass="pb-[20px]"
        squareInput
      >
        Invest in your career,
        <br className="hidden sm:block" /> <span className="text-[#00aeef]">Grow</span> with tech’s top talent.
      </SearchHero>
      <div className="col-md-8 mx-auto">
        <div className="w-full flex justify-start mt-[50px]">
          <p className="w-[200px] text-center py-1 md:py-2 text-md md:text-lg text-[#fff] bg-[#2b3990] font-600">
            Jobs Available: <span className="font-normal">{loading ? '-' : jobs.length}</span>
          </p>
        </div>
      </div>
      {jobs.length > 0 && (
        <div className="col-md-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[20px] mx-auto pb-[50px] mt-[50px]">
          {jobs.map((job) => (
            <JobCard key={job.slug} job={job} />
          ))}
        </div>
      )}
      {(loading || error || jobs.length === 0) && (
        <div className="col-md-8 mx-auto text-center py-[50px]">
          <ApiState loading={loading} error={error} />
          {!loading && !error && jobs.length === 0 && (
            <p className="text-2xl text-danger my-auto font-semibold">No jobs found</p>
          )}
        </div>
      )}
    </div>
  );
}
