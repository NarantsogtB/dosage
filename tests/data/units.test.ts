import { describe, expect, it } from "vitest";
import { ALL_DRUGS } from "@/lib/data/drugs";
import { validateUnits } from "@/lib/validation/validate-units";
import { makeDrug, makeRule } from "../fixtures/make-drug";

describe("Нэгжийн нийцэл (S4)", () => {
  it("бодит бүх эмийн бэлдмэл дүрмийн нэгжтэй нийцнэ", () => {
    expect(ALL_DRUGS.flatMap(validateUnits)).toEqual([]);
  });

  it("ЕД-ийн дүрэм + мг бэлдмэл — барина", () => {
    const drug = makeDrug([makeRule({ doseUnit: "units" })]);
    expect(validateUnits(drug)).toHaveLength(1);
  });

  it("мкг дүрэм + мг бэлдмэл — зөв (масс хөрвөнө)", () => {
    expect(validateUnits(makeDrug([makeRule({ doseUnit: "mcg" })]))).toEqual([]);
  });
});
