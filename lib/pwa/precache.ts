/**
 * Service worker-ийн урьдчилан кэшлэх жагсаалт — `out/`-ийн файлуудаас.
 *
 * Build-ийн дараа `scripts/build-sw.ts` дуудна. Цэвэр функц тул тесттэй:
 * аль файл кэшлэгдэх, ямар URL-аар — алдаа гарвал offline үед хуудас
 * нээгдэхгүй, эсвэл `cache.addAll` 404 дээр бүхэлдээ унана.
 */

/**
 * Offline-д хэрэггүй: мөлхөгч, сошиал, host-ийн тохиргоо, SW өөрөө.
 *
 * Эм бүрийн SEO хуудас (`/dose/<slug>`) ч ЭНД: HTML бүр ~200KB, 50 эм
 * нийлээд ~10MB — сумын сүлжээнд анхны ачаалалт хэт хүнд. `/dose`
 * тооцоолуур 50 эмийг бүгдийг агуулдаг тул offline-д гол хэрэгсэл бүтэн
 * ажиллана; эмийн хуудас нь зочилсон үед SW-ийн network-first кэшлэнэ.
 */
const EXCLUDED = [
  /^dose\/[^/]+(\.html|\.txt|\/)/,
  /^robots\.txt$/,
  /^sitemap\.xml$/,
  /^opengraph-image/,
  /^_headers$/,
  /^_redirects$/,
  /^sw\.js$/,
  /^brand\//,
];

/** Offline-д хэрэгтэй: хуудас, RSC payload (client шилжилт), static asset, дүрс. */
const INCLUDED = [/\.html$/, /\.txt$/, /^_next\/static\//, /^icon/, /^manifest\.webmanifest$/];

const matchesAny = (patterns: readonly RegExp[], file: string): boolean =>
  patterns.some((pattern) => pattern.test(file));

/** `out/`-тэй харьцангуй зам (`/`-ээр). */
export const isPrecached = (file: string): boolean =>
  matchesAny(INCLUDED, file) && !matchesAny(EXCLUDED, file);

/**
 * Файлын замаас хүсэлтийн URL. Cloudflare Pages `.html`-гүй «цэвэр» URL-аар
 * үйлчилдэг (`/dose.html` → `/dose` руу redirect) тул HTML-ийг цэвэр
 * хэлбэрээр кэшлэнэ — redirect хариуг кэшлэвэл offline-д ажиллахгүй.
 */
export const urlOf = (file: string): string => {
  if (file === "index.html") return "/";
  const path = file.endsWith(".html") ? file.slice(0, -".html".length) : file;
  return encodeURI(`/${path.replace(/\/index$/, "")}`);
};

/** Эрэмбэлсэн, давхардалгүй URL-ууд — build бүрд ижил оролтод ижил гаралт. */
export const precacheUrls = (files: readonly string[]): readonly string[] =>
  [...new Set(files.filter(isPrecached).map(urlOf))].sort();
