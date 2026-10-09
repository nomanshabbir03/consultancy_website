import VideoThumbnail from './VideoThumbnail';
import Accent from '../content/Accent';
import { useSection } from '../content/SiteContent';
import useApiData from '../hooks/useApiData';
import { fetchSuccessStories } from '../services/siteContentService';


/** Home page "Success Stories": one featured video plus four smaller ones. */
export default function SuccessStories() {
  const { heading, subheading, viewAllLabel } = useSection('home', 'stories');
  const { data } = useApiData(fetchSuccessStories);
  const [featured, ...others] = data?.data ?? [];
  return (
    <div className="bg-[#fff] relative z-30 font-poppins">
      <div className="col-md-8 m-auto md:mx-[20px]">
        <div className="py-[70px] lg:py-[150px]" data-aos="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 pb-[50px]">
            <div>
              <h3 className="text-[24px] sm:text-[40px] text-[#001017]" style={{ fontWeight: '600' }}>
                <Accent text={heading} />
              </h3>
              <p className="text-[18px] my-0 sm:text-[24px] font-light text-[#001017]">
                {subheading}
              </p>
            </div>
            <div className="relative">
              <div className="md:absolute mt-[10px] md:mt-0 bottom-0 right-0">
                <div className="flex items-center md:justify-center gap-2">
                  <p className="text-[14px] sm:text-[16px] font-light text-[#001017] my-auto">{viewAllLabel}</p>
                  <p className="text-[14px] sm:text-[16px] font-light text-[#001017] my-auto">
                    <i className="fa-solid fa-angle-right my-auto" />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 desktop:grid-cols-2 gap-[20px] lg:gap-[30px]">
            <div className="w-full grid grid-cols-1 relative overflow-hidden">
              <div>{featured && <VideoThumbnail videoId={featured.youtubeId} poster={featured.thumbnail} />}</div>
            </div>
            <div className="w-full">
              <div className="grid grid-cols-2 gap-[20px] lg:gap-[30px]">
                {others.map((video) => (
                  <div key={video.id} className="border-2 overflow-hidden">
                    <VideoThumbnail
                      videoId={video.youtubeId}
                      poster={video.thumbnail}
                      imgProps={{ width: 1280, height: 720 }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
