import type { FormulationAmount } from "../domain/calculation-result";
import { formatRange } from "./format-range";
import { formatTabletFraction } from "./format-tablet-fraction";
import { isMeasurable } from "./measurable";

const formatSolid = (amount: FormulationAmount, unitMn: string): string => {
  const min = formatTabletFraction(amount.min);
  const max = formatTabletFraction(amount.max);
  return `${min === max ? max : `${min}–${max}`} ${unitMn}`;
};

/** 0 мл болж тоймлогдсон доод утгыг «<0.05» гэж. */
const volumeOf = (ml: number): string => (ml > 0 ? formatRange(ml, ml) : "<0.05");

const formatLiquid = (amount: FormulationAmount): string =>
  amount.min === amount.max || amount.min > 0
    ? `${formatRange(amount.min, amount.max, 0.05)} мл`
    : `${volumeOf(amount.min)}–${volumeOf(amount.max)} мл`;

const UNMEASURABLE = {
  liquid: "0.05 мл-ээс бага — шингэлнэ",
  solid: "¼-ээс бага — тохиромжгүй",
} as const;

const formatMeasurable = (amount: FormulationAmount): string =>
  amount.formulation.kind === "liquid"
    ? formatLiquid(amount)
    : formatSolid(amount, amount.formulation.unitMn);

/**
 * Бэлдмэлийн хэмжээг "5 мл", "1½ шахмал" хэлбэрээр. Хэмжиж өгөх боломжгүй
 * бол тоо биш анхааруулга («¼-ээс бага — тохиромжгүй»).
 */
export const formatAmount = (amount: FormulationAmount): string =>
  isMeasurable(amount) ? formatMeasurable(amount) : UNMEASURABLE[amount.formulation.kind];
