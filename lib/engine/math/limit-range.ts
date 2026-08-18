import type { DoseRange } from "../../domain/dose-range";

/** Тунгийн мужийг дээд хязгаараар таслана. */
export const limitRange = (range: DoseRange, limitMg: number): DoseRange => ({
  minMg: Math.min(range.minMg, limitMg),
  maxMg: Math.min(range.maxMg, limitMg),
});
