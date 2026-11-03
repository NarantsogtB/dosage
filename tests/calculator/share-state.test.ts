import { describe, expect, it } from "vitest";
import { formOf, toSharedCalc } from "@/components/calculator/share-state";
import type { Choices } from "@/components/calculator/use-choices";
import { EMPTY_FORM } from "@/components/calculator/patient-form";

const noop = () => undefined;
const choices: Choices = {
  indications: new Map([["amoxicillin", "pneumonia"]]),
  formulations: new Map([["amoxicillin", "250mg-5ml-1"]]),
  onIndication: noop,
  onFormulation: noop,
};

describe("Хуваалцах төлөв ↔ хэлбэр", () => {
  it("грамм → кг, жил + сар → сар", () => {
    const form = { weight: "3200", weightUnit: "g" as const, years: "0", months: "2" };
    expect(toSharedCalc(form, ["amoxicillin"], choices)).toEqual({
      weightKg: 3.2,
      ageMonths: 2,
      drugs: [{ id: "amoxicillin", indication: "pneumonia", formulation: "250mg-5ml-1" }],
    });
  });

  it("хүчингүй жин, хоосон насыг оруулахгүй", () => {
    const calc = toSharedCalc({ ...EMPTY_FORM, weight: "999" }, [], choices);
    expect(calc.weightKg).toBeUndefined();
    expect(calc.ageMonths).toBeUndefined();
  });

  it("сэргээхэд кг, жил + сар", () => {
    expect(formOf({ weightKg: 14.5, ageMonths: 38, drugs: [] })).toEqual({
      weight: "14.5",
      weightUnit: "kg",
      years: "3",
      months: "2",
    });
    expect(formOf({ drugs: [] })).toEqual(EMPTY_FORM);
  });
});
