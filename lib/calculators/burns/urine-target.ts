import type { Patient } from "../../domain/patient";

/** ЭХ СУРВАЛЖ: mn-burns-2015, х.155 (зорилт), х.121 (олигури/полиури) */
const SMALL_CHILD_KG = 30;

export interface UrineTarget {
  readonly minMlPerKgPerHour: number;
  readonly maxMlPerKgPerHour: number;
  readonly oliguriaBelow: number;
  readonly polyuriaAbove: number;
}

const SMALL_CHILD: UrineTarget = {
  minMlPerKgPerHour: 0.5,
  maxMlPerKgPerHour: 1,
  oliguriaBelow: 0.3,
  polyuriaAbove: 1,
};

const LARGER: UrineTarget = {
  minMlPerKgPerHour: 0.5,
  maxMlPerKgPerHour: 1,
  oliguriaBelow: 0.3,
  polyuriaAbove: 1,
};

/**
 * Шээсний гарцын зорилт — шингэн сэлбэлтийн ГОЛ хяналтын үзүүлэлт.
 *
 * Тооцоолуур зөвхөн эзэлхүүн гаргаад зогсох ёсгүй: эмч юуг хянахыг
 * хамт хэлнэ.
 */
export const urineTargetOf = (patient: Patient): UrineTarget =>
  patient.weightKg < SMALL_CHILD_KG ? SMALL_CHILD : LARGER;

/** Зорилтын доод хязгаарыг мл/цаг болгож хөрвүүлнэ. */
export const targetMlPerHour = (
  patient: Patient,
  target: UrineTarget,
): { readonly minMl: number; readonly maxMl: number } => ({
  minMl: target.minMlPerKgPerHour * patient.weightKg,
  maxMl: target.maxMlPerKgPerHour * patient.weightKg,
});
