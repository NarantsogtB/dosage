import type { DoseUnit } from "./dose-unit";
import type { Route } from "./route";

/** Шингэн хэлбэр: сироп, хөвмөл, тарилгын уусмал (ампул). */
export interface LiquidFormulation {
  readonly kind: "liquid";
  readonly id: string;
  readonly labelMn: string;
  /** Мл тутмын хүч, `strengthUnit`-ээр (анхдагч мг). */
  readonly mgPerMl: number;
  readonly strengthUnit?: DoseUnit;
  /** Хэрэглэх зам. Анхдагч амаар; ампул бол `["iv", "im"]` г.м. (Шат 6). */
  readonly routes?: readonly Route[];
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
  readonly routes?: readonly Route[];
  readonly availableInMn?: boolean;
}

/**
 * Найруулах арга (Шат 6). `finalMgPerMl` нь ЭХ СУРВАЛЖИЙН эцсийн концентрац —
 * шилний нунтаг эзэлхүүн нэмдэг (displacement) тул шил ÷ шингэн-ээр
 * ТООЦООЛОХГҮЙ.
 */
export interface Reconstitution {
  readonly route: "iv" | "im";
  /** Найруулах шингэн: «тарилгын ус», «1% лидокаин» г.м. */
  readonly diluentMn: string;
  readonly diluentMl: number;
  /** Найруулсны дараах концентрац, `strengthUnit`-ээр мл тутамд. */
  readonly finalMgPerMl: number;
}

/** Нунтаг шил (флакон) — найруулж хэрэглэнэ. */
export interface PowderFormulation {
  readonly kind: "powder";
  readonly id: string;
  readonly labelMn: string;
  /** Нэг шилэн дэх хэмжээ, `strengthUnit`-ээр. */
  readonly mgPerVial: number;
  readonly strengthUnit?: DoseUnit;
  readonly reconstitutions: readonly Reconstitution[];
  readonly availableInMn?: boolean;
}

export type Formulation = LiquidFormulation | SolidFormulation | PowderFormulation;
