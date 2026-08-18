import { formatNumber } from "./format-number";

/** Доод/дээд утга ойролцоо бол нэг тоо, эс бөгөөс мужаар харуулна. */
export const formatRange = (
  min: number,
  max: number,
  tolerance = 0.001,
): string => {
  const same = Math.abs(min - max) < tolerance;
  return same
    ? formatNumber(max)
    : `${formatNumber(min)}–${formatNumber(max)}`;
};
