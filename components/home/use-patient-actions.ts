"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updatePatients, usePatients } from "@/components/calculator/patient-store";
import { removePatient, type PatientsState, type StoredPatient } from "@/components/calculator/patients";

/** Устгах — буцаах боломжтой: өмнөх БҮХ төлөвийг сэргээнэ (`use-undoable-removal`-тэй ижил зарчим). */
const removeWithUndo = (before: PatientsState, patient: StoredPatient): void => {
  updatePatients((state) => removePatient(state, patient.id));
  toast("Өвчтөн устгагдлаа", {
    action: { label: "Буцаах", onClick: () => updatePatients(() => before) },
  });
};

type Target = { readonly editing?: StoredPatient } | null;

/**
 * Өвчтөн нэмэх/засах/устгах — mobile hero, desktop өвчтөний багана хоёрт НЭГ эх.
 * `target` нь `PatientSheet`-ийн нээлт (`{}` = шинэ, `{editing}` = засах).
 */
export const usePatientActions = () => {
  const state = usePatients();
  const [target, setTarget] = useState<Target>(null);
  return {
    state,
    target,
    onAdd: () => setTarget({}),
    onEdit: (editing: StoredPatient) => setTarget({ editing }),
    onRemove: (patient: StoredPatient) => removeWithUndo(state, patient),
    close: () => setTarget(null),
  };
};
