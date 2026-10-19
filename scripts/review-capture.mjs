#!/usr/bin/env node
// Screenshot capture for the portfolio review team (.claude/agents).
// Requires the dev server to be running (`npm run dev`).
//
// Usage:
//   node scripts/review-capture.mjs                         # home, desktop + mobile
//   node scripts/review-capture.mjs --pages /,/work/shopcpr
//   node scripts/review-capture.mjs --section about         # clip one <section id="...">
//   node scripts/review-capture.mjs --reduced-motion
//   node scripts/review-capture.mjs --viewports mobile --base http://localhost:3001
//
// Output: .claude/team/screenshots/<page>__<section>__<viewport>[__rm].png
//         .claude/team/screenshots/console.json (console errors + failed requests)

import fs from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 834, height: 1112 },
  mobile: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }
};

function parseArgs(argv) {
  const args = {
    base: process.env.REVIEW_BASE_URL ?? "http://localhost:3000",
    pages: ["/"],
    viewports: ["desktop", "mobile"],
    section: null,
    reducedMotion: false,
    out: ".claude/team/screenshots"
  };
  for (let i = 0; i < argv.length; i++) {
    const key = argv[i];
    const value = argv[i + 1];
    if (key === "--base") args.base = value, i++;
    else if (key === "--pages") args.pages = value.split(",").map((p) => p.trim()), i++;
    else if (key === "--viewports") args.viewports = value.split(",").map((v) => v.trim()), i++;
    else if (key === "--section") args.section = value, i++;
    else if (key === "--out") args.out = value, i++;
    else if (key === "--reduced-motion") args.reducedMotion = true;
  }
  return args;
}

function slugify(pagePath) {
  return pagePath === "/" ? "home" : pagePath.replace(/^\/|\/$/g, "").replace(/[^a-z0-9]+/gi, "-");
}

// Scroll the full page so scroll-triggered animations (GSAP/Framer whileInView) reveal content.
async function revealScrollContent(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.75;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 800));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  try {
    await fetch(args.base, { signal: AbortSignal.timeout(5000) });
  } catch {
    console.error(`Cannot reach ${args.base}. Start the dev server with \`npm run dev\` (or pass --base).`);
    process.exit(1);
  }

  await fs.mkdir(args.out, { recursive: true });
  const browser = await puppeteer.launch({ headless: true });
  const issues = [];
  const written = [];

  try {
    for (const pagePath of args.pages) {
      for (const vpName of args.viewports) {
        const viewport = VIEWPORTS[vpName];
        if (!viewport) throw new Error(`Unknown viewport "${vpName}". Use: ${Object.keys(VIEWPORTS).join(", ")}`);

        const page = await browser.newPage();
        await page.setViewport(viewport);
        if (args.reducedMotion) {
          await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
        }
        page.on("console", (msg) => {
          if (msg.type() === "error") issues.push({ page: pagePath, viewport: vpName, type: "console", text: msg.text() });
        });
        page.on("requestfailed", (req) => {
          issues.push({ page: pagePath, viewport: vpName, type: "request", text: `${req.url()} ${req.failure()?.errorText}` });
        });

        await page.goto(new URL(pagePath, args.base).toString(), { waitUntil: "networkidle2", timeout: 60000 });
        await revealScrollContent(page);

        const name = [slugify(pagePath), args.section ?? "full", vpName, args.reducedMotion ? "rm" : null]
          .filter(Boolean)
          .join("__");
        const file = path.join(args.out, `${name}.png`);

        if (args.section) {
          const el = await page.$(`#${args.section}`);
          if (!el) {
            console.warn(`No #${args.section} on ${pagePath}; skipping.`);
            await page.close();
            continue;
          }
          await el.scrollIntoView();
          await new Promise((r) => setTimeout(r, 600));
          await el.screenshot({ path: file });
        } else {
          await page.screenshot({ path: file, fullPage: true });
        }
        written.push(file);
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }

  await fs.writeFile(path.join(args.out, "console.json"), JSON.stringify(issues, null, 2));
  console.log(written.join("\n"));
  console.log(`${issues.length} console/network issue(s) -> ${path.join(args.out, "console.json")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
