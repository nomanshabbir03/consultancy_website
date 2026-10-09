import { SOLUTION_TABS } from '../data/solutions.js';

/**
 * Built-in content of the CMS-managed page sections: exactly what these pages showed before the CMS existed.
 * Pages render these values whenever the API / database is unavailable or a section has not been published.
 * `**word**` marks the accent word (rendered in the site's blue by <Accent>); no HTML is ever stored.
 * server/src/cms/pageDefaults.json is generated from this file (npm run cms:sync --prefix server); a test fails if they differ.
 */
const link = (label, to) => ({ label, to });

export const PAGE_DEFAULTS = {
  home: {
    hero: {
      heading: 'We Are Serving Round The Clock',
      video: '/assets/pics/web-bg.webm',
      links: [link('BPO', '/bpo'), link('Healthcare', '/health-care'), link('Digital Marketing', '/digital-marketing')],
    },
    solutions: {
      heading: 'Optimized Business **Solutions**',
      intro:
        "Our comprehensive suite of BPO, healthcare, and digital marketing solutions provides seamless and optimized services that elevate our clients' operations. With over a decade of experience and a proven track record of success, we strive to inspire and empower our clients to achieve their goals and drive sustainable growth.",
      cards: [
        {
          visible: true,
          icon: '/assets/pics/newicons/bpo.svg',
          iconAlt: '',
          title: 'Business Process Outsourcing',
          text: 'Our BPO call center department provides top-notch customer support.',
          links: [link('Inbound Calls', '/inbound-call'), link('Outbound Calls', '/outbound-call'), link('Email and Chat Support', '/email-and-chat'), link('SMS Support', '/sms-support')],
        },
        {
          visible: true,
          icon: '/assets/pics/newicons/healthcare.svg',
          iconAlt: '',
          title: 'Health Care',
          text: 'Managing patient billing and processing insurance claims are part of it.',
          links: [link('Medical Billing', '/medical-billing'), link('Medical Transcription', '/medical-transcription'), link('Management Services', '/management-services')],
        },
        {
          visible: true,
          icon: '/assets/pics/newicons/design.svg',
          iconAlt: '',
          title: 'Digital Marketing',
          text: 'Our digital marketing team helps businesses reach their target audience.',
          links: [
            link('Graphic Designing', '/graphic-designing'),
            link('Search Engine Optimization', '/search-engine-optimization'),
            link('Social Media Marketing', '/social-media-marketing'),
            link('Content Writing', '/content-writing'),
          ],
        },
        {
          visible: true,
          icon: '/assets/pics/newicons/custom.svg',
          iconAlt: '',
          title: 'Software Development',
          text: 'Empowering Your Vision with Expert Software/Web Development Services.',
          links: [link('Web Development', '/web-development'), link('UI/UX Designing', '/ui-ux-designing'), link('Wordpress Development', '/web-development')],
        },
      ],
    },
    team: {
      heading: 'Meet Our Leadership',
      intro:
        "At Cornerstone Medical Solutions , we take pride in our dedicated and experienced leadership team, driving our organization's success and innovation. Our leaders bring a wealth of expertise and a shared commitment to our mission, vision, and values.",
    },
    roadmap: {
      heading: 'Our Roadmap to **Results**',
      intro:
        'Our process is a journey of discovery, collaboration, and innovation. We work with our clients to understand their needs and their problems. Then, we create special solutions to help them reach their goals.',
      buttonLabel: 'Book A Meeting',
      buttonUrl: '/contact-us',
      cards: [
        {
          visible: true,
          icon: '/assets/pics/newicons/vision.svg',
          iconAlt: '',
          title: 'Uncovering Your Vision',
          text: "At Cornerstone Medical Solutions, we're passionate about helping businesses succeed. That's why we start by deeply understanding your unique needs and challenges.",
        },
        {
          visible: true,
          icon: '/assets/pics/newicons/solution.svg',
          iconAlt: '',
          title: 'Crafting Solutions',
          text: "Our team of experts will carefully learn about your business needs and goals. After that, we'll explore various ideas and options to find the best solutions.",
        },
        {
          visible: true,
          icon: '/assets/pics/newicons/success.svg',
          iconAlt: '',
          title: 'Delivering Success',
          text: 'At Cornerstone Medical Solutions, the magic happens in the development and implementation phase. This is where we take your vision and turn it into a reality.',
        },
        {
          visible: true,
          icon: '/assets/pics/newicons/innov.svg',
          iconAlt: '',
          title: 'Empowering Innovation',
          text: 'Encourage a culture of innovation where employees are empowered to propose new ideas and solutions.',
        },
      ],
    },
    compliance: {
      heading: 'Commitment to Quality & **Compliance**',
      intro:
        'We are proud to hold ISO certifications, demonstrating our commitment to information security, quality management, and business continuity. These globally recognized standards ensure that Cornerstone Medical Solutions delivers reliable, secure, and high-quality services to all our clients.',
      badges: [1, 3, 2, 4, 5].map((n) => ({ image: `/assets/iso/${n}.png`, alt: '' })),
    },
    vision: {
      heading: 'Cornerstone Medical Solutions’ Vision for the Future!',
      intro:
        'At Cornerstone Medical Solutions, we are more than just a team of experts. We are a team of visionaries passionate about building a better tomorrow. Technology and innovation can solve important problems in the world. We use our knowledge and skills to assist our clients in reaching their goals and making a positive difference.',
      goalsIntro: 'Our goals for the future include:',
      goals: [
        { text: 'Expanding our expertise and reaching new clients so that we can help even more people benefit from our services.' },
        { text: 'Investing in new technologies and capabilities so that we can deliver even better results for our clients.' },
        { text: 'Building a broader team of talented, dedicated professionals passionate about making a difference.' },
        { text: 'We believe that together, we can create a brighter future for all.' },
      ],
    },
    awards: {
      heading: 'Achievements & **Awards**',
      badges: [1, 2, 3, 4, 5, 6].map((n) => ({ image: `/assets/pics/awards/${n}.webp`, alt: 'Award', link: '' })),
    },
    stories: {
      heading: 'Success **Stories**',
      subheading: 'Gain Access to Invaluable Wisdom!',
      viewAllLabel: 'View All Episodes',
    },
    contact: { heading: 'Get Ready To **Started?**' },
    faq: {
      heading: 'Common **Questions**',
      intro: "Need help? We're here for you. Check out our Common Questions Section or send us a message via contact page. Thank you.",
    },
  },

  'about-us': {
    hero: {
      heading: 'About Us',
      text: 'We offer a wide range of services, from BPO to digital marketing, to help businesses of all sizes grow and thrive. Founded in 2020, Cornerstone Medical Solutions is a team of experienced and passionate professionals committed to providing our clients with the highest service and support. We understand the challenges businesses face in the digital age, and we are here to help them overcome those challenges and achieve their goals.',
    },
    leaders: {
      people: [
        {
          image: '/assets/pics/home/ceo-new.png',
          alt: 'Chief Executive Officer of Cornerstone Medical Solutions',
          heading: 'Leadership **Perspective**',
          text: "At Cornerstone Medical Solutions, every business has the potential to soar. That's why we're dedicated to providing our clients with the highest quality outsourced business services backed by a team of skilled and passionate experts. We specialize in a wide range of solutions, from medical billing to digital marketing to branding. But no matter what your specific needs are, we're here to help you achieve your business goals. Innovation, efficiency, and customer satisfaction are our core values. We apply them to everything we do, from the way we develop our solutions to the way we interact with our clients. We're proud that our clients entrust us to manage their critical but non-core tasks, enabling them to focus on their core competencies. Our ultimate goal is to reduce their workload and deliver outstanding outcomes that go above and beyond their expectations.",
          name: 'Naeem Abbas',
          role: '- Co-founder',
        },
        {
          image: '/assets/pics/team/umerrafiqueblack.jpeg',
          alt: 'Umer Rafique, Co-founder of Cornerstone Medical Solutions',
          heading: 'Building Trust, **Delivering Results**',
          text: "As a Co-founder of Cornerstone Medical Solutions, Umer Rafique works alongside the leadership team to shape the company's direction and keep its promise to clients: your revenue, our responsibility. He focuses on strong operations, dependable service delivery and long-term client relationships, so that healthcare practices and growing businesses can hand off their billing, support and digital needs with confidence. His commitment to quality, transparency and accountability guides how our teams work every day.",
          name: 'Umer Rafique',
          role: '- Co-founder',
        },
      ],
    },
    pillars: {
      heading: 'Three Pillars of **Cornerstone**',
      introLine1: 'At Cornerstone Medical Solutions, we have three guiding principles that we believe are essential to our success: be curious,',
      introLine2: 'be empathetic, and keep promises.',
      items: [
        {
          icon: '/assets/pics/newicon/curiosity.svg',
          iconAlt: '',
          title: 'Curiosity',
          text: "We are committed to providing our clients with the highest quality of service and support. By being curious, we can better understand our client's needs and provide them with tailored solutions that meet their requirements.",
        },
        {
          icon: '/assets/pics/newicon/empathy.svg',
          iconAlt: '',
          title: 'Empathy',
          text: 'At Cornerstone Medical Solutions, empathy is the key to personalized service. We understand that every client is unique, with their own challenges and goals. By prioritizing empathy, we gain a deeper understanding of their perspectives.',
        },
        {
          icon: '/assets/pics/newicon/honor.svg',
          iconAlt: '',
          title: 'Honoring Our Word',
          text: 'We strive to always follow through on our commitments because we know that our clients can rest assured that we will always deliver what we promise on time and to the highest standard.',
        },
      ],
    },
    stats: {
      heading: 'What Sets Us Apart?',
      counters: [
        { target: 150, suffix: '+', label: 'Employees' },
        { target: 7, suffix: '+', label: 'Years in business' },
        { target: 1000, suffix: '+', label: 'Clients Trust Us' },
        { target: 97, suffix: '%', label: 'Accuracy' },
      ],
      bandText: 'What work best for you?',
      bandLinkLabel: 'Explore More',
      bandLinkUrl: '#',
    },
    solutions: {
      heading: 'Our Customized **Solutions**',
      intro:
        'Cornerstone Medical Solutions - Your partner in growth. We specialize in providing top-notch business process outsourcing (BPO) services, including expert healthcare solutions, and effective digital marketing strategies. Let us take care of your non-core business activities, while you focus on your core strengths and drive your business forward.',
      tabs: SOLUTION_TABS.map((tab) => ({ label: tab.label, cards: tab.cards.map((c) => ({ icon: c.icon, iconAlt: '', title: c.title, text: c.text, to: c.to })) })),
    },
    gallery: {
      heading: "Our Team's Wins in a Collaborative",
      headingAccent: 'Environment',
      photos: [8, 9, 10, 11, 13, 14].map((n) => ({ image: `/assets/pics/slider/${n}.png`, alt: 'Team' })),
    },
  },

  'contact-us': {
    hero: {
      headingPrefix: 'Let’s get in',
      typedWord: 'touch',
      intro:
        'Thank you for considering Cornerstone Medical Solutions for your medical billing needs. We are here to answer any questions you may have and provide you with more information about our services.',
    },
    map: {
      address: '11-C Judicial Colony Lahore Punjab 54400',
      title: 'Cornerstone Medical Solutions office locations',
    },
  },

  career: {
    hero: {
      headingLine1: 'Invest in your career,',
      headingLine2: '**Grow** with tech’s top talent.',
      searchPlaceholder: 'Search Job Here ...',
    },
    list: { countLabel: 'Jobs Available:', emptyText: 'No jobs found' },
  },

  blog: {
    hero: { heading: 'Blogs of **Cornerstone**', searchPlaceholder: 'Search Blog Here ...' },
    list: { emptyText: 'No blog found' },
  },
};

/** Default order of the blocks of pages whose sections can be re-ordered / hidden (first block of each page is locked). */
export const PAGE_LAYOUTS = {
  home: ['hero', 'solutions', 'team', 'roadmap', 'compliance', 'vision', 'awards', 'stories', 'contact', 'faq'],
  'about-us': ['hero', 'leaders', 'pillars', 'stats', 'solutions', 'cta', 'awards', 'gallery', 'contact'],
};
