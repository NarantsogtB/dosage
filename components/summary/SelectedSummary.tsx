"use client";

import type { CalculationResult } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import type { Patient } from "@/lib/domain/patient";
import { prescriptionText } from "@/lib/format/format-prescription";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CopyButton from "./CopyButton";
import SummaryRow from "./SummaryRow";

interface Props {
  readonly drugs: readonly Drug[];
  readonly results: ReadonlyMap<string, CalculationResult>;
  readonly patient: Patient;
  readonly onRemove: (id: string) => void;
  readonly onClear: () => void;
}

/**
 * Сонгосон эмийн наалдамхай хураангуй.
 *
 * Гурван асуудлыг нэг дор шийднэ:
 *   1. Олон эмтэй үед доош гүйлгэхгүйгээр бүх тунг харах
 *   2. Хайлтаас олохгүйгээр шууд хасах (×)
 *   3. Нэр дээр дарж тухайн карт руу үсрэх
 */
export default function SelectedSummary({
  drugs,
  results,
  patient,
  onRemove,
  onClear,
}: Props) {
  if (drugs.length === 0) return null;

  return (
    <Card className="bg-card/95 supports-[backdrop-filter]:bg-card/85 sticky top-16 z-[5] gap-0 py-0 backdrop-blur print:hidden">
      <div className="flex items-center justify-between gap-2 px-3 py-1.5">
        <span className="text-muted-foreground pl-1 text-xs font-semibold uppercase tracking-widest">
          Сонгосон · <span className="num">{drugs.length}</span>
        </span>
        <span className="flex items-center gap-0.5">
          <CopyButton
            text={prescriptionText(drugs, results, patient)}
            variant="ghost"
            size="sm"
            label="Хуулах"
          />
          <Button type="button" variant="ghost" size="sm" onClick={onClear}>
            Цэвэрлэх
          </Button>
        </span>
      </div>
      <Separator />
      <ul className="max-h-52 overflow-y-auto p-1">
        {drugs.map((drug) => (
          <SummaryRow
            key={drug.id}
            drug={drug}
            result={results.get(drug.id)}
            onRemove={onRemove}
          />
        ))}
      </ul>
    </Card>
  );
}
