import type { Patient } from "../../domain/patient";
import type { SourceRef } from "../../domain/source";
import { bolusMl } from "../fluid/bolus";

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

const RCH_RESUSCITATION_BOLUS: SourceRef = {
  sourceId: "rch-melbourne-resuscitation",
  locator: "Resuscitation — Circulation (Last updated December 2025)",
  quotedValue: "IV/IO crystalloid bolus of 10-20 mL/kg",
};

const RCH_IV_FLUIDS_BOLUS: SourceRef = {
  sourceId: "rch-melbourne-iv-fluids",
  locator: "Intravenous fluids — Resuscitation fluids (2026-01)",
  quotedValue: "Give a bolus of 10-20 mL/kg of sodium chloride 0.9% as fast as possible, and reassess",
};

const WHO_SHOCK_BOLUS: SourceRef = {
  sourceId: "who-pocketbook-2",
  locator: "Chart 7 — How to give intravenous fluids rapidly for shock, p. 13",
  quotedValue: "Infuse 20 ml/kg as rapidly as possible",
};

const bolusItem = (mlPerKg: number, sources: readonly SourceRef[]): EmergencyItem => ({
  id: `bolus-${mlPerKg}`,
  labelMn: `Болюс ${mlPerKg} мл/кг (0.9% NaCl) — шок`,
  compute: (patient) => ({
    value: bolusMl(patient, mlPerKg),
    unitMn: "мл",
    expressionMn: `${mlPerKg} мл/кг × ${patient.weightKg} кг`,
  }),
  sources,
});

/**
 * Бодит item-ууд (Шат 7b, эмч баталсан 2026-11-04). Эмнэлзүйн тоог ишлэлгүйгээр
 * энд бичихгүй. Хүнд хоол тэжээлийн дутагдалд стандарт болюс тохиромжгүй —
 * `/fluids`-ийг үз.
 */
export const EMERGENCY_ITEMS: readonly EmergencyItem[] = [
  bolusItem(10, [RCH_RESUSCITATION_BOLUS, RCH_IV_FLUIDS_BOLUS]),
  bolusItem(20, [RCH_RESUSCITATION_BOLUS, WHO_SHOCK_BOLUS]),
];
