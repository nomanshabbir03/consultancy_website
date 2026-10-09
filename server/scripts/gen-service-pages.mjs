// ONE-TIME migration tool (Phase 3): turns the 16 hardcoded service pages into CMS-driven pages without touching their markup.
//
//   node server/scripts/gen-service-pages.mjs --src <dir with the ORIGINAL pre-CMS page files>
//
// It parses every original page with a real JSX parser and replaces ONLY content literals:
//   - text (headings, paragraphs, button labels), with the blue accent word written as **word**
//   - img/source src + img alt, Link/a destinations
//   - repeated sibling blocks (cards, steps, list rows), which become repeatable lists
// Classes, element structure, data-aos, decorative elements and component hierarchy are copied verbatim.
// Outputs: client/src/pages/*.jsx, client/src/content/service/<slug>.js (the built-in content) and
// server/src/cms/servicePages.json (editor schema + the same defaults, mirrored for the API and checked by tests).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const clientRequire = createRequire(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../client/package.json'));
const { parseAst } = await import(pathToFileURL(clientRequire.resolve('rolldown/parseAst')).href);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const srcDir = process.argv[process.argv.indexOf('--src') + 1];
if (!srcDir || srcDir.startsWith('--')) throw new Error('Usage: --src <directory with the original page files>');

const PAGES = [
  ['Bpo', 'bpo', 'BPO'],
  ['InboundCall', 'inbound-call', 'Inbound Calls'],
  ['OutboundCall', 'outbound-call', 'Outbound Calls'],
  ['EmailAndChat', 'email-and-chat', 'Email and Chat Support'],
  ['SmsSupport', 'sms-support', 'SMS Support'],
  ['HealthCare', 'health-care', 'Health Care'],
  ['MedicalBilling', 'medical-billing', 'Medical Billing'],
  ['MedicalTranscription', 'medical-transcription', 'Medical Transcription'],
  ['ManagementServices', 'management-services', 'Management Services'],
  ['DigitalMarketing', 'digital-marketing', 'Digital Marketing'],
  ['WebDevelopment', 'web-development', 'Web Development'],
  ['GraphicDesigning', 'graphic-designing', 'Graphic Designing'],
  ['UiUxDesigning', 'ui-ux-designing', 'UI/UX Designing'],
  ['SearchEngineOptimization', 'search-engine-optimization', 'Search Engine Optimization'],
  ['SocialMediaMarketing', 'social-media-marketing', 'Social Media Marketing'],
  ['ContentWriting', 'content-writing', 'Content Writing'],
];

// ------------------------------------------------------------------ helpers
const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', hellip: '…', copy: '©', reg: '®', trade: '™', bull: '•' };
const decode = (s) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === '#') return String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    if (!(e in ENTITIES)) throw new Error(`Unknown entity ${m}`);
    return ENTITIES[e];
  });

/** React's JSX whitespace rule for one text node. */
function jsxText(raw) {
  const lines = raw.split(/\r\n|\n|\r/);
  const out = [];
  lines.forEach((line, i) => {
    let l = line.replace(/\t/g, ' ');
    if (i > 0) l = l.replace(/^ +/, '');
    if (i < lines.length - 1) l = l.replace(/ +$/, '');
    if (l) out.push(l);
  });
  return decode(out.join(' '));
}

const isNlWs = (c) => c.type === 'JSXText' && !c.value.trim() && /[\r\n]/.test(c.value);
const kids = (el) => el.children.filter((c) => !isNlWs(c));
const tagOf = (el) => el.openingElement.name.name ?? el.openingElement.name.property?.name;
const attr = (el, name) => el.openingElement.attributes.find((a) => a.type === 'JSXAttribute' && a.name.name === name);
const attrStr = (el, name) => {
  const a = attr(el, name);
  return a && a.value?.type === 'Literal' && typeof a.value.value === 'string' ? a.value.value : null;
};
const isStrExpr = (c) => c.type === 'JSXExpressionContainer' && c.expression.type === 'Literal' && typeof c.expression.value === 'string';
const isSpaceExpr = (c) => isStrExpr(c) && c.expression.value === ' ';
const slug = (s) => s.toLowerCase().replace(/\*\*/g, '').replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const clip = (s, n) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);
const lower = (s) => s[0].toLowerCase() + s.slice(1);

