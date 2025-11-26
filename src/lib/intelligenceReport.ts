import fs from "node:fs/promises";
import path from "node:path";

function stripShell(raw: string) {
  let html = raw.replace(/<style[\s\S]*?<\/style>/gi, "");
  html = html.replace(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi, "");

  const mainMatch = raw.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) {
    html = mainMatch[1];
  } else {
    html = html.replace(/<!DOCTYPE[\s\S]*?<body[^>]*>/i, "");
    html = html.replace(/<\/body>\s*<\/html>\s*$/i, "");
  }

  return html.trim();
}

export async function loadIntelligenceReportHtml(date: string) {
  const file = path.join(
    process.cwd(),
    "public",
    "intelligence",
    "briefs",
    date,
    "report.html"
  );

  const raw = await fs.readFile(file, "utf8");
  const sanitized = stripShell(raw);

  return sanitized;
}
