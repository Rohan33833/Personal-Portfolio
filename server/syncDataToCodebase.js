import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE = path.join(__dirname, 'data', 'db.json');
const TARGET_FILE = path.join(__dirname, '..', 'src', 'data', 'portfolioData.js');

export function syncDbToCodebase() {
  if (!fs.existsSync(DB_FILE)) {
    console.warn('[SYNC] db.json not found, skipping sync.');
    return;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    const data = JSON.parse(raw);

    const fileContent = `// Rohan Prajapati — Portfolio Central Data Store (Auto-synchronized with CMS)

const BASE = import.meta.env.BASE_URL;

export const PORTFOLIO_DATA = ${JSON.stringify(data, null, 2).replace(/"BASE_URL\/(.*?)"/g, '`${BASE}$1`')};
`;

    fs.writeFileSync(TARGET_FILE, fileContent, 'utf8');
    console.log('[SYNC] Successfully synchronized db.json to src/data/portfolioData.js');
  } catch (err) {
    console.error('[SYNC ERROR] Failed to sync data:', err);
  }
}

// If run directly via node
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  syncDbToCodebase();
}
