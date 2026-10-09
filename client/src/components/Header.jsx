import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSiteContent } from '../content/SiteContent';
import useScrolledPast from '../hooks/useScrolledPast';

const DESKTOP_LINK =
  'relative flex flex-row items-center text-[16px] 2xl:text-[18px] hover:text-[#00aeef] hover:no-underline';
const MOBILE_LINK =
  'flex flex-row items-center px-3 py-2 mt-1 text-base font-medium text-[#001017] hover:text-[#00aeef] hover:no-underline';

// Per-link animation / active-dot position, kept in code so editing the navigation cannot change the header's look.
const NAV_STYLE = {
  '/': { aos: 'fade-up', dotLeft: 'left-[24%]' },
  '/about-us': { aos: 'fade-down', dotLeft: 'left-[24%]' },
  '/blog': { aos: 'fade-up', dotLeft: 'left-[22%]' },
  '/career': { aos: 'fade-down', dotLeft: 'left-[24%]' },
  '/contact-us': { aos: 'flip-right', dotLeft: 'left-[42%]' },
};
const NAV_AOS = ['fade-up', 'fade-down', 'flip-right'];
const navStyle = (item, index) => NAV_STYLE[item.to] ?? { aos: NAV_AOS[index % NAV_AOS.length], dotLeft: 'left-[24%]' };

function isActive(item, pathname) {
  if (!item.to) return false;
  if (item.to === '/') return pathname === '/';
  return pathname === item.to || pathname.startsWith(`${item.to}/`);
}

