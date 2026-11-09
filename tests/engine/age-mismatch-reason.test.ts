import { describe, expect, it } from "vitest";
import type { DosingRule } from "@/lib/domain/dosing-rule";
import { calculateDosage } from "@/lib/engine";
import { makeDrug, makeRule } from "../fixtures/make-drug";

const reasonOf = (rules: readonly DosingRule[], ageMonths: number): string => {
  const out = calculateDosage(makeDrug(rules), { weightKg: 10, ageMonths });
  if (out.type !== "ineligible") throw new Error("тооцоологдох ёсгүй");
  return out.data.reasonMn;
};

describe("нас тохирохгүй үеийн мессеж (G3)", () => {
  it("доод хязгаарыг нэрлэнэ", () => {
    expect(reasonOf([makeRule({ ageMinMonths: 2 })], 1)).toContain("Дүрмийн нас: ≥ 2 сар · өвчтөн: 1 сар.");
  });

  it("дээд хязгаарыг нэрлэнэ, нас/сараар", () => {
    const rules = [makeRule({ ageMinMonths: 0, ageMaxMonths: 60 })];
    expect(reasonOf(rules, 66)).toContain("Дүрмийн нас: ≤ 5 нас · өвчтөн: 5 нас 6 сар.");
  });

  it("олон дүрмийн нийт мужийг авна", () => {
    const rules = [
      makeRule({ id: "a", ageMinMonths: 6, ageMaxMonths: 24 }),
      makeRule({ id: "b", ageMinMonths: 25, ageMaxMonths: 144 }),
    ];
    expect(reasonOf(rules, 3)).toContain("Дүрмийн нас: 6 сар – 12 нас · өвчтөн: 3 сар.");
  });

  it("насны муж дотор (жин тохирохгүй) бол ерөнхий мессеж", () => {
    const reason = reasonOf([makeRule({ weightMinKg: 20 })], 24);
    expect(reason).not.toContain("Дүрмийн нас");
  });
});
