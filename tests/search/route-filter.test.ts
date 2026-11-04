import { describe, expect, it } from "vitest";
import { DRUGS } from "@/lib/data/drugs";
import { filterDrugs } from "@/lib/search/filter-drugs";
import { matchRouteFilter } from "@/lib/search/route-filter";
import { makeDrug, makeRule } from "../fixtures/make-drug";

const idsOf = (route: "oral" | "injection") => filterDrugs(DRUGS, { query: "", route }).map((drug) => drug.id);

describe("Замаар шүүх (Шат 6)", () => {
  it("тарилга: iv_im, oral_iv дүрэмтэй эмүүд", () => {
    expect(idsOf("injection")).toEqual(expect.arrayContaining(["ceftriaxone", "gentamicin", "metronidazole"]));
    expect(idsOf("injection")).not.toContain("paracetamol");
  });

  it("амаар: oral_iv эм хоёуланд нь орно", () => {
    expect(idsOf("oral")).toEqual(expect.arrayContaining(["paracetamol", "metronidazole"]));
    expect(idsOf("oral")).not.toContain("gentamicin");
  });

  it("шүүлтгүй бол бүгд", () => {
    expect(matchRouteFilter(makeDrug([makeRule({ route: "im" })]))).toBe(true);
  });
});
