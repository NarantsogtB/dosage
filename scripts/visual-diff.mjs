#!/usr/bin/env node
/**
 * V4 визуал шалгалт — кодын дэлгэцийг Figma-гийн лавлах зурагтай пиксел түвшинд харьцуулна.
 *
 *   bun run build && bun run visual            # бүгд
 *   bun run visual fluids-m emergency-d         # заасан дэлгэц
 *
 * Лавлах зураг: docs/design/v4/ref/<screen>.png (Figma-аас 1x экспорт — ГАРААР ӨӨРЧЛӨХГҮЙ).
 * Гаралт:       .visual/<screen>.actual.png, .visual/<screen>.diff.png, .visual/report.md
 *
 * Дүрэм (docs/design/v4/HANDOFF.md):
 *   - Ялгаатай пиксел ≤ MAX_DIFF (4%) байх ёстой. Давбал PR нээхгүй.
 *   - Босгыг өсгөх, лавлах зургийг солих, mask нэмэхийг зөвхөн хэрэглэгчийн зөвшөөрлөөр.
 *
 * Хамаарал: playwright (суусан), pngjs, pixelmatch → `bun add -d pngjs pixelmatch`.
 */
import { chromium } from "playwright";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import { createServer } from "node:http";
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const OUT_DIR = join(ROOT, "out");
const REF_DIR = join(ROOT, "docs/design/v4/ref");
const RESULT_DIR = join(ROOT, ".visual");
const PORT = 4399;
/**
 * 4% — тохируулсан (2026-11-09): Figma-тай нүдээр ижил fluids-m 3.9% гарсан нь Figma, Chromium
 * текстийг өөрөөр anti-alias хийдэгтэй холбоотой (глифийн ирмэг). Үүнээс доош шахахгүй;
 * харин `.diff.png`-г заавал нүдээр шалгана — улаан бүс текстийн ирмэгээс өөр бол алдаа.
 */
const MAX_DIFF = 0.04;
const THRESHOLD = 0.12; // pixelmatch өнгөний мэдрэмж (anti-aliasing-ийг үл тооно)

/** Бүх дэлгэцэд ижил өвчтөн — Figma-гийн өгөгдөлтэй яг адил. */
const PATIENTS = {
  patients: [
    { id: "p5", label: "Ор 5", form: { weight: "20", weightUnit: "kg", years: "5", months: "0" }, drugIds: [] },
    { id: "p7", label: "Ор 7", form: { weight: "60", weightUnit: "kg", years: "10", months: "0" }, drugIds: [] },
  ],
  activeId: "p5",
};

const clickRegion = async (page, name, times) => {
  for (let i = 0; i < times; i += 1) {
    await page.getByRole("button", { name: new RegExp(`^${name}`) }).first().click();
  }
};

const burnsSetup = async (page) => {
  await clickRegion(page, "Их бие — урд", 1); // II
  await clickRegion(page, "Баруун мөр", 1); // II
  await clickRegion(page, "Баруун шуу", 2); // III
  await page.getByLabel(/Өндөр/).first().fill("110"); // Гальвестоны карт бүс сонгосны дараа гарна
  await page.getByLabel(/Өндөр/).first().blur();
};

const fluidsSetup = async (page) => {
  await page.getByRole("button", { name: /^5$/ }).first().click(); // дутагдал 5%
};

/**
 * «Хэрхэн ашиглах» заавар (docs/design/v4/TOUR.md): давхарга `fixed` тул viewport-оор зурна,
 * `top: 0` — 4-р алхам толгойд тул frame-д толгой зурагдсан. «Дараах»-ыг дарж n-р алхамд хүрнэ.
 */
const tourSetup = (step) => async (page) => {
  await page.getByRole("dialog").waitFor();
  for (let i = 1; i < step; i += 1) await page.getByRole("button", { name: "Дараах" }).click();
};
const TOUR_SCREENS = Object.fromEntries(
  [1, 2, 3, 4, 5].flatMap((step) => [
    [`tour-m-${step}`, { top: 0, path: "/dose", w: 390, h: 844, radius: 40, tour: true, setup: tourSetup(step) }],
    [`tour-d-${step}`, { top: 0, path: "/dose", w: 1440, h: 900, radius: 16, tour: true, setup: tourSetup(step) }],
  ]),
);

/**
 * Figma frame ↔ route. Хоёр mask:
 *   radius — frame-ийн дугуй булан (mobile 40, desktop 16).
 *   top    — дээд зурвас: mobile 56px = Figma-д утасны status bar, кодод `SiteHeader`;
 *            desktop 84px = `SiteHeader` (9g-ийн хүрээ, энэ шалгалтад хамаарахгүй).
 */
const TOP = { m: 56, d: 84 };
const SCREENS = {
  "landing-m": { top: TOP.m, path: "/", w: 390, radius: 40 },
  "landing-d": { top: TOP.d, path: "/", w: 1440, radius: 16 },
  "burns-m": { top: TOP.m, path: "/burns", w: 390, radius: 40, setup: burnsSetup },
  "burns-d": { top: TOP.d, path: "/burns", w: 1440, radius: 16, setup: burnsSetup },
  "fluids-m": { top: TOP.m, path: "/fluids", w: 390, radius: 40, setup: fluidsSetup },
  "fluids-d": { top: TOP.d, path: "/fluids", w: 1440, radius: 16, setup: fluidsSetup },
  "emergency-m": { top: TOP.m, path: "/emergency", w: 390, radius: 40 },
  "emergency-d": { top: TOP.d, path: "/emergency", w: 1440, radius: 16 },
  ...TOUR_SCREENS,
};

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".json": "application/json", ".txt": "text/plain", ".ico": "image/x-icon", ".webmanifest": "application/manifest+json" };

