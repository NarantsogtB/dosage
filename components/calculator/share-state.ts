import type { SharedCalc, SharedDrug } from "@/lib/share/share-link";
import type { Choices } from "./use-choices";
import { hasValidAge, hasWeight, toPatient, type PatientForm } from "./patient-form";

const MONTHS_PER_YEAR = 12;

const drugOf = (choices: Choices) => (id: string): SharedDrug => ({
  id,
  indication: choices.indications.get(id),
  formulation: choices.formulations.get(id),
});

/** Одоогийн төлөвөөс хуваалцах тооцоо. Хүчингүй жин/насыг оруулахгүй. */
export const toSharedCalc = (
  form: PatientForm,
  selectedIds: readonly string[],
  choices: Choices,
): SharedCalc => {
  const patient = toPatient(form);
  return {
    weightKg: hasWeight(form) ? patient.weightKg : undefined,
    ageMonths: hasValidAge(form) ? patient.ageMonths : undefined,
    drugs: selectedIds.map(drugOf(choices)),
  };
};

const text = (value?: number): string => (value === undefined ? "" : String(value));

/** Линкээс сэргээх хэлбэр — жин үргэлж кг-аар, нас жил + сараар. */
export const formOf = (calc: SharedCalc): PatientForm => ({
  weight: text(calc.weightKg),
  weightUnit: "kg",
  years: calc.ageMonths === undefined ? "" : String(Math.floor(calc.ageMonths / MONTHS_PER_YEAR)),
  months: text(calc.ageMonths === undefined ? undefined : calc.ageMonths % MONTHS_PER_YEAR),
});
