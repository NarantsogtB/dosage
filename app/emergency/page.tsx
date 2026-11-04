import type { Metadata } from "next";
import EmergencyPage from "@/components/emergency/EmergencyPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata: Metadata = {
  ...pageMeta("/emergency"),
  title: "Яаралтай тусламж — жингийн карт",
  description: "Нэг жингээр яаралтай тусламжийн эм, утгууд — зөвхөн эх сурвалжтай мөр.",
};

export default function Page() {
  return <EmergencyPage />;
}
