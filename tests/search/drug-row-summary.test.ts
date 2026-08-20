import { describe, expect, it } from "vitest";
import { drugRowSummary } from "@/lib/search/drug-row-summary";
import { DRUGS } from "@/lib/data/drugs";

const byId = (id: string) => {
  const drug = DRUGS.find((d) => d.id === id);
  if (!drug) throw new Error(`fixture drug missing: ${id}`);
  return drug;
};

describe("drugRowSummary", () => {
  it("заалт + мг/кг/хон хэлбэрээр буцаана", () => {
    expect(drugRowSummary(byId("amoxicillin-clavulanate"))).toBe(
      "Ерөнхий заалт · 40–90 мг/кг/хон",
    );
  });

  it("бүх эмд тодорхойлогдсон утга буцаана (хоосон биш)", () => {
    for (const drug of DRUGS) {
      expect(drugRowSummary(drug)).toBeTruthy();
    }
  });
});
