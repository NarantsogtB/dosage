"use client";

import type { CalculationResult } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import { FREQUENCY_SHORT } from "@/lib/format/format-frequency-short";
import { formatDose } from "@/lib/format/format-dose";
import { drugAnchorId } from "./drug-anchor";
import RemoveButton from "./RemoveButton";
import SummaryDose from "./SummaryDose";

interface Props {
  readonly drug: Drug;
  readonly result?: CalculationResult;
  readonly onRemove: (id: string) => void;
}

const doseText = (result?: CalculationResult): string | null =>
  result?.type === "dosage"
    ? `${formatDose(result.data.perDose)} · ${FREQUENCY_SHORT[result.data.frequency]}`
    : null;

/** Нэг мөр: эмийн нэр, тун, хасах товч. Нэр дээр дарвал карт руу үсэрнэ. */
export default function SummaryRow({ drug, result, onRemove }: Props) {
  return (
    <li className="hover:bg-accent/50 flex items-center gap-2 rounded-md pl-2.5 pr-1 transition-colors">
      <a
        href={`#${drugAnchorId(drug.id)}`}
        className="flex min-w-0 flex-1 items-baseline justify-between gap-3 py-1.5"
      >
        <span className="truncate text-sm font-medium">{drug.inn}</span>
        <SummaryDose text={doseText(result)} />
      </a>
      <RemoveButton label={drug.inn} onRemove={() => onRemove(drug.id)} />
    </li>
  );
}
