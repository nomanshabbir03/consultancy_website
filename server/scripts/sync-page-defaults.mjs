// Writes server/src/cms/pageDefaults.json from the client's built-in page content (the single place it is authored).
//   npm run cms:sync --prefix server
import fs from 'node:fs';
import { PAGE_DEFAULTS, PAGE_LAYOUTS } from '../../client/src/content/pageDefaults.js';

const target = new URL('../src/cms/pageDefaults.json', import.meta.url);
fs.writeFileSync(target, JSON.stringify({ pages: PAGE_DEFAULTS, layouts: PAGE_LAYOUTS }, null, 2) + '\n');
console.log('Wrote', target.pathname);
