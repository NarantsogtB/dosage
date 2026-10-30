import { describe, expect, it } from "vitest";
import type { DoseCap } from "@/lib/domain/dose-cap";
import type { DosageOutcome } from "@/lib/domain/calculation-result";
import { calculateDosage } from "@/lib/engine";
import { makeDrug, makeRule } from "../fixtures/make-drug";

/** 40 мг/кг нэг удаа, өдөрт 2 удаа. */
const outcome = (caps: readonly DoseCap[], weightKg: number): DosageOutcome => {
  const drug = makeDrug([
    makeRule({ basis: { kind: "per_kg_per_dose", minMgPerKg: 40, maxMgPerKg: 40 }, frequency: "bd", caps }),
  ]);
  const result = calculateDosage(drug, { weightKg, ageMonths: 24 });
  if (result.type !== "dosage") throw new Error("тооцоолол амжилтгүй");
  return result.data;
};

/*
 * `applyCaps`-ийн нэгжийн тест `dose-cap.test.ts`-д. Энд — таслалт
 * бүхэл гаралтад (cappedAtMax, өдрийн нийт, limitMg) зөв тусах эсэх.
 */
describe("дээд хязгаар — бүхэл гаралт", () => {
  it("нэг удаагийн хязгаараар тасарвал cappedAtMax, өдрийн нийт нь тасарсан тунгаас", () => {
    const out = outcome([{ kind: "absolute", scope: "per_dose", maxMg: 300 }], 10);
    expect(out.cappedAtMax).toBe(true);
    expect(out.perDose.maxMg).toBe(300);
    expect(out.perDay.maxMg).toBe(600);
    expect(out.limitMg).toBe(300);
  });

  it("өдрийн хязгаар давтамжид хуваагдаж нэг удаагийн тунг таслана", () => {
    const out = outcome([{ kind: "absolute", scope: "per_day", maxMg: 500 }], 10);
    expect(out.cappedAtMax).toBe(true);
    expect(out.perDose.maxMg).toBe(250);
    expect(out.perDay.maxMg).toBe(500);
  });

  it("хязгаарт хүрээгүй бол тасрахгүй", () => {
    const out = outcome([{ kind: "absolute", scope: "per_dose", maxMg: 300 }], 5);
    expect(out.cappedAtMax).toBe(false);
    expect(out.perDose.maxMg).toBe(200);
  });

  it("хэд хэдэн хязгаараас хамгийн багыг нь авна", () => {
    const out = outcome(
      [
        { kind: "absolute", scope: "per_dose", maxMg: 300 },
        { kind: "per_kg", scope: "per_day", maxMgPerKg: 40 },
      ],
      10,
    );
    expect(out.perDose.maxMg).toBe(200);
  });
});
