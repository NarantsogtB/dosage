import { describe, expect, it } from "vitest";
import type { Drug } from "@/lib/domain/drug";
import { calculateDosage } from "@/lib/engine";
import { dailyLimitMg, maxDosePercent } from "@/lib/format/max-dose-percent";

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

describe("maxDosePercent", () => {
  it("400мг / 1000мг хязгаараас 40%-ийг гаргана", () => {
    const out = calculateDosage(amoxicillin, { weightKg: 10, ageMonths: 24 });
    if (out.type !== "dosage") throw new Error("тооцоолол амжилтгүй");
    expect(maxDosePercent(out.data)).toBe(40);
  });

  it("хязгааргүй дүрэмд undefined буцаана", () => {
    const noCapDrug: Drug = {
      ...amoxicillin,
      rules: [{ ...amoxicillin.rules[0], caps: [] }],
    };
    const out = calculateDosage(noCapDrug, { weightKg: 10, ageMonths: 24 });
    if (out.type !== "dosage") throw new Error("тооцоолол амжилтгүй");
    expect(maxDosePercent(out.data)).toBeUndefined();
  });
});

describe("dailyLimitMg", () => {
  it("нэг удаагийн хязгаарыг давтамжаар үржүүлж, өдрийн хязгаар гаргана", () => {
    const out = calculateDosage(amoxicillin, { weightKg: 10, ageMonths: 24 });
    if (out.type !== "dosage") throw new Error("тооцоолол амжилтгүй");
    // limitMg = 1000 (нэг удаа), dosesPerDay = 2 тул хоногт 2000.
    expect(dailyLimitMg(out.data)).toBe(2000);
  });
});
