import type { DosageOutcome, FormulationAmount } from "../domain/calculation-result";
import type { Drug } from "../domain/drug";
import type { Patient } from "../domain/patient";
import type { EmergencyItem, EmergencyValue } from "../calculators/emergency/items";
import { calculateDosage } from "../engine";
import { listIndications, type IndicationOption } from "../engine/rule/list-indications";
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

const rowOf = (drug: Drug, patient: Patient) => (option: IndicationOption): readonly EmergencyDrugRow[] => {
  const result = calculateDosage(drug, patient, { indicationCode: option.code });
  if (result.type !== "dosage") return [];
  return [{
    key: `${drug.id}:${option.code ?? "general"}`,
    drug,
    indicationMn: option.labelMn,
    outcome: result.data,
    amount: primaryOf(result.data.amounts),
  }];
};

/**
 * Эм бүрийн өвчтөнд тохирох ЗААЛТ бүрд нэг мөр (ж.нь adrenaline — зүрх
 * зогсолт, анафилакси). Тооцоолол бүхэлдээ engine-ээр.
 */
export const emergencyDrugRows = (drugs: readonly Drug[], patient: Patient): readonly EmergencyDrugRow[] =>
  drugs.flatMap((drug) => listIndications(drug, patient).flatMap(rowOf(drug, patient)));

const itemRowOf = (patient: Patient) => (item: EmergencyItem): readonly EmergencyItemRow[] => {
  const value = item.compute(patient);
  return value ? [{ item, value }] : [];
};

/** Эм бус мөрүүд — тооцоолох боломжгүй (null) бол алгасна. */
export const emergencyItemRows = (items: readonly EmergencyItem[], patient: Patient): readonly EmergencyItemRow[] =>
  items.flatMap(itemRowOf(patient));
