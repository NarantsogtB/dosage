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
  powder: "0.05 мл-ээс бага — шингэлнэ",
  solid: "¼-ээс бага — тохиромжгүй",
} as const;

/** Нунтаг: найруулсан шингэний мл + шилний тоо (Шат 6). */
const formatPowder = (amount: FormulationAmount): string =>
  `${formatLiquid(amount)} · ${amount.vials ?? 1} шил`;

const FORMATTERS: Record<FormulationAmount["formulation"]["kind"], (amount: FormulationAmount) => string> = {
  liquid: formatLiquid,
  powder: formatPowder,
  solid: (amount) =>
    formatSolid(amount, amount.formulation.kind === "solid" ? amount.formulation.unitMn : ""),
};

const formatMeasurable = (amount: FormulationAmount): string =>
  FORMATTERS[amount.formulation.kind](amount);

/**
 * Бэлдмэлийн хэмжээг "5 мл", "1½ шахмал" хэлбэрээр. Хэмжиж өгөх боломжгүй
 * бол тоо биш анхааруулга («¼-ээс бага — тохиромжгүй»).
 */
export const formatAmount = (amount: FormulationAmount): string =>
  isMeasurable(amount) ? formatMeasurable(amount) : UNMEASURABLE[amount.formulation.kind];
