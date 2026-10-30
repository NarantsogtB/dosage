import type { MetadataRoute } from "next";
import { SITE_ROUTES, SITE_URL } from "@/lib/site";
import { DRUG_ROUTES } from "@/lib/drug-page/drug-routes";

/**
 * `output: "export"` үед ЗААВАЛ хэрэгтэй.
 *
 * Доорх `new Date()` нь Next-ийн нүдээр функцийг динамик болгодог тул
 * тэр нь build үед нэг л удаа ажиллахыг ил зарлана.
 */
export const dynamic = "force-static";

/**
 * sitemap.xml — build үед статик файл болж үүснэ.
 *
 * `lastModified` нь build хийсэн огноо. Хуудас бүрийн жинхэнэ
 * өөрчлөлтийн огноог хөтлөх нь өгөгдлийн сан гарч ирэх хүртэл
 * хэт эрт.
 *
 * Эмийн хуудсууд (`DRUG_ROUTES`) — зөвхөн эх сурвалжтай эмүүд.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [...SITE_ROUTES, ...DRUG_ROUTES].map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route.priority,
  }));
}
