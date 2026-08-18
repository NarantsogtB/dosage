import type { DoseRange } from "../../domain/dose-range";
import type { Patient } from "../../domain/patient";
import type { PerKgPerDayBasis } from "../../domain/dosing-basis";

/** мг/кг/өдөр × жин ÷ давтамж — нэг удаагийн тун болгоно. */
export const perKgPerDay = (
  basis: PerKgPerDayBasis,
  patient: Patient,
  dosesPerDay: number,
): DoseRange => ({
  minMg: (basis.minMgPerKg * patient.weightKg) / dosesPerDay,
  maxMg: (basis.maxMgPerKg * patient.weightKg) / dosesPerDay,
});