const resolveFile = (url) => {
  const clean = decodeURIComponent(url.split("?")[0]);
  const base = join(OUT_DIR, clean);
  for (const candidate of [base, `${base}.html`, join(base, "index.html")]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
};

const serve = () =>
  new Promise((resolve) => {
    const server = createServer((req, res) => {
      const file = resolveFile(req.url ?? "/");
      if (!file) return res.writeHead(404).end();
      res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
      res.end(readFileSync(file));
    });
    server.listen(PORT, () => resolve(server));
  });

/** Figma frame-ийн дугуй булангийн гадна талыг хоёр зурагт ижил өнгөөр будна. */
const maskCorners = (png, radius, top = 0) => {
  const { width, height, data } = png;
  const outside = (x, y) => {
    if (y < top) return true;
    const cx = x < radius ? radius : x >= width - radius ? width - radius - 1 : null;
    const cy = y < radius ? radius : y >= height - radius ? height - radius - 1 : null;
    if (cx === null || cy === null) return false;
    return (x - cx) ** 2 + (y - cy) ** 2 > radius ** 2;
  };
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (!outside(x, y)) continue;
      const i = (y * width + x) * 4;
      data[i] = 255; data[i + 1] = 0; data[i + 2] = 255; data[i + 3] = 255;
    }
  }
};

const capture = async (browser, name, screen, height) => {
  const context = await browser.newContext({ viewport: { width: screen.w, height }, deviceScaleFactor: 1, colorScheme: "dark", reducedMotion: "reduce" });
  await context.addInitScript(({ state, tourScreen }) => {
    sessionStorage.setItem("dosage.patients.v2", JSON.stringify(state));
    // «Хэрхэн ашиглах» заавар Figma-тай харьцуулах зурагт гарахгүй.
    if (!tourScreen) localStorage.setItem("dosage.tour.v1", "done");
  }, { state: PATIENTS, tourScreen: Boolean(screen.tour) });
  const page = await context.newPage();
  await page.goto(`http://localhost:${PORT}${screen.path}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  page.setDefaultTimeout(4000);
  let setupError = null;
  if (screen.setup) {
    try {
      await screen.setup(page);
    } catch (error) {
      setupError = String(error.message ?? error).split("\n")[0];
    }
  }
  await page.waitForTimeout(300);
  const buffer = await page.screenshot({ fullPage: !screen.tour, animations: "disabled" });
  await context.close();
  return { png: PNG.sync.read(buffer), setupError };
};

/** Өндөр зөрвөл хоёуланг нь богиныхоор тайрна — өндрийн зөрүүг тусад нь мэдээлнэ. */
const crop = (png, width, height) => {
  const out = new PNG({ width, height });
  PNG.bitblt(png, out, 0, 0, width, height, 0, 0);
  return out;
};

const compare = async (browser, name) => {
  const screen = SCREENS[name];
  const ref = PNG.sync.read(readFileSync(join(REF_DIR, `${name}.png`)));
  const { png: actualFull, setupError } = await capture(browser, name, screen, ref.height);
  const height = Math.min(ref.height, actualFull.height);
  const a = crop(actualFull, ref.width, height);
  const r = crop(ref, ref.width, height);
  maskCorners(a, screen.radius, screen.top);
  maskCorners(r, screen.radius, screen.top);
  const diff = new PNG({ width: ref.width, height });
  const changed = pixelmatch(r.data, a.data, diff.data, ref.width, height, { threshold: THRESHOLD });
  writeFileSync(join(RESULT_DIR, `${name}.actual.png`), PNG.sync.write(actualFull));
  writeFileSync(join(RESULT_DIR, `${name}.diff.png`), PNG.sync.write(diff));
  const ratio = changed / (ref.width * height);
  const heightDelta = actualFull.height - ref.height;
  const ok = ratio <= MAX_DIFF && Math.abs(heightDelta) <= 8 && !setupError;
  return { name, ratio, heightDelta, ok, setupError };
};

const main = async () => {
  mkdirSync(RESULT_DIR, { recursive: true });
  if (!existsSync(OUT_DIR)) throw new Error("out/ алга — эхлээд `bun run build`.");
  const wanted = process.argv.slice(2);
  const names = wanted.length ? wanted : Object.keys(SCREENS);
  const server = await serve();
  const browser = await chromium.launch();
  const results = [];
  for (const name of names) results.push(await compare(browser, name));
  await browser.close();
  server.close();
  const rows = results.map((r) => `| ${r.ok ? "✅" : "❌"} | ${r.name} | ${(r.ratio * 100).toFixed(2)}% | ${r.heightDelta >= 0 ? "+" : ""}${r.heightDelta}px | ${r.setupError ?? ""} |`);
  const report = ["| | Дэлгэц | Ялгаа (≤4%) | Өндөр (±8px) | Setup алдаа |", "|---|---|---|---|---|", ...rows].join("\n");
  writeFileSync(join(RESULT_DIR, "report.md"), `${report}\n`);
  console.log(report);
  if (results.some((r) => !r.ok)) process.exit(1);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
