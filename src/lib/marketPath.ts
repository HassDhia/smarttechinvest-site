import fs from "fs/promises";
import path from "path";

function sanitizeHtml(raw: string) {
  let html = raw.replace(/<style[\s\S]*?<\/style>/gi, "");
  html = html.replace(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi, "");

  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) {
    html = mainMatch[1];
  } else {
    html = html.replace(/<!DOCTYPE[\s\S]*?<body[^>]*>/i, "");
    html = html.replace(/<\/body>\s*<\/html>\s*$/i, "");
  }

  return html.trim();
}

export async function loadSanitizedMarketPathHtml(date: string) {
  const htmlPath = path.join(
    process.cwd(),
    "public",
    "intelligence",
    "briefs",
    date,
    "market_path_report.html"
  );
  const raw = await fs.readFile(htmlPath, "utf8");
  return sanitizeHtml(raw);
}
