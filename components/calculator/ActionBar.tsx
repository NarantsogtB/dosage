"use client";

import { Printer } from "lucide-react";
import type { CalculationResult } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import type { Patient } from "@/lib/domain/patient";
import { prescriptionText } from "@/lib/format/format-prescription";
import { Button } from "@/components/ui/button";
import CopyButton from "@/components/summary/CopyButton";

interface Props {
  readonly drugs: readonly Drug[];
  readonly results: ReadonlyMap<string, CalculationResult>;
  readonly patient: Patient;
}

const dosageIds = (drugs: readonly Drug[], results: Props["results"]): readonly string[] =>
  drugs.filter((drug) => results.get(drug.id)?.type === "dosage").map((drug) => drug.id);

/**
 * Mobile-ийн наалдамхай үйлдлийн мөр — Figma "Action bar" (V3 · 03).
 *
 * Доод навигацын шууд дээр — эрхий хурууны бүс. Хуулах үйлдэл
 * mobile-д ЗӨВХӨН энд (өмнө нь хураангуй, гарчиг хоёр газар байв).
 * Хуулах тун байхгүй бол харагдахгүй — хийх үйлдэлгүй товч сатааруулна.
 * Desktop-д `ResultsActions` үр дүнгийн толгойд.
 */
export default function ActionBar({ drugs, results, patient }: Props) {
  const ids = dosageIds(drugs, results);
  if (ids.length === 0) return null;
  return (
    <>
      <div aria-hidden className="h-20 md:hidden print:hidden" />
      <div className="bg-card/95 supports-[backdrop-filter]:bg-card/85 fixed inset-x-0 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-30 flex gap-2 border-t p-3 backdrop-blur md:hidden print:hidden">
        <CopyButton
          text={prescriptionText(drugs, results, patient)}
          drugIds={ids}
          variant="default"
          size="lg"
          label={`Жор хуулах · ${ids.length} эм`}
          className="flex-1"
        />
        <Button type="button" variant="outline" size="icon-lg" aria-label="Хэвлэх" onClick={() => window.print()}>
          <Printer />
        </Button>
      </div>
    </>
  );
}
