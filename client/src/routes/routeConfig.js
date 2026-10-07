import { lazy } from 'react';
import { PAGE_META } from './pageMeta';

const TINT = '#F0F6FF';

/**
 * One entry per public page. `footerBackground` mirrors the reference site, where some
 * pages end with a light-blue band behind the footer.
 */
const defs = [
  { path: '/', component: lazy(() => import('../pages/Home')), transparentHeader: true },
  { path: '/about-us', component: lazy(() => import('../pages/About')) },
  { path: '/bpo', component: lazy(() => import('../pages/Bpo')) },
  { path: '/inbound-call', component: lazy(() => import('../pages/InboundCall')) },
  { path: '/outbound-call', component: lazy(() => import('../pages/OutboundCall')) },
  { path: '/email-and-chat', component: lazy(() => import('../pages/EmailAndChat')), footerBackground: TINT },
  { path: '/sms-support', component: lazy(() => import('../pages/SmsSupport')), footerBackground: TINT },
  { path: '/health-care', component: lazy(() => import('../pages/HealthCare')) },
  { path: '/medical-billing', component: lazy(() => import('../pages/MedicalBilling')) },
  { path: '/medical-transcription', component: lazy(() => import('../pages/MedicalTranscription')) },
  { path: '/management-services', component: lazy(() => import('../pages/ManagementServices')) },
  { path: '/digital-marketing', component: lazy(() => import('../pages/DigitalMarketing')) },
  { path: '/web-development', component: lazy(() => import('../pages/WebDevelopment')), footerBackground: TINT },
  { path: '/graphic-designing', component: lazy(() => import('../pages/GraphicDesigning')), footerBackground: TINT },
  { path: '/ui-ux-designing', component: lazy(() => import('../pages/UiUxDesigning')), footerBackground: TINT },
  { path: '/search-engine-optimization', component: lazy(() => import('../pages/SearchEngineOptimization')) },
  { path: '/social-media-marketing', component: lazy(() => import('../pages/SocialMediaMarketing')) },
  { path: '/content-writing', component: lazy(() => import('../pages/ContentWriting')) },
  { path: '/blog', component: lazy(() => import('../pages/Blog')), footerBackground: TINT },
  { path: '/blog/:slug', component: lazy(() => import('../pages/BlogPost')), footerBackground: TINT },
  { path: '/career', component: lazy(() => import('../pages/Career')), footerBackground: TINT },
  { path: '/career/:slug', component: lazy(() => import('../pages/CareerDetail')) },
  { path: '/contact-us', component: lazy(() => import('../pages/Contact')) },
];

export const routes = defs.map((def) => ({ ...def, meta: PAGE_META[def.path] }));
