/**
 * Хурдын тун — ЗӨВХӨН төрөл (Шат S4). `DosingBasis` union-д ОРООГҮЙ:
 * engine тооцоолохгүй, UI харуулахгүй. Тооцоолол, хуудас — infusion шатанд
 * (docs/roadmap/README.md «ороогүй» хэсэг).
 *
 * Жишээ: adrenaline 0.05–1 мкг/кг/мин, морфин 10–40 мкг/кг/цаг.
 */
export type RateUnit = "mcg/kg/min" | "mg/kg/h" | "mcg/kg/h" | "units/kg/h" | "mL/kg/h";

export interface InfusionRateBasis {
  readonly kind: "infusion_rate";
  readonly unit: RateUnit;
  readonly minPerKg: number;
  readonly maxPerKg: number;
}
