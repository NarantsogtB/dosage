import type { Metadata } from "next";
import CalculatorPage from "@/components/calculator/CalculatorPage";
import { DRUGS } from "@/lib/data/drugs";

export const metadata: Metadata = {
  title: "Эмийн тун тооцоолуур",
  description: `Хүүхдийн жинд суурилсан эмийн тун тооцоолох, эмчид зориулсан хэрэгсэл. ${DRUGS.length} эм.`,
};

export default function Home() {
  return <CalculatorPage />;
}
