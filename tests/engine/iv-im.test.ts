import { describe, expect, it } from "vitest";
import { calculateDosage } from "@/lib/engine";
import type { CalculationResult, DosageOutcome } from "@/lib/domain/calculation-result";
import type { Formulation, PowderFormulation } from "@/lib/domain/formulation";
import { makeDrug, makeRule } from "../fixtures/make-drug";

const patient = { weightKg: 16, ageMonths: 48 };

const outcomeOf = (result: CalculationResult): DosageOutcome => {
  if (result.type !== "dosage") throw new Error(result.data.reasonMn);
  return result.data;
};

/** Fixture — бодит бүтээгдэхүүний тоо БИШ. */
const VIAL: PowderFormulation = {
  kind: "powder",
  id: "vial-1g",
  labelMn: "1 г нунтаг шил",
  mgPerVial: 1000,
  reconstitutions: [
    { route: "iv", diluentMn: "тарилгын ус", diluentMl: 9.6, finalMgPerMl: 100 },
    { route: "im", diluentMn: "1% лидокаин", diluentMl: 3.5, finalMgPerMl: 250 },
  ],
};
const SYRUP: Formulation = { kind: "liquid", id: "syrup", labelMn: "сироп", mgPerMl: 50 };
const AMPOULE: Formulation = { kind: "liquid", id: "amp", labelMn: "ампул", mgPerMl: 40, routes: ["iv", "im"] };

const run = (rule: Parameters<typeof makeRule>[0], formulations: readonly Formulation[]) =>
  outcomeOf(calculateDosage(makeDrug([makeRule({ basis: { kind: "per_kg_per_dose", minMgPerKg: 50, maxMgPerKg: 50 }, ...rule })], { formulations }), patient));

const keyOf = (amount: DosageOutcome["amounts"][number]) =>
  `${amount.formulation.id}${amount.reconstitution ? `@${amount.reconstitution.route}` : ""}`;

const isReconstitutionStep = (item: { labelMn: string }) => item.labelMn === "Найруулга";

describe("Зам — бэлдмэлийг дүрмийн замаар шүүх (Шат 6)", () => {
  it("oral_iv: амны сироп ба IV ампул хоёулаа", () => {
    expect(run({ route: "oral_iv" }, [SYRUP, AMPOULE]).amounts.map(keyOf)).toEqual(["syrup", "amp"]);
  });

  it("oral: ампул, нунтагийг алгасна", () => {
    expect(run({ route: "oral" }, [SYRUP, AMPOULE, VIAL]).amounts.map(keyOf)).toEqual(["syrup"]);
  });

  it("iv: зөвхөн IV найруулга", () => {
    expect(run({ route: "iv" }, [VIAL]).amounts.map(keyOf)).toEqual(["vial-1g@iv"]);
  });
});

describe("Нунтаг найруулах (Шат 6)", () => {
  it("50 мг/кг × 16 кг = 800 мг → 100 мг/мл → 8 мл, 1 шил; IM 3.2 мл", () => {
    const out = run({ route: "iv_im" }, [VIAL]);
    expect(out.amounts.map(keyOf)).toEqual(["vial-1g@iv", "vial-1g@im"]);
    expect(out.amounts[0]).toMatchObject({ min: 8, max: 8, vials: 1 });
    expect(out.amounts[1]).toMatchObject({ min: 3.2, max: 3.2, vials: 1 });
  });

  it("trace-д найруулга", () => {
    const out = run({ route: "iv" }, [VIAL]);
    const step = out.trace.find(isReconstitutionStep);
    expect(step?.expression).toBe("1000 мг шил + 9.6 мл тарилгын ус → 100 мг/мл (Судсаар (IV))");
  });

  it("cap-тай: дээд 1 г → 10 мл, 1 шил; 1.5 г бол 2 шил", () => {
    const capped = run({ route: "iv", caps: [{ kind: "absolute", scope: "per_dose", maxMg: 1000 }], basis: { kind: "per_kg_per_dose", minMgPerKg: 100, maxMgPerKg: 100 } }, [VIAL]);
    expect(capped.amounts[0]).toMatchObject({ max: 10, vials: 1 });
    const big = run({ route: "iv", basis: { kind: "fixed", minMg: 1500, maxMg: 1500 } }, [VIAL]);
    expect(big.amounts[0]).toMatchObject({ max: 15, vials: 2 });
  });

  it("мкг нэгжтэй дүрэм + мг нунтаг (S4 хөрвүүлэлт)", () => {
    const out = run({ route: "iv", doseUnit: "mcg", basis: { kind: "fixed", minMg: 500_000, maxMg: 500_000 } }, [VIAL]);
    expect(out.amounts[0]).toMatchObject({ max: 5, vials: 1 });
  });
});
