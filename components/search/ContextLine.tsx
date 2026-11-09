"use client";

import { User } from "lucide-react";
import AgeDisplay from "@/components/dosage/AgeDisplay";
import { hasWeight, toPatient } from "@/components/calculator/patient-form";
import { usePatients } from "@/components/calculator/patient-store";
import { activeOf, labelOf, type StoredPatient } from "@/components/calculator/patients";
import type { SearchMode } from "./search-open";

const hasAnyAge = (patient: StoredPatient): boolean => patient.form.years !== "" || patient.form.months !== "";

const PatientText = ({ patient, index }: { readonly patient: StoredPatient; readonly index: number }) => (
  <>
    {labelOf(patient, index)}
    {hasWeight(patient.form) ? <> · <span className="num">{toPatient(patient.form).weightKg}</span> кг</> : null}
    {hasAnyAge(patient) ? <> · <AgeDisplay ageMonths={toPatient(patient.form).ageMonths} /></> : null}
    {" "}— тун шууд гарна
  </>
);

const PLAIN: Record<SearchMode, string> = {
  pick: "Өвчтөн нэмээгүй — тун гарахын тулд жин, нас оруулна",
  favorite: "«Миний эмүүд»-д нэмэх/хасахдаа эмийг дарна",
};

/** Хайлтын дээрх мөр: хэнд тун гарахыг (эсвэл favorite горимын зөвлөмж) харуулна. */
export default function ContextLine({ mode }: { readonly mode: SearchMode }) {
  const state = usePatients();
  const patient = activeOf(state);
  const index = state.patients.findIndex((item) => item.id === state.activeId);
  return (
    <p className="text-muted-foreground flex items-center gap-2 px-4 pb-3 text-sm">
      <User aria-hidden className="size-4 shrink-0" />
      <span>{mode === "pick" && patient ? <PatientText patient={patient} index={index} /> : PLAIN[mode]}</span>
    </p>
  );
}
