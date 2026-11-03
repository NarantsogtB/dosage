import { describe, expect, it } from "vitest";
import { calculateDosage } from "@/lib/engine";
import { convertAmount } from "@/lib/engine/units/convert-unit";
import type { CalculationResult, DosageOutcome } from "@/lib/domain/calculation-result";
import type { Formulation } from "@/lib/domain/formulation";
import { makeDrug, makeRule } from "../fixtures/make-drug";

const patient = { weightKg: 5, ageMonths: 12 };
const idOf = (amount: { formulation: { id: string } }) => amount.formulation.id;
const capsAt = (text: string) => (step: { expression: string }) => step.expression.includes(text);

const outcomeOf = (result: CalculationResult): DosageOutcome => {
  if (result.type !== "dosage") throw new Error(result.data.reasonMn);
  return result.data;
};

/** 1 мг/мл шингэн (adrenaline-маяг) — хүч мг-аар. */
const MG_PER_ML: Formulation = { kind: "liquid", id: "1mg-ml", labelMn: "1 мг/мл", mgPerMl: 1, strengthUnit: "mg" };
const UNITS_PER_ML: Formulation = { kind: "liquid", id: "10u-ml", labelMn: "10 ЕД/мл", mgPerMl: 10, strengthUnit: "units" };

const run = (rule: Parameters<typeof makeRule>[0], formulations: readonly Formulation[]) =>
  outcomeOf(calculateDosage(makeDrug([makeRule(rule)], { formulations }), patient));

describe("Нэгж хөрвүүлэлт (S4)", () => {
  it("масс: г ↔ мг ↔ мкг", () => {
    expect(convertAmount(1, "g", "mg")).toBe(1000);
    expect(convertAmount(50, "mcg", "mg")).toBe(0.05);
    expect(convertAmount(2, "mg", "mcg")).toBe(2000);
    expect(convertAmount(3, "units", "units")).toBe(3);
  });

  it("ЕД, ммоль, мл бусадтай хөрвөхгүй", () => {
    expect(convertAmount(1, "units", "mg")).toBeNull();
    expect(convertAmount(1, "mmol", "mg")).toBeNull();
    expect(convertAmount(1, "mL", "mg")).toBeNull();
  });
});

describe("Engine — нэгжтэй дүрэм (S4)", () => {
  it("мкг/кг дүрэм + мг/мл бэлдмэл: 10 мкг/кг × 5 кг = 50 мкг = 0.05 мл", () => {
    const out = run(
      { doseUnit: "mcg", basis: { kind: "per_kg_per_dose", minMgPerKg: 10, maxMgPerKg: 10 } },
      [MG_PER_ML],
    );
    expect(out.doseUnit).toBe("mcg");
    expect(out.perDose).toEqual({ minMg: 50, maxMg: 50 });
    expect(out.amounts[0].max).toBeCloseTo(0.05, 3);
    expect(out.trace[0].expression).toContain("мкг/кг");
  });

  it("cap нь дүрмийн нэгжээр: 300 мкг-аар таслана", () => {
    const out = run(
      {
        doseUnit: "mcg",
        basis: { kind: "per_kg_per_dose", minMgPerKg: 100, maxMgPerKg: 100 },
        caps: [{ kind: "absolute", scope: "per_dose", maxMg: 300 }],
      },
      [MG_PER_ML],
    );
    expect(out.perDose.maxMg).toBe(300);
    expect(out.trace.some(capsAt("300 мкг-аар таслав"))).toBe(true);
  });

  it("ЕД дүрэм + ЕД бэлдмэл; нийцэхгүй мг бэлдмэлийг алгасна", () => {
    const out = run(
      { doseUnit: "units", basis: { kind: "per_kg_per_dose", minMgPerKg: 0.1, maxMgPerKg: 0.1 } },
      [UNITS_PER_ML, MG_PER_ML],
    );
    expect(out.amounts.map(idOf)).toEqual(["10u-ml"]);
    expect(out.amounts[0].max).toBeCloseTo(0.05, 3);
  });

  it("нэгж заагаагүй — мг (одоогийн өгөгдөл)", () => {
    expect(run({}, [MG_PER_ML]).doseUnit).toBe("mg");
  });
});
