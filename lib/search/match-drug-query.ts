import type { Drug } from "../domain/drug";
import { normalize } from "./normalize";

/**
 * Хайх талбарууд: латин INN болон кирилл INN.
 * Эмч "paracetamol" ч, "парацетамол" ч бичиж болно.
 * Худалдааны нэр ЗОРИУД байхгүй — docs/SOURCES.md үз.
 */
const haystack = (drug: Drug): readonly string[] => [
  normalize(drug.inn),
  normalize(drug.innMn),
];

/** Хоосон хайлт бүх эмд тохирно. */
export const matchDrugQuery = (drug: Drug, query: string): boolean => {
  const needle = normalize(query);
  return needle === "" || haystack(drug).some((hay) => hay.includes(needle));
};
