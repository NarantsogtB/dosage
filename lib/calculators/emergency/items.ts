import type { Patient } from "../../domain/patient";
import type { SourceRef } from "../../domain/source";

/** Эм бус яаралтай тусламжийн утгын үр дүн (ж.нь «64 J», «16 мл»). */
export interface EmergencyValue {
  readonly value: number;
  readonly unitMn: string;
  /** Томьёо — «4 J/кг × 16 кг» (trace). */
  readonly expressionMn: string;
}

/**
 * Эм бус мөр (Шат 7): дефибрилляци, болюс, ETT г.м. Томьёо бүр `sources`-тэй;
 * эх сурвалжгүй item `/emergency`-д харагдахгүй (`lib/emergency/shown-items.ts`).
 */
export interface EmergencyItem {
  readonly id: string;
  readonly labelMn: string;
  readonly compute: (patient: Patient) => EmergencyValue | null;
  readonly sources: readonly SourceRef[];
}

/**
 * Бодит item-ууд. ХООСОН — эх сурвалж, эмчийн баталгаа хүлээж байна (Шат 7b).
 * Эмнэлзүйн тоог ишлэлгүйгээр энд бичихгүй.
 */
export const EMERGENCY_ITEMS: readonly EmergencyItem[] = [];
