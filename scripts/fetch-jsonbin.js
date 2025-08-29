// scripts/fetch-jsonbin.js
// Node 20+ has global fetch; no extra deps needed.

const fs = require('fs');
const path = require('path');

const BIN_ID = process.env.BIN_ID; // set in GitHub Secrets
const MASTER_KEY = process.env.JSONBIN_MASTER_KEY; // set in GitHub Secrets

if (!BIN_ID || !MASTER_KEY) {
console.error('Missing BIN_ID or JSONBIN_MASTER_KEY');
process.exit(1);
}

const url = https://api.jsonbin.io/v3/b/${BIN_ID}/latest;

async function main() {
console.log('Fetching JSONBin:', url.replace(MASTER_KEY, '***'));
const res = await fetch(url, {
headers: {
'X-Master-Key': MASTER_KEY,
'Content-Type': 'application/json'
}
});

if (!res.ok) {
const text = await res.text().catch(() => '');
throw new Error(JSONBin request failed: ${res.status} ${res.statusText} ${text});
}

const body = await res.json();
const arr = Array.isArray(body.record) ? body.record : [];

// Ensure data/ exists
const outDir = path.join(process.cwd(), 'data');
await fs.promises.mkdir(outDir, { recursive: true });

const outFile = path.join(outDir, 'listings.json');
await fs.promises.writeFile(outFile, JSON.stringify(arr, null, 2));
console.log(Wrote ${arr.length} records to ${outFile});
}

main().catch((err) => {
console.error(err);
process.exit(1);
});
