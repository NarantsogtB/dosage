import type { DoseRange } from "../../domain/dose-range";
import type { Formulation } from "../../domain/formulation";
import type { FormulationAmount } from "../../domain/calculation-result";
import { formulationAmount } from "./formulation-amount";

/** Бүх бэлдмэлээр өгөх хэмжээг тооцоолно. */
export const calculateAmounts = (
  formulations: readonly Formulation[],
  range: DoseRange,
): readonly FormulationAmount[] =>
  formulations.map((formulation) => formulationAmount(formulation, range));
