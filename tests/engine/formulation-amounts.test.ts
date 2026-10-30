import { describe, expect, it } from "vitest";
import type { FormulationAmount } from "@/lib/domain/calculation-result";
import type { Formulation } from "@/lib/domain/formulation";
import { calculateDosage } from "@/lib/engine";
import { makeDrug, makeRule } from "../fixtures/make-drug";

const FORMULATIONS: readonly Formulation[] = [
  { kind: "liquid", id: "susp", labelMn: "250мг/5мл", mgPerMl: 50 },
  { kind: "solid", id: "tab", labelMn: "250мг шахмал", mgPerUnit: 250, unitMn: "шахмал", divisible: true },
  { kind: "solid", id: "cap", labelMn: "500мг капсул", mgPerUnit: 500, unitMn: "капсул", divisible: false },
];

/** 10 мг/кг × 25 кг = 250 мг нэг удаа. */
const amounts = () => {
  const drug = makeDrug([makeRule()], { formulations: FORMULATIONS });
  const result = calculateDosage(drug, { weightKg: 25, ageMonths: 96 });
  if (result.type !== "dosage") throw new Error("тооцоолол амжилтгүй");
  return result.data.amounts;
};

const idOf = (amount: FormulationAmount): string => amount.formulation.id;

describe("бэлдмэлийн хэмжээ", () => {
  it("бэлдмэл бүрд, өгөгдлийн дарааллаар", () => {
    expect(amounts().map(idOf)).toEqual(["susp", "tab", "cap"]);
  });

  it("шингэнийг мл-ээр", () => {
    expect(amounts()[0].max).toBe(5);
  });

  it("шахмал, капсулыг ширхэгээр — engine тоймлохгүй (бутархайг формат хариуцна)", () => {
    expect(amounts()[1].max).toBe(1);
    expect(amounts()[2].max).toBe(0.5);
  });
});
