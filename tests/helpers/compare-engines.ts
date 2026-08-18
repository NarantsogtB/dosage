import type { CalculationResult } from "@/lib/domain/calculation-result";
import type { CalculationResult as LegacyResult } from "@/lib/calculations";
import type { Patient } from "@/lib/domain/patient";

export interface Diff {
  readonly drugId: string;
  readonly patient: Patient;
  readonly field: string;
  readonly legacy: unknown;
  readonly next: unknown;
}

export interface CompareInput {
  readonly legacy: LegacyResult;
  readonly next: CalculationResult;
  readonly drugId: string;
  readonly patient: Patient;
}

const diff = (input: CompareInput, field: string, a: unknown, b: unknown) =>
  a === b
    ? null
    : { drugId: input.drugId, patient: input.patient, field, legacy: a, next: b };

const compareEligibility = (input: CompareInput): Diff | null =>
  diff(
    input,
    "type",
    input.legacy.type === "standard" ? "dosage" : "ineligible",
    input.next.type,
  );

const FIELDS = ["doseMin", "doseMax", "dailyMin", "dailyMax"] as const;

const legacyValues = (input: CompareInput): readonly number[] => {
  if (input.legacy.type !== "standard") return [];
  const { doseMin, doseMax, dailyDoseMin, dailyDoseMax } = input.legacy.data;
  return [doseMin, doseMax, dailyDoseMin, dailyDoseMax];
};

const nextValues = (input: CompareInput): readonly number[] => {
  if (input.next.type !== "dosage") return [];
  const { perDose, perDay } = input.next.data;
  return [perDose.minMg, perDose.maxMg, perDay.minMg, perDay.maxMg];
};

const compareDoses = (input: CompareInput): Diff | null => {
  const before = legacyValues(input);
  const after = nextValues(input);
  const index = FIELDS.findIndex((_, i) => before[i] !== after[i]);
  return index < 0
    ? null
    : diff(input, FIELDS[index], before[index], after[index]);
};

/** Хоёр engine-ийн үр дүнг харьцуулж, эхний ялгааг буцаана. */
export const compare = (input: CompareInput): Diff | null =>
  compareEligibility(input) ?? compareDoses(input);
