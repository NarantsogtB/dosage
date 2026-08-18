import type { CappedDose } from "../caps/apply-caps";
import type { DoseRange } from "../../domain/dose-range";
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
}

/** Тооцооллын бүх алхмыг дараалуулна. */
export const buildTrace = (input: TraceInput): readonly TraceStep[] => [
  createTraceStep(
    "Үндсэн тооцоо",
    describeBasis(input.rule.basis, input.patient, input.dosesPerDay),
    input.capped.range.maxMg,
  ),
  ...capTraceSteps(input.capped),
  createTraceStep(
    "Нэг удаагийн тун",
    formatDose(input.perDose),
    input.perDose.maxMg,
  ),
  createTraceStep(
    "Өдрийн нийт тун",
    `${formatDose(input.perDose)} × ${input.dosesPerDay}`,
    input.perDay.maxMg,
  ),
];