// ------------------------------------------------------------------ extraction
class Scope {
  constructor(varName, depth, source) {
    this.varName = varName;
    this.depth = depth;
    this.source = source;
    this.used = {};
    this.schema = [];
    this.values = {};
    this.edits = [];
    this.warnings = [];
  }
  key(role) {
    this.used[role] = (this.used[role] ?? 0) + 1;
    return this.used[role] > 1 ? `${role}${this.used[role]}` : role;
  }
}

const accentClass = (el) => (attrStr(el, 'className') ?? '').includes('text-[#00aeef]');
const cls = (el) => attrStr(el, 'className') ?? '';

function roleFor(el, inherited) {
  const t = tagOf(el);
  if (/^h[1-6]$/.test(t)) return 'heading';
  if (t === 'Link' || t === 'a' || t === 'button') return 'label';
  if (t === 'li') return 'item';
  const c = cls(el);
  if (/sm:text-\[40px\]|xl:text-\[40px\]|xl:text-\[54px\]/.test(c)) return 'heading';
  if (/sm:text-\[24px\]|sm:text-\[22px\]|font-600|font-semibold|font-bold|sm:text-\[20px\]/.test(c)) return 'title';
  if (['span', 'strong', 'b', 'em', 'small'].includes(t) && inherited) return inherited;
  return 'text';
}

const ROLE_LABEL = { heading: 'Heading', title: 'Title', label: 'Button / link text', item: 'List item', text: 'Text' };

/** One piece of an inline text run (or null when the child breaks the run). */
function piece(c) {
  if (c.type === 'JSXText') return { text: jsxText(c.value), node: c };
  if (isStrExpr(c)) return { text: c.expression.value, node: c };
  if (c.type === 'JSXElement' && tagOf(c) === 'span' && accentClass(c)) {
    const inner = kids(c);
    if (inner.length && inner.every((k) => k.type === 'JSXText' || isStrExpr(k))) {
      const t = inner.map((k) => (k.type === 'JSXText' ? jsxText(k.value) : k.expression.value)).join('');
      if (t.trim()) return { text: `**${t}**`, node: c, accent: true };
    }
  }
  return null;
}

/** Class list without spacing utilities (margins, paddings, gaps), which only vary by position (e.g. the last card has no bottom padding). */
const normClass = (value) =>
  value
    .split(/\s+/)
    .filter((t) => t && !/^(?:[a-z0-9-]+:)*-?(?:[mp][trblxy]?|gap(?:-[xy])?|space-[xy])-/.test(t))
    .sort()
    .join(' ');

function sig(el, src) {
  const t = tagOf(el);
  const skip = new Set(['data-aos']);
  if (t === 'img' || t === 'source') ['src', 'alt', 'className'].forEach((n) => skip.add(n)); // image size classes may differ per position (kept in code)
  if (t === 'i' || kids(el).length === 0) skip.add('className'); // icon glyph / purely decorative element: class varies by position (kept in code)
  if (t === 'Link') skip.add('to');
  if (t === 'a') skip.add('href');
  const attrs = el.openingElement.attributes
    .filter((a) => !(a.type === 'JSXAttribute' && skip.has(a.name.name)))
    .map((a) =>
      a.type === 'JSXAttribute' && a.name.name === 'className' && a.value?.type === 'Literal' && typeof a.value.value === 'string'
        ? `className=${normClass(a.value.value)}`
        : src.slice(a.start, a.end).replace(/\s+/g, ' ')
    )
    .join(' ');
  // consecutive text / accent-span / string pieces count as ONE text unit (so "Cost **Savings**" matches a plain title)
  const tokens = [];
  for (const k of kids(el)) {
    if (piece(k)) {
      if (tokens[tokens.length - 1] !== 'T') tokens.push('T');
    } else tokens.push(k.type === 'JSXElement' ? sig(k, src) : `E:${src.slice(k.start, k.end)}`);
  }
  const inner = tokens.join(',');
  return `${t}|${attrs}[${inner}]`;
}

