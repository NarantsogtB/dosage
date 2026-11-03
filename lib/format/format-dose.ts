import type { DoseRange } from "../domain/dose-range";
import { DEFAULT_DOSE_UNIT, type DoseUnit } from "../domain/dose-unit";
import { DOSE_UNIT_LABELS } from "./dose-unit-label";
import { formatRange } from "./format-range";

const TOLERANCE = 0.01;
const MCG_PER_MG = 1000;

const rangeText = (range: DoseRange, unit: DoseUnit): string =>
  `${formatRange(range.minMg, range.maxMg, TOLERANCE)} ${DOSE_UNIT_LABELS[unit]}`;

const scaled = (range: DoseRange, factor: number): DoseRange => ({
  minMg: range.minMg * factor,
  maxMg: range.maxMg * factor,
});

/**
 * Мкг ↔ мг төөрөлдөөнөөс сэргийлэх давхар бичиглэл (Шат S4) — хүүхдийн
 * 10× алдааны түгээмэл эх: 1 мг-аас бага мг-ийн тунд мкг-ийг, 1000 мкг ба
 * түүнээс их мкг-ийн тунд мг-ийг хаалтад.
 */
const ALTERNATES: Partial<Record<DoseUnit, (range: DoseRange) => string | undefined>> = {
  mg: (range) => (range.maxMg < 1 ? rangeText(scaled(range, MCG_PER_MG), "mcg") : undefined),
  mcg: (range) => (range.minMg >= MCG_PER_MG ? rangeText(scaled(range, 1 / MCG_PER_MG), "mg") : undefined),
};

/** Нөгөө нэгжээрх бичиглэл — хэрэггүй бол undefined. */
export const alternateDose = (range: DoseRange, unit: DoseUnit): string | undefined =>
  ALTERNATES[unit]?.(range);

/**
 * Тунгийн муж: «180 мг», «120–180 мг», «0.1 мг (100 мкг)», «2 ЕД».
 * Нэгж заагаагүй бол мг (одоогийн бүх өгөгдөл).
 */
export const formatDose = (range: DoseRange, unit: DoseUnit = DEFAULT_DOSE_UNIT): string => {
  const alternate = alternateDose(range, unit);
  return alternate ? `${rangeText(range, unit)} (${alternate})` : rangeText(range, unit);
};
