import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, "../public/projects");

const WIDTH = 1280;
const HEIGHT = 800;

/** @type {{ slug: string; url: string; waitMs?: number }[]} */
const liveCaptures = [
  {
    slug: "support-ticketing",
    url: "https://cociligan.netlify.app/",
    waitMs: 2500,
  },
  {
    slug: "one-solutions-time",
    url: "https://time.onesolutions.net/",
    waitMs: 3000,
  },
  {
    slug: "help-bankruptcy",
    url: "https://help-bankruptcy.com/",
    waitMs: 3000,
  },
  {
    slug: "mcgary-cpa",
    url: "https://www.mcgary.biz/",
    waitMs: 3000,
  },
  {
    slug: "title-one",
    url: "https://title1inc.com/",
    waitMs: 3000,
  },
  {
    slug: "one-solutions",
    url: "https://onesolutions.net/",
    waitMs: 3000,
  },
  {
    slug: "mcgary-law",
    url: "https://www.mcgary.com/",
    waitMs: 3000,
  },
  {
    slug: "patel-law",
    url: "https://patellawva.com/",
    waitMs: 3000,
  },
];

/** GitHub-only repos — capture repo page as a stand-in until live demos exist. */
const githubCaptures = [
  {
    slug: "onesolutions-attendance",
    url: "https://github.com/makloy143/onesolutions-attendance",
  },
  {
    slug: "imcc-enrollment-system",
    url: "https://github.com/makloy143/imcc-enrollment-system",
  },
  {
    slug: "coc-attendance",
    url: "https://github.com/makloy143/COCAttendance",
  },
  {
    slug: "barcode-attendance",
    url: "https://github.com/makloy143/Barcode-Attendance-System",
  },
  {
    slug: "one-solutions-backend",
    url: "https://github.com/makloy143/one-solutions-backend",
  },
];

async function capturePage(page, { slug, url, waitMs = 2000 }) {
  console.log(`Capturing ${slug} ← ${url}`);
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(waitMs);

  const filePath = path.join(outputDir, `${slug}.png`);
  await page.screenshot({
    path: filePath,
    clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
    type: "png",
  });
  console.log(`  ✓ ${filePath}`);
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
    colorScheme: "light",
  });
  const page = await context.newPage();

  for (const capture of liveCaptures) {
    try {
      await capturePage(page, capture);
    } catch (error) {
      console.error(`  ✗ Failed ${capture.slug}:`, error.message);
    }
  }

  for (const capture of githubCaptures) {
    try {
      await capturePage(page, { ...capture, waitMs: 2500 });
    } catch (error) {
      console.error(`  ✗ Failed ${capture.slug}:`, error.message);
    }
  }

  await browser.close();
  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
