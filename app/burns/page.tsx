import type { Metadata } from "next";
import BurnsPage from "@/components/burns/BurnsPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata: Metadata = {
  ...pageMeta("/burns"),
  title: "Түлэгдэлтийн шингэн тооцоолуур",
  description:
    "Хүүхэд, насанд хүрэгчдийн түлэгдэлтийн үеийн биеийн гадаргуугийн талбай, шингэн сэлбэх тооцоолол.",
};

export default function Page() {
  return <BurnsPage />;
}
