import type { Drug } from "../domain/drug";
import type { DrugCategory } from "../domain/category";
import { isVerified } from "../engine/rule/drug-evidence";
import { matchDrugQuery } from "./match-drug-query";

export interface DrugFilter {
  readonly query: string;
  readonly category?: DrugCategory;
  /** Зөвхөн эх сурвалж баталгаажсан эмийг харуулах. */
  readonly verifiedOnly?: boolean;
}

const matchCategory = (drug: Drug, category?: DrugCategory): boolean =>
  category === undefined || drug.category === category;

const matchVerified = (drug: Drug, verifiedOnly?: boolean): boolean =>
  verifiedOnly !== true || isVerified(drug);

const matches = (drug: Drug, filter: DrugFilter): boolean =>
  matchCategory(drug, filter.category) && matchDrugQuery(drug, filter.query);

const byInn = (a: Drug, b: Drug): number => a.inn.localeCompare(b.inn);

/** Ангилал, хайлт, нотолгооны түвшнээр шүүж, нэрээр эрэмбэлнэ. */
export const filterDrugs = (
  drugs: readonly Drug[],
  filter: DrugFilter,
): readonly Drug[] =>
  drugs
    .filter((drug) => matches(drug, filter) && matchVerified(drug, filter.verifiedOnly))
    .slice()
    .sort(byInn);
