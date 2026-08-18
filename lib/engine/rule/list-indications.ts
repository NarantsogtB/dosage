import type { Drug } from "../../domain/drug";
import type { DosingRule } from "../../domain/dosing-rule";
import type { Patient } from "../../domain/patient";
import { applicableRules } from "./applicable-rules";

/** UI-д харуулах заалтын сонголт. code === undefined бол ерөнхий дүрэм. */
export interface IndicationOption {
  readonly code?: string;
  readonly labelMn: string;
}

const GENERAL: IndicationOption = { labelMn: "Ерөнхий" };

const toOption = (rule: DosingRule): IndicationOption =>
  rule.indication === "general"
    ? GENERAL
    : { code: rule.indication.code, labelMn: rule.indication.labelMn };

const dedupe = (
  options: readonly IndicationOption[],
): readonly IndicationOption[] => {
  const seen = new Map<string, IndicationOption>();
  options.forEach((option) => seen.set(option.code ?? "", option));
  return [...seen.values()];
};

/** Өвчтөнд ТОХИРОХ заалтуудыг давхардуулалгүй жагсаана. */
export const listIndications = (
  drug: Drug,
  patient: Patient,
): readonly IndicationOption[] =>
  dedupe(applicableRules(drug, patient).map(toOption));

/** Сонголт хийх шаардлагатай эсэх — нэг л заалттай бол хэрэггүй. */
export const hasIndicationChoice = (drug: Drug, patient: Patient): boolean =>
  listIndications(drug, patient).length > 1;
