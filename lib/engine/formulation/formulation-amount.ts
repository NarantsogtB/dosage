import type { Formulation } from "../../domain/formulation";
import type { FormulationAmount } from "../../domain/calculation-result";
import type { DoseRange } from "../../domain/dose-range";
import type { DoseUnit } from "../../domain/dose-unit";
import { roundVolume } from "../math/round-volume";
import { convertAmount, strengthUnitOf } from "../units/convert-unit";

const strengthOf = (formulation: Formulation): number =>
  formulation.kind === "liquid" ? formulation.mgPerMl : formulation.mgPerUnit;

/** Шингэнийг мл (тоймлосон), хатууг ширхэгээр (тоймлохгүй). */
const amountOf = (formulation: Formulation, dose: number, strength: number): number =>
  formulation.kind === "liquid" ? roundVolume(dose / strength) : dose / strength;

/**
 * Нэг бэлдмэлээр өгөх доод/дээд хэмжээ. Бэлдмэлийн хүчийг дүрмийн нэгж рүү
 * хөрвүүлнэ (ж.нь 1 мг/мл → 1000 мкг/мл). Хөрвөхгүй бол `null` — буруу мл
 * гаргахаас аюулгүй (Шат S4).
 */
export const formulationAmount = (
  formulation: Formulation,
  range: DoseRange,
  doseUnit: DoseUnit,
): FormulationAmount | null => {
  const strength = convertAmount(strengthOf(formulation), strengthUnitOf(formulation), doseUnit);
  if (strength === null) return null;
  return {
    formulation,
    min: amountOf(formulation, range.minMg, strength),
    max: amountOf(formulation, range.maxMg, strength),
  };
};
