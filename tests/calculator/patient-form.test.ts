import { describe, expect, it } from "vitest";
import {
  EMPTY_FORM,
  convertWeight,
  isWeightInvalid,
  parsePatientForm,
  toPatient,
  weightKgOf,
} from "@/components/calculator/patient-form";

const grams = (weight: string) => ({ ...EMPTY_FORM, weight, weightUnit: "g" as const });
const kilos = (weight: string) => ({ ...EMPTY_FORM, weight });

describe("жингийн нэгж", () => {
  it("граммыг кг болгож тооцоолно", () => {
    expect(weightKgOf(grams("3200"))).toBe(3.2);
    expect(toPatient(grams("3200")).weightKg).toBe(3.2);
  });

  it("кг-ыг хэвээр нь үлдээнэ", () => {
    expect(weightKgOf(kilos("12.5"))).toBe(12.5);
  });

  it("хязгаарыг кг-д хөрвүүлж шалгана", () => {
    expect(isWeightInvalid(grams("3200"))).toBe(false);
    expect(isWeightInvalid(grams("400"))).toBe(true);
    expect(isWeightInvalid(kilos("3200"))).toBe(true);
  });

  it("нэгж солиход утгыг хөрвүүлнэ", () => {
    expect(convertWeight("3.2", "g")).toBe("3200");
    expect(convertWeight("3200", "kg")).toBe("3.2");
    expect(convertWeight("3333", "kg")).toBe("3.333");
    expect(convertWeight("", "g")).toBe("");
  });
});

describe("parsePatientForm", () => {
  it("хадгалсан утгыг сэргээнэ", () => {
    const form = { weight: "12.5", weightUnit: "kg", years: "", months: "8" };
    expect(parsePatientForm(JSON.stringify(form))).toEqual(form);
  });

  it("эвдэрсэн эсвэл хуучин бүтэцтэй бол хоосон", () => {
    expect(parsePatientForm(null)).toEqual(EMPTY_FORM);
    expect(parsePatientForm("{")).toEqual(EMPTY_FORM);
    expect(parsePatientForm(JSON.stringify({ weight: "12" }))).toEqual(EMPTY_FORM);
  });
});
