"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { CalculationResult } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import { updatePatients, usePatients } from "@/components/calculator/patient-store";
import { removePatient, type PatientsState, type StoredPatient } from "@/components/calculator/patients";
import PatientDrugs from "./PatientDrugs";
import PatientHero from "./PatientHero";
import PatientSheet from "./PatientSheet";
import QuickTiles from "./QuickTiles";

interface Props {
  readonly drugs: readonly Drug[];
  readonly results: ReadonlyMap<string, CalculationResult>;
  readonly ready: boolean;
}

/** Устгах — буцаах боломжтой: өмнөх БҮХ төлөвийг сэргээнэ (`use-undoable-removal`-тэй ижил зарчим). */
const removeWithUndo = (before: PatientsState, patient: StoredPatient): void => {
  updatePatients((state) => removePatient(state, patient.id));
  toast("Өвчтөн устгагдлаа", {
    action: { label: "Буцаах", onClick: () => updatePatients(() => before) },
  });
};

type Target = { readonly editing?: StoredPatient } | null;

/** Mobile нүүр (<lg): hero + 4 товч + «Энэ өвчтөнд». ≥lg-д 9g хүртэл нуугдана. */
export default function PatientHome({ drugs, results, ready }: Props) {
  const state = usePatients();
  const [target, setTarget] = useState<Target>(null);
  const close = () => setTarget(null);

  return (
    <div className="space-y-6 lg:hidden print:hidden">
      <PatientHero
        state={state}
        onAdd={() => setTarget({})}
        onEdit={(editing) => setTarget({ editing })}
        onRemove={(patient) => removeWithUndo(state, patient)}
      />
      <QuickTiles />
      {ready ? <PatientDrugs drugs={drugs} results={results} /> : null}
      <PatientSheet open={target !== null} editing={target?.editing} onClose={close} />
    </div>
  );
}
