"use client";

import { Printer } from "lucide-react";
import type { CalculationResult } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import type { Patient } from "@/lib/domain/patient";
import { prescriptionText } from "@/lib/format/format-prescription";
import { Button } from "@/components/ui/button";
import DosageCard from "@/components/dosage/DosageCard";
import { blockerFor } from "@/components/calculator/blocker";
import ReadinessChecklist from "@/components/calculator/ReadinessChecklist";
import type { useCalculatorState } from "@/components/calculator/use-calculator-state";
import CopyButton from "@/components/summary/CopyButton";
import Breadcrumb from "./Breadcrumb";

type Calc = ReturnType<typeof useCalculatorState>;

const PILL = "bg-foreground text-background hover:bg-foreground/90 flex-1 rounded-full";

interface ActionsProps {
  readonly drug: Drug;
  readonly results: ReadonlyMap<string, CalculationResult>;
  readonly patient: Patient;
}

/** Шилэн толгойн доорх «Жор хуулах» ба «Хэвлэх» (Figma 127:426). */
const HeaderActions = ({ drug, results, patient }: ActionsProps) => (
  <div className="mt-4 flex gap-2 print:hidden">
    <CopyButton text={prescriptionText([drug], results, patient)} drugIds={[drug.id]} variant="secondary" size="lg" label="Жор хуулах" className={PILL} />
    <Button type="button" size="lg" className={PILL} onClick={() => window.print()}>
      <Printer aria-hidden />
      Хэвлэх
    </Button>
  </div>
);

const DetailCard = ({ drug, calc }: { readonly drug: Drug; readonly calc: Calc }) => {
  const result = calc.results.get(drug.id);
  if (!result) return null;
  return (
    <DosageCard
      drug={drug}
      result={result}
      patient={calc.patient}
      indication={calc.choices.indications.get(drug.id)}
      formulation={calc.choices.formulations.get(drug.id)}
      onRemove={calc.onRemove}
      onIndication={calc.choices.onIndication}
      onFormulation={calc.choices.onFormulation}
      variant="detail"
      headerActions={<HeaderActions drug={drug} results={calc.results} patient={calc.patient} />}
    />
  );
};

/**
 * Эмийн дэлгэрэнгүйн гол багана: breadcrumb + карт (өвчтөн бэлэн биш бол дутуу зүйлийн жагсаалт).
 * `h1` нь desktop-д харагдахгүй (breadcrumb орлоно) ч дэлгэц уншигчид хэрэгтэй.
 */
export default function DetailMain({ drug, calc }: { readonly drug: Drug; readonly calc: Calc }) {
  const blocker = blockerFor(calc.status);
  return (
    <div className="space-y-4">
      <h1 className="sr-only">{drug.innMn} ({drug.inn}) — тун тооцоолох</h1>
      <Breadcrumb drug={drug} />
      {blocker ? <ReadinessChecklist status={calc.status} blocker={blocker} /> : <DetailCard drug={drug} calc={calc} />}
    </div>
  );
}
