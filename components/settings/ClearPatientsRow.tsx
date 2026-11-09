"use client";

import { X } from "lucide-react";
import { toast } from "sonner";
import { updatePatients, usePatients } from "@/components/calculator/patient-store";
import { NO_PATIENTS } from "@/components/calculator/patients";
import SettingsRow from "./SettingsRow";

/**
 * «Бүх өвчтөнийг устгах» — эмч санамсаргүй дарсныг «Буцаах»-аар сэргээнэ
 * (баталгаажуулах цонх биш: Nielsen H3, `use-selected-drugs.ts`-ийн зарчим).
 */
export default function ClearPatientsRow() {
  const state = usePatients();
  const clear = () => {
    updatePatients(() => NO_PATIENTS);
    toast("Бүх өвчтөн устгагдлаа", { action: { label: "Буцаах", onClick: () => updatePatients(() => state) } });
  };
  return (
    <SettingsRow
      icon={X}
      label="Бүх өвчтөнийг устгах"
      value={`${state.patients.length}`}
      danger
      disabled={state.patients.length === 0}
      onClick={clear}
    />
  );
}
