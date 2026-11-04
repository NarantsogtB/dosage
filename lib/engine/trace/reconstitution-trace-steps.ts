import type { FormulationAmount } from "../../domain/calculation-result";
import { reconstitutionText } from "../../format/reconstitution";
import { createTraceStep, type TraceStep } from "./trace-step";

const stepOf = (amount: FormulationAmount): readonly TraceStep[] => {
  const text = reconstitutionText(amount);
  return text && amount.reconstitution
    ? [createTraceStep("Найруулга", text, amount.reconstitution.finalMgPerMl)]
    : [];
};

/** Нунтаг бэлдмэл бүрийн найруулга — «1000 мг шил + 9.6 мл … → 100 мг/мл» (Шат 6). */
export const reconstitutionTraceSteps = (amounts: readonly FormulationAmount[]): readonly TraceStep[] =>
  amounts.flatMap(stepOf);
