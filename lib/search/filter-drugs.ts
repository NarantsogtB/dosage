import type { Drug } from "../domain/drug";
import type { DrugCategory } from "../domain/category";
import type { Indication } from "../domain/indication";
import { isVerified } from "../engine/rule/drug-evidence";
import { matchDrugQuery } from "./match-drug-query";
import { indicationCodesFor, matchedIndication } from "./match-indication-query";

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

const byInn = (a: Drug, b: Drug): number => a.inn.localeCompare(b.inn);

/** Нэрээр таарсан нь заалтаар таарснаас дээр; дотроо нэрээр. */
const byRank = (query: string) => (a: Drug, b: Drug): number =>
  Number(!matchDrugQuery(a, query)) - Number(!matchDrugQuery(b, query)) || byInn(a, b);

const hitOf = (drug: Drug, query: string, codes: readonly string[]): Indication | undefined =>
  matchDrugQuery(drug, query) ? undefined : matchedIndication(drug, codes);

const hasIndication = (entry: readonly [string, Indication | undefined]): entry is [string, Indication] =>
  entry[1] !== undefined;

/** Эм бүр аль заалтаар таарсан — нэрээр таараагүй эмд л. */
export const indicationHits = (
  drugs: readonly Drug[],
  query: string,
): ReadonlyMap<string, Indication> => {
  const codes = indicationCodesFor(query);
  const entries = drugs.map((drug) => [drug.id, hitOf(drug, query, codes)] as const);
  return new Map(entries.filter(hasIndication));
};

const matchQuery = (drug: Drug, query: string, codes: readonly string[]): boolean =>
  matchDrugQuery(drug, query) || matchedIndication(drug, codes) !== undefined;

/**
 * Ангилал, хайлт (нэр эсвэл заалт), нотолгооны түвшнээр шүүнэ.
 * Нэрээр таарсан эм эхэнд, дараа нь заалтаар таарсан; тус бүр нэрээр.
 */
export const filterDrugs = (
  drugs: readonly Drug[],
  filter: DrugFilter,
): readonly Drug[] => {
  const codes = indicationCodesFor(filter.query);
  return drugs
    .filter((drug) => matchCategory(drug, filter.category) && matchQuery(drug, filter.query, codes))
    .filter((drug) => matchVerified(drug, filter.verifiedOnly))
    .slice()
    .sort(byRank(filter.query));
};
