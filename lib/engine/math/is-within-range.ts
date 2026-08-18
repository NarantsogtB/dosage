/** Утга доод хязгаараас багагүй эсэх. */
export const isAtLeast = (
  value: number,
  min = Number.NEGATIVE_INFINITY,
): boolean => value >= min;

/** Утга дээд хязгаараас ихгүй эсэх. */
export const isAtMost = (
  value: number,
  max = Number.POSITIVE_INFINITY,
): boolean => value <= max;

/** Утга заасан мужид багтах эсэх. Хязгаар нь оролцоно. */
export const isWithinRange = (
  value: number,
  min?: number,
  max?: number,
): boolean => isAtLeast(value, min) && isAtMost(value, max);
