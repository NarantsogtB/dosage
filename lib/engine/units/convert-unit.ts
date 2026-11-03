import { DEFAULT_DOSE_UNIT, type DoseUnit } from "../../domain/dose-unit";
import type { DosingRule } from "../../domain/dosing-rule";
import type { Formulation } from "../../domain/formulation";

/** Масс бүлэг мкг-аар. Бусад нэгж (ЕД, ммоль, мл) хөрвөхгүй. */
const MCG_PER: Partial<Record<DoseUnit, number>> = { g: 1_000_000, mg: 1000, mcg: 1 };

const massConvert = (value: number, from: DoseUnit, to: DoseUnit): number | null => {
  const fromMcg = MCG_PER[from];
  const toMcg = MCG_PER[to];
  return fromMcg && toMcg ? (value * fromMcg) / toMcg : null;
};

/**
 * Тоог нэг нэгжээс нөгөө рүү. Хөрвөхгүй (ж.нь ЕД ↔ мг) бол `null` —
 * engine нэгжийг хольж тооцоолохгүй.
 */
export const convertAmount = (value: number, from: DoseUnit, to: DoseUnit): number | null =>
  from === to ? value : massConvert(value, from, to);

/** Хоёр нэгж хоорондоо хөрвөх эсэх. */
export const isConvertible = (from: DoseUnit, to: DoseUnit): boolean =>
  convertAmount(1, from, to) !== null;

/** Дүрмийн тунгийн нэгж (анхдагч мг). */
export const doseUnitOf = (rule: DosingRule): DoseUnit => rule.doseUnit ?? DEFAULT_DOSE_UNIT;

/** Бэлдмэлийн хүчний нэгж (анхдагч мг). */
export const strengthUnitOf = (formulation: Formulation): DoseUnit =>
  formulation.strengthUnit ?? DEFAULT_DOSE_UNIT;
