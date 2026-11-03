import type { Patient } from "../../domain/patient";
import { maintenanceMlPerHour } from "./maintenance";

/**
 * Шингэний дутагдал ба судсаар нөхөх хурд.
 *
 * RCH Melbourne CPG «Dehydration» (2026-04): «a 10 kg child who now weighs
 * 9.5 kg has a 500 mL water deficit and is 5% dehydrated» — дутагдал (мл) =
 * жин (кг) × % × 10. Зэрэг: хөнгөн <5%, дунд 5–9%, хүнд ≥10%.
 *
 * RCH «Intravenous fluids» (2026-01): хурд = maintenance + 5% дутагдлыг
 * 24 цагт; ≤5% бол эхний 24 цагт, >5% бол дараагийн 24 цагт үргэлжлүүлнэ
 * (жишээ 10% → 5% + 5%). Жин — өвчний өмнөх. <4 кг — ахлах эмчтэй.
 */
export const MAX_DEFICIT_PERCENT_PER_DAY = 5;
export const SEVERE_DEFICIT_PERCENT = 10;
export const SENIOR_CONSULT_BELOW_KG = 4;
const ML_PER_KG_PER_PERCENT = 10;
const HOURS_PER_DAY = 24;

/** Оролтын %: 1–10 бүхэл (RCH-ийн зэрэглэл хүнд ≥10% хүртэл). */
export const isValidDeficitPercent = (percent: number): boolean =>
  Number.isInteger(percent) && percent >= 1 && percent <= SEVERE_DEFICIT_PERCENT;

/** <4 кг — RCH: «Consult senior clinician». */
export const needsSeniorConsult = (patient: Patient): boolean =>
  patient.weightKg < SENIOR_CONSULT_BELOW_KG;

/** Дутагдлын эзэлхүүн, мл. */
export const deficitMl = (patient: Patient, percent: number): number =>
  patient.weightKg * percent * ML_PER_KG_PER_PERCENT;

/** Нөхөх хуваарийн нэг 24 цаг. */
export interface RehydrationDay {
  readonly day: number;
  readonly deficitPercent: number;
  readonly deficitMl: number;
  readonly rateMlPerHour: number;
}

const dayOf = (patient: Patient, percent: number, index: number): RehydrationDay => {
  const share = Math.min(MAX_DEFICIT_PERCENT_PER_DAY, percent - index * MAX_DEFICIT_PERCENT_PER_DAY);
  const ml = deficitMl(patient, share);
  return {
    day: index + 1,
    deficitPercent: share,
    deficitMl: ml,
    rateMlPerHour: maintenanceMlPerHour(patient) + ml / HOURS_PER_DAY,
  };
};

/** 24 цаг тутмын хуваарь: өдөрт ≤5% + maintenance. */
export const rehydrationPlan = (patient: Patient, percent: number): readonly RehydrationDay[] => {
  const days = Math.ceil(percent / MAX_DEFICIT_PERCENT_PER_DAY);
  return Array.from({ length: days }, (_, index) => dayOf(patient, percent, index));
};
