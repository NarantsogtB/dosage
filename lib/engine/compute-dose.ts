import type { CalculationResult } from "../domain/calculation-result";
import type { DosingRule } from "../domain/dosing-rule";
import type { Drug } from "../domain/drug";
import type { Patient } from "../domain/patient";
import { DOSES_PER_DAY } from "../domain/frequency";
import { buildOutcome } from "./build-outcome";
import { evaluateBasis } from "./basis/evaluate-basis";
import { ineligible } from "./ineligible";

const NO_BAND = "Өвчтөний жинд тохирох тунгийн муж олдсонгүй.";

/** Сонгосон дүрмээр тунг тооцоолно. */
export const computeDose = (
  drug: Drug,
  rule: DosingRule,
  patient: Patient,
): CalculationResult => {
  const dosesPerDay = DOSES_PER_DAY[rule.frequency];
  const base = evaluateBasis(rule.basis, patient, dosesPerDay);
  if (!base) return ineligible("no_matching_weight_band", NO_BAND);

  return {
    type: "dosage",
    data: buildOutcome({ drug, rule, patient, base, dosesPerDay }),
  };
};
