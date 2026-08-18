import type { IneligibleOutcome } from "../../domain/calculation-result";
import type { Patient } from "../../domain/patient";
import { MAX_WEIGHT_KG, MIN_WEIGHT_KG } from "./limits";
import { isWithinRange } from "../math/is-within-range";

/** Жин зөвшөөрөгдсөн хязгаарт байгаа эсэх. */
export const checkWeightRange = (
  patient: Patient,
): IneligibleOutcome | null => {
  const valid = isWithinRange(patient.weightKg, MIN_WEIGHT_KG, MAX_WEIGHT_KG);
  if (valid) return null;
  return {
    code: "weight_out_of_range",
    reasonMn: `Жин ${patient.weightKg} кг байна — зөвхөн ${MIN_WEIGHT_KG}–${MAX_WEIGHT_KG} кг-ийн хүрээнд тооцоолно.`,
  };
};
