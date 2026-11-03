import { describe, expect, it } from "vitest";
import type { DosingRule } from "@/lib/domain/dosing-rule";
import { ALL_DRUGS } from "@/lib/data/drugs";
import { INDICATIONS, isIndicationCode } from "@/lib/data/labels/indications";

const isSpecific = (rule: DosingRule): boolean => rule.indication !== "general";
const rulesOf = (drug: (typeof ALL_DRUGS)[number]): readonly DosingRule[] => drug.rules;
const specificRules = (): readonly DosingRule[] => ALL_DRUGS.flatMap(rulesOf).filter(isSpecific);

const codeOf = (rule: DosingRule): string =>
  rule.indication === "general" ? "general" : rule.indication.code;

const labelMatches = (rule: DosingRule): boolean =>
  rule.indication !== "general" &&
  isIndicationCode(rule.indication.code) &&
  rule.indication.labelMn.startsWith(INDICATIONS[rule.indication.code].labelMn);

const isLowerCase = (text: string): boolean => text === text.toLowerCase();
const isUpperCaseSome = (text: string): boolean => !isLowerCase(text);
const isUnknownCode = (code: string): boolean => !isIndicationCode(code);
const isMismatched = (rule: DosingRule): boolean => !labelMatches(rule);
const idOf = (rule: DosingRule): string => rule.id;
const synonymsOf = (code: string): readonly string[] =>
  isIndicationCode(code) ? INDICATIONS[code].synonyms : [];

describe("Заалтын бүртгэл (S2)", () => {
  it("бүртгэлгүй заалтын код байхгүй", () => {
    const unknown = specificRules().map(codeOf).filter(isUnknownCode);
    expect(unknown).toEqual([]);
  });

  it("дүрмийн labelMn бүртгэлийн нэрээр эхэлнэ", () => {
    const mismatched = specificRules().filter(isMismatched).map(idOf);
    expect(mismatched).toEqual([]);
  });

  it("синоним бүр жижиг үсгээр, давхардалгүй", () => {
    const all = Object.keys(INDICATIONS).flatMap(synonymsOf);
    expect(all.filter(isUpperCaseSome)).toEqual([]);
    expect(new Set(all).size).toBe(all.length);
  });
});
