"use client";

import type { CalculationResult } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import PatientDrugs from "./PatientDrugs";
import PatientHero from "./PatientHero";
import PatientSheet from "./PatientSheet";
import QuickTiles from "./QuickTiles";
import { usePatientActions } from "./use-patient-actions";

interface Props {
  readonly drugs: readonly Drug[];
  readonly results: ReadonlyMap<string, CalculationResult>;
  readonly ready: boolean;
}

/** Mobile нүүр (<lg): hero + 4 товч + «Энэ өвчтөнд». Desktop-д `desk/` хэрэглэнэ. */
export default function PatientHome({ drugs, results, ready }: Props) {
  const actions = usePatientActions();
  const { target } = actions;

  return (
    <div className="space-y-6 lg:hidden print:hidden">
      <PatientHero state={actions.state} onAdd={actions.onAdd} onEdit={actions.onEdit} onRemove={actions.onRemove} />
      <QuickTiles />
      {ready ? <PatientDrugs drugs={drugs} results={results} /> : null}
      <PatientSheet open={target !== null} editing={target?.editing} onClose={actions.close} />
    </div>
  );
}
