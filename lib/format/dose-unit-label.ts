import type { DoseUnit } from "../domain/dose-unit";

/** Тунгийн нэгжийн монгол шошго. */
export const DOSE_UNIT_LABELS: Record<DoseUnit, string> = {
  mg: "мг",
  mcg: "мкг",
  g: "г",
  units: "ЕД",
  mmol: "ммоль",
  mL: "мл",
};
