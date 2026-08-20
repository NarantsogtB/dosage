/**
 * Сайтын үндсэн тогтмолууд. ГАНЦ эх сурвалж.
 *
 * URL нь орчны хувьсагчаас уншигдана — preview байршуулалт өөрийн
 * хаягаа зөв зарлах боломжтой. Тодорхойлоогүй бол production домэйн.
 *
 * ⚠️ `output: "export"` үед энэ утга BUILD үед кодод шигдэнэ. Домэйн
 * солигдвол дахин build хийх шаардлагатай.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dosage.mn";

export const SITE_NAME = "dosage.mn";

export const SITE_TAGLINE_MN = "Монгол эмчийн эмнэлзүйн тооцоолуур";

export const SITE_DESCRIPTION_MN =
  "Хүүхдийн жинд суурилсан эмийн тун, түлэгдэлтийн шингэн сэлбэлтийг " +
  "эх сурвалж заасан хэлбэрээр тооцоолно. Эмнэлгийн мэргэжилтэнд зориулав.";

export interface SiteRoute {
  readonly path: string;
  /** Sitemap-ийн эрэмбэ. Танилцуулга 1.0, хэрэгслүүд 0.9. */
  readonly priority: number;
}

/**
 * Индексжүүлэх хуудсууд.
 *
 * `components/nav/routes.ts`-ээс ТУСДАА байрлана: тэр нь дүрс зурагтай
 * UI-ийн бүртгэл, энэ нь SEO-гийн бүртгэл. Хоёр зорилго, хоёр файл.
 */
export const SITE_ROUTES: readonly SiteRoute[] = [
  { path: "/", priority: 1 },
  { path: "/dose", priority: 0.9 },
  { path: "/burns", priority: 0.9 },
];
