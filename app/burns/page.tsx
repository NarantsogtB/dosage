import type { Metadata } from "next";
import BurnsPage from "@/components/burns/BurnsPage";

export const metadata: Metadata = {
  title: "Түлэгдэлтийн шингэн тооцоолуур",
  description:
    "Хүүхэд, насанд хүрэгчдийн түлэгдэлтийн үеийн биеийн гадаргуугийн талбай, шингэн сэлбэх тооцоолол.",
};

export default function Page() {
  return <BurnsPage />;
}
