"use client";

import type { CalculationResult } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import type { Patient } from "@/lib/domain/patient";
import type { InputStatus } from "./blocker";
import type { IndicationMap } from "./use-indications";
import SelectedSummary from "@/components/summary/SelectedSummary";
import UndoBar from "@/components/summary/UndoBar";
import InstallPrompt from "@/components/pwa/InstallPrompt";
import StepHeader from "@/components/step/StepHeader";
import ResultsActions from "./ResultsActions";
import ResultsPanel from "./ResultsPanel";

interface Props {
  readonly drugs: readonly Drug[];
  readonly results: ReadonlyMap<string, CalculationResult>;
  readonly patient: Patient;
  readonly status: InputStatus;
  readonly indications: IndicationMap;
  readonly onRemove: (id: string) => void;
  readonly onIndication: (drugId: string, code?: string) => void;
  readonly onClear: () => void;
  readonly onUndo: () => void;
  readonly undoCount: number;
}

/** Баруун багана: наалдамхай хураангуй + дэлгэрэнгүй картууд. Алхам 3. */
/** Ядаж нэг эмийн тун амжилттай гарсан эсэх — сануулгын нөхцөл. */
const hasDosage = (results: ReadonlyMap<string, CalculationResult>) =>
  [...results.values()].some((result) => result.type === "dosage");

export default function ResultsColumn(props: Props) {
  const { drugs, results, patient, status } = props;
  const done = status.hasWeight && status.hasAge && status.hasDrugs;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 px-1 pt-1 print:hidden">
        <StepHeader step={3} label="Үр дүн" done={done} />
        <ResultsActions drugs={drugs} results={results} patient={patient} />
      </div>
      <SelectedSummary
        drugs={drugs}
        results={results}
        patient={patient}
        onRemove={props.onRemove}
        onClear={props.onClear}
      />
      <UndoBar count={props.undoCount} onUndo={props.onUndo} />
      <InstallPrompt hasCalculated={hasDosage(results)} />
      <ResultsPanel
        drugs={drugs}
        results={results}
        patient={patient}
        status={status}
        indications={props.indications}
        onRemove={props.onRemove}
        onIndication={props.onIndication}
      />
    </div>
  );
}
