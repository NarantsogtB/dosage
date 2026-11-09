import type { WeightUnit } from "@/components/calculator/patient-form";

/** Тохиргоо — зөвхөн урьдчилсан сонголт. Өвчтөний мэдээлэл ЭНД орохгүй. */
export interface Prefs {
  readonly weightUnit: WeightUnit;
}

export const DEFAULT_PREFS: Prefs = { weightUnit: "kg" };

const parseJson = (raw: string): unknown => {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const isRecord = (value: unknown): value is { weightUnit?: unknown } =>
  typeof value === "object" && value !== null;

const unitOf = (value: unknown): WeightUnit =>
  isRecord(value) && value.weightUnit === "g" ? "g" : "kg";

/** localStorage-ийн түүхий утга. Эвдэрсэн, үл таних утга → анхдагч. */
export const parsePrefs = (raw: string | null): Prefs =>
  raw === null ? DEFAULT_PREFS : { weightUnit: unitOf(parseJson(raw)) };