function applyEdits(text, base, edits) {
  const sorted = [...edits].sort((a, b) => b.start - a.start);
  let out = text;
  for (const e of sorted) out = out.slice(0, e.start - base) + e.text + out.slice(e.end - base);
  return out;
}

/** Removes the block's original indentation from its continuation lines (so the new files stay tidy). */
function dedent(text, src, start) {
  const col = start - (src.lastIndexOf('\n', start - 1) + 1);
  return text
    .split('\n')
    .map((l, i) => (i === 0 ? l : l.replace(new RegExp(`^ {0,${col}}`), '')))
    .join('\n')
    .replace(/[ \t]+$/gm, '');
}

const STATIC_TAGS = new Set(['br', 'hr', 'i', 'svg', 'path', 'script', 'style', 'iframe']);

/**
 * Walks `el`, recording content fields into `scope` (and source edits when `edit` is true).
 * `mirrors` are the parallel elements of sibling list items, only used to detect per-item data-aos differences.
 */
function walk(el, scope, { edit, mirrors = [], role: inheritedRole, inLink: parentInLink = false }) {
  const src = scope.source;
  const tag = tagOf(el);
  const inLink = parentInLink || tag === 'Link' || tag === 'a' || tag === 'button';
  const v = scope.varName;
  const add = (role, type, value, label, extra = {}) => {
    const key = scope.key(role);
    const n = scope.used[role];
    scope.schema.push({ key, type, label: n > 1 ? `${label} ${n}` : label, role, default: value, ...extra });
    scope.values[key] = value;
    return key;
  };

  // attributes
  for (const a of el.openingElement.attributes) {
    if (a.type !== 'JSXAttribute' || a.value?.type !== 'Literal' || typeof a.value.value !== 'string') continue;
    const name = a.name.name;
    const value = a.value.value;
    let key = null;
    if ((tag === 'img' || tag === 'source') && name === 'src') key = add('image', tag === 'img' ? 'image' : 'url', value, tag === 'img' ? 'Image' : 'Media file');
    else if (tag === 'img' && name === 'alt') key = add('imageAlt', 'text', decode(value), 'Image alt text', { optional: !decode(value) });
    else if (tag === 'Link' && name === 'to') key = add('link', 'url', value, 'Link');
    else if (tag === 'a' && name === 'href') key = add('link', 'url', value, 'Link');
    else if ((name === 'data-aos' || name === 'className') && edit && mirrors.length) {
      const others = mirrors.map((m) => attrStr(m, name));
      if (others.some((o) => o !== value)) {
        const list = [value, ...others].map((x) => JSON.stringify(x)).join(', ');
        scope.edits.push({ start: a.value.start, end: a.value.end, text: `{[${list}][${scope.indexVar} % ${others.length + 1}]}` });
      }
      continue;
    } else continue;
    if (key && edit) {
      const expr = name === 'alt' ? `{${v}.${key}}` : `{${v}.${key}}`;
      scope.edits.push({ start: a.value.start, end: a.value.end, text: expr });
    }
  }

  if (STATIC_TAGS.has(tag)) return;
  const role = inLink ? 'label' : roleFor(el, inheritedRole);
  const ks = kids(el);
  const mks = mirrors.map((m) => kids(m));

  let i = 0;
  while (i < ks.length) {
    const c = ks[i];
    // ---- repeated sibling group
    if (c.type === 'JSXElement' && !STATIC_TAGS.has(tagOf(c))) {
      const s0 = sig(c, src);
      let sepSpace = true;
      let last = i;
      let k = i + 1;
      while (k < ks.length) {
        const n = ks[k];
        if (n.type === 'JSXElement' && sig(n, src) === s0) {
          last = k;
          k++;
        } else if (isSpaceExpr(n) || (n.type === 'JSXText' && !n.value.trim())) {
          k++;
        } else break;
      }
      const group = ks.slice(i, last + 1).filter((n) => n.type === 'JSXElement');
      if (group.length >= 2) {
        // separators between items must be uniform ({' '} between every pair of items, or none)
        const between = ks.slice(i, last + 1);
        const pairs = [];
        let cur = null;
        for (const n of between) {
          if (n.type === 'JSXElement') {
            if (cur) pairs.push(cur);
            cur = [];
          } else if (cur) cur.push(n);
        }
        const gaps = pairs.length;
        const withSpace = pairs.filter((p) => p.some(isSpaceExpr)).length;
        sepSpace = withSpace === gaps;
        const uniform = withSpace === 0 || withSpace === gaps;
        const trial = group.map((g) => {
          const s = new Scope('it', scope.depth + 1, src);
          walk(g, s, { edit: false, role, inLink });
          return s;
        });
        const sameKeys = trial.every((s) => JSON.stringify(s.schema.map((f) => [f.key, f.type])) === JSON.stringify(trial[0].schema.map((f) => [f.key, f.type])));
        if (uniform && sameKeys && trial[0].schema.length > 0) {
          const listKey = scope.key('items');
          const itemVar = `it${scope.depth + 1}`;
          const idxVar = `i${scope.depth + 1}`;
          const tpl = new Scope(itemVar, scope.depth + 1, src);
          tpl.indexVar = idxVar;
          walk(group[0], tpl, { edit: true, mirrors: group.slice(1), role, inLink });
          let tplSrc = applyEdits(src.slice(group[0].start, group[0].end), group[0].start, tpl.edits);
          const open = tplSrc.match(/^<[A-Za-z.]+/)[0];
          const first = trial[0];
          const labelField = first.schema.find((f) => ['heading', 'title', 'label', 'text', 'item'].includes(f.role) && f.type === 'text') ?? first.schema[0];
          scope.schema.push({
            key: listKey,
            type: 'list',
            label: 'Repeated items',
            nested: first.schema,
            itemLabel: labelField.key,
            count: group.length,
            sample: labelField.default,
          });
          scope.values[listKey] = trial.map((s) => ({ visible: true, ...s.values }));
          const body = sepSpace && gaps > 0 ? `<Fragment key={${idxVar}}>{${idxVar} > 0 && ' '}${tplSrc}</Fragment>` : tplSrc.replace(open, `${open} key={${idxVar}}`);
          if (edit) {
            scope.edits.push({
              start: group[0].start,
              end: group[group.length - 1].end,
              text: `{${v}.${listKey}.filter((${itemVar}) => ${itemVar}.visible !== false).map((${itemVar}, ${idxVar}) => (\n${body}\n))}`,
            });
          }
          scope.usesFragment = scope.usesFragment || (sepSpace && gaps > 0);
          scope.anyList = true;
          // skip the group in the parent loop
          i = last + 1;
          continue;
        }
      }
    }

    // ---- inline text run
    const p0 = piece(c);
    if (p0) {
      let end = i;
      const parts = [p0];
      let k = i + 1;
      while (k < ks.length) {
        const pp = piece(ks[k]);
        if (!pp) break;
        parts.push(pp);
        end = k;
        k++;
      }
      const raw = parts.map((p) => p.text).join('');
      const value = raw.trim();
      if (value) {
        const lead = raw.length - raw.trimStart().length > 0;
        const trail = raw.length - raw.trimEnd().length > 0;
        const r = inLink ? 'label' : roleFor(el, inheritedRole);
        const type = value.length > 140 ? 'textarea' : 'text';
        const label = r === 'label' ? 'Button / link text' : ROLE_LABEL[r];
        const key = scope.key(r);
        const n = scope.used[r];
        scope.schema.push({ key, type, label: n > 1 ? `${label} ${n}` : label, role: r, default: value });
        scope.values[key] = value;
        if (edit) {
          const first = ks[i];
          const lastNode = ks[end];
          scope.edits.push({
            start: first.start,
            end: lastNode.end,
            text: `${lead ? "{' '}" : ''}<Accent text={${v}.${key}} />${trail ? "{' '}" : ''}`,
          });
        }
        i = end + 1;
        continue;
      }
      i = end + 1;
      continue;
    }

    // ---- nested element
    if (c.type === 'JSXElement') {
      const idx = i;
      const mirrorsHere = mks.map((m) => m[idx]).filter(Boolean);
      walk(c, scope, { edit, mirrors: mirrorsHere, role, inLink });
    }
    i++;
  }
}

