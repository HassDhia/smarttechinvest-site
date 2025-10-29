// This script is now primarily used for backfilling missing PDFs
// Normal workflow: PDFs are automatically generated during ingestion
// Use this script only if:
// - You need to regenerate PDFs after HTML changes
// - You have old briefs without PDFs
// - PDF generation failed during ingestion

import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = 'public/intelligence/briefs';

const run = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  for (const date of fs.readdirSync(ROOT)) {
    const dir = path.join(ROOT, date);
    const html = path.join(dir, 'report.html');
    const pdf = path.join(dir, 'brief.pdf');
    
    if (!fs.existsSync(html) || fs.existsSync(pdf)) continue;
    
    // For static hosting, file:// works because your HTML is self-contained with print CSS
    await page.goto(`file://${path.resolve(html)}`, { waitUntil: 'load' });
    await page.pdf({ 
      path: pdf, 
      format: 'Letter', 
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      }
    });
    console.log('Rendered', pdf);
  }
  
  await browser.close();
};

run().catch(console.error);
