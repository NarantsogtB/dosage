import type { DosingBasis } from "../../domain/dosing-basis";
import type { Patient } from "../../domain/patient";
import { formatRange } from "../../format/format-range";

/** Basis төрөл бүрийн томьёоны бичиглэл. */
type Describers = {
  [K in DosingBasis["kind"]]: (
    basis: Extract<DosingBasis, { kind: K }>,
    patient: Patient,
    dosesPerDay: number,
  ) => string;
};

const DESCRIBERS: Describers = {
  per_kg_per_dose: (basis, patient) =>
    `${formatRange(basis.minMgPerKg, basis.maxMgPerKg)} мг/кг × ${patient.weightKg} кг`,

  per_kg_per_day: (basis, patient, doses) =>
    `${formatRange(basis.minMgPerKg, basis.maxMgPerKg)} мг/кг/өдөр × ${patient.weightKg} кг ÷ ${doses}`,

  weight_band: (basis, patient) =>
    `${patient.weightKg} кг — ${basis.bands.length} жингийн мужаас сонгов`,

  fixed: (basis) => `тогтмол ${formatRange(basis.minMg, basis.maxMg)} мг`,
};

type AnyDescriber = (
  basis: DosingBasis,
  patient: Patient,
  dosesPerDay: number,
) => string;

/** Тооцооллын алхмыг эмчид ойлгомжтой томьёогоор бичнэ. */
export const describeBasis = (
  basis: DosingBasis,
  patient: Patient,
  dosesPerDay: number,
): string =>
  (DESCRIBERS[basis.kind] as AnyDescriber)(basis, patient, dosesPerDay);