function Chevron({ className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-4 h-4 mt-1 transform ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function BusinessDropdown({ open, onToggle, navbar }) {
  return (
    <div>
      <button
        id="btn-open"
        type="button"
        onClick={onToggle}
        className={`${DESKTOP_LINK} pr-[20px] min-[1440px]:pr-[50px] text-[#001017] gap-[5px]`}
        data-aos="flip-right"
      >
        <span>Our Business</span>
        <Chevron className={`nav-icon ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`mega-menu ${open ? '' : 'hidden'}`}>
        <div className="mega-menu__brand">
          <img src={navbar.logo} alt={navbar.logoAlt} className="mega-menu__logo" />
          <p className="mega-menu__tagline">
            {navbar.menuTagline.split('\n').map((line, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </p>
        </div>
        <div className="mega-menu__links" id="innerHead">
          {navbar.menuGroups.map((group, g) => (
            <div key={`${group.label}-${g}`} className="mega-menu__group">
              <Link to={group.to} className="mega-menu__title hover:text-[#00aeef] hover:no-underline">
                {group.label}
              </Link>
              {group.children.map((child, c) => (
                <Link key={`${child.to}-${c}`} to={child.to} className="mega-menu__link hover:text-[#00aeef] hover:no-underline">
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="mega-menu__aside">
          {navbar.menuAside.map((link, i) => (
            <Link key={`${link.to}-${i}`} to={link.to} className="mega-menu__aside-link hover:text-[#00aeef] hover:no-underline">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileGroup({ group }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        className="flex flex-row items-center w-full px-3 py-2 mt-1 text-base font-medium text-left text-[#001017] hover:text-[#00aeef] hover:no-underline"
      >
        <Link to={group.to} className="hover:no-underline text-[#001017] hover:text-[#00aeef] mx-2 font-semibold">
          {group.label}
        </Link>
        <span onClick={() => setOpen((v) => !v)} role="presentation">
          <Chevron className={open ? 'rotate-180' : 'rotate-0'} />
        </span>
      </button>
      {open && (
        <div className="px-2 py-2 mt-2 bg-white rounded-md shadow-xs" role="menu" aria-orientation="vertical">
          {group.children.map((child, i) => (
            <Link
              key={`${child.to}-${i}`}
              to={child.to}
              className={`flex flex-row items-center px-3 py-2 ${i ? 'mt-1 ' : ''}text-base font-medium text-[#001017] rounded-md hover:text-[#00aeef] hover:no-underline`}
              role="menuitem"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileMenu({ navbar }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mobilemen lg:hidden">
      <div className="col-md-12 px-6 mx-auto bg-[#fff] absolute top-0 left-0">
        <div className="pt-2 pb-3">
          {navbar.items.map((item, i) =>
            item.type === 'menu' ? (
              <div className="relative" key={`${item.label}-${i}`}>
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  className="flex font-600 flex-row items-center w-full px-3 py-2 mt-1 text-base text-left text-[#001017] hover:text-[#00aeef] hover:no-underline"
                >
                  <span className="mx-2">{item.label}</span>
                  <Chevron className={open ? 'rotate-180' : 'rotate-0'} />
                </button>
                {open && (
                  <div className="px-2 py-2 mt-2 bg-white rounded-md shadow-xs" role="menu" aria-orientation="vertical">
                    {navbar.menuGroups.map((group, g) => (
                      <MobileGroup key={`${group.label}-${g}`} group={group} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={`${item.to}-${i}`} to={item.to} className={`${MOBILE_LINK} rounded-md`}>
                <span className="ml-2">{item.label}</span>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Site header. With `transparentOnTop` (home page) it starts transparent over the hero and
 * turns white after scrolling past the hero section.
 */
export default function Header({ transparentOnTop = false }) {
  const { pathname } = useLocation();
  const { navbar } = useSiteContent();
  const scrollThreshold = useCallback(
    () => (transparentOnTop ? document.getElementById('hero-section')?.offsetHeight ?? window.innerHeight : 450),
    [transparentOnTop],
  );
  const scrolled = useScrolledPast(scrollThreshold);
  const [businessOpen, setBusinessOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const businessRef = useRef(null);

  const overHero = transparentOnTop && !scrolled;

  useEffect(() => {
    setBusinessOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!businessOpen) return undefined;
    const onClick = (e) => {
      if (businessRef.current && !businessRef.current.contains(e.target)) setBusinessOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [businessOpen]);

  const headerStyle = transparentOnTop
    ? {
        transition: 'background-color 0.5s ease',
      }
    : undefined;

  return (
    <div
      className={`fixed w-full z-50 top-0 left-0 ${overHero ? 'bg-transparent' : 'bg-white'}`}
      id="headerCol"
      style={headerStyle}
    >
      <div className="w-full relative">
        <div className="col-md-10 mx-auto">
          <div className="my-auto relative z-[100] flex lg:block justify-between">
            <div className="flex justify-between items-center h-[90px]">
              <div data-aos="fade-right">
                <Link to="/">
                  <img
                    src={overHero ? navbar.logoWhite : navbar.logo}
                    alt={navbar.logoAlt}
                    className="h-[80px] w-auto object-contain"
                    width="80"
                    height="80"
                    id="mainLogo"
                  />
                </Link>
              </div>
              <div className="hidden lg:flex">
                <div
                  className={`flex items-center justify-center m-auto ${overHero ? 'textCol' : ''}`}
                  id="nav-links"
                  ref={businessRef}
                >
                  {navbar.items.map((item, index) => {
                    if (item.type === 'menu') {
                      return (
                        <BusinessDropdown
                          key={`${item.label}-${index}`}
                          navbar={navbar}
                          open={businessOpen}
                          onToggle={() => setBusinessOpen((v) => !v)}
                        />
                      );
                    }
                    const active = isActive(item, pathname);
                    const style = navStyle(item, index);
                    return (
                      <Link
                        key={`${item.to}-${index}`}
                        to={item.to}
                        className={`${DESKTOP_LINK} ${index === navbar.items.length - 1 ? '' : 'pr-[20px] min-[1440px]:pr-[50px]'} ${
                          active ? 'text-[#00Aeef]' : 'text-[#001017]'
                        }`}
                        data-aos={style.aos}
                      >
                        <span>{item.label}</span>
                        <div
                          className={`absolute -bottom-2 ${style.dotLeft} rounded-full w-[6px] h-[6px] bg-[#00aeef] ${
                            active ? 'block' : 'hidden'
                          }`}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className={`hidden xl:block ${overHero ? 'btnCol' : ''}`} data-aos="flip-up" id="btnbook">
                <Link
                  to={navbar.ctaUrl}
                  className="relative flex gap-4 items-center justify-center w-[250px] h-[49px] border-[2px] border-[#2b3990] transform hover:scale-90 transition duration-500 ease-in-out hover:no-underline hover:text-[#00aeef] text-[#2b3990] text-[16px] 2xl:text-[18px]"
                >
                  <p className="my-auto h-7">{navbar.ctaLabel}</p>
                  <p className="text-xl my-auto">
                    <i className="fa-solid fa-arrow-right" />
                  </p>
                </Link>
              </div>
            </div>
            <div className="flex lg:hidden">
              <button
                id="barss"
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? 'Close main menu' : 'Main menu'}
                aria-expanded={mobileOpen}
                className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md focus:outline-none focus:text-[#001017]"
              >
                <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path
                    className={mobileOpen ? 'hidden' : 'inline-flex'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={mobileOpen ? 'inline-flex' : 'hidden'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {mobileOpen && <MobileMenu navbar={navbar} />}
      </div>
    </div>
  );
}
