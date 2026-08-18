"use client";

import type { CalculationResult } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import type { Patient } from "@/lib/domain/patient";
import type { IndicationMap } from "./use-indications";
import SelectedSummary from "@/components/summary/SelectedSummary";
import ResultsPanel from "./ResultsPanel";

interface Props {
  readonly drugs: readonly Drug[];
  readonly results: ReadonlyMap<string, CalculationResult>;
  readonly patient: Patient;
  readonly ready: boolean;
  readonly indications: IndicationMap;
  readonly onRemove: (id: string) => void;
  readonly onIndication: (drugId: string, code?: string) => void;
  readonly onClear: () => void;
}

/** Баруун багана: наалдамхай хураангуй + дэлгэрэнгүй картууд. */
export default function ResultsColumn(props: Props) {
  const { drugs, results, patient, ready } = props;
  return (
    <div className="space-y-4">
      <SelectedSummary
        drugs={drugs}
        results={results}
        patient={patient}
        onRemove={props.onRemove}
        onClear={props.onClear}
      />
      <ResultsPanel
        drugs={drugs}
        results={results}
        patient={patient}
        ready={ready}
        indications={props.indications}
        onRemove={props.onRemove}
        onIndication={props.onIndication}
      />
    </div>
  );
}
