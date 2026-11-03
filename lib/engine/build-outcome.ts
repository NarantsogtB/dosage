import type { DosageOutcome } from "../domain/calculation-result";
import type { DoseRange } from "../domain/dose-range";
import type { DosingRule } from "../domain/dosing-rule";
import type { Drug } from "../domain/drug";
import type { Patient } from "../domain/patient";
import { applyCaps } from "./caps/apply-caps";
import { buildTrace } from "./trace/build-trace";
import { calculateAmounts } from "./formulation/calculate-amounts";
import { roundRange } from "./math/round-range";
import { scaleRange } from "./math/scale-range";
import { doseUnitOf } from "./units/convert-unit";

export interface OutcomeInput {
  readonly drug: Drug;
  readonly rule: DosingRule;
  readonly patient: Patient;
  readonly base: DoseRange;
  readonly dosesPerDay: number;
}

/** Хязгаар тавьж, тоймлож, эцсийн үр дүнг угсарна. */
export const buildOutcome = (input: OutcomeInput): DosageOutcome => {
  const { drug, rule, patient, base, dosesPerDay } = input;
  const capped = applyCaps(base, rule.caps, patient, dosesPerDay);
  const perDose = roundRange(capped.range);
  const perDay = roundRange(scaleRange(perDose, dosesPerDay));
  const doseUnit = doseUnitOf(rule);

  return {
    rule,
    doseUnit,
    perDose,
    perDay,
    frequency: rule.frequency,
    dosesPerDay,
    amounts: calculateAmounts(drug.formulations, perDose, doseUnit),
    cappedAtMax: capped.cappedAtMax,
    limitMg: capped.limitMg,
    warnings: drug.warnings,
    trace: buildTrace({ rule, patient, capped, perDose, perDay, dosesPerDay, doseUnit }),
    sources: [...drug.sources, ...rule.sources],
  };
};
