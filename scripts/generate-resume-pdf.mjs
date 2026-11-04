/**
 * Renders /resume to public/resume.pdf so the downloadable PDF always matches lib/data.ts.
 *
 * Usage: start the app (npm run dev or npm start), then
 *   npm run resume:pdf                 # defaults to http://localhost:3001
 *   RESUME_URL=http://localhost:3000/resume npm run resume:pdf
 *
 * Uses installed Google Chrome, falling back to Playwright's Chromium.
 */
import { chromium } from "playwright-core";
import { fileURLToPath } from "node:url";
import path from "node:path";

const url = process.env.RESUME_URL ?? "http://localhost:3001/resume";
const out = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "resume.pdf");

async function launch() {
  try {
    return await chromium.launch({ channel: "chrome" });
  } catch {
    return await chromium.launch();
  }
}

const browser = await launch();
try {
  const page = await browser.newPage();
  await page.emulateMedia({ colorScheme: "light", media: "print" });
  const res = await page.goto(url, { waitUntil: "networkidle" });
  if (!res?.ok()) throw new Error(`Failed to load ${url} (${res?.status()})`);
  await page.pdf({ path: out, format: "Letter", printBackground: true, preferCSSPageSize: true });
  console.log(`Wrote ${out}`);
} finally {
  await browser.close();
}
