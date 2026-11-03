import type { Patient } from "../../domain/patient";

/**
 * Тэтгэх шингэн (Holliday-Segar).
 *
 * Эх сурвалж: RCH Melbourne CPG «Intravenous fluids» (2026-01 шинэчилсэн),
 * «Maintenance fluid rates» хүснэгт — мл/хон: 3–10 кг 100 × жин;
 * 10–20 кг 1000 + 50 × (жин − 10); 20–60 кг 1500 + 20 × (жин − 20);
 * >60 кг 2400 мл/хон хэвийн дээд. Мл/цаг: 4 / 2 / 1 мл/кг, дээд 100 мл/цаг.
 * Нярай, дутуу төрсөнд хамаарахгүй (заавар 1 сар–18 нас).
 *
 * WHO Pocket Book (2013) §10.2, p. 304: эхний 20 кг ижил, түүнээс дээш
 * 25 мл/кг/хон — эмч RCH-ийг сонгосон (DECISIONS 2026-11-04).
 */

interface Tier {
  readonly upToKg: number;
  readonly mlPerKg: number;
}

const DAY_TIERS: readonly Tier[] = [
  { upToKg: 10, mlPerKg: 100 },
  { upToKg: 20, mlPerKg: 50 },
  { upToKg: 60, mlPerKg: 20 },
];

const HOUR_TIERS: readonly Tier[] = [
  { upToKg: 10, mlPerKg: 4 },
  { upToKg: 20, mlPerKg: 2 },
  { upToKg: 60, mlPerKg: 1 },
];

/** RCH: >60 кг — «2400 mL/day is the normal maximum amount», 100 мл/цаг. */
export const MAX_MAINTENANCE_ML_PER_DAY = 2400;
export const MAX_MAINTENANCE_ML_PER_HOUR = 100;
const CEILING_KG = 60;

/** RCH: ихэнх өвчтэй хүүхдэд ⅔ maintenance (ADH ихсэх). */
export const RESTRICTED_FRACTION = 2 / 3;

/** Нярай (<1 сар)-д хамаарахгүй. */
export const MIN_AGE_MONTHS = 1;

/** Тооцооны нэг шат: «10 кг × 100 мл/кг». */
export interface TierPart {
  readonly kg: number;
  readonly mlPerKg: number;
  readonly ml: number;
}

const fromKgOf = (tiers: readonly Tier[], index: number): number =>
  index === 0 ? 0 : tiers[index - 1].upToKg;

const partOf = (weightKg: number, tiers: readonly Tier[], index: number): TierPart => {
  const tier = tiers[index];
  const kg = Math.max(0, Math.min(weightKg, tier.upToKg) - fromKgOf(tiers, index));
  return { kg, mlPerKg: tier.mlPerKg, ml: kg * tier.mlPerKg };
};

const hasKg = (part: TierPart): boolean => part.kg > 0;

/** Өдрийн тооцооны шатууд («Яаж тооцсон»). >60 кг-д дээд хязгаар үйлчилнэ. */
export const maintenanceParts = (patient: Patient): readonly TierPart[] =>
  DAY_TIERS.map((_, index) => partOf(patient.weightKg, DAY_TIERS, index)).filter(hasKg);

const sumOf = (weightKg: number, tiers: readonly Tier[]): number =>
  tiers.reduce((total, _, index) => total + partOf(weightKg, tiers, index).ml, 0);

/** Дээд хязгаарт хүрсэн эсэх (RCH: >60 кг). */
export const isAtCeiling = (patient: Patient): boolean => patient.weightKg > CEILING_KG;

/** Өдрийн тэтгэх шингэн, мл. */
export const maintenanceMlPerDay = (patient: Patient): number =>
  isAtCeiling(patient) ? MAX_MAINTENANCE_ML_PER_DAY : sumOf(patient.weightKg, DAY_TIERS);

/** Цагийн хурд, мл/цаг (RCH-ийн 4-2-1 багана). */
export const maintenanceMlPerHour = (patient: Patient): number =>
  Math.min(sumOf(patient.weightKg, HOUR_TIERS), MAX_MAINTENANCE_ML_PER_HOUR);

/** ⅔ maintenance, мл/цаг. */
export const restrictedMlPerHour = (patient: Patient): number =>
  maintenanceMlPerHour(patient) * RESTRICTED_FRACTION;
