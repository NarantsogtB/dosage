import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { DRUGS } from "@/lib/data/drugs";
import { drugPath, isIndexable } from "@/lib/drug-page/drug-page-meta";
import { SITE_URL } from "@/lib/site";

const urls = new Set(sitemap().map((entry) => entry.url));
const urlOf = (path: string) => `${SITE_URL}${path}`;
const notIndexable = (drug: (typeof DRUGS)[number]) => !isIndexable(drug);

describe("sitemap", () => {
  it("үндсэн 3 хуудас хэвээр", () => {
    for (const path of ["/", "/dose", "/burns"]) expect(urls.has(urlOf(path))).toBe(true);
  });

  it("эх сурвалжтай эм бүрийн хуудас орсон", () => {
    const indexable = DRUGS.filter(isIndexable);
    expect(indexable.length).toBeGreaterThan(0);
    for (const drug of indexable) expect(urls.has(urlOf(drugPath(drug))), drug.id).toBe(true);
  });

  it("эх сурвалжгүй эмийн хуудас ороогүй", () => {
    for (const drug of DRUGS.filter(notIndexable)) {
      expect(urls.has(urlOf(drugPath(drug))), drug.id).toBe(false);
    }
  });
});
