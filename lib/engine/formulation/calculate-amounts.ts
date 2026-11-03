import type { DoseRange } from "../../domain/dose-range";
import type { DoseUnit } from "../../domain/dose-unit";
import type { Formulation } from "../../domain/formulation";
import type { FormulationAmount } from "../../domain/calculation-result";
import { formulationAmount } from "./formulation-amount";

const isAmount = (amount: FormulationAmount | null): amount is FormulationAmount => amount !== null;

/** Бүх бэлдмэлээр өгөх хэмжээ. Нэгж нь нийцэхгүй бэлдмэлийг алгасна. */
export const calculateAmounts = (
  formulations: readonly Formulation[],
  range: DoseRange,
  doseUnit: DoseUnit,
): readonly FormulationAmount[] =>
  formulations.map((formulation) => formulationAmount(formulation, range, doseUnit)).filter(isAmount);
