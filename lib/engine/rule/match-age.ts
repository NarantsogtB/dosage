import type { DosingRule } from "../../domain/dosing-rule";
import type { Patient } from "../../domain/patient";
import { isWithinRange } from "../math/is-within-range";

/** Өвчтөний нас дүрмийн насны мужид багтах эсэх. */
export const matchAge = (rule: DosingRule, patient: Patient): boolean =>
  isWithinRange(patient.ageMonths, rule.ageMinMonths, rule.ageMaxMonths);
