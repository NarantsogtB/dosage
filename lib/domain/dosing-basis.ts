/** Жингийн муж бүрд оногдох тогтмол тун. */
export interface WeightBand {
  readonly minWeightKg: number;
  /** Заагаагүй бол дээд хязгааргүй. */
  readonly maxWeightKg?: number;
  readonly doseMg: number;
}

/** мг/кг — НЭГ УДААГИЙН тун. */
export interface PerKgPerDoseBasis {
  readonly kind: "per_kg_per_dose";
  readonly minMgPerKg: number;
  readonly maxMgPerKg: number;
}

/** мг/кг/өдөр — ӨДРИЙН НИЙТ тун. */
export interface PerKgPerDayBasis {
  readonly kind: "per_kg_per_day";
  readonly minMgPerKg: number;
  readonly maxMgPerKg: number;
}

/** Жингийн мужаар тогтоосон тун. */
export interface WeightBandBasis {
  readonly kind: "weight_band";
  readonly bands: readonly WeightBand[];
}

/** Жингээс хамааралгүй тогтмол тун. */
export interface FixedBasis {
  readonly kind: "fixed";
  readonly minMg: number;
  readonly maxMg: number;
}

export type DosingBasis =
  | PerKgPerDoseBasis
  | PerKgPerDayBasis
  | WeightBandBasis
  | FixedBasis;
