import type { Metadata } from "next";

/**
 * Хуудас бүрийн canonical + og:url.
 *
 * ⚠️ ЯАГААД ХУУДАС БҮРД ВЭ: root layout-д `alternates.canonical` бичвэл
 * бүх хуудас түүнийг ӨВЛӨНӨ. Тэгэхээр /dose ба /burns хоёр «би нүүр
 * хуудасны хуулбар» гэж зарлаж, Google тэднийг индексээс хасна.
 * Бүтээгдэхүүний бүх үнэ цэн яг тэр хоёр хуудсанд байгаа.
 *
 * `metadataBase` нь layout-д тодорхойлогдсон тул харьцангуй зам хангалттай.
 */
export const pageMeta = (path: string): Metadata => ({
  alternates: { canonical: path },
  openGraph: { url: path },
});
