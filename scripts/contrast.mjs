/*
 * Өнгөний ялгарлыг WCAG-аар хэмжих хэрэгсэл.
 *
 * Шинэ өнгө нэмэхийн ӨМНӨ энийг ажиллуулна:
 *   node scripts/contrast.mjs
 *
 * Light ба Dark ХОЁУЛАНГ нь шалгана. Аль нэг нь унавал exit code 1.
 * oklch → sRGB хөрвүүлэлт нь CSS Color 4 тодорхойлолтын дагуу.
 */

const toRgb = ([L, C, H]) => {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const lin = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  const gamma = (x) =>
    x <= 0.0031308 ? 12.92 * x : 1.055 * Math.max(x, 0) ** (1 / 2.4) - 0.055;
  return lin.map(gamma);
};

const luminance = (colour) => {
  const channel = (x) => {
    const v = Math.min(1, Math.max(0, x));
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  const [r, g, b] = toRgb(colour).map(channel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** Хоёр өнгөний WCAG харьцаа. Текстэд ≥4.5, тэмдэг/хүрээнд ≥3.0. */
export const contrast = (a, b) => {
  const x = luminance(a) + 0.05;
  const y = luminance(b) + 0.05;
  return Math.max(x, y) / Math.min(x, y);
};

export const hex = (colour) =>
  `#${toRgb(colour)
    .map((v) => Math.round(Math.min(1, Math.max(0, v)) * 255))
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("")}`;

/* globals.css-ийн :root утгууд. Тэнд өөрчилбөл ЭНД ч өөрчилнө. */
export const LIGHT = {
  background: [0.976, 0.004, 197],
  foreground: [0.205, 0.021, 235],
  card: [1, 0, 0],
  primary: [0.48, 0.098, 207],
  primaryForeground: [0.995, 0.002, 197],
  mutedForeground: [0.505, 0.028, 225],
  secondaryForeground: [0.32, 0.03, 225],
  accentForeground: [0.42, 0.1, 207],
  destructive: [0.545, 0.196, 28],
  destructiveForeground: [0.995, 0.002, 197],
  destructiveMuted: [0.968, 0.018, 25],
  warning: [0.62, 0.135, 72],
  warningText: [0.5, 0.115, 68],
  warningForeground: [0.205, 0.021, 235],
  warningMuted: [0.968, 0.032, 88],
  success: [0.55, 0.13, 158],
  successText: [0.46, 0.11, 158],
  successMuted: [0.965, 0.035, 160],
  border: [0.912, 0.008, 205],
  input: [0.64, 0.018, 207],
  ring: [0.55, 0.11, 207],
  evidenceA: [0.55, 0.13, 158],
  evidenceB: [0.48, 0.098, 207],
  evidenceC: [0.6, 0.095, 232],
  evidenceD: [0.6, 0.012, 240],
  evidenceE: [0.62, 0.135, 72],
};

/* globals.css-ийн .dark утгууд. */
export const DARK = {
  background: [0.19, 0.014, 220],
  foreground: [0.955, 0.006, 200],
  card: [0.235, 0.016, 222],
  primary: [0.74, 0.09, 200],
  primaryForeground: [0.18, 0.02, 220],
  mutedForeground: [0.735, 0.02, 215],
  secondaryForeground: [0.9, 0.008, 210],
  accentForeground: [0.82, 0.075, 205],
  destructive: [0.7, 0.155, 25],
  destructiveForeground: [0.17, 0.02, 25],
  destructiveMuted: [0.31, 0.055, 25],
  warning: [0.8, 0.12, 80],
  warningText: [0.84, 0.11, 82],
  warningForeground: [0.18, 0.02, 80],
  warningMuted: [0.32, 0.05, 80],
  success: [0.74, 0.12, 158],
  successText: [0.78, 0.11, 158],
  successMuted: [0.3, 0.05, 160],
  border: [0.345, 0.018, 220],
  input: [0.53, 0.02, 220],
  ring: [0.72, 0.1, 205],
  evidenceA: [0.74, 0.12, 158],
  evidenceB: [0.74, 0.09, 200],
  evidenceC: [0.75, 0.085, 232],
  evidenceD: [0.7, 0.012, 240],
  evidenceE: [0.8, 0.12, 80],
};

/* Бичвэрийн шалгалт — ≥4.5. Унавал build зогсоно. */
const TEXT = [
  ["foreground / background", "foreground", "background"],
  ["foreground / card", "foreground", "card"],
  ["mutedForeground / card", "mutedForeground", "card"],
  ["secondaryForeground / card", "secondaryForeground", "card"],
  ["accentForeground / card", "accentForeground", "card"],
  ["primary / card", "primary", "card"],
  ["primaryForeground / primary", "primaryForeground", "primary"],
  ["destructive / card", "destructive", "card"],
  ["destructiveForeground / destructive", "destructiveForeground", "destructive"],
  ["destructive / destructiveMuted", "destructive", "destructiveMuted"],
  ["warningText / card", "warningText", "card"],
  ["warningText / warningMuted", "warningText", "warningMuted"],
  ["warningForeground / warning", "warningForeground", "warning"],
  ["successText / card", "successText", "card"],
  ["successText / successMuted", "successText", "successMuted"],
];

/*
 * Зөвхөн ТЭМДЭГ/цэгэнд хэрэглэх өнгө — ≥3.0.
 *
 * evidence C/D/E нь Light дээр 3.7–3.9 бөгөөд бичвэрт ХЭРЭГЛЭХГҮЙ.
 * Түвшний үсэг нь --muted-foreground-оор бичигдэж, өнгө нь зөвхөн
 * цэгэнд үлдэнэ. Энэ дүрмийг зөрчвөл өнгө ялгах чадваргүй эмчид
 * мэдээлэл алдагдана.
 */
const GLYPH = [
  ["warning / card (зөвхөн тэмдэг)", "warning", "card"],
  ["success / card (зөвхөн тэмдэг)", "success", "card"],
  ["ring / card (фокусын цагираг)", "ring", "card"],
  ["evidenceA / card (зөвхөн цэг)", "evidenceA", "card"],
  ["evidenceB / card (зөвхөн цэг)", "evidenceB", "card"],
  ["evidenceC / card (зөвхөн цэг)", "evidenceC", "card"],
  ["evidenceD / card (зөвхөн цэг)", "evidenceD", "card"],
  ["evidenceE / card (зөвхөн цэг)", "evidenceE", "card"],
  ["input / card (WCAG 1.4.11)", "input", "card"],
  ["input / background (WCAG 1.4.11)", "input", "background"],
];

/*
 * --border нь ЧИМЭГЛЭЛИЙН шугам — карт, тусгаарлагч. Мэдээлэл дамжуулдаггүй
 * тул WCAG 1.4.11 хамаарахгүй; хэмжилтийг мэдээлэл болгон хэвлэнэ.
 *
 * --input нь эсрэгээр GLYPH жагсаалтад ЗААВАЛ шалгагдана: оролтын талбайг
 * таних цорын ганц заагч учир 3:1 нь хатуу шаардлага.
 */
const ADVISORY = [
  ["border / card (чимэглэл, мэдээлэл)", "border", "card"],
];

const line = (tokens, [label, a, b], min) => {
  const value = contrast(tokens[a], tokens[b]);
  const mark = value >= min ? "✓" : "✗";
  return { text: `${mark} ${label.padEnd(38)} ${value.toFixed(2)}  (≥${min})`, ok: value >= min };
};

const runMode = (name, tokens) => {
  console.log(`\n──────── ${name} ────────`);
  const results = [
    ...TEXT.map((c) => line(tokens, c, 4.5)),
    ...GLYPH.map((c) => line(tokens, c, 3)),
  ];
  results.forEach((r) => console.log(r.text));
  console.log("  зөвлөмж (build зогсоохгүй):");
  ADVISORY.map((c) => line(tokens, c, 3)).forEach((r) => console.log(`  ${r.text}`));
  return results.every((r) => r.ok);
};

if (process.argv[1]?.endsWith("contrast.mjs")) {
  console.log("Light горимын утгууд:");
  for (const [name, value] of Object.entries(LIGHT)) {
    console.log(`  ${name.padEnd(24)} ${hex(value)}`);
  }
  const okLight = runMode("LIGHT", LIGHT);
  const okDark = runMode("DARK", DARK);
  if (!okLight || !okDark) process.exitCode = 1;
}
