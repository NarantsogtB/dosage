/** Утга дээд хязгаараас бага эсэх. Хязгаар оролцохгүй. */
export const isBelow = (
  value: number,
  max = Number.POSITIVE_INFINITY,
): boolean => value < max;
