import type { Patient } from "@/lib/domain/patient";
import { MAX_WEIGHT_KG, MIN_WEIGHT_KG } from "@/lib/engine/eligibility/limits";

/** Хэлбэрийн түүхий утга. Хоосон байж болно. */
export interface PatientForm {
  readonly weight: string;
  readonly years: string;
  readonly months: string;
}

export const EMPTY_FORM: PatientForm = { weight: "", years: "", months: "" };

const MONTHS_PER_YEAR = 12;
const num = (value: string): number => Number(value) || 0;

/** Оролтоос тооцоололд бэлэн Patient үүсгэнэ. */
export const toPatient = (form: PatientForm): Patient => ({
  weightKg: num(form.weight),
  ageMonths: num(form.years) * MONTHS_PER_YEAR + num(form.months),
});

/** Жин оруулсан бөгөөд зөвшөөрөгдсөн хязгаараас гарсан эсэх. */
export const isWeightInvalid = (form: PatientForm): boolean => {
  if (form.weight === "") return false;
  const weight = Number(form.weight);
  return weight < MIN_WEIGHT_KG || weight > MAX_WEIGHT_KG;
};

/** Тооцоолол эхлүүлэхэд хангалттай эсэх. */
export const isReady = (form: PatientForm): boolean =>
  form.weight !== "" && !isWeightInvalid(form);
