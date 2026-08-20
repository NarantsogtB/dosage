import type { Patient } from "../../domain/patient";

/** Стандарт болюсын хэмжээ, мл/кг. */
export const BOLUS_ML_PER_KG = 20;

/** Хүнд хоол тэжээлийн дутагдалтай хүүхдэд бага болюс. */
export const MALNOURISHED_BOLUS_ML_PER_KG = 10;

/**
 * Нэг болюсын эзэлхүүн.
 *
 * ⚠️ ЭХ СУРВАЛЖ ХАВСРАГДААГҮЙ. TODO: WHO Pocket Book Ch.1 (шок).
 * Хүнд хоол тэжээлийн дутагдалтай хүүхдэд стандарт болюс АЮУЛТАЙ —
 * зүрхний дутагдал үүсгэж болзошгүй тул тусад нь тооцоолно.
 */
export const bolusMl = (patient: Patient, malnourished = false): number =>
  patient.weightKg *
  (malnourished ? MALNOURISHED_BOLUS_ML_PER_KG : BOLUS_ML_PER_KG);
