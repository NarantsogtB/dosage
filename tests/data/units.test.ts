import { describe, expect, it } from "vitest";
import { ALL_DRUGS } from "@/lib/data/drugs";
import { validateUnits } from "@/lib/validation/validate-units";
import { validateFormulations } from "@/lib/validation/validate-formulations";
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

describe("Бэлдмэлийн бүтэц (Шат 6)", () => {
  it("бодит бүх эмийн бэлдмэл дүрмийн замтай тохирно, нунтаг зөв", () => {
    expect(ALL_DRUGS.flatMap(validateFormulations)).toEqual([]);
  });

  it("найруулгагүй нунтаг, тохирох замгүй ампулыг барина", () => {
    const drug = makeDrug([makeRule({ route: "oral" })], {
      formulations: [
        { kind: "powder", id: "p", labelMn: "p", mgPerVial: 1000, reconstitutions: [] },
        { kind: "liquid", id: "amp", labelMn: "amp", mgPerMl: 40, routes: ["iv"] },
      ],
    });
    expect(validateFormulations(drug)).toHaveLength(3);
  });
});
