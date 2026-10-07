const SOCIALS = [
  { icon: 'fa-linkedin-in', size: 'text-[20px]', href: 'https://www.linkedin.com/company/cornerstone-medical-solutions/home/?viewAsMember=true', label: 'LinkedIn' },
];

/** Logo + "Stay Connected" social card used in the blog and job sidebars. */
export default function StayConnectedCard({ className = 'mt-4' }) {
  return (
    <div className={`p-3 ${className} shadow-md border-[1px] border-[#e0e0e0]`}>
      <div className="flex flex-col w-full items-center gap-5 py-3">
        <img
          src="/assets/pics/company_logo.jpeg"
          alt="Cornerstone Medical Solutions"
          className="w-[120px] xl:w-[200px] 2xl:w-[250px]"
          data-aos="fade-right"
        />
        <p className="text-[20px] leading-[22px] text-black font-600 my-0" data-aos="flip-up">
          Stay Connected
        </p>
        <div className="flex justify-center gap-[25px] sm:w-[250px]">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
              <i className={`fa-brands ${s.icon} ${s.size} text-[#001017] hover:text-[#00aeef]`} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
