import type { Drug } from "../domain/drug";
import type { DosingRule } from "../domain/dosing-rule";

const isSourced = (rule: DosingRule): boolean => rule.evidenceLevel !== "E_unverified";

const withSourcedRules = (drug: Drug): Drug => ({ ...drug, rules: drug.rules.filter(isSourced) });

const hasRules = (drug: Drug): boolean => drug.rules.length > 0;

/**
 * `/emergency`-д харагдах эмүүд (Шат 7): `category: "emergency"`, ЗӨВХӨН эх
 * сурвалжтай (`E_unverified` биш) дүрмүүдтэй. Эх сурвалжгүй дүрэм энэ хуудсанд
 * ОГТ харагдахгүй — engine тэр дүрмийг сонгох боломжгүй болно.
 */
export const emergencyDrugs = (drugs: readonly Drug[]): readonly Drug[] =>
  drugs
    .filter((drug) => drug.category === "emergency")
    .map(withSourcedRules)
    .filter(hasRules);
