import type { Drug } from "../domain/drug";
import type { Indication } from "../domain/indication";
import type { DosingRule } from "../domain/dosing-rule";
import { INDICATIONS, type IndicationCode } from "../data/labels/indications";
import { normalize } from "./normalize";

/**
 * Өвчин/заалтаар хайх (Шат 4).
 *
 * Хайлтын үг заалтын бүртгэлийн нэр эсвэл синонимд таарвал тухайн заалттай
 * ДҮРЭМТЭЙ эмүүд олдоно. «Ерөнхий» дүрэм заалт биш тул тоологдохгүй —
 * ж.нь «шээсний замын халдвар» гэсэн заалт бүртгэлд байхгүй бол олдохгүй.
 *
 * Богино үг (<3 тэмдэгт) олон синонимд санамсаргүй таарах тул хайхгүй.
 */
export const MIN_INDICATION_QUERY_LENGTH = 3;

const CODES = Object.keys(INDICATIONS) as IndicationCode[];

const termsOf = (code: IndicationCode): readonly string[] =>
  [INDICATIONS[code].labelMn, ...INDICATIONS[code].synonyms].map(normalize);

const termMatches = (needle: string) => (term: string): boolean =>
  term.includes(needle) || needle.includes(term);

/** Хайлтад таарах заалтын кодууд. */
export const indicationCodesFor = (query: string): readonly IndicationCode[] => {
  const needle = normalize(query);
  if (needle.length < MIN_INDICATION_QUERY_LENGTH) return [];
  return CODES.filter((code) => termsOf(code).some(termMatches(needle)));
};

const specificIndication = (rule: DosingRule): Indication | undefined =>
  rule.indication === "general" ? undefined : rule.indication;

/** Эмийн таарсан заалт (дүрмийн нарийвчилсан нэртэй). Байхгүй бол undefined. */
export const matchedIndication = (
  drug: Drug,
  codes: readonly string[],
): Indication | undefined =>
  drug.rules
    .map(specificIndication)
    .find((indication) => indication !== undefined && codes.includes(indication.code));
