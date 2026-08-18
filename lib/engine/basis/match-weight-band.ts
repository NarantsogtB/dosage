import type { WeightBand } from "../../domain/dosing-basis";
import { isAtLeast } from "../math/is-within-range";
import { isBelow } from "../math/is-below";

/**
 * Жин тухайн мужид багтах эсэх.
 * Доод хязгаар оролцоно, дээд хязгаар оролцохгүй — мужууд давхцахгүй.
 * maxWeightKg заагаагүй бол дээд хязгааргүй.
 */
export const matchWeightBand = (band: WeightBand, weightKg: number): boolean =>
  isAtLeast(weightKg, band.minWeightKg) && isBelow(weightKg, band.maxWeightKg);
