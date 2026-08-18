import type { CalculationResult } from "../domain/calculation-result";
import type { Drug } from "../domain/drug";
import type { Patient } from "../domain/patient";
import { checkEligibility } from "./eligibility/check-eligibility";
import { computeDose } from "./compute-dose";
import { ineligible, wrapIneligible } from "./ineligible";
import { selectRule } from "./rule/select-rule";

export interface CalculationOptions {
  /** Хэрэглэх заалт. Заагаагүй бол үндсэн дүрэм сонгогдоно. */
  readonly indicationCode?: string;
}

const NO_RULE = "Энэ эмийг өвчтөний нас, жинд тохируулан тооцоолох дүрэм алга.";

const withMatchingRule = (
  drug: Drug,
  patient: Patient,
  indicationCode?: string,
): CalculationResult => {
  const rule = selectRule(drug, patient, indicationCode);
  return rule
    ? computeDose(drug, rule, patient)
    : ineligible("no_matching_rule", NO_RULE);
};

/**
 * Engine-ийн ГАНЦ нийтийн орц.
 *
 * Дараалал: эрх шалгах → дүрэм сонгох → тооцоолох.
 * Эмийн id-гаар салаалсан нөхцөл энд БАЙХГҮЙ. Бүх онцлог дүрэм нь
 * DosingRule болон DoseCap хэлбэрээр өгөгдөлд байрлана.
 */
export const calculateDosage = (
  drug: Drug,
  patient: Patient,
  options: CalculationOptions = {},
): CalculationResult => {
  const blocked = checkEligibility(patient);
  return blocked
    ? wrapIneligible(blocked)
    : withMatchingRule(drug, patient, options.indicationCode);
};
