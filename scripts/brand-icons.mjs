#!/usr/bin/env node
/**
 * public/brand/mark.svg-ээс (Figma "Concept A — Дусал + хэмжээс / Solid")
 * apple-icon.png болон PWA манифестийн дүрсүүдийг үүсгэнэ:
 *
 *   node scripts/brand-icons.mjs
 *
 * Шаардлага: sharp. Гараар, mark.svg өөрчлөгдвөл л ажиллуулна —
 * build-д ОРОХГҮЙ (og-image.py-тай ижил зарчим).
 *
 * ⚠️ Figma-ийн "App icon" концепт (radius-24 дугуйрсан тил дэвсгэр +
 * цагаан inverse дусал) ЭНД АШИГЛААГҮЙ. Үүний оронд цэвэр Solid
 * тэмдгийг өөрийг нь квадрат хуудсан дээр голлуулж байрлуулна —
 * apple-icon/maskable-д л опак дэвсгэр (paper) нэмнэ, учир нь эдгээр
 * формат тунгалаг байдлыг дэмждэггүй/дэмжвэл муу харагддаг.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(fileURLToPath(import.meta.url), "..", "..");
const MARK_PATH = path.join(ROOT, "public", "brand", "mark.svg");

const PAPER = "#f4f8f8";

const MARK_INNER = readFileSync(MARK_PATH, "utf8")
  .replace(/<\?xml[^>]*\?>/, "")
  .replace(/<svg[^>]*>/, "")
  .replace(/<\/svg>\s*$/, "")
  .trim();

/**
 * Тэмдгийг `scale` (0–1) хэмжээгээр багасгаж, 96×96 canvas дотор
 * голлуулна. Маскабль дүрсэнд аюулгүй бүсэд багтаах шаардлагатай.
 */
const wrapped = (scale) => {
  const offset = (96 - 96 * scale) / 2;
  return `<g transform="translate(${offset} ${offset}) scale(${scale})">${MARK_INNER}</g>`;
};

const svg = ({ size, background, scale }) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 96 96">
${background ? `<rect width="96" height="96" fill="${background}"/>` : ""}
${wrapped(scale)}
</svg>`;

const targets = [
  // Apple зөвхөн опак дүрс хүлээж авдаг — тунгалаг бол хар дэвсгэрээр дүүргэдэг.
  { out: "app/apple-icon.png", size: 180, background: PAPER, scale: 0.86 },
  // purpose:"any" — тунгалаг, OS дэвсгэрээ өөрөө харуулна.
  { out: "public/icon-192.png", size: 192, background: null, scale: 0.86 },
  { out: "public/icon-512.png", size: 512, background: null, scale: 0.86 },
  // purpose:"maskable" — OS дугуй/squircle-ээр тайрдаг тул 80%
  // аюулгүй бүсэд багтаах ёстой (opaque дэвсгэртэй).
  { out: "public/icon-maskable-512.png", size: 512, background: PAPER, scale: 0.62 },
];

for (const t of targets) {
  const out = path.join(ROOT, t.out);
  await sharp(Buffer.from(svg(t)), { density: (t.size / 96) * 72 })
    .resize(t.size, t.size)
    .png()
    .toFile(out);
  console.log(`✓ ${t.out} (${t.size}×${t.size})`);
}
