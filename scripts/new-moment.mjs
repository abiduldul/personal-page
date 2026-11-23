// Create a new moment:  npm run new -- "First day at the lab"
// Optional date:        npm run new -- "First day at the lab" 2026-11-20
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const [title, dateArg] = process.argv.slice(2);
if (!title) {
  console.error('Usage: npm run new -- "Title of the moment" [YYYY-MM-DD]');
  process.exit(1);
}
const date = dateArg ?? new Date().toISOString().slice(0, 10);
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  console.error(`Date must look like 2026-11-20, got "${date}"`);
  process.exit(1);
}
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const dir = join('src/content/moments', `${date}-${slug}`);
if (existsSync(dir)) {
  console.error(`${dir} already exists`);
  process.exit(1);
}
mkdirSync(dir, { recursive: true });
writeFileSync(
  join(dir, 'index.md'),
  `---
title: ${JSON.stringify(title)}
date: ${date}
place: ""
summary: ""
tags: []
# album: mountains        # campus | coast | mountains | anything new -> becomes a photo row on the home page
# milestone: true         # also show in "How I got here" on the home page
# cover: ./photo-1.jpg
# photos:
#   - src: ./photo-1.jpg
#     alt: "Describe what is in the photo"
#     caption: "Short caption"
draft: false
---

Write what happened here.
`,
);
console.log(`Created ${dir}/index.md — put your photos in that same folder.`);
