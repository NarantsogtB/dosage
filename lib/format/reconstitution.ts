import type { FormulationAmount } from "../domain/calculation-result";
import { DEFAULT_DOSE_UNIT } from "../domain/dose-unit";
import type { PowderFormulation, Reconstitution } from "../domain/formulation";
import { ROUTE_LABELS } from "../data/labels/route-labels";
import { DOSE_UNIT_LABELS } from "./dose-unit-label";
import { formatNumber } from "./format-number";

/**
 * Сонголтын түлхүүр: нэг нунтаг IV, IM хоёр найруулгатай бол хоёр мөр
 * гарна (Шат 6). `@` — хуваалцах линкийн `:` тусгаарлагчтай давхцахгүй.
 */
export const amountKey = (amount: FormulationAmount): string =>
  amount.reconstitution ? `${amount.formulation.id}@${amount.reconstitution.route}` : amount.formulation.id;

/** Түлхүүрээс бэлдмэлийн id (`ceftriaxone-1g@iv` → `ceftriaxone-1g`). */
export const formulationIdOfKey = (key: string): string => key.split("@")[0];

const textOf = (formulation: PowderFormulation, reconstitution: Reconstitution): string => {
  const unit = DOSE_UNIT_LABELS[formulation.strengthUnit ?? DEFAULT_DOSE_UNIT];
  return (
    `${formatNumber(formulation.mgPerVial)} ${unit} шил + ${formatNumber(reconstitution.diluentMl)} мл ` +
    `${reconstitution.diluentMn} → ${formatNumber(reconstitution.finalMgPerMl)} ${unit}/мл ` +
    `(${ROUTE_LABELS[reconstitution.route]})`
  );
};

/**
 * Найруулгын бичиглэл: «1000 мг шил + 9.6 мл тарилгын ус → 100 мг/мл
 * (Судсаар (IV))». Нунтаг биш бол undefined.
 */
export const reconstitutionText = (amount: FormulationAmount): string | undefined =>
  amount.formulation.kind === "powder" && amount.reconstitution
    ? textOf(amount.formulation, amount.reconstitution)
    : undefined;
