import type { DoseCap } from "../../domain/dose-cap";
import type { Patient } from "../../domain/patient";
import { resolveCapMg } from "./resolve-cap-mg";

/**
 * Аливаа хязгаарыг НЭГ УДААГИЙН тунгийн хязгаар болгоно.
 * Өдрийн хязгаарыг давтамжид хуваана.
 */
export const toPerDoseLimit = (
  cap: DoseCap,
  patient: Patient,
  dosesPerDay: number,
): number => {
  const totalMg = resolveCapMg(cap, patient);
  return cap.scope === "per_day" ? totalMg / dosesPerDay : totalMg;
};
