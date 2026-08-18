import type { CappedDose } from "../caps/apply-caps";
import { createTraceStep, type TraceStep } from "./trace-step";
import { roundDose } from "../math/round-dose";

/** Дээд хязгаар үйлчилсэн үед л алхам нэмнэ. */
export const capTraceSteps = (capped: CappedDose): readonly TraceStep[] =>
  capped.cappedAtMax
    ? [
        createTraceStep(
          "Дээд хязгаар",
          `${roundDose(capped.limitMg)} мг-аар таслав`,
          roundDose(capped.limitMg),
        ),
      ]
    : [];
