import type { Patient } from "@/lib/domain/patient";
import {
  MAX_AGE_MONTHS,
  MAX_WEIGHT_KG,
  MIN_WEIGHT_KG,
} from "@/lib/engine/eligibility/limits";
import type { InputStatus } from "./blocker";

/**
 * Жингийн оролтын нэгж. Нярайг граммаар жигнэдэг — «3200 г»-ийг гараар
 * «3.2» болгох нь алдааны эх үүсвэр байв (HEURISTICS.md §2).
 */
export type WeightUnit = "kg" | "g";

/** Хэлбэрийн түүхий утга. Хоосон байж болно. */
export interface PatientForm {
  readonly weight: string;
  readonly weightUnit: WeightUnit;
  readonly years: string;
  readonly months: string;
}

export const EMPTY_FORM: PatientForm = {
  weight: "",
  weightUnit: "kg",
  years: "",
  months: "",
};

const MONTHS_PER_YEAR = 12;
const GRAMS_PER_KG = 1000;
const num = (value: string): number => Number(value) || 0;

const toKg = (value: number, unit: WeightUnit): number =>
  unit === "g" ? value / GRAMS_PER_KG : value;

/** Оруулсан жинг КГ-аар. Тооцоолол ҮРГЭЛЖ кг-аар явна. */
export const weightKgOf = (form: PatientForm): number =>
  toKg(num(form.weight), form.weightUnit);

/** Оролтоос тооцоололд бэлэн Patient үүсгэнэ. */
export const toPatient = (form: PatientForm): Patient => ({
  weightKg: weightKgOf(form),
  ageMonths: num(form.years) * MONTHS_PER_YEAR + num(form.months),
});

const scaleTo = (value: number, to: WeightUnit): number =>
  to === "g" ? Math.round(value * GRAMS_PER_KG) : Number((value / GRAMS_PER_KG).toFixed(3));

/**
 * Нэгж солиход бичсэн утгыг хөрвүүлнэ: 3.2 кг → 3200 г.
 *
 * Хөрвүүлэхгүй орхивол «3.2» нь 3.2 ГРАММ болж хувирна — тэр нь
 * хязгаараас гарах тул алдаа гарах ч эмч юу болсныг ойлгохгүй.
 */
export const convertWeight = (value: string, to: WeightUnit): string =>
  value === "" ? value : `${scaleTo(Number(value), to)}`;

/** Жин оруулсан бөгөөд зөвшөөрөгдсөн хязгаараас гарсан эсэх. */
export const isWeightInvalid = (form: PatientForm): boolean => {
  if (form.weight === "") return false;
  const weight = toKg(Number(form.weight), form.weightUnit);
  return weight < MIN_WEIGHT_KG || weight > MAX_WEIGHT_KG;
};

const isUnit = (value: unknown): value is WeightUnit =>
  value === "kg" || value === "g";

const text = (value: unknown): string =>
  typeof value === "string" ? value : "";

const fromRecord = (value: Record<string, unknown> | null): PatientForm => {
  if (!value || !isUnit(value.weightUnit)) return EMPTY_FORM;
  return {
    weight: text(value.weight),
    weightUnit: value.weightUnit,
    years: text(value.years),
    months: text(value.months),
  };
};

/**
 * Хадгалсан JSON-оос хэлбэрийг сэргээнэ. Эвдэрсэн, хуучин бүтэцтэй
 * утга ирвэл хоосон хэлбэр — буруу жин сэргээхээс хоосон нь аюулгүй.
 */
export const parsePatientForm = (raw: string | null): PatientForm => {
  try {
    return fromRecord(JSON.parse(raw ?? "null"));
  } catch {
    return EMPTY_FORM;
  }
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
