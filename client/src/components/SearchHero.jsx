/** Navy hero with a heading and a live-filter search box (Blog and Career pages). */
export default function SearchHero({ children, background, backgroundOpacity, placeholder, value, onChange, headingClass, squareInput = false }) {
  return (
    <div className="bg-[#2b3990] relative">
      {background && <img src={background} alt="" className="bg-hero" style={{ opacity: backgroundOpacity }} />}
      <div className="col-md-8 m-auto relative z-40">
        <div className="pt-[150px] sm:pt-[250px] pb-[80px] sm:pb-[150px]">
          <div className="sm:text-center m-auto">
            <h1 className={`text-[#fff] text-[36px] xl:text-[54px] font-600 relative ${headingClass}`} data-aos="fade-right">
              {children}
            </h1>
          </div>
          <form role="search" onSubmit={(e) => e.preventDefault()}>
            <input
              type="search"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={`mx-auto md:w-[450px] block px-3 my-1 py-2 w-full z-20 text-sm text-[#001017] bg-gray-50 ${squareInput ? '' : 'rounded-lg'} border-l-gray-50 border-l-2 border border-gray-300 focus:outline-none`}
              placeholder={placeholder}
              aria-label={placeholder}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
