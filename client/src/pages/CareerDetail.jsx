import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiState from '../components/ApiState';
import JobApplicationForm from '../components/JobApplicationForm';
import { ReferModal, ShareFan } from '../components/JobShare';
import StayConnectedCard from '../components/StayConnectedCard';
import useApiData from '../hooks/useApiData';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { fetchJob } from '../services/careerService';
import { formatDate } from '../utils/formatDate';
import NotFound from './NotFound';

function InfoRow({ label, value }) {
  return (
    <>
      <p className="text-[#001017] text-[12px] sm:text-[16px] font-semibold my-0" data-aos="fade-up">
        {label}
      </p>
      <p className="text-[#00aeef] text-[12px] sm:text-[16px] pb-[10px]" data-aos="flip-up">
        {value}
      </p>
    </>
  );
}

/** Job page: hero with Apply / Refer actions, description + "Specific Information", and the application form. */
export default function CareerDetail() {
  const { slug } = useParams();
  const { data, loading, error } = useApiData((signal) => fetchJob(slug, signal), [slug]);
  const job = data?.data;
  const [applying, setApplying] = useState(false);
  const [referOpen, setReferOpen] = useState(false);

  useDocumentMeta({
    title: job ? `${job.title} - Cornerstone Medical Solutions` : undefined,
    description: job ? `${job.title} at Cornerstone Medical Solutions - ${job.location}. Apply now.` : undefined,
    jsonLd: job && [
      {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: job.title,
        description: job.description,
        datePosted: job.postedAt,
        validThrough: job.lastDate,
        hiringOrganization: { '@type': 'Organization', name: 'Cornerstone Medical Solutions', sameAs: window.location.origin },
        jobLocation: {
          '@type': 'Place',
          address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressRegion: 'Punjab', addressCountry: 'PK' },
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin },
          { '@type': 'ListItem', position: 2, name: 'Careers', item: `${window.location.origin}/career` },
          { '@type': 'ListItem', position: 3, name: job.title },
        ],
      },
    ],
  });

  if (error?.status === 404) return <NotFound />;

  return (
    <div className="bg-[#fff]">
      <div className="mx-auto bg-[#2b3990]">
        <div className="pt-[160px] pb-[80px] sm:pt-[200px] sm:pb-[100px]">
          <div className="text-center m-auto">
            {job && (
              <>
                <p className="text-[#fff] text-[14px] sm:text-[18px] my-0" data-aos="fade-right">
                  Cornerstone Medical Solutions | <span className="text-[#00aeef] font-600"> {job.shift} </span>
                </p>
                <h1 className="text-[#fff] text-[36px] xl:text-[54px] font-600 relative my-0" data-aos="flip-up">
                  {job.title}
                </h1>
                <p className="text-[#fff] text-[14px] sm:text-[18px] my-0" data-aos="fade-right">
                  {job.location} | <span className="text-[#00aeef] font-600"> Last Date: </span>
                  {formatDate(job.lastDate)}
                </p>
                <div className="flex gap-[20px] mt-[20px] justify-center items-center">
                  <div data-aos="flip-up">
                    <button
                      type="button"
                      onClick={() => setApplying((v) => !v)}
                      className="transform hover:scale-90 transition duration-500 ease-in-out px-4 py-2 bg-[#2b3990] rounded-[6px] text-white border-[2px] border-[#fff]"
                    >
                      <p id="applybtn" className="m-auto">
                        {applying ? 'Back to Details' : 'Apply Now'}
                      </p>
                    </button>
                  </div>
                  <div data-aos="flip-up">
                    <button
                      type="button"
                      id="referBtn"
                      onClick={() => setReferOpen(true)}
                      className="transform hover:scale-90 transition duration-500 ease-in-out px-4 py-2 bg-[#fff] rounded-[6px] text-[#2b3990] border-[2px]"
                    >
                      Refer a Friend
                    </button>
                  </div>
                  <ReferModal open={referOpen} onClose={() => setReferOpen(false)} />
                </div>
                <ShareFan />
              </>
            )}
          </div>
        </div>
      </div>
      <ApiState loading={loading} error={error} className="col-md-8 mx-auto py-[40px]" />
      {job && !applying && (
        <div className="col-md-8 mx-auto bg-[#fff] transition duration-500 ease-in-out" id="specific_job-info">
          <div className="pt-[40px] pb-[40px]">
            <div className="m-auto grid grid-cols-1 xl:grid-cols-7 gap-[50px]">
              <div
                className="border-[1px] shadow-md border-[#e0e0e0] p-4 xl:col-span-5"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
              <div className="xl:col-span-2">
                <div className="border-[1px] shadow-md border-[#e0e0e0] p-4">
                  <div>
                    <p className="text-[#2b3990] text-[14px] sm:text-[18px] font-600" data-aos="fade-right">
                      Specific Information
                    </p>
                    <InfoRow label="Industry" value={job.department} />
                    <InfoRow label="Work Experience" value={job.experience} />
                    <InfoRow label="Last Date For Application" value={formatDate(job.lastDate)} />
                    <InfoRow label="Location" value={job.location} />
                    <InfoRow label="Province-Country" value={job.provinceCountry} />
                  </div>
                </div>
                <StayConnectedCard />
              </div>
            </div>
          </div>
        </div>
      )}
      {job && applying && <JobApplicationForm jobId={job.id} />}
    </div>
  );
}
