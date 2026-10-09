/**
 * Content sections of the Phase 2 pages (Home, About, Contact, Careers, Blog). Only text, links and images are editable;
 * layout, colours and typography stay in the page components. `**word**` marks the blue accent word.
 */
const text = (key, label, extra = {}) => ({ key, type: 'text', label, ...extra });
const textarea = (key, label, extra = {}) => ({ key, type: 'textarea', label, ...extra });
const url = (key, label, extra = {}) => ({ key, type: 'url', label, ...extra });
const image = (key, label, extra = {}) => ({ key, type: 'image', label, ...extra });
const list = (key, label, fields, extra = {}) => ({ key, type: 'list', label, fields, ...extra });
const visible = (label) => ({ key: 'visible', type: 'boolean', label, default: true });

const ACCENT = 'Put the word shown in blue between double asterisks, e.g. Our **Services**.';
const heading = (label = 'Heading', extra = {}) => text('heading', label, { required: true, max: 140, help: ACCENT, ...extra });
const LINK = [text('label', 'Label', { required: true, max: 60 }), url('to', 'Link', { required: true, help: 'e.g. /bpo or https://…' })];
const iconFields = [image('icon', 'Icon', { required: true, help: 'Small icon (displayed at 48 × 48).' }), text('iconAlt', 'Icon alt text', { max: 120, help: 'Leave empty for purely decorative icons.' })];

