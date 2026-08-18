import { describe, expect, it } from "vitest";
import { DRUGS } from "@/lib/data/drugs";
import { filterDrugs } from "@/lib/search/filter-drugs";

const innsOf = (query: string, category?: "antibiotic") =>
  filterDrugs(DRUGS, { query, category }).map((drug) => drug.inn);

const categoryOf = (drug: { category: string }) => drug.category;
const byName = (a: string, b: string) => a.localeCompare(b);

describe("filterDrugs", () => {
  it("хоосон хайлтад бүх эм буцаана", () => {
    expect(filterDrugs(DRUGS, { query: "" })).toHaveLength(DRUGS.length);
  });

  it("латин нэрээр хайна", () => {
    expect(innsOf("paracet")).toEqual(["Paracetamol"]);
  });

  it("кирилл нэрээр хайна", () => {
    expect(innsOf("парацет")).toEqual(["Paracetamol"]);
  });

  it("том жижиг үсэг ялгахгүй", () => {
    expect(innsOf("AMOXI")).toContain("Amoxicillin");
  });

  it("ангилалаар шүүнэ", () => {
    const found = filterDrugs(DRUGS, { query: "", category: "antibiotic" });
    expect(found.map(categoryOf)).not.toContain("analgesic");
  });

  it("нэрээр эрэмбэлнэ", () => {
    const inns = innsOf("");
    expect(inns).toEqual([...inns].sort(byName));
  });

  it("олдохгүй хайлтад хоосон буцаана", () => {
    expect(innsOf("zzzzz")).toEqual([]);
  });
});
