import { Link } from 'react-router-dom';
import { COMPANY, FOOTER_COLUMNS, SOCIAL_LINKS } from '../data/navigation';

const LINK_CLASS = 'hover:no-underline text-[#001017] hover:text-[#2b3990]';
const HEADING_CLASS = 'font-600 text-[18px] sm:text-[22px] text-[#001017] pb-[24px]';

function ContactItem({ icon, children }) {
  return (
    <li className="mb-[10px] flex">
      <p className="pr-[10px] sm:pr-[20px] text-[#2b3990]">
        <i className={`fa-solid ${icon}`} />
      </p>{' '}
      {children}
    </li>
  );
}

/** Site footer. `background` is the colour band behind the link grid (white or #F0F6FF). */
export default function Footer({ background = '#fff' }) {
  return (
    <div style={{ backgroundColor: background }}>
      <div className="border-t-[1px] border-[#e0e0e0]">
        <div className="mx-auto w-full col-md-9 px-[20px] py-[50px] sm:py-[100px]">
          <div className="m-auto grid grid-cols-2 md:grid-cols-9 gap-[15px] lg:gap-[20px] 2xl:gap-[30px]">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title} className="md:col-span-2">
                <h2 className={HEADING_CLASS}>{column.title}</h2>
                <ul className="text-[#001017] font-regular text-[14px] sm:text-[18px]">
                  {column.links.map((link) => (
                    <li key={link.to} className="mb-[10px]">
                      <Link to={link.to} className={LINK_CLASS}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="md:col-span-2 footer-contact">
              <h2 className={HEADING_CLASS}>Contact Us</h2>
              <ul className="text-[#001017] font-regular text-[14px] sm:text-[18px]">
                <ContactItem icon="fa-phone">
                  <a href={COMPANY.phoneHref} className={LINK_CLASS}>
                    {COMPANY.phone}
                  </a>
                </ContactItem>
                <ContactItem icon="fa-envelope">
                  <a href={`mailto:${COMPANY.email}`} className={LINK_CLASS}>
                    {COMPANY.email}
                  </a>
                </ContactItem>
                <ContactItem icon="fa-location-dot">
                  <a href={COMPANY.mapUrl} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                    {COMPANY.address}
                  </a>
                </ContactItem>
              </ul>
            </div>
            <div className="flex flex-col justify-start items-center gap-[15px] xl:gap-[20px]">
              <img src="/assets/iso/iso-certified-color.png" alt="ISO certified" className="mx-auto" />
            </div>
          </div>
        </div>
        <div className="w-full py-[20px] bg-[#2b3990] text-white">
          <div className="mx-auto w-full container px-[20px] xl:px-[170px]">
            <div className="md:flex text-center sm:justify-between sm:items-between ">
              <div>
                <p className="text-[14px] sm:text-left">
                  Copyrights © 2022 All Rights Reserved by <span className="font-semibold">Cornerstone Medical Solutions</span>
                </p>
              </div>
              <div className="flex justify-center gap-[25px] sm:w-[250px] pt-[20px] md:pt-[0px]">
                {SOCIAL_LINKS.map((social) => (
                  <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    <i className={`fa-brands ${social.icon} ${social.size} text-[#fff] hover:text-[#00aeef]`} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
