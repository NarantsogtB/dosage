import type { CalculationResult } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import { FREQUENCY_LABELS } from "@/lib/data/labels/frequency-labels";
import { formatDose } from "@/lib/format/format-dose";
import PrintFormulations from "./PrintFormulations";
import PrintWarnings from "./PrintWarnings";

interface Props {
  readonly drug: Drug;
  readonly result?: CalculationResult;
}

/** Нэг эмийн мөр, хэвлэх хувилбар. */
export default function PrintRow({ drug, result }: Props) {
  if (result?.type !== "dosage") return null;
  const { perDose, perDay, frequency } = result.data;

  return (
    <div className="break-inside-avoid border-b border-slate-200 py-2.5">
      <div className="flex items-baseline justify-between gap-3">
        <strong className="text-sm text-slate-900">{drug.inn}</strong>
        <span className="text-sm text-slate-900">
          {formatDose(perDose)} · {FREQUENCY_LABELS[frequency]}
        </span>
      </div>
      <p className="text-xs text-slate-500">
        Өдрийн нийт: {formatDose(perDay)}
      </p>
      <PrintFormulations amounts={result.data.amounts} />
      <PrintWarnings warnings={result.data.warnings} />
    </div>
  );
}
