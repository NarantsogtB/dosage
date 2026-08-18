/** Шингэн хэлбэр: сироп, хөвмөл, тарилгын уусмал. */
export interface LiquidFormulation {
  readonly kind: "liquid";
  readonly id: string;
  readonly labelMn: string;
  readonly mgPerMl: number;
  readonly availableInMn?: boolean;
}

/** Хатуу хэлбэр: шахмал, капсул. */
export interface SolidFormulation {
  readonly kind: "solid";
  readonly id: string;
  readonly labelMn: string;
  readonly mgPerUnit: number;
  readonly unitMn: string;
  /** Хуваахыг зөвшөөрөх эсэх. Капсул худгүй. */
  readonly divisible: boolean;
  readonly availableInMn?: boolean;
}

export type Formulation = LiquidFormulation | SolidFormulation;
