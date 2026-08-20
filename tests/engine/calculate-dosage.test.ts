import { describe, expect, it } from "vitest";
import type { Drug } from "@/lib/domain/drug";
import { calculateDosage } from "@/lib/engine";

const sources = [{ sourceId: "who-aware-2022", locator: "тест" }];

const amoxicillin: Drug = {
  id: "amoxicillin",
  inn: "Amoxicillin",
  innMn: "Амоксициллин",
  category: "antibiotic",
  formulations: [
    { kind: "liquid", id: "susp-250", labelMn: "250мг/5мл", mgPerMl: 50 },
  ],
  rules: [
    {
      id: "amoxicillin-pneumonia",
      indication: { code: "pneumonia", labelMn: "Уушгины хатгаа" },
      route: "oral",
      ageMinMonths: 2,
      basis: { kind: "per_kg_per_dose", minMgPerKg: 40, maxMgPerKg: 40 },
      frequency: "bd",
      caps: [{ kind: "absolute", scope: "per_dose", maxMg: 1000 }],
      sources,
      evidenceLevel: "B_who",
      isDefault: true,
    },
  ],
  warnings: [],
  contraindicationsMn: [],
  sources,
  lastReviewed: "2026-08-17",
  status: "active",
};

describe("calculateDosage", () => {
  it("WHO 2024: 40 мг/кг нэг удаа, өдөрт 2 удаа", () => {
    const out = calculateDosage(amoxicillin, { weightKg: 10, ageMonths: 24 });
    expect(out.type).toBe("dosage");
    if (out.type !== "dosage") return;
    expect(out.data.perDose.maxMg).toBe(400);
    expect(out.data.perDay.maxMg).toBe(800);
    expect(out.data.dosesPerDay).toBe(2);
  });

  it("бэлдмэлийн эзэлхүүнийг мл-ээр гаргана", () => {
    const out = calculateDosage(amoxicillin, { weightKg: 10, ageMonths: 24 });
    if (out.type !== "dosage") throw new Error("тооцоолол амжилтгүй");
    expect(out.data.amounts[0].max).toBe(8);
  });

  it("тооцооллын алхмуудыг буцаана", () => {
    const out = calculateDosage(amoxicillin, { weightKg: 10, ageMonths: 24 });
    if (out.type !== "dosage") throw new Error("тооцоолол амжилтгүй");
    expect(out.data.trace[0].expression).toBe("40 мг/кг × 10 кг");
  });

  it("наснаас доош бол дүрэм олдохгүй", () => {
    const out = calculateDosage(amoxicillin, { weightKg: 3, ageMonths: 0 });
    expect(out.type).toBe("ineligible");
  });

  it("жин хязгаараас гарвал тооцоолохгүй", () => {
    const out = calculateDosage(amoxicillin, { weightKg: 0, ageMonths: 24 });
    expect(out.type).toBe("ineligible");
  });
});

describe("calculateDosage — limitMg", () => {
  it("идэвхтэй хязгаарыг (limitMg) буцаана", () => {
    const out = calculateDosage(amoxicillin, { weightKg: 10, ageMonths: 24 });
    if (out.type !== "dosage") throw new Error("тооцоолол амжилтгүй");
    // Нэг удаагийн тунгийн хязгаар 1000 мг (caps[0].maxMg), 10кг × 40мг/кг = 400 мг,
    // 400 < 1000 тул тасалгаагүй.
    expect(out.data.limitMg).toBe(1000);
    expect(out.data.cappedAtMax).toBe(false);
  });

  it("хязгааргүй дүрэмд limitMg Infinity байна", () => {
    const noCapDrug: Drug = {
      ...amoxicillin,
      rules: [{ ...amoxicillin.rules[0], caps: [] }],
    };
    const out = calculateDosage(noCapDrug, { weightKg: 10, ageMonths: 24 });
    if (out.type !== "dosage") throw new Error("тооцоолол амжилтгүй");
    expect(Number.isFinite(out.data.limitMg)).toBe(false);
  });
});
