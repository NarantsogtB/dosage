import { describe, expect, it } from "vitest";
import { DRUG_BY_ID, DRUGS } from "@/lib/data/drugs";
import { findSource } from "@/lib/data/sources/get-source";
import {
  drugPageMeta,
  drugPath,
  drugSlug,
  isIndexable,
} from "@/lib/drug-page/drug-page-meta";
import { drugSources } from "@/lib/drug-page/drug-sources";
import type { Drug } from "@/lib/domain/drug";

const refKey = (ref: { sourceId: string; locator: string }) =>
  `${ref.sourceId}|${ref.locator}`;

const hasNoSources = (drug: Drug) => drugSources(drug).length === 0;

const expectResolvableSources = (drug: Drug) => {
  const refs = drugSources(drug);
  expect(refs.length, drug.id).toBeGreaterThan(0);
  const missing = refs.filter((ref) => !findSource(ref.sourceId));
  expect(missing, drug.id).toEqual([]);
};

const byId = (id: string) => {
  const drug = DRUG_BY_ID.get(id);
  if (!drug) throw new Error(`fixture drug missing: ${id}`);
  return drug;
};

describe("drugSlug", () => {
  it("эм бүр давхардаагүй slug-тай", () => {
    const slugs = DRUGS.map(drugSlug);
    expect(new Set(slugs).size).toBe(DRUGS.length);
  });

  it("slug нь URL-д аюулгүй (латин жижиг үсэг, тоо, зураас)", () => {
    for (const drug of DRUGS) expect(drugSlug(drug)).toMatch(/^[a-z0-9-]+$/);
  });
});

describe("эх сурвалж", () => {
  it("индексжүүлэх эм бүр бүртгэлд олдох эх сурвалжтай", () => {
    DRUGS.filter(isIndexable).forEach(expectResolvableSources);
  });

  it("эх сурвалжгүй эм индексжүүлэгдэхгүй", () => {
    for (const drug of DRUGS.filter(hasNoSources)) {
      expect(isIndexable(drug), drug.id).toBe(false);
    }
  });

  it("ижил эшлэлийг давхардуулахгүй", () => {
    const refs = drugSources(byId("amoxicillin"));
    const keys = refs.map(refKey);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

describe("drugPageMeta", () => {
  it("эх сурвалжтай эм: title, canonical, индексжүүлнэ", () => {
    const meta = drugPageMeta(byId("amoxicillin"));
    expect(meta.title).toBe("Амоксициллин — хүүхдийн тун жингээр");
    expect(meta.alternates?.canonical).toBe("/dose/amoxicillin");
    expect(meta.robots).toBeUndefined();
    expect(meta.description).toContain("Эх сурвалж:");
  });

  it("эх сурвалжгүй эм: noindex, тайлбарт ил хэлнэ", () => {
    const meta = drugPageMeta(byId("captopril"));
    expect(meta.robots).toEqual({ index: false, follow: true });
    expect(meta.description).toContain("Эх сурвалж баталгаажаагүй");
  });

  it("description бүр 200 тэмдэгтээс богино", () => {
    for (const drug of DRUGS) {
      expect(String(drugPageMeta(drug).description).length, drug.id).toBeLessThan(200);
    }
  });

  it("зам нь /dose/<slug>", () => {
    expect(drugPath(byId("zinc-sulfate"))).toBe("/dose/zinc-sulfate");
  });
});
