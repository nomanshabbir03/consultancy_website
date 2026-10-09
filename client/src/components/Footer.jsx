import { Link } from 'react-router-dom';
import { useSiteContent } from '../content/SiteContent';

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
  const { footer, company, socialLinks } = useSiteContent();
  return (
    <div style={{ backgroundColor: background }}>
      <div className="border-t-[1px] border-[#e0e0e0]">
        <div className="mx-auto w-full col-md-9 px-[20px] py-[50px] sm:py-[100px]">
          <div className="m-auto grid grid-cols-2 md:grid-cols-9 gap-[15px] lg:gap-[20px] 2xl:gap-[30px]">
            {footer.columns.map((column, c) => (
              <div key={`${column.title}-${c}`} className="md:col-span-2">
                <h2 className={HEADING_CLASS}>{column.title}</h2>
                <ul className="text-[#001017] font-regular text-[14px] sm:text-[18px]">
                  {column.links.map((link, l) => (
                    <li key={`${link.to}-${l}`} className="mb-[10px]">
                      <Link to={link.to} className={LINK_CLASS}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="md:col-span-2 footer-contact">
              <h2 className={HEADING_CLASS}>{footer.contactTitle}</h2>
              <ul className="text-[#001017] font-regular text-[14px] sm:text-[18px]">
                <ContactItem icon="fa-phone">
                  <a href={company.phoneHref} className={LINK_CLASS}>
                    {company.phone}
                  </a>
                </ContactItem>
                <ContactItem icon="fa-envelope">
                  <a href={`mailto:${company.email}`} className={LINK_CLASS}>
                    {company.email}
                  </a>
                </ContactItem>
                <ContactItem icon="fa-location-dot">
                  <a href={company.mapUrl || undefined} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                    {company.address}
                  </a>
                </ContactItem>
              </ul>
            </div>
            <div className="flex flex-col justify-start items-center gap-[15px] xl:gap-[20px]">
              {footer.isoImage && <img src={footer.isoImage} alt={footer.isoAlt} className="mx-auto" />}
            </div>
          </div>
        </div>
        <div className="w-full py-[20px] bg-[#2b3990] text-white">
          <div className="mx-auto w-full container px-[20px] xl:px-[170px]">
            <div className="md:flex text-center sm:justify-between sm:items-between ">
              <div>
                <p className="text-[14px] sm:text-left">
                  {footer.copyrightPrefix} <span className="font-semibold">{footer.copyrightBrand}</span>
                </p>
              </div>
              <div className="flex justify-center gap-[25px] sm:w-[250px] pt-[20px] md:pt-[0px]">
                {socialLinks.map((social) => (
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
