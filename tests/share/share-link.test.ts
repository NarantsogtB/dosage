import { describe, expect, it } from "vitest";
import { DRUG_BY_ID } from "@/lib/data/drugs";
import {
  hasShare,
  MAX_SHARED_DRUGS,
  parseShare,
  serializeShare,
  type SharedCalc,
} from "@/lib/share/share-link";

const parse = (fragment: string) => parseShare(fragment, DRUG_BY_ID);

const full: SharedCalc = {
  weightKg: 14.5,
  ageMonths: 36,
  drugs: [
    { id: "amoxicillin", indication: "pneumonia", formulation: "250mg-5ml-1" },
    { id: "paracetamol" },
    { id: "ondansetron", formulation: "4mg-5ml-0" },
  ],
};

describe("Хуваалцах линк (Шат 5) — serialize, round-trip", () => {
  it("serialize: товч, уншигдахуйц", () => {
    expect(serializeShare({ weightKg: 14, ageMonths: 36, drugs: [{ id: "amoxicillin", indication: "pneumonia" }, { id: "paracetamol" }] }))
      .toBe("w=14&m=36&d=amoxicillin:pneumonia,paracetamol");
  });

  it("round-trip: serialize → parse ижил, алгассангүй", () => {
    const parsed = parse(`#${serializeShare(full)}`);
    expect(parsed.skipped).toEqual([]);
    expect(parsed.calc).toEqual({
      ...full,
      drugs: [full.drugs[0], { id: "paracetamol", indication: undefined, formulation: undefined }, { ...full.drugs[2], indication: undefined }],
    });
  });

  it("заалтгүй бэлдмэл: id::бэлдмэл", () => {
    expect(serializeShare({ drugs: [{ id: "paracetamol", formulation: "120mg-5ml-0" }] }))
      .toBe("d=paracetamol::120mg-5ml-0");
    expect(parse("d=paracetamol::120mg-5ml-0").calc.drugs).toEqual([
      { id: "paracetamol", indication: undefined, formulation: "120mg-5ml-0" },
    ]);
  });

});

describe("Хуваалцах линк (Шат 5) — буруу оролт", () => {
  it("буруу жин, нас — алгасаж, шалтгааныг хэлнэ", () => {
    const parsed = parse("w=abc&m=-3&d=paracetamol");
    expect(parsed.calc.weightKg).toBeUndefined();
    expect(parsed.calc.ageMonths).toBeUndefined();
    expect(parsed.skipped).toHaveLength(2);
    expect(parsed.calc.drugs).toHaveLength(1);
  });

  it("хязгаараас гарсан жин, бутархай сар хүчингүй", () => {
    expect(parse("w=900").calc.weightKg).toBeUndefined();
    expect(parse("m=12.5").calc.ageMonths).toBeUndefined();
  });

  it("байхгүй/хасагдсан эм, заалт, бэлдмэлийг алгасна", () => {
    const parsed = parse("d=tramadol,nope,amoxicillin:fake:bad-id");
    expect(parsed.calc.drugs).toEqual([{ id: "amoxicillin", indication: undefined, formulation: undefined }]);
    expect(parsed.skipped).toHaveLength(4);
  });

  it("давхардсан эмийг нэг удаа, хэт олныг таслана", () => {
    expect(parse("d=paracetamol,paracetamol").calc.drugs).toHaveLength(1);
    const many = [...DRUG_BY_ID.keys()].slice(0, MAX_SHARED_DRUGS + 2).join(",");
    const parsed = parse(`d=${many}`);
    expect(parsed.calc.drugs).toHaveLength(MAX_SHARED_DRUGS);
    expect(parsed.skipped.at(-1)).toContain("2 эм");
  });

  it("hasShare: хуваалцсан параметртэй эсэх", () => {
    expect(hasShare("#w=14")).toBe(true);
    expect(hasShare("#results-title")).toBe(false);
    expect(hasShare("")).toBe(false);
  });
});
