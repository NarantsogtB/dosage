import { describe, expect, it } from "vitest";
import { calculateDosage } from "@/lib/engine";
import { DEMO } from "@/components/landing/demo-case";
import { DRUG_COUNT, VERIFIED_COUNT } from "@/components/landing/landing-stats";
import type { FormulationAmount } from "@/lib/domain/calculation-result";

const at = (weightKg: number) =>
  calculateDosage(
    DEMO.drug,
    { weightKg, ageMonths: DEMO.ageMonths },
    { indicationCode: DEMO.indicationCode },
  );

/** Тооцоолол гарсан гэж БАТАЛЖ, өгөгдлийг нь буцаана. */
const doseAt = (weightKg: number) => {
  const result = at(weightKg);
  if (result.type !== "dosage") throw new Error("тооцоолол гарсангүй");
  return result.data;
};

const isLiquid = (amount: FormulationAmount) =>
  amount.formulation.kind === "liquid";

/**
 * Танилцуулга хуудас нь БОДИТ engine ажиллуулж тун харуулдаг.
 *
 * Тиймээс зочны хамгийн эхэнд харах тоо нь тестээр хамгаалагдсан
 * байх ёстой. Дүрэм өөрчлөгдвөл энэ тест унана — танилцуулга чимээгүй
 * худал ярьж эхлэхгүй.
 */
describe("танилцуулгын жишээ тохиолдол", () => {
  it("тооцоолол амжилттай гарна", () => {
    expect(at(14).type).toBe("dosage");
  });

  it("ДЭМБ-ын баталгаажсан дүрэм сонгогдоно", () => {
    expect(doseAt(14).rule.evidenceLevel).toBe("B_who");
    expect(doseAt(14).rule.id).toBe("amoxicillin-pneumonia");
  });

  it("ишлэл нь үгчилсэн утгатай", () => {
    const first = doseAt(14).sources[0];
    expect(first.sourceId).toBe("who-pneumonia-diarrhoea-2024");
    expect(first.quotedValue).toContain("40 mg/kg per dose twice daily");
  });

  it("40 мг/кг × 2 удаа — 14 кг дээр 560 мг", () => {
    expect(doseAt(14).perDose.maxMg).toBe(560);
    expect(doseAt(14).frequency).toBe("bd");
  });

  it("жишээний нас дүрмийн насны мужид багтана", () => {
    expect(DEMO.ageMonths).toBeGreaterThanOrEqual(2);
    expect(DEMO.ageMonths).toBeLessThanOrEqual(59);
  });

  it("шингэн бэлдмэлийн мл гарна", () => {
    expect(doseAt(14).amounts.find(isLiquid)).toBeDefined();
  });

  it("танилцуулгын тоо өгөгдлөөс гарна", () => {
    expect(DRUG_COUNT).toBe(50);
    expect(VERIFIED_COUNT).toBeGreaterThan(0);
    expect(VERIFIED_COUNT).toBeLessThanOrEqual(DRUG_COUNT);
  });
});
