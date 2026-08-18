import { describe, expect, it } from "vitest";
import type { Patient } from "@/lib/domain/patient";
import { DRUG_BY_ID } from "@/lib/data/drugs";
import {
  hasIndicationChoice,
  listIndications,
} from "@/lib/engine/rule/list-indications";

const drug = (id: string) => DRUG_BY_ID.get(id)!;
const TODDLER: Patient = { weightKg: 12, ageMonths: 24 };
const NEWBORN: Patient = { weightKg: 3, ageMonths: 0 };

const labels = (id: string, patient: Patient) =>
  listIndications(drug(id), patient).map((option) => option.labelMn);

describe("listIndications", () => {
  it("2 настайд Amoxicillin-д хоёр сонголт гарна", () => {
    expect(labels("amoxicillin", TODDLER)).toEqual([
      "Уушгины хатгаа (2–59 сар)",
      "Ерөнхий",
    ]);
  });

  it("нярайд уушгины хатгааны заалт ХАРАГДАХГҮЙ (2 сараас)", () => {
    expect(labels("amoxicillin", NEWBORN)).toEqual(["Ерөнхий"]);
  });

  it("нярайд сонголт хийх шаардлагагүй болно", () => {
    expect(hasIndicationChoice(drug("amoxicillin"), NEWBORN)).toBe(false);
  });

  it("нэг дүрэмтэй эмд сонголт хэрэггүй", () => {
    expect(hasIndicationChoice(drug("paracetamol"), TODDLER)).toBe(false);
  });
});
