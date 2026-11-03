import { describe, expect, it } from "vitest";
import { DRUGS } from "@/lib/data/drugs";
import { filterDrugs, indicationHits } from "@/lib/search/filter-drugs";
import { indicationCodesFor } from "@/lib/search/match-indication-query";
import { makeDrug, makeRule } from "../fixtures/make-drug";

const innsOf = (query: string) => filterDrugs(DRUGS, { query }).map((drug) => drug.inn);
const idOf = (drug: { id: string }) => drug.id;
const hitLabel = (query: string, id: string) => indicationHits(DRUGS, query).get(id)?.labelMn;

const asthma = { code: "asthma", labelMn: "Цочмог астма" };
const byIndication = makeDrug([makeRule({ indication: asthma })], { id: "aaa", inn: "Aaa", innMn: "Ааа" });
const byName = makeDrug([makeRule()], { id: "zzz", inn: "Zzz", innMn: "Астмадрин" });

describe("Өвчин/заалтаар хайх (Шат 4)", () => {
  it("заалтын нэрээр: «хатгаа» → амоксициллин, таарсан заалттай", () => {
    expect(innsOf("хатгаа")).toContain("Amoxicillin");
    expect(hitLabel("хатгаа", "amoxicillin")).toBe("Уушгины хатгаа (2–59 сар)");
  });

  it("синоним: пневмони, pneumonia, дизентери, круп", () => {
    expect(innsOf("пневмони")).toContain("Amoxicillin");
    expect(innsOf("Pneumonia")).toContain("Amoxicillin");
    expect(innsOf("дизентери")).toEqual(expect.arrayContaining(["Ceftriaxone", "Ciprofloxacin"]));
    expect(innsOf("круп")).toContain("Dexamethasone");
  });

  it("normalize: том үсэг, илүү зай", () => {
    expect(indicationCodesFor("  УУШГИНЫ   ХАТГАА ")).toEqual(["pneumonia"]);
  });

  it("урт өгүүлбэр доторх заалтын нэрийг таньна", () => {
    expect(indicationCodesFor("уушгины хатгаа 2 настай")).toContain("pneumonia");
  });

  it("3-аас богино үгээр заалт хайхгүй", () => {
    expect(indicationCodesFor("ас")).toEqual([]);
  });

  it("нэрээр таарсан нь заалтаар таарснаас дээр", () => {
    const found = filterDrugs([byIndication, byName], { query: "астма" });
    expect(found.map(idOf)).toEqual(["zzz", "aaa"]);
    expect(indicationHits([byIndication, byName], "астма").has("zzz")).toBe(false);
  });

  it("ерөнхий дүрэм заалтаар олдохгүй", () => {
    expect(innsOf("шээсний замын халдвар")).toEqual([]);
  });
});
