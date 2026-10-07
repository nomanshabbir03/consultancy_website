const IMG = '/assets/pics/portfolio';

const WEBSITES = [
  { image: `${IMG}/extended.webp`, label: 'Extended Health Services', href: 'https://extendedhealthservices.us/', sized: true },
  { image: `${IMG}/scribe-align.webp`, label: 'Scribe Align LLC', href: 'https://scribealign.com/' },
  { image: `${IMG}/clinic-heroes.webp`, label: 'Clinical Heroes', href: 'https://clinicheroes.com/', sized: true },
];

/**
 * Portfolio tabs. `web` is the Web Development page (items open a preview, graphic work is not linked);
 * `design` is shared by the Graphic Designing and UI/UX pages (items link out).
 */
export const PORTFOLIO = {
  web: {
    preview: true,
    tabs: [
      { label: 'Web Development', items: WEBSITES },
      {
        label: 'Graphic Designing',
        items: [
          { image: `${IMG}/social-extended.webp`, label: 'Social Media Post', sized: true },
          { image: `${IMG}/scibe-align-social.webp`, label: 'LOGO Designing' },
          { image: `${IMG}/social-clinic-heroes.webp`, label: 'Flyers', sized: true },
        ],
      },
      {
        label: 'UI/UX Designing',
        items: [
          {
            image: `${IMG}/uiuxextendedn.webp`,
            label: 'Extended Health Services',
            href: 'https://extendedhealthservices.us/',
            sized: true,
          },
        ],
      },
    ],
  },
  design: {
    preview: false,
    tabs: [
      { label: 'Web Development', items: WEBSITES },
      {
        label: 'Graphic Designing',
        items: [
          {
            image: `${IMG}/social-extended.webp`,
            label: 'Extended Health Services',
            href: 'https://www.facebook.com/extendedhealthservicesInc',
            sized: true,
          },
          {
            image: `${IMG}/scibe-align-social.webp`,
            label: 'Scribe Align LLC',
            href: 'https://www.facebook.com/ScribeAlignLLC',
          },
          {
            image: `${IMG}/social-clinic-heroes.webp`,
            label: 'Clinical Heroes',
            href: 'https://www.facebook.com/clinicheroes',
            sized: true,
          },
        ],
      },
      {
        label: 'UI/UX Designing',
        items: [
          {
            image: `${IMG}/uiuxextendedn.webp`,
            label: 'Extended Health Services',
            href: 'https://extendedhealthservices.us/',
            sized: true,
          },
          { image: `${IMG}/scribe-uiux.webp`, label: 'Scribe Align LLC', href: 'https://extendedhealthservices.us/' },
          {
            image: `${IMG}/uiux-clinic-heroes.webp`,
            label: 'Clinical Heroes',
            href: 'https://extendedhealthservices.us/',
            sized: true,
          },
        ],
      },
    ],
  },
};
