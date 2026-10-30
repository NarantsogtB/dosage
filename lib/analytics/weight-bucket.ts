import type { WeightBucket } from "./events";

const BANDS: readonly (readonly [(kg: number) => boolean, WeightBucket])[] = [
  [(kg) => kg < 10, "<10"],
  [(kg) => kg < 20, "10-20"],
  [(kg) => kg <= 40, "20-40"],
];

/**
 * Жинг бүдүүн ангилалд оруулна. Яг жин analytics руу ХЭЗЭЭ Ч явахгүй.
 * Хил: 10 → "10-20", 20 → "20-40", 40 → "20-40", 40.1 → ">40".
 */
export const weightBucket = (kg: number): WeightBucket =>
  BANDS.find(([test]) => test(kg))?.[1] ?? ">40";
