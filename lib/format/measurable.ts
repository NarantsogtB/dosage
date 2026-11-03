import type { FormulationAmount } from "../domain/calculation-result";

/** ¼-ээс бага таблетыг хувааж өгөх боломжгүй. */
export const MIN_TABLET_FRACTION = 0.125;

/**
 * Хэмжиж өгөх боломжтой эсэх. Боломжгүй хэмжээг «¼ таблет», «0 мл» гэж
 * ХАРУУЛАХГҮЙ — ¼ нь бодит тунгаас олон дахин их, 0 нь «өгөхгүй» гэж
 * ойлгогдоно (эмчийн шийдвэр 2026-11-04).
 */
export const isMeasurable = (amount: FormulationAmount): boolean =>
  amount.formulation.kind === "liquid" ? amount.max > 0 : amount.max >= MIN_TABLET_FRACTION;
