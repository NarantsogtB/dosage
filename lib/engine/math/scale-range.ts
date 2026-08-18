import type { DoseRange } from "../../domain/dose-range";

/** Тунгийн мужийг үржүүлэгчээр өөрчилнө. */
export const scaleRange = (range: DoseRange, factor: number): DoseRange => ({
  minMg: range.minMg * factor,
  maxMg: range.maxMg * factor,
});
