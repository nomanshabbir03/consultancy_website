// Built-in content for the global sections: exactly what the website showed before the CMS existed.
// The public site uses these values until an admin publishes a change, so nothing depends on seeding the database.
// (client/src/data/navigation.js holds the same values as the browser-side fallback if the API is unreachable.)

const BPO = [
  { label: 'Inbound Calls', to: '/inbound-call' },
  { label: 'Outbound Calls', to: '/outbound-call' },
  { label: 'Email and Chat Support', to: '/email-and-chat' },
  { label: 'SMS Support', to: '/sms-support' },
];
const HEALTH = [
  { label: 'Medical Billing', to: '/medical-billing' },
  { label: 'Medical Transcriptions', to: '/medical-transcription' },
  { label: 'Management Services', to: '/management-services' },
];

export const DEFAULTS = {
  global: {
    navbar: {
      logo: '/assets/pics/company_logo.png',
      logoWhite: '/assets/pics/company_logo_white.jpeg',
      logoAlt: 'Cornerstone Medical Solutions',
      items: [
        { label: 'Home', type: 'link', to: '/' },
        { label: 'About', type: 'link', to: '/about-us' },
        { label: 'Our Business', type: 'menu', to: '' },
        { label: 'Blogs', type: 'link', to: '/blog' },
        { label: 'Career', type: 'link', to: '/career' },
        { label: 'Contact Us', type: 'link', to: '/contact-us' },
      ],
      menuTagline: 'Building a\nBetter Business\nWorld',
      menuGroups: [
        { label: 'BPO', to: '/bpo', children: BPO },
        { label: 'Health Care', to: '/health-care', children: HEALTH },
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
      ],
      menuAside: [
        { label: 'Message from CEO', to: '/about-us' },
        { label: 'Our Team', to: '/' },
        { label: 'Events', to: '/blog' },
      ],
      ctaLabel: 'Book A Meeting',
      ctaUrl: '/contact-us',
    },
    footer: {
      columns: [
        { title: 'BPO', links: BPO },
        { title: 'Health Care', links: HEALTH },
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
      ],
      contactTitle: 'Contact Us',
      isoImage: '/assets/iso/iso-certified-color.png',
      isoAlt: 'ISO certified',
      copyrightPrefix: 'Copyrights © 2022 All Rights Reserved by',
      copyrightBrand: 'Cornerstone Medical Solutions',
    },
    company: {
      phone: '+92 333 0327865',
      email: 'cmsolutions180@gmail.com',
      address: '11-C Judicial Colony, Lahore, Punjab 54400',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=11-C+Judicial+Colony+Lahore+Punjab+54400',
    },
    social: {
      items: [
        { platform: 'linkedin', url: 'https://www.linkedin.com/company/cornerstone-medical-solutions/home/?viewAsMember=true' },
        { platform: 'instagram', url: 'https://www.instagram.com/cornerstonemedicalsolutions/' },
        { platform: 'facebook', url: 'https://www.facebook.com/share/1MRG3oxmSe/' },
        { platform: 'whatsapp', url: 'https://wa.me/923330327865' },
      ],
    },
    cta: {
      _enabled: true,
      title: 'READY TO START YOUR PROJECT',
      buttonLabel: "Let's Start Together",
      buttonUrl: '/contact-us',
    },
  },
};