// ------------------------------------------------------------------ per-page processing
const results = [];
const portfolioData = await import(pathToFileURL(path.join(root, 'client/src/data/portfolio.js')).href);

for (const [file, pageSlug, pageTitle] of PAGES) {
  const src = fs.readFileSync(path.join(srcDir, `${file}.jsx`), 'utf8').replace(/\r\n/g, '\n');
  const ast = parseAst(src, { lang: 'jsx' });
  const decl = ast.body.find((n) => n.type === 'ExportDefaultDeclaration').declaration;
  const name = decl.id.name;
  const ret = decl.body.body.find((s) => s.type === 'ReturnStatement').argument;
  if (ret.type !== 'JSXFragment') throw new Error(`${file}: root is not a fragment`);
  const importsEnd = ast.body.find((n) => n.type === 'ExportDefaultDeclaration').start;
  const imports = src.slice(0, importsEnd).trimEnd();
  const blocks = ret.children.filter((c) => !(c.type === 'JSXText' && !c.value.trim()));
  const usedKeys = new Set();
  const out = { blocks: [], sections: [], defaults: {}, layout: [], code: [], usesFragment: false };

  blocks.forEach((b, idx) => {
    if (b.type !== 'JSXElement') throw new Error(`${file}: unexpected top-level node ${b.type}`);
    const tag = tagOf(b);
    if (/^[A-Z]/.test(tag)) {
      // shared component block
      const map = { CtaBanner: ['cta', 'Call-to-action band', 'Edited under Global Content → Call-to-action band.'], PortfolioSection: ['portfolio', 'Portfolio', null], ContactSection: ['contact', '"Get ready" contact section', 'Edited under Home → "Get ready" contact section.'], AwardsSection: ['awards', 'Awards', 'Edited under Home → Awards.'] };
      const [key, title, note] = map[tag] ?? [slug(tag), tag, 'Shared component.'];
      let k = key;
      while (usedKeys.has(k)) k += '2';
      usedKeys.add(k);
      out.layout.push(k);
      out.blocks.push({ key: k, title, ...(note ? { note } : {}) });
      if (tag === 'PortfolioSection') {
        const variant = attrStr(b, 'variant');
        const data = portfolioData.PORTFOLIO[variant];
        out.defaults[k] = { heading: 'Our **Portfolio**', intro: 'Take a look at some of our completed projects.', tabs: data.tabs.map((t) => ({ visible: true, label: t.label, items: t.items.map((it) => ({ visible: true, image: it.image, label: it.label, href: it.href ?? '' })) })) };
        out.sections.push({ key: k, title: 'Portfolio', description: 'Portfolio tabs and project images.', special: 'portfolio' });
        out.code.push({ key: k, kind: 'portfolio', jsx: src.slice(b.start, b.end), variant });
      } else out.code.push({ key: k, kind: 'static', jsx: dedent(src.slice(b.start, b.end), src, b.start) });
      return;
    }
    const scope = new Scope('c', 0, src);
    walk(b, scope, { edit: true });
    const firstHeading = scope.schema.find((f) => (f.role === 'heading' || f.role === 'title') && f.type !== 'list') ?? scope.schema.find((f) => f.type === 'text' || f.type === 'textarea');
    if (scope.schema.length === 0) {
      // nothing editable in this block (purely decorative): keep it exactly as is
      const k0 = `static-${idx + 1}`;
      usedKeys.add(k0);
      out.layout.push(k0);
      out.blocks.push({ key: k0, title: `Decorative block ${idx + 1}`, note: 'No editable content.' });
      out.code.push({ key: k0, kind: 'static', jsx: dedent(src.slice(b.start, b.end), src, b.start) });
      return;
    }
    const readable = (t) => t.replace(/\*\*/g, ' ').replace(/\s+/g, ' ').trim();
    const title = idx === 0 ? 'Hero' : clip(readable(firstHeading?.default ?? `Section ${idx + 1}`), 48);
    let key = idx === 0 ? 'hero' : slug(readable(title)).split('-').slice(0, 5).join('-').slice(0, 36).replace(/-+$/, '') || `section-${idx + 1}`;
    while (usedKeys.has(key)) key += '-2';
    usedKeys.add(key);
    out.layout.push(key);
    out.blocks.push({ key, title, ...(idx === 0 ? { locked: true } : {}) });
    out.defaults[key] = scope.values;
    out.sections.push({ key, title, description: idx === 0 ? 'The banner at the top of the page.' : 'Texts, links and images of this section.', schema: scope.schema });
    const jsx = dedent(applyEdits(src.slice(b.start, b.end), b.start, scope.edits), src, b.start);
    out.usesFragment = out.usesFragment || scope.usesFragment || /<Fragment/.test(jsx);
    out.code.push({ key, kind: 'content', jsx });
  });
  results.push({ file, pageSlug, pageTitle, name, imports, ...out });
}

