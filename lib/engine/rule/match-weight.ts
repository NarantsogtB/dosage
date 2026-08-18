import type { DosingRule } from "../../domain/dosing-rule";
import type { Patient } from "../../domain/patient";
import { isWithinRange } from "../math/is-within-range";

/** Өвчтөний жин дүрмийн жингийн мужид багтах эсэх. */
export const matchWeight = (rule: DosingRule, patient: Patient): boolean =>
  isWithinRange(patient.weightKg, rule.weightMinKg, rule.weightMaxKg);
