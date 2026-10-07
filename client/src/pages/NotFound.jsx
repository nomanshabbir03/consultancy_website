import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="bg-[#2b3990] relative">
      <div className="col-md-8 m-auto relative z-40">
        <div className="pt-[180px] sm:pt-[250px] pb-[120px] sm:pb-[200px] text-center">
          <p className="text-[#00aeef] text-[60px] sm:text-[120px] font-600 leading-none my-0">404</p>
          <h1 className="text-[#fff] text-[24px] sm:text-[40px] font-600 my-0 py-[20px]">Page not found</h1>
          <p className="text-[#fff] text-[14px] sm:text-[18px] my-0 pb-[40px]">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex items-center justify-center">
            <Link
              to="/"
              className="relative flex gap-4 items-center justify-center w-[200px] h-[49px] border-[2px] border-[#fff] transform hover:scale-90 transition duration-500 ease-in-out hover:no-underline hover:text-[#fff] text-[#fff] text-[16px] 2xl:text-[18px]"
            >
              <p className="my-auto h-7">Back to Home</p>
              <p className="text-xl my-auto">
                <i className="fa-solid fa-arrow-right" />
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
