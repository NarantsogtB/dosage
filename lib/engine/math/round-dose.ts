import { roundTo } from "./round-to";

/** 1 мг-аас бага тунг 2 орноор, бусдыг 1 орноор тоймлоно. */
export const roundDose = (mg: number): number =>
  mg < 1 ? roundTo(mg, 2) : roundTo(mg, 1);
