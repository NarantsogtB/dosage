import type { DoseRange } from "../../domain/dose-range";
import type { FixedBasis } from "../../domain/dosing-basis";

/** Жингээс хамааралгүй тогтмол тун. */
export const fixed = (basis: FixedBasis): DoseRange => ({
  minMg: basis.minMg,
  maxMg: basis.maxMg,
});