// ------------------------------------------------------------------ emit schema json
const limitsFor = (f) => {
  const len = String(f.default ?? '').length;
  if (f.type === 'textarea') return { max: Math.min(Math.max(800, len * 2), 6000) };
  if (f.type === 'text') return { max: Math.min(Math.max(160, len * 2), 400) };
  return {};
};

const toField = (f, inList = false) => {
  if (f.type === 'list') {
    return {
      key: f.key,
      type: 'list',
      label: 'Repeated items',
      help: `Repeated block (originally ${f.count} items, e.g. “${clip(String(f.sample ?? ''), 50)}”). Each item can be edited, hidden, removed or reordered.`,
      maxItems: Math.min(Math.max(f.count * 2, f.count + 4), 30),
      itemLabel: f.itemLabel,
      itemNoun: 'item',
      fields: [{ key: 'visible', type: 'boolean', label: 'Show this item', default: true }, ...f.nested.map((nf) => toField(nf, true))],
    };
  }
  const base = { key: f.key, type: f.type === 'image' ? 'image' : f.type === 'url' && f.role === 'image' ? 'url' : f.type, label: f.label };
  // inside a repeated list the first item decides the schema, so alt text / links must stay optional (items may differ)
  const optional = f.optional || (f.type === 'text' && f.default === '') || (inList && f.role === 'imageAlt');
  const field = { ...base, ...limitsFor(f) };
  if (f.type === 'url') field.required = !inList && String(f.default) !== '';
  if (f.type === 'image') field.required = true;
  else if (!optional && (f.type === 'text' || f.type === 'textarea')) field.required = true;
  const original = f.type === 'image' || f.type === 'url' ? String(f.default) : `“${clip(String(f.default), 70)}”`;
  field.help = f.role === 'imageAlt' ? (optional ? 'Leave empty for a decorative image.' : `Describe the image. Original: ${original}`) : `Original: ${original}`;
  if (f.role === 'heading' || f.role === 'title') field.help += ' Put the blue word between **double asterisks**.';
  return field;
};

