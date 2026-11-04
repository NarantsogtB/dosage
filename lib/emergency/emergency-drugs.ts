import type { Drug } from "../domain/drug";
import type { DosingRule } from "../domain/dosing-rule";
import { EMERGENCY_INDICATIONS } from "./emergency-indications";

const isSourced = (rule: DosingRule): boolean => rule.evidenceLevel !== "E_unverified";

const isEmergency = (rule: DosingRule): boolean =>
  rule.indication !== "general" && EMERGENCY_INDICATIONS.has(rule.indication.code);

const isShown = (rule: DosingRule): boolean => isSourced(rule) && isEmergency(rule);

const withShownRules = (drug: Drug): Drug => ({ ...drug, rules: drug.rules.filter(isShown) });

const hasRules = (drug: Drug): boolean => drug.rules.length > 0;

/**
 * `/emergency`-д харагдах эмүүд (Шат 7): яаралтай заалттай (`EMERGENCY_INDICATIONS`),
 * ЗӨВХӨН эх сурвалжтай (`E_unverified` биш) дүрмүүд. Бусад дүрэм энэ хуудсанд
 * ОГТ харагдахгүй — engine тэр дүрмийг сонгох боломжгүй болно.
 */
export const emergencyDrugs = (drugs: readonly Drug[]): readonly Drug[] =>
  drugs.map(withShownRules).filter(hasRules);
