import type { Metadata } from "next";
import EmergencyPage from "@/components/emergency/EmergencyPage";
import { pageMeta } from "@/lib/page-meta";

/**
 * Шат 7a: эх сурвалжтай мөр батлагдах хүртэл бүртгэл, навигаци, sitemap-д
 * ОРООГҮЙ, индексжүүлэхгүй (хоосон хуудсыг ил гаргахгүй).
 */
export const metadata: Metadata = {
  ...pageMeta("/emergency"),
  title: "Яаралтай тусламж — жингийн карт",
  description: "Нэг жингээр яаралтай тусламжийн эм, утгууд — зөвхөн эх сурвалжтай мөр.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <EmergencyPage />;
}
