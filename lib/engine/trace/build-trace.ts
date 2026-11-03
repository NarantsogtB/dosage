import type { CappedDose } from "../caps/apply-caps";
import type { DoseRange } from "../../domain/dose-range";
import type { DoseUnit } from "../../domain/dose-unit";
import { DOSE_UNIT_LABELS } from "../../format/dose-unit-label";
import type { DosingRule } from "../../domain/dosing-rule";
import type { Patient } from "../../domain/patient";
import type { TraceStep } from "./trace-step";
import { capTraceSteps } from "./cap-trace-steps";
import { createTraceStep } from "./trace-step";
import { describeBasis } from "./describe-basis";
import { formatDose } from "../../format/format-dose";

export interface TraceInput {
  readonly rule: DosingRule;
  readonly patient: Patient;
  readonly capped: CappedDose;
  readonly perDose: DoseRange;
  readonly perDay: DoseRange;
  readonly dosesPerDay: number;
  readonly doseUnit: DoseUnit;
}

/** Тооцооллын бүх алхмыг дараалуулна. */
export const buildTrace = (input: TraceInput): readonly TraceStep[] => {
  const unit = DOSE_UNIT_LABELS[input.doseUnit];
  return [
    createTraceStep(
      "Үндсэн тооцоо",
      describeBasis(input.rule.basis, input.patient, input.dosesPerDay, unit),
      input.capped.range.maxMg,
    ),
    ...capTraceSteps(input.capped, unit),
    createTraceStep("Нэг удаагийн тун", formatDose(input.perDose, input.doseUnit), input.perDose.maxMg),
    createTraceStep(
      "Өдрийн нийт тун",
      `${formatDose(input.perDose, input.doseUnit)} × ${input.dosesPerDay}`,
      input.perDay.maxMg,
    ),
  ];
};
