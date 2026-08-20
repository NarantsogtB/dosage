import type { NextConfig } from "next";

/**
 * СТАТИК ЭКСПОРТ.
 *
 * Бүх маршрут аль хэдийн prerender хийгддэг: SSR, middleware, route
 * handler, server action — нэг нь ч байхгүй. Тиймээс `out/` фолдер
 * бүтэн сайт болно.
 *
 * Үр дагавар: Vercel, Cloudflare, эсвэл ердийн статик сервер — хаана
 * ч байрлуулна. OpenNext зэрэг adapter ХЭРЭГГҮЙ; тэдгээр нь SSR-ыг
 * workerd дээр ажиллуулахад зориулагдсан бөгөөд бидэнд SSR байхгүй.
 *
 * ⚠️ ЭНЭ ТОХИРГООНООС ХЭЗЭЭ ГАРАХ ВЭ:
 * Roadmap-ийн V6 (хэрэглэгчийн бүртгэл, тооцооллын түүх) эсвэл
 * V7 (admin panel) ирэхэд сервер шаардлагатай болно. Тэр мөчид
 * `output` мөрийг устгаж, host-оо дахин сонгоно.
 *
 * `next start` энэ горимд ажиллахгүй — `out/`-г статик сервер
 * (жишээ нь `bunx serve out`) -ээр үзнэ. `next dev` хэвийн.
 */
const nextConfig: NextConfig = {
  output: "export",

  /*
   * Одоогоор next/image хэрэглэдэггүй. Гэхдээ хэн нэгэн <Image>
   * нэмбэл статик экспорт дээр build унана — энэ мөр тэр мөчид
   * ойлгомжгүй алдааны оронд ажиллах зан үйл өгнө.
   */
  images: { unoptimized: true },
};

export default nextConfig;
