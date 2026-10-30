import type { IneligibleOutcome } from "../../domain/calculation-result";
import type { Patient } from "../../domain/patient";
import { MAX_AGE_MONTHS } from "./limits";
import { isAtMost } from "../math/is-within-range";

/**
 * Нас зөвшөөрөгдсөн (хүүхдийн) хязгаарт багтах эсэх.
 *
 * dosage.mn ЗӨВХӨН хүүхдийн жинд суурилсан (мг/кг) тун тооцоолдог.
 * 18-с дээш насанд ихэнх эм ФИКС тунтай (жингээс үл хамаарна) болж,
 * эмч титрацдаг тул мг/кг томьёог үргэлжлүүлэн ашиглах нь буруу.
 */
export const checkAgeRange = (patient: Patient): IneligibleOutcome | null => {
  const valid = isAtMost(patient.ageMonths, MAX_AGE_MONTHS);
  if (valid) return null;
  return {
    code: "age_out_of_range",
    reasonMn:
      "dosage.mn зөвхөн хүүхдийн (0–18 нас) жинд суурилсан тунг " +
      "тооцоолдог. Насанд хүрэгчийн тун ихэвчлэн ФИКС байдаг (жингээс үл " +
      "хамаарна) бөгөөд эмчийн клиникийн шийдвэрээр титрацдаг тул энд " +
      "тооцоологдохгүй.",
  };
};
