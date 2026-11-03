import type { FormulationAmount } from "../domain/calculation-result";
import { formatAmount } from "./format-amount";
import { formatNumber } from "./format-number";
import { isMeasurable } from "./measurable";
import { DEFAULT_DOSE_UNIT } from "../domain/dose-unit";
import { DOSE_UNIT_LABELS } from "./dose-unit-label";

const isLiquid = (amount: FormulationAmount): boolean => amount.formulation.kind === "liquid";

/**
 * Анхдагч хэлбэр: хэмжиж өгөх боломжтой шингэн → боломжтой бусад → эхний
 * шингэн → эхнийх. Хэмжих боломжгүй хэлбэр анхдагч болохгүй.
 */
const preferLiquid = (amounts: readonly FormulationAmount[]): FormulationAmount | undefined =>
  amounts.find(isLiquid) ?? amounts[0];

export const primaryOf = (
  amounts: readonly FormulationAmount[],
): FormulationAmount | undefined =>
  preferLiquid(amounts.filter(isMeasurable)) ?? preferLiquid(amounts);

export const concentrationOf = (amount: FormulationAmount): string | undefined =>
  amount.formulation.kind === "liquid"
    ? `${formatNumber(amount.formulation.mgPerMl * 5)} ${DOSE_UNIT_LABELS[amount.formulation.strengthUnit ?? DEFAULT_DOSE_UNIT]} / 5 мл`
    : undefined;

/** Нэг хэлбэрийн хөрвүүлгийн мөр: "= 7.5 мл · 250 мг / 5 мл". */
export const formulationLine = (amount: FormulationAmount): string => {
  const amountText = formatAmount(amount);
  const concentration = concentrationOf(amount);
  return concentration ? `= ${amountText} · ${concentration}` : `= ${amountText}`;
};

/**
 * Тунгийн зурвасын доор гарах хөрвүүлгийн мөр: "= 7.5 мл · 250 мг / 5 мл".
 *
 * Хамгийн эхний ШИНГЭН хэлбэрийг сонгоно (эмч ихэвчлэн шингэнээр эхэлдэг,
 * бага насны хүүхдэд); байхгүй бол эхний хэлбэрийг. Концентраци нь
 * `mgPerMl`-ээс тооцоологдоно (labelMn-ийг задлан шинжлэхгүй) — эх сурвалж
 * нь бүтэцтэй өгөгдөл, чөлөөт текст биш.
 */
export const primaryFormulationLine = (
  amounts: readonly FormulationAmount[],
): string | undefined => {
  const primary = primaryOf(amounts);
  return primary ? formulationLine(primary) : undefined;
};
