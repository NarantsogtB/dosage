import type { DoseUnit } from "./dose-unit";

/** Шингэн хэлбэр: сироп, хөвмөл, тарилгын уусмал. */
export interface LiquidFormulation {
  readonly kind: "liquid";
  readonly id: string;
  readonly labelMn: string;
  /** Мл тутмын хүч, `strengthUnit`-ээр (анхдагч мг). */
  readonly mgPerMl: number;
  readonly strengthUnit?: DoseUnit;
  readonly availableInMn?: boolean;
}

/** Хатуу хэлбэр: шахмал, капсул. */
export interface SolidFormulation {
  readonly kind: "solid";
  readonly id: string;
  readonly labelMn: string;
  /** Нэгж тутмын хүч, `strengthUnit`-ээр (анхдагч мг). */
  readonly mgPerUnit: number;
  readonly strengthUnit?: DoseUnit;
  readonly unitMn: string;
  /** Хуваахыг зөвшөөрөх эсэх. Капсул худгүй. */
  readonly divisible: boolean;
  readonly availableInMn?: boolean;
}

export type Formulation = LiquidFormulation | SolidFormulation;
