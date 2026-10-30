import type { Patient } from "@/lib/domain/patient";
import {
  MAX_AGE_MONTHS,
  MAX_WEIGHT_KG,
  MIN_WEIGHT_KG,
} from "@/lib/engine/eligibility/limits";
import type { InputStatus } from "./blocker";

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

/**
 * Насыг ЯЛГААТАЙ оруулсан эсэх.
 *
 * ⚠️ Энэ шалгалт байхгүй үед хоосон нас нь `0 сар` болж хувирдаг
 * байсан бөгөөд нярайгаас ялгагдахгүй байв. Эмийн 50-аас 30 гаруй нь
 * насны доод хязгаартай (жишээ нь Amoxicillin ≥2 сар) тул 5 настай
 * хүүхдэд «тооцоолол боломжгүй» гэж чимээгүй хариулах эрсдэлтэй.
 *
 * Хоосон утга ба тэг хоёрыг хольж болохгүй.
 */
export const hasAge = (form: PatientForm): boolean =>
  form.years !== "" || form.months !== "";

/**
 * Оруулсан нас ЗӨВШӨӨРӨГДСӨН (хүүхдийн, 0–18) хязгаараас гарсан эсэх.
 *
 * dosage.mn зөвхөн хүүхдийн жинд суурилсан тун тооцоолдог тул насанд
 * хүрэгчийн нас оруулбал энд ЗОГСООХ ёстой — жингийн `isWeightInvalid`-тэй
 * ижил зарчим.
 */
export const isAgeInvalid = (form: PatientForm): boolean =>
  hasAge(form) && toPatient(form).ageMonths > MAX_AGE_MONTHS;

/** Нас оруулсан бөгөөд хүчинтэй эсэх. */
export const hasValidAge = (form: PatientForm): boolean =>
  hasAge(form) && !isAgeInvalid(form);

/** Жинг оруулсан бөгөөд хүчинтэй эсэх. */
export const hasWeight = (form: PatientForm): boolean =>
  form.weight !== "" && !isWeightInvalid(form);

/** Тооцоолол эхлүүлэхэд хангалттай эсэх. */
export const isReady = (form: PatientForm): boolean =>
  hasWeight(form) && hasValidAge(form);

/** Хоосон төлөвийн шалтгааныг тодорхойлоход хэрэглэнэ. */
export const inputStatus = (
  form: PatientForm,
  hasDrugs: boolean,
): InputStatus => ({
  hasWeight: hasWeight(form),
  hasAge: hasAge(form),
  ageInvalid: isAgeInvalid(form),
  hasDrugs,
});
