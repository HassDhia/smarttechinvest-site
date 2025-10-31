// This script is now primarily used for backfilling missing PDFs
// Normal workflow: PDFs are automatically generated during ingestion
// Use this script only if:
// - You need to regenerate PDFs after HTML changes
// - You have old briefs without PDFs
// - PDF generation failed during ingestion
//
// Usage: node scripts/render-pdfs.mjs [--force]
//   --force: Regenerate PDFs even if they already exist

import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = 'public/intelligence/briefs';
const forceRegenerate = process.argv.includes('--force');

const run = async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  for (const date of fs.readdirSync(ROOT)) {
    const dir = path.join(ROOT, date);
    if (!fs.statSync(dir).isDirectory()) continue;
    
    const html = path.join(dir, 'report.html');
    const pdf = path.join(dir, 'brief.pdf');
    
    if (!fs.existsSync(html)) continue;
    if (fs.existsSync(pdf) && !forceRegenerate) {
      console.log(`⏭️  Skipping ${date} - PDF already exists (use --force to regenerate)`);
      continue;
    }
    
    try {
      console.log(`📄 Generating PDF for ${date}...`);
      
      // Load the HTML and wait for images
      await page.goto(`file://${path.resolve(html)}`, { waitUntil: 'networkidle' });
      
      // Explicitly wait for all images to load
      await page.waitForLoadState('networkidle');
      
      // Additional safety: wait for all img elements to have loaded
      try {
        await page.evaluate(() => {
          return Promise.all(
            Array.from(document.images).map(img => {
              if (img.complete) return Promise.resolve();
              return new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = () => resolve(); // Continue even if image fails to load
                // Timeout after 5 seconds per image
                setTimeout(() => resolve(), 5000);
              });
            })
          );
        });
      } catch (imgError) {
        console.warn(`⚠️  Some images may not have loaded for ${date}: ${imgError.message}`);
      }
      
      // Small delay to ensure all rendering is complete
      await page.waitForTimeout(500);
      
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
      
      console.log(`✅ Rendered ${pdf}`);
    } catch (error) {
      console.error(`❌ Failed to generate PDF for ${date}: ${error.message}`);
    }
  }
  
  await browser.close();
  console.log('✅ PDF generation complete');
};

run().catch(console.error);
