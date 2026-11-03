import type { Patient } from "../../domain/patient";

/**
 * Шокийн болюс (0.9% NaCl эсвэл Рингерийн лактат).
 *
 * RCH Melbourne CPG «Intravenous fluids» (2026-01): «Give a bolus of
 * 10-20 mL/kg of sodium chloride 0.9% as fast as possible, and reassess»;
 * ≥20 мл/кг бол ахлах эмч, ≥40 мл/кг бол инотроп.
 * WHO Pocket Book (2013) Chart 7, p. 13: 20 мл/кг аль болох хурдан.
 */
export const BOLUS_OPTIONS_ML_PER_KG = [10, 20] as const;

/**
 * Хүнд хоол тэжээлийн дутагдалтай хүүхдийн шок.
 *
 * WHO Pocket Book (2013) Chart 8, p. 14: «Give IV fluid at 15 ml/kg over 1 h».
 * Стандарт болюс АЮУЛТАЙ — зүрхний дутагдал үүсгэж болзошгүй.
 */
export const MALNOURISHED_BOLUS_ML_PER_KG = 15;
export const MALNOURISHED_BOLUS_HOURS = 1;

/** Нэг болюсын эзэлхүүн, мл. */
export const bolusMl = (patient: Patient, mlPerKg: number): number =>
  patient.weightKg * mlPerKg;

/** Хүнд хоол тэжээлийн дутагдалтай хүүхдийн болюс, мл (1 цагт). */
export const malnourishedBolusMl = (patient: Patient): number =>
  bolusMl(patient, MALNOURISHED_BOLUS_ML_PER_KG);
