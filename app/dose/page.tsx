import type { Metadata } from "next";
import CalculatorPage from "@/components/calculator/CalculatorPage";
import DrugIndex from "@/components/drug-page/DrugIndex";
import { DRUGS } from "@/lib/data/drugs";
import { pageMeta } from "@/lib/page-meta";

export const metadata: Metadata = {
  ...pageMeta("/dose"),
  title: "Эмийн тун тооцоолуур",
  description: `Хүүхдийн жинд суурилсан эмийн тун тооцоолох, эмчид зориулсан хэрэгсэл. ${DRUGS.length} эм.`,
};

export default function DosePage() {
  return (
    <CalculatorPage>
      <DrugIndex />
    </CalculatorPage>
  );
}
