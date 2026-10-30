import { describe, expect, it } from "vitest";
import { calcEvents, searchMissEvents } from "@/lib/analytics/builders";
import { DRUG_BY_ID } from "@/lib/data/drugs";
import { calculateDosage } from "@/lib/engine";

describe("searchMissEvents", () => {
  it("хайлтаас болж хоосон бол normalize хийсэн үгтэй event", () => {
    expect(
      searchMissEvents({ query: "  Азитро  ", shown: 0, filtered: false }),
    ).toEqual([{ name: "search_no_result", query: "азитро" }]);
  });

  it.each([
    ["үр дүн байгаа", { query: "амок", shown: 2, filtered: false }],
    ["шүүлтээс болсон", { query: "амок", shown: 0, filtered: true }],
    ["хоосон үг", { query: "   ", shown: 0, filtered: false }],
  ])("%s → event байхгүй", (_, state) => {
    expect(searchMissEvents(state)).toEqual([]);
  });

  it("урт үгийг 40 тэмдэгтээр таслана", () => {
    const [event] = searchMissEvents({
      query: "а".repeat(60),
      shown: 0,
      filtered: false,
    });
    expect(event).toEqual({ name: "search_no_result", query: "а".repeat(40) });
  });
});

describe("calcEvents", () => {
  const drug = DRUG_BY_ID.get("amoxicillin")!;

  it("амжилттай тооцоолсон эмд анхдагч бэлдмэлтэй event", () => {
    const result = calculateDosage(drug, { weightKg: 15, ageMonths: 36 }, {});
    const events = calcEvents(new Map([[drug.id, result]]), "10-20");
    expect(events).toEqual([
      {
        name: "calc_completed",
        drugId: "amoxicillin",
        formulationId: "125mg-5ml-0",
        bucket: "10-20",
      },
    ]);
  });

  it("тооцоолох боломжгүй үр дүнг алгасна", () => {
    const result = calculateDosage(drug, { weightKg: 15, ageMonths: 300 }, {});
    expect(result.type).toBe("ineligible");
    expect(calcEvents(new Map([[drug.id, result]]), "10-20")).toEqual([]);
  });
});
