import type { DoseRange } from "../../domain/dose-range";
import type { DosingBasis } from "../../domain/dosing-basis";
import type { Patient } from "../../domain/patient";
import { fixed } from "./fixed";
import { perKgPerDay } from "./per-kg-per-day";
import { perKgPerDose } from "./per-kg-per-dose";
import { weightBand } from "./weight-band";

/** Basis төрөл бүрд тохирох тооцоологчийг холбоно. */
type Evaluators = {
  [K in DosingBasis["kind"]]: (
    basis: Extract<DosingBasis, { kind: K }>,
    patient: Patient,
    dosesPerDay: number,
  ) => DoseRange | null;
};

/**
 * switch биш dispatch хүснэгт.
 * Шинэ basis нэмэхэд энд нэг мөр нэмнэ — салаалалт нэмэгдэхгүй.
 */
const EVALUATORS: Evaluators = {
  per_kg_per_dose: (basis, patient) => perKgPerDose(basis, patient),
  per_kg_per_day: (basis, patient, doses) => perKgPerDay(basis, patient, doses),
  weight_band: (basis, patient) => weightBand(basis, patient),
  fixed: (basis) => fixed(basis),
};

type AnyEvaluator = (
  basis: DosingBasis,
  patient: Patient,
  dosesPerDay: number,
) => DoseRange | null;

/** Тунгийн үндэслэлээс НЭГ УДААГИЙН тунгийн мужийг гаргана. */
export const evaluateBasis = (
  basis: DosingBasis,
  patient: Patient,
  dosesPerDay: number,
): DoseRange | null =>
  (EVALUATORS[basis.kind] as AnyEvaluator)(basis, patient, dosesPerDay);
