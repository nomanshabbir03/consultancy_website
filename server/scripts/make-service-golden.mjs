// Writes test/fixtures/service-original-texts.json: every text node and text-bearing attribute of the ORIGINAL (pre-CMS) service pages,
// collected with a deliberately simple walker (independent of the generator), so tests can prove no original copy was lost.
//   node scripts/make-service-golden.mjs --src <directory with the original page files>
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const srcDir = process.argv[process.argv.indexOf('--src') + 1];
const clientRequire = createRequire(new URL('../../client/package.json', import.meta.url));
const { parseAst } = await import(pathToFileURL(clientRequire.resolve('rolldown/parseAst')).href);
const PAGES = { Bpo: 'bpo', InboundCall: 'inbound-call', OutboundCall: 'outbound-call', EmailAndChat: 'email-and-chat', SmsSupport: 'sms-support', HealthCare: 'health-care', MedicalBilling: 'medical-billing', MedicalTranscription: 'medical-transcription', ManagementServices: 'management-services', DigitalMarketing: 'digital-marketing', WebDevelopment: 'web-development', GraphicDesigning: 'graphic-designing', UiUxDesigning: 'ui-ux-designing', SearchEngineOptimization: 'search-engine-optimization', SocialMediaMarketing: 'social-media-marketing', ContentWriting: 'content-writing' };
const decode = (s) => s.replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (m, e) => ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0' })[e]).replace(/&#(\d+);/g, (m, n) => String.fromCodePoint(+n));
const out = {};
for (const [file, slug] of Object.entries(PAGES)) {
  const ast = parseAst(fs.readFileSync(path.join(srcDir, `${file}.jsx`), 'utf8'), { lang: 'jsx' });
  const texts = [];
  const images = [];
  const links = [];
  const visit = (n) => {
    if (!n || typeof n !== 'object') return;
    if (Array.isArray(n)) return n.forEach(visit);
    if (n.type === 'JSXText') {
      const t = decode(n.value).replace(/\s+/g, ' ').trim();
      if (t) texts.push(t);
    } else if (n.type === 'JSXExpressionContainer' && n.expression?.type === 'Literal' && typeof n.expression.value === 'string') {
      const t = n.expression.value.replace(/\s+/g, ' ').trim();
      if (t) texts.push(t);
    } else if (n.type === 'JSXAttribute' && n.value?.type === 'Literal') {
      if (n.name.name === 'src') images.push(n.value.value);
      if (n.name.name === 'to' || n.name.name === 'href') links.push(n.value.value);
      if (n.name.name === 'alt' && n.value.value.trim()) texts.push(decode(n.value.value).trim());
    }
    for (const k of Object.keys(n)) if (k !== 'type' && k !== 'start' && k !== 'end') visit(n[k]);
  };
  visit(ast.body);
  out[slug] = { texts, images, links };
}
fs.writeFileSync(new URL('../test/fixtures/service-original-texts.json', import.meta.url), JSON.stringify(out, null, 1) + '\n');
console.log(Object.entries(out).map(([k, v]) => `${k}: ${v.texts.length} texts, ${v.images.length} images, ${v.links.length} links`).join('\n'));
