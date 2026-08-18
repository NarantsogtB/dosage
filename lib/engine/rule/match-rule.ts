import type { DosingRule } from "../../domain/dosing-rule";
import type { Patient } from "../../domain/patient";
import { matchAge } from "./match-age";
import { matchIndication } from "./match-indication";
import { matchWeight } from "./match-weight";

/** Дүрэм өвчтөнд бүрэн тохирох эсэх. */
export const matchRule = (
  rule: DosingRule,
  patient: Patient,
  indicationCode?: string,
): boolean =>
  matchAge(rule, patient) &&
  matchWeight(rule, patient) &&
  matchIndication(rule, indicationCode);
