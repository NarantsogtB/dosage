import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** `output: "export"` үед статик файл болгож үүсгэхийг ил зарлана. */
export const dynamic = "force-static";

/**
 * robots.txt — build үед статик файл болж үүснэ.
 *
 * Бүх хуудсыг индексжүүлэхийг зөвшөөрнө: нуух зүйл байхгүй, харин
 * эмч нар Google-ээс олох нь энэ бүтээгдэхүүний гол суваг.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
