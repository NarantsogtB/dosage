import type { Formulation } from "../../domain/formulation";
import type { FormulationAmount } from "../../domain/calculation-result";
import { formulationAmounts, type AmountContext } from "./formulation-amount";
import { matchesRoute } from "./route-match";

/**
 * Бүх бэлдмэлээр өгөх хэмжээ. Дүрмийн замд тохирохгүй (Шат 6) эсвэл нэгж
 * нийцэхгүй (S4) бэлдмэлийг алгасна.
 */
export const calculateAmounts = (
  formulations: readonly Formulation[],
  ctx: AmountContext,
): readonly FormulationAmount[] =>
  formulations
    .filter((formulation) => matchesRoute(formulation, ctx.route))
    .flatMap((formulation) => formulationAmounts(formulation, ctx));
