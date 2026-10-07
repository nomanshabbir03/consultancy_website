export const MAIN_NAV = [
  { label: 'Home', to: '/', aos: 'fade-up', dotLeft: 'left-[24%]' },
  { label: 'About', to: '/about-us', aos: 'fade-down', dotLeft: 'left-[24%]' },
  { label: 'Our Business', menu: true, aos: 'flip-right' },
  { label: 'Blogs', to: '/blog', aos: 'fade-up', dotLeft: 'left-[22%]' },
  { label: 'Career', to: '/career', aos: 'fade-down', dotLeft: 'left-[24%]' },
  { label: 'Contact Us', to: '/contact-us', aos: 'flip-right', dotLeft: 'left-[42%]', last: true },
];

/** "Our Business" mega menu: parent service + its sub services. */
export const BUSINESS_MENU = [
  {
    label: 'BPO',
    to: '/bpo',
    children: [
      { label: 'Inbound Calls', to: '/inbound-call' },
      { label: 'Outbound Calls', to: '/outbound-call' },
      { label: 'Email and Chat Support', to: '/email-and-chat' },
      { label: 'SMS Support', to: '/sms-support' },
    ],
  },
  {
    label: 'Health Care',
    to: '/health-care',
    children: [
      { label: 'Medical Billing', to: '/medical-billing' },
      { label: 'Medical Transcriptions', to: '/medical-transcription' },
      { label: 'Management Services', to: '/management-services' },
    ],
  },
  {
    label: 'Digital Marketing',
    to: '/digital-marketing',
    children: [
      { label: 'Web Development', to: '/web-development' },
      { label: 'Graphics Designing', to: '/graphic-designing' },
      { label: 'UI UX Designing', to: '/ui-ux-designing' },
      { label: 'Search Engine Optimization', to: '/search-engine-optimization' },
      { label: 'Social Media Marketing', to: '/social-media-marketing' },
      { label: 'Content Writing', to: '/content-writing' },
    ],
  },
];

export const FOOTER_COLUMNS = [
  {
    title: 'BPO',
    links: BUSINESS_MENU[0].children,
  },
  {
    title: 'Health Care',
    links: BUSINESS_MENU[1].children,
  },
  {
    title: 'Digital Marketing',
    links: [
      { label: 'WEB Development', to: '/web-development' },
      { label: 'Graphic Designing', to: '/graphic-designing' },
      { label: 'UI UX Designing', to: '/ui-ux-designing' },
      { label: 'Search Engine Optimization', to: '/search-engine-optimization' },
      { label: 'Social Media Marketing', to: '/social-media-marketing' },
      { label: 'Content Writing', to: '/content-writing' },
    ],
  },
];

export const SOCIAL_LINKS = [
  {
    icon: 'fa-linkedin-in',
    size: 'text-[20px]',
    href: 'https://www.linkedin.com/company/cornerstone-medical-solutions/home/?viewAsMember=true',
    label: 'LinkedIn',
  },
];

export const COMPANY = {
  phone: '+92 333 0327865',
  phoneHref: 'tel:+923330327865',
  email: 'cmsolutions180@gmail.com',
  address: '11-C Judicial Colony, Lahore, Punjab 54400',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=11-C+Judicial+Colony+Lahore+Punjab+54400',
};