export const PAGE_SECTIONS = {
  home: {
    blocks: [
      { key: 'hero', title: 'Hero', locked: true },
      { key: 'solutions', title: 'Business solutions' },
      { key: 'team', title: 'Leadership heading' },
      { key: 'roadmap', title: 'Roadmap / process' },
      { key: 'compliance', title: 'Quality & compliance (ISO)' },
      { key: 'vision', title: 'Vision for the future' },
      { key: 'awards', title: 'Awards' },
      { key: 'stories', title: 'Success stories heading' },
      { key: 'contact', title: '"Get ready" contact section' },
      { key: 'faq', title: 'FAQ heading' },
    ],
    sections: [
      {
        key: 'hero',
        title: 'Hero',
        description: 'The full-screen banner at the top of the home page.',
        fields: [
          heading('Main heading'),
          url('video', 'Background video', { help: 'Site path of the looping background video (e.g. /assets/pics/web-bg.webm).' }),
          list('links', 'Quick links', LINK, { maxItems: 4, itemLabel: 'label', itemNoun: 'link' }),
        ],
      },
      {
        key: 'solutions',
        title: 'Business solutions',
        description: 'Heading, introduction and the service cards.',
        fields: [
          heading(),
          textarea('intro', 'Introduction', { required: true, max: 1000 }),
          list(
            'cards',
            'Service cards',
            [visible('Show this card'), ...iconFields, text('title', 'Title', { required: true, max: 80 }), textarea('text', 'Description', { required: true, max: 300 }), list('links', 'Links', LINK, { maxItems: 8, itemLabel: 'label', itemNoun: 'link' })],
            { maxItems: 6, itemLabel: 'title', itemNoun: 'card' }
          ),
        ],
      },
      {
        key: 'team',
        title: 'Leadership heading',
        description: 'Heading and introduction above the leadership cards (the people themselves are managed under Team).',
        fields: [heading('Heading'), textarea('intro', 'Introduction', { required: true, max: 800 })],
      },
      {
        key: 'roadmap',
        title: 'Roadmap / process',
        description: 'Heading, introduction, button and the four process cards.',
        fields: [
          heading(),
          textarea('intro', 'Introduction', { required: true, max: 800 }),
          text('buttonLabel', 'Button text', { required: true, max: 40 }),
          url('buttonUrl', 'Button link', { required: true }),
          list('cards', 'Cards', [visible('Show this card'), ...iconFields, text('title', 'Title', { required: true, max: 80 }), textarea('text', 'Description', { required: true, max: 400 })], { maxItems: 6, itemLabel: 'title', itemNoun: 'card' }),
        ],
      },
      {
        key: 'compliance',
        title: 'Quality & compliance (ISO)',
        description: 'Heading, text and the certification badges.',
        fields: [
          heading(),
          textarea('intro', 'Text', { required: true, max: 800 }),
          list('badges', 'Certification badges', [image('image', 'Badge image', { required: true }), text('alt', 'Alt text', { max: 120 })], { maxItems: 10, itemLabel: 'alt', itemNoun: 'badge' }),
        ],
      },
      {
        key: 'vision',
        title: 'Vision for the future',
        description: 'Heading, text and the list of goals.',
        fields: [
          heading(),
          textarea('intro', 'Text', { required: true, max: 1200 }),
          text('goalsIntro', 'Goals introduction', { max: 140 }),
          list('goals', 'Goals', [textarea('text', 'Goal', { required: true, max: 300 })], { maxItems: 8, itemLabel: 'text', itemNoun: 'goal' }),
        ],
      },
      {
        key: 'awards',
        title: 'Awards',
        description: 'Heading and award badges (also shown on the About page).',
        fields: [
          heading(),
          list('badges', 'Award badges', [image('image', 'Badge image', { required: true }), text('alt', 'Alt text', { max: 120 }), url('link', 'Link (optional)')], { maxItems: 6, itemLabel: 'alt', itemNoun: 'badge', help: 'The grid has six positions.' }),
        ],
      },
      {
        key: 'stories',
        title: 'Success stories heading',
        description: 'Texts above the video grid (the videos are managed under Success Stories).',
        fields: [heading(), text('subheading', 'Subheading', { max: 140 }), text('viewAllLabel', 'View-all label', { max: 60 })],
      },
      {
        key: 'contact',
        title: '"Get ready" contact section',
        description: 'Heading above the inquiry form (also shown on the About page). Form fields and validation are not editable.',
        fields: [heading()],
      },
      {
        key: 'faq',
        title: 'FAQ heading',
        description: 'Heading and text above the questions (the questions are managed under FAQs).',
        fields: [heading(), textarea('intro', 'Text', { max: 500 })],
      },
    ],
  },

  'about-us': {
    blocks: [
      { key: 'hero', title: 'Hero', locked: true },
      { key: 'leaders', title: 'Leadership' },
      { key: 'pillars', title: 'Three pillars' },
      { key: 'stats', title: 'Statistics' },
      { key: 'solutions', title: 'Customized solutions' },
      { key: 'cta', title: 'Call-to-action band', note: 'Edited under Global Content → Call-to-action band.' },
      { key: 'awards', title: 'Awards', note: 'Edited under Home → Awards.' },
      { key: 'gallery', title: 'Team gallery' },
      { key: 'contact', title: '"Get ready" contact section', note: 'Edited under Home → "Get ready" contact section.' },
    ],
    sections: [
      {
        key: 'hero',
        title: 'Hero',
        description: 'Page title and introduction.',
        fields: [text('heading', 'Page title', { required: true, max: 100 }), textarea('text', 'Introduction', { required: true, max: 1200 })],
      },
      {
        key: 'leaders',
        title: 'Leadership',
        description: 'Photo, heading, message and name for each leader.',
        fields: [
          list(
            'people',
            'Leaders',
            [
              image('image', 'Photo', { required: true }),
              text('alt', 'Photo alt text', { required: true, max: 160 }),
              heading(),
              textarea('text', 'Message', { required: true, max: 3000 }),
              text('name', 'Name', { required: true, max: 80 }),
              text('role', 'Role', { max: 80 }),
            ],
            { maxItems: 4, required: true, itemLabel: 'name', itemNoun: 'leader' }
          ),
        ],
      },
      {
        key: 'pillars',
        title: 'Three pillars',
        description: 'Heading, introduction and the pillar cards.',
        fields: [
          heading(),
          textarea('introLine1', 'Introduction (first part)', { required: true, max: 400 }),
          text('introLine2', 'Introduction (second line)', { max: 200, help: 'On wide screens this starts on a new line.' }),
          list('items', 'Pillars', [...iconFields, text('title', 'Title', { required: true, max: 80 }), textarea('text', 'Description', { required: true, max: 500 })], { maxItems: 6, itemLabel: 'title', itemNoun: 'pillar' }),
        ],
      },
      {
        key: 'stats',
        title: 'Statistics',
        description: 'Animated counters and the line below them.',
        fields: [
          text('heading', 'Heading', { required: true, max: 100 }),
          list(
            'counters',
            'Counters',
            [{ key: 'target', type: 'number', label: 'Number', min: 0, max: 10000000 }, text('suffix', 'After the number', { max: 3, help: 'e.g. + or %' }), text('label', 'Label', { required: true, max: 60 })],
            { maxItems: 6, itemLabel: 'label', itemNoun: 'counter' }
          ),
          text('bandText', 'Line below the counters', { max: 120 }),
          text('bandLinkLabel', 'Link text', { max: 40 }),
          url('bandLinkUrl', 'Link address'),
        ],
      },
      {
        key: 'solutions',
        title: 'Customized solutions',
        description: 'Introduction and the three tabs with their service cards.',
        fields: [
          heading(),
          textarea('intro', 'Introduction', { required: true, max: 800 }),
          list(
            'tabs',
            'Tabs',
            [
              text('label', 'Tab name', { required: true, max: 40 }),
              list('cards', 'Cards', [...iconFields, text('title', 'Title', { required: true, max: 80 }), textarea('text', 'Description', { required: true, max: 800 }), url('to', 'Link', { required: true })], { maxItems: 8, itemLabel: 'title', itemNoun: 'card' }),
            ],
            { maxItems: 3, required: true, itemLabel: 'label', itemNoun: 'tab', help: 'The page design has three tabs.' }
          ),
        ],
      },
      {
        key: 'gallery',
        title: 'Team gallery',
        description: 'Heading and photos of the team gallery.',
        fields: [
          text('heading', 'Heading', { required: true, max: 120 }),
          text('headingAccent', 'Heading (blue second line)', { max: 80 }),
          list('photos', 'Photos', [image('image', 'Photo', { required: true }), text('alt', 'Alt text', { max: 120 })], { maxItems: 6, required: true, itemLabel: 'alt', itemNoun: 'photo' }),
        ],
      },
    ],
  },

  'contact-us': {
    blocks: [],
    sections: [
      {
        key: 'hero',
        title: 'Page heading & introduction',
        description: 'Heading (with the animated typed word) and the introduction next to the form. The form itself is not editable.',
        fields: [
          text('headingPrefix', 'Heading', { required: true, max: 80 }),
          text('typedWord', 'Typed word', { required: true, max: 24, help: 'Typed letter by letter after the heading.' }),
          textarea('intro', 'Introduction', { required: true, max: 800 }),
        ],
      },
      {
        key: 'map',
        title: 'Map',
        description: 'The office map under the form. Social links and contact details are under Global Content.',
        fields: [
          text('address', 'Address shown on the map', { required: true, max: 200 }),
          text('title', 'Map description (for screen readers)', { required: true, max: 120 }),
        ],
      },
    ],
  },

  career: {
    blocks: [],
    sections: [
      {
        key: 'hero',
        title: 'Hero & search',
        description: 'Heading and search box text. Jobs themselves are managed under Jobs.',
        fields: [
          text('headingLine1', 'Heading (first line)', { required: true, max: 100 }),
          text('headingLine2', 'Heading (second line)', { required: true, max: 100, help: ACCENT }),
          text('searchPlaceholder', 'Search box placeholder', { required: true, max: 60 }),
        ],
      },
      {
        key: 'list',
        title: 'Job list texts',
        description: 'Static labels around the job list.',
        fields: [text('countLabel', 'Jobs counter label', { required: true, max: 40 }), text('emptyText', 'Message when no job is found', { required: true, max: 100 })],
      },
    ],
  },

  blog: {
    blocks: [],
    sections: [
      {
        key: 'hero',
        title: 'Hero & search',
        description: 'Heading and search box text. Posts themselves are managed under Blogs.',
        fields: [heading(), text('searchPlaceholder', 'Search box placeholder', { required: true, max: 60 })],
      },
      {
        key: 'list',
        title: 'Blog list texts',
        description: 'Static labels around the blog list.',
        fields: [text('emptyText', 'Message when no post is found', { required: true, max: 100 })],
      },
    ],
  },
};
