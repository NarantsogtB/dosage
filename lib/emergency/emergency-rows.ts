import type { DosageOutcome, FormulationAmount } from "../domain/calculation-result";
import type { Drug } from "../domain/drug";
import type { Patient } from "../domain/patient";
import type { EmergencyItem, EmergencyValue } from "../calculators/emergency/items";
import { calculateDosage } from "../engine";
import type { DosingRule } from "../domain/dosing-rule";
import type { Route } from "../domain/route";
import { applicableRules } from "../engine/rule/applicable-rules";
import { primaryOf } from "../format/primary-formulation-line";

/** Нэг эмийн нэг заалтын мөр. */
export interface EmergencyDrugRow {
  readonly key: string;
  readonly drug: Drug;
  readonly indicationMn: string;
  readonly outcome: DosageOutcome;
  readonly amount?: FormulationAmount;
}

export interface EmergencyItemRow {
  readonly item: EmergencyItem;
  readonly value: EmergencyValue;
}

/** Мөрийн түлхүүр: заалт × зам (диазепам — IV/IO ба шулуун гэдэс тусдаа). */
interface RowSlot {
  readonly code: string;
  readonly labelMn: string;
  readonly route: Route;
}

const slotOf = (rule: DosingRule): readonly RowSlot[] =>
  rule.indication === "general" ? [] : [{ ...rule.indication, route: rule.route }];

const slotKey = (drug: Drug, slot: RowSlot): string => `${drug.id}:${slot.code}:${slot.route}`;

const slotsOf = (drug: Drug, patient: Patient): readonly RowSlot[] => {
  const seen = new Map<string, RowSlot>();
  applicableRules(drug, patient).flatMap(slotOf).forEach((slot) => seen.set(slotKey(drug, slot), slot));
  return [...seen.values()];
};

/** Тухайн замын дүрмүүдээр л engine-ийг дуудна — сонголт engine-д. */
const onRoute = (drug: Drug, route: Route): Drug => ({
  ...drug,
  rules: drug.rules.filter((rule) => rule.route === route),
});

const rowOf = (drug: Drug, patient: Patient) => (slot: RowSlot): readonly EmergencyDrugRow[] => {
  const result = calculateDosage(onRoute(drug, slot.route), patient, { indicationCode: slot.code });
  if (result.type !== "dosage") return [];
  return [{
    key: slotKey(drug, slot),
    drug,
    indicationMn: slot.labelMn,
    outcome: result.data,
    amount: primaryOf(result.data.amounts),
  }];
};

/**
 * Эм бүрийн өвчтөнд тохирох ЗААЛТ × ЗАМ бүрд нэг мөр (ж.нь adrenaline — зүрх
 * зогсолт IV/IO, анафилакси IM). Тооцоолол бүхэлдээ engine-ээр.
 */
export const emergencyDrugRows = (drugs: readonly Drug[], patient: Patient): readonly EmergencyDrugRow[] =>
  drugs.flatMap((drug) => slotsOf(drug, patient).flatMap(rowOf(drug, patient)));

const itemRowOf = (patient: Patient) => (item: EmergencyItem): readonly EmergencyItemRow[] => {
  const value = item.compute(patient);
  return value ? [{ item, value }] : [];
};

/** Эм бус мөрүүд — тооцоолох боломжгүй (null) бол алгасна. */
export const emergencyItemRows = (items: readonly EmergencyItem[], patient: Patient): readonly EmergencyItemRow[] =>
  items.flatMap(itemRowOf(patient));
