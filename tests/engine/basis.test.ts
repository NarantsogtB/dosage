import { describe, expect, it } from "vitest";
import type { DosingBasis } from "@/lib/domain/dosing-basis";
import type { DosageOutcome } from "@/lib/domain/calculation-result";
import type { FrequencyCode } from "@/lib/domain/frequency";
import { calculateDosage } from "@/lib/engine";
import { makeDrug, makeRule } from "../fixtures/make-drug";

const PATIENT = { weightKg: 10, ageMonths: 24 };

const drugWith = (basis: DosingBasis, frequency: FrequencyCode = "bd") =>
  makeDrug([makeRule({ basis, frequency })]);

const dosage = (basis: DosingBasis, weightKg: number, frequency?: FrequencyCode): DosageOutcome => {
  const result = calculateDosage(drugWith(basis, frequency), { ...PATIENT, weightKg });
  if (result.type !== "dosage") throw new Error("тооцоолол амжилтгүй");
  return result.data;
};

/*
 * Хуучин snapshot нь 50 эмээр basis-ийн бүх салааг шууд бусаар дамжуулдаг
 * байв. Одоо салаа бүр fixture-тэй, өгөгдлөөс хамааралгүй.
 */
describe("per_kg_per_day", () => {
  it("мг/кг/өдөр × жин ÷ давтамж = нэг удаагийн тун", () => {
    const out = dosage({ kind: "per_kg_per_day", minMgPerKg: 30, maxMgPerKg: 60 }, 10, "tds");
    expect(out.perDose).toEqual({ minMg: 100, maxMg: 200 });
    expect(out.perDay).toEqual({ minMg: 300, maxMg: 600 });
  });
});

describe("weight_band", () => {
  const basis: DosingBasis = {
    kind: "weight_band",
    bands: [
      { minWeightKg: 5, maxWeightKg: 10, doseMg: 5 },
      { minWeightKg: 10, doseMg: 10 },
    ],
  };

  it("доод хил мужид орно, дээд хил орохгүй", () => {
    expect(dosage(basis, 9.9).perDose.maxMg).toBe(5);
    expect(dosage(basis, 10).perDose.maxMg).toBe(10);
  });

  it("дээд хилгүй муж ямар ч их жинд хамаарна", () => {
    expect(dosage(basis, 40).perDose.maxMg).toBe(10);
  });

  it("тохирох муж байхгүй бол тооцоолохгүй", () => {
    expect(calculateDosage(drugWith(basis), { ...PATIENT, weightKg: 4 }).type).toBe("ineligible");
  });
});

describe("fixed", () => {
  it("жингээс хамаарахгүй", () => {
    const basis: DosingBasis = { kind: "fixed", minMg: 5, maxMg: 5 };
    expect(dosage(basis, 8).perDose).toEqual(dosage(basis, 30).perDose);
    expect(dosage(basis, 8).perDose.maxMg).toBe(5);
  });
});