const PORTFOLIO_FIELDS = [
  { key: 'heading', type: 'text', label: 'Heading', required: true, max: 120, help: 'Put the blue word between **double asterisks**.' },
  { key: 'intro', type: 'textarea', label: 'Introduction', required: true, max: 400 },
  { key: 'tabs', type: 'list', label: 'Tabs', maxItems: 3, required: true, itemLabel: 'label', itemNoun: 'tab', help: 'The page design has three tabs.', fields: [
    { key: 'visible', type: 'boolean', label: 'Show this tab', default: true },
    { key: 'label', type: 'text', label: 'Tab name', required: true, max: 40 },
    { key: 'items', type: 'list', label: 'Projects', maxItems: 12, itemLabel: 'label', itemNoun: 'project', fields: [
      { key: 'visible', type: 'boolean', label: 'Show this project', default: true },
      { key: 'image', type: 'image', label: 'Project image', required: true },
      { key: 'label', type: 'text', label: 'Project name (also the image description)', required: true, max: 80 },
      { key: 'href', type: 'url', label: 'Link (optional)' },
    ] },
  ] },
];

const json = { pages: {} };
for (const r of results) {
  json.pages[r.pageSlug] = {
    blocks: r.blocks,
    layout: r.layout,
    sections: r.sections.map((s) => ({
      key: s.key,
      title: s.title,
      description: s.description,
      fields: s.special === 'portfolio' ? PORTFOLIO_FIELDS : s.schema.map(toField),
    })),
    defaults: r.defaults,
  };
}
fs.writeFileSync(path.join(root, 'server/src/cms/servicePages.json'), JSON.stringify(json, null, 1) + '\n');

