import { describe, expect, it } from "vitest";
import type { DosingRule } from "@/lib/domain/dosing-rule";
import { DRUGS } from "@/lib/data/drugs";
import { validateSourceRefs } from "@/lib/validation/validate-source-refs";
import { KNOWN_GAPS, isKnownGap } from "./known-gaps";

const allRules = (): readonly DosingRule[] =>
  DRUGS.flatMap((drug) => [...drug.rules]);

const verified = (): readonly DosingRule[] =>
  allRules().filter((rule) => rule.evidenceLevel !== "E_unverified");

const unverified = (): readonly DosingRule[] =>
  allRules().filter((rule) => rule.evidenceLevel === "E_unverified");

const hasNoSource = (rule: DosingRule): boolean => rule.sources.length === 0;
const hasSource = (rule: DosingRule): boolean => rule.sources.length > 0;
const isInvalid = (rule: DosingRule): boolean =>
  validateSourceRefs(rule.sources).length > 0 && !isKnownGap(rule.id);
const idsOf = (rules: readonly DosingRule[]): readonly string[] =>
  rules.map((rule) => rule.id);

const ruleIdOf = (gap: { ruleId: string }): string => gap.ruleId;
const isDocumented = (gap: { gap: string; next: string }): boolean =>
  gap.gap.trim() === "" || gap.next.trim() === "";

describe("Баталгаажсан дүрмүүд", () => {
  it("эх сурвалжтай байх", () => {
    expect(idsOf(verified().filter(hasNoSource))).toEqual([]);
  });

  it("хоёр эх сурвалжийн дүрэм ба locator биелэх", () => {
    expect(idsOf(verified().filter(isInvalid))).toEqual([]);
  });

  it("баталгаажаагүй дүрэм эх сурвалжгүй байх (худал шошго тавихгүй)", () => {
    expect(idsOf(unverified().filter(hasSource))).toEqual([]);
  });

  it("мэдэгдэж буй цоорхой бүр тайлбар, дараагийн алхамтай байх", () => {
    const incomplete = KNOWN_GAPS.filter(isDocumented);
    expect(incomplete.map(ruleIdOf)).toEqual([]);
  });
});
