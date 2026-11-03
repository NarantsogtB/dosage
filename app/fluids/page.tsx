import type { Metadata } from "next";
import FluidsPage from "@/components/fluids/FluidsPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata: Metadata = {
  ...pageMeta("/fluids"),
  title: "Хүүхдийн шингэний тооцоолуур",
  description:
    "Тэтгэх шингэн (мл/хон, мл/цаг), шокийн болюс, шингэний дутагдлыг нөхөх хурд — RCH Melbourne, WHO-гийн зааврын дагуу.",
};

export default function Page() {
  return <FluidsPage />;
}