// ------------------------------------------------------------------ emit client files
fs.mkdirSync(path.join(root, 'client/src/content/service'), { recursive: true });
let fieldCount = 0;
for (const r of results) {
  fs.writeFileSync(
    path.join(root, `client/src/content/service/${r.pageSlug}.js`),
    `// Built-in content of the ${r.pageTitle} page (generated from the original page; edit via the CMS, not here).\n// \`**word**\` marks the blue accent word. Used whenever the CMS has nothing published or the API is unavailable.\nexport const DEFAULTS = ${JSON.stringify(r.defaults, null, 2)};\n\nexport const LAYOUT = ${JSON.stringify(r.layout)};\n`
  );
  const uses = (n) => r.code.some((c) => c.jsx.includes(n));
  const blocksCode = r.code
    .map((c) => {
      const fn = `Block${c.key.replace(/(^|-)([a-z0-9])/g, (_, __, ch) => ch.toUpperCase())}`;
      c.fn = fn;
      if (c.kind === 'static') return null;
      if (c.kind === 'portfolio') return null;
      return `function ${fn}() {\n  const c = useSection(PAGE, '${c.key}', DEFAULTS['${c.key}']);\n  return (\n${c.jsx.replace(/^/gm, '    ')}\n  );\n}\n`;
    })
    .filter(Boolean)
    .join('\n');
  const blockMap = r.code
    .map((c) => {
      if (c.kind === 'static') return `  ${JSON.stringify(c.key)}: ${c.jsx},`;
      if (c.kind === 'portfolio') return `  ${JSON.stringify(c.key)}: <PortfolioSection variant=${JSON.stringify(c.variant)} page={PAGE} fallback={DEFAULTS[${JSON.stringify(c.key)}]} />,`;
      return `  ${JSON.stringify(c.key)}: <${c.fn} />,`;
    })
    .join('\n');
  const needFragment = true;
  const page = `${r.imports.replace(/^import \{ Link \} from 'react-router-dom';\n?/m, "import { Link } from 'react-router-dom';\n")}
import { Fragment } from 'react';
import Accent from '../content/Accent';
import { useLayout, useSection } from '../content/SiteContent';
import { DEFAULTS, LAYOUT } from '../content/service/${r.pageSlug}';

// Markup, classes and animations of every section are unchanged; only texts, links and images come from the CMS
// (built-in content: content/service/${r.pageSlug}.js, used whenever nothing is published or the API is unavailable).
const PAGE = '${r.pageSlug}';

${blocksCode}
const BLOCKS = {
${blockMap}
};

export default function ${r.name}() {
  const layout = useLayout(PAGE, LAYOUT);
  return (
    <>
      {layout
        .filter((block) => block.visible !== false && BLOCKS[block.key])
        .map((block) => (
          <Fragment key={block.key}>{BLOCKS[block.key]}</Fragment>
        ))}
    </>
  );
}
`;
  fs.writeFileSync(path.join(root, `client/src/pages/${r.file}.jsx`), page);
  const n = r.sections.reduce((a, s) => a + (s.schema ? s.schema.length : 0), 0);
  fieldCount += n;
  console.log(r.pageSlug.padEnd(28), 'blocks', String(r.blocks.length).padStart(2), 'sections', String(r.sections.length).padStart(2), 'top-level fields', String(n).padStart(3), r.layout.join(','));
}
console.log('total top-level fields', fieldCount);
