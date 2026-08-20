import type { FormulationAmount } from "../domain/calculation-result";
import { formatAmount } from "./format-amount";
import { formatNumber } from "./format-number";

const primaryOf = (
  amounts: readonly FormulationAmount[],
): FormulationAmount | undefined =>
  amounts.find((amount) => amount.formulation.kind === "liquid") ??
  amounts[0];

const concentrationOf = (amount: FormulationAmount): string | undefined =>
  amount.formulation.kind === "liquid"
    ? `${formatNumber(amount.formulation.mgPerMl * 5)} мг / 5 мл`
    : undefined;

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
  if (!primary) return undefined;

  const amountText = formatAmount(primary);
  const concentration = concentrationOf(primary);
  return concentration ? `= ${amountText} · ${concentration}` : `= ${amountText}`;
};
