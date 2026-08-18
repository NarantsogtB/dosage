import type { FormulationAmount } from "../domain/calculation-result";
import { formatRange } from "./format-range";
import { formatTabletFraction } from "./format-tablet-fraction";

const formatSolid = (amount: FormulationAmount, unitMn: string): string => {
  const min = formatTabletFraction(amount.min);
  const max = formatTabletFraction(amount.max);
  return `${min === max ? max : `${min}–${max}`} ${unitMn}`;
};

/** Бэлдмэлийн хэмжээг "5 мл" эсвэл "1½ шахмал" хэлбэрээр харуулна. */
export const formatAmount = (amount: FormulationAmount): string =>
  amount.formulation.kind === "liquid"
    ? `${formatRange(amount.min, amount.max, 0.05)} мл`
    : formatSolid(amount, amount.formulation.unitMn);
