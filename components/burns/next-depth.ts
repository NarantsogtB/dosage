import type { BurnDepth } from "@/lib/domain/body-region";

/** Дарах бүрд: сонгоогүй → II → III → I → сонгоогүй. */
const CYCLE: readonly (BurnDepth | undefined)[] = [
  "partial",
  "full",
  "superficial",
  undefined,
];

export const nextDepth = (current?: BurnDepth): BurnDepth | undefined => {
  const index = CYCLE.indexOf(current);
  return CYCLE[(index + 1) % CYCLE.length];
};
