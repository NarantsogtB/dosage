import type { CalculationResult } from "../domain/calculation-result";
import type { Drug } from "../domain/drug";
import type { Patient } from "../domain/patient";
import { FREQUENCY_LABELS } from "../data/labels/frequency-labels";
import { formatDose } from "./format-dose";

const MONTHS_PER_YEAR = 12;

const ageText = (months: number): string => {
  const years = Math.floor(months / MONTHS_PER_YEAR);
  const rest = months % MONTHS_PER_YEAR;
  if (years === 0) return `${rest} сар`;
  return rest === 0 ? `${years} нас` : `${years} нас ${rest} сар`;
};

/** Нэг эмийн мөр: "Amoxicillin — 400 мг, өдөрт 2 удаа". */
export const prescriptionLine = (
  drug: Drug,
  result?: CalculationResult,
): string | null => {
  if (result?.type !== "dosage") return null;
  const { perDose, frequency } = result.data;
  return `${drug.inn} — ${formatDose(perDose)}, ${FREQUENCY_LABELS[frequency]}`;
};

/** Бүх сонгосон эмийн хуулж болох текст. */
export const prescriptionText = (
  drugs: readonly Drug[],
  results: ReadonlyMap<string, CalculationResult>,
  patient: Patient,
): string => {
  const header = `${patient.weightKg} кг · ${ageText(patient.ageMonths)}`;
  const lines = drugs
    .map((drug) => prescriptionLine(drug, results.get(drug.id)))
    .filter((line): line is string => line !== null);
  return [header, "", ...lines].join("\n");
};
