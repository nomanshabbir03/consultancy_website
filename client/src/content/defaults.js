import { BUSINESS_MENU, COMPANY, FOOTER_COLUMNS, MAIN_NAV, SOCIAL_LINKS } from '../data/navigation';

/**
 * Built-in site content: what the website showed before the CMS existed, derived from data/navigation.js.
 * It is the initial state and the fallback whenever the API is unreachable, so the public site never depends on the CMS.
 * (server/src/cms/defaults.js holds the same values for the API.)
 */
const link = ({ label, to }) => ({ label, to });

export const DEFAULT_SITE = {
  navbar: {
    logo: '/assets/pics/company_logo.png',
    logoWhite: '/assets/pics/company_logo_white.jpeg',
    logoAlt: 'Cornerstone Medical Solutions',
    items: MAIN_NAV.map((item) => ({ label: item.label, type: item.menu ? 'menu' : 'link', to: item.to ?? '' })),
    menuTagline: 'Building a\nBetter Business\nWorld',
    menuGroups: BUSINESS_MENU.map((group) => ({ ...link(group), children: group.children.map(link) })),
    menuAside: [
      { label: 'Message from CEO', to: '/about-us' },
      { label: 'Our Team', to: '/' },
      { label: 'Events', to: '/blog' },
    ],
    ctaLabel: 'Book A Meeting',
    ctaUrl: '/contact-us',
  },
  footer: {
    columns: FOOTER_COLUMNS.map((column) => ({ title: column.title, links: column.links.map(link) })),
    contactTitle: 'Contact Us',
    isoImage: '/assets/iso/iso-certified-color.png',
    isoAlt: 'ISO certified',
    copyrightPrefix: 'Copyrights © 2022 All Rights Reserved by',
    copyrightBrand: 'Cornerstone Medical Solutions',
  },
  company: { phone: COMPANY.phone, email: COMPANY.email, address: COMPANY.address, mapUrl: COMPANY.mapUrl },
  social: {
    items: SOCIAL_LINKS.map((s) => ({ platform: s.label.toLowerCase(), url: s.href })),
  },
  cta: { _enabled: true, title: 'READY TO START YOUR PROJECT', buttonLabel: "Let's Start Together", buttonUrl: '/contact-us' },
  seo: {},
};

/** Icon + size per network. Sizes are the exact classes the site already used; the CMS only chooses the network. */
export const SOCIAL_STYLES = {
  linkedin: { icon: 'fa-linkedin-in', size: 'text-[20px]', label: 'LinkedIn' },
  instagram: { icon: 'fa-instagram', size: 'text-[20px]', label: 'Instagram' },
  facebook: { icon: 'fa-facebook-f', size: 'text-[22px]', label: 'Facebook' },
  whatsapp: { icon: 'fa-whatsapp', size: 'text-[22px]', label: 'WhatsApp' },
  youtube: { icon: 'fa-youtube', size: 'text-[22px]', label: 'YouTube' },
  tiktok: { icon: 'fa-tiktok', size: 'text-[20px]', label: 'TikTok' },
};
