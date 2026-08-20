import type { MetadataRoute } from "next";
import {
  SITE_DESCRIPTION_MN,
  SITE_NAME,
  SITE_TAGLINE_MN,
} from "@/lib/site";

/**
 * PWA манифест. Ор дэргэд утсаа "нүүр дэлгэц рүү нэмэх"-ээр суулгасан
 * эмчид апп шиг нээгдэнэ — хөтчийн хаягийн мөргүй, шууд тооцоолуур.
 *
 * `force-static` нь ЗААВАЛ: `output: "export"` горимд метадата маршрут
 * динамик байж болохгүй (next.config.ts-ийг үз).
 *
 * Дүрс нь гурав: `any` хоёр хэмжээ + `maskable` нэг. Maskable нь
 * тусдаа файл байх ёстой — Android өөрийн хэлбэрээр (тойрог, squircle)
 * тайрдаг тул тэмдгийг дунд нь 80%-ийн аюулгүй бүсэд багтаасан.
 */
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — ${SITE_TAGLINE_MN}`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION_MN,
    lang: "mn",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f8f8",
    theme_color: "#006c79",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
