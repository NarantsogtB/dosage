import type { Patient } from "../../domain/patient";

const DIVISOR = 3600;

/**
 * Mosteller: БГТ(м²) = √(өндөр(см) × жин(кг) / 3600)
 *
 * Өндөр байхгүй бол тооцоолохгүй — таамаглахгүй.
 */
export const mostellerBsaM2 = (patient: Patient): number | null => {
  if (patient.heightCm === undefined) return null;
  return Math.sqrt((patient.heightCm * patient.weightKg) / DIVISOR);
};
