import type { DoseRange } from "../../domain/dose-range";
import type { Patient } from "../../domain/patient";
import type { PerKgPerDoseBasis } from "../../domain/dosing-basis";

/** мг/кг × жин — шууд нэг удаагийн тун гарна. */
export const perKgPerDose = (
  basis: PerKgPerDoseBasis,
  patient: Patient,
): DoseRange => ({
  minMg: basis.minMgPerKg * patient.weightKg,
  maxMg: basis.maxMgPerKg * patient.weightKg,
});
