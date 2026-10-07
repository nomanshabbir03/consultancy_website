import Carousel from './Carousel';
import useApiData from '../hooks/useApiData';
import { fetchTestimonials } from '../services/siteContentService';

function Stars({ count }) {
  return (
    <div className="flex text-yellow-400">
      {Array.from({ length: count }, (_, i) => (
        <i key={i} className="fa-solid fa-star" />
      ))}
    </div>
  );
}

function ReviewSlide({ review }) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          {review.avatar ? (
            <div className="aspect-square size-16 rounded-full">
              <img src={review.avatar} alt="" className="rounded-full" width="100" height="100" />
            </div>
          ) : (
            <div className={`aspect-square size-16 rounded-full ${review.avatarBg} flex items-center justify-center`}>
              <p className="text-[48px] text-white uppercase my-0 py-0">{review.initial}</p>
            </div>
          )}
        </div>
        <div className="col-span-9">
          <p className="text-[16px] sm:text-[18px] my-0 font-600" style={{ fontWeight: '600' }}>
            {review.name}
          </p>
          <p className="text-[14px] mt-2" style={{ fontWeight: '300' }}>
            {review.text}
          </p>
          <Stars count={review.stars} />
        </div>
      </div>
    </div>
  );
}

/** Google rating badge + rotating reviews, shown next to the contact form. */
export default function ReviewsCarousel() {
  const { data } = useApiData(fetchTestimonials);
  const reviews = data?.data.reviews ?? [];
  const rating = data?.data.rating;

  return (
    <div className="w-full">
      <div className="grid grid-cols-5">
        <div className="col-span-5 border-[1px] border-[#E0E0E0] rounded-bl-[30px] rounded-tr-[30px] bg-white">
          <div className="grid grid-cols-8 gap-2">
            <div className="col-span-2 rounded-bl-[30px] rounded-tr-[30px] bg-[#2b3990] flex items-center justify-center">
              <img src="/assets/pics/google.webp" alt="Google" className="p-3 m-auto" width="150" height="150" />
            </div>
            <div className="col-span-6 py-1 pl-2">
              <div className="flex gap-2 items-center">
                <div>
                  <p className="text-[18px] sm:text-[24px] my-0">{rating?.score}</p>
                </div>
                <div className="flex text-yellow-400">
                  {[0, 1, 2, 3].map((i) => (
                    <i key={i} className="fa-solid fa-star" />
                  ))}
                  <i className="fa-solid fa-star-half" />
                </div>
              </div>
              <div>
                <p className="text-[14px] my-0">Based on {rating?.count} Google Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Carousel className="mt-[50px] w-full my-slider pb-8" arrows autoplay autoplaySpeed={3000} speed={300}>
        {reviews.map((review) => (
          <ReviewSlide key={review.id} review={review} />
        ))}
      </Carousel>
    </div>
  );
}
