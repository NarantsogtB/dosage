import { describe, expect, it } from "vitest";
import { DRUG_BY_ID } from "@/lib/data/drugs";
import { drugPageJsonLd, serializeJsonLd, siteJsonLd } from "@/lib/seo/json-ld";
import { SITE_URL } from "@/lib/site";

type Node = Record<string, unknown>;

const graphOf = (id: string): Node[] => {
  const drug = DRUG_BY_ID.get(id);
  if (!drug) throw new Error(`fixture drug missing: ${id}`);
  return drugPageJsonLd(drug)["@graph"] as Node[];
};

const pageOf = (id: string): Node => graphOf(id)[0];
const itemUrl = (item: Node) => item.item;
const itemPosition = (item: Node) => item.position;

describe("drugPageJsonLd", () => {
  it("MedicalWebPage нь эмийг INN-ээр нь тодорхойлно", () => {
    const page = pageOf("paracetamol");
    expect(page["@type"]).toBe("MedicalWebPage");
    expect(page.url).toBe(`${SITE_URL}/dose/paracetamol`);
    expect(page.about).toEqual({
      "@type": "Drug",
      name: "Парацетамол",
      nonProprietaryName: "Paracetamol",
    });
  });

  it("эх сурвалжтай эмд citation байна, эх сурвалжгүйд хоосон", () => {
    expect((pageOf("paracetamol").citation as string[]).length).toBeGreaterThan(0);
    expect(pageOf("captopril").citation).toEqual([]);
  });

  it("хянаагүй (1970-01-01) огноог зарлахгүй", () => {
    expect(pageOf("paracetamol")).not.toHaveProperty("lastReviewed");
  });

  it("breadcrumb: Нүүр → Эмийн тун → эм, бүрэн URL-тай", () => {
    const items = graphOf("paracetamol")[1].itemListElement as Node[];
    expect(items.map(itemUrl)).toEqual([
      `${SITE_URL}/`,
      `${SITE_URL}/dose`,
      `${SITE_URL}/dose/paracetamol`,
    ]);
    expect(items.map(itemPosition)).toEqual([1, 2, 3]);
  });

  it("тун, мг/кг гэх мэт тоон утга ОРУУЛАХГҮЙ", () => {
    const json = JSON.stringify(graphOf("paracetamol"));
    expect(json).not.toMatch(/мг|mg/);
  });
});

describe("siteJsonLd / serializeJsonLd", () => {
  it("WebSite, монгол хэл", () => {
    expect(siteJsonLd()).toMatchObject({ "@type": "WebSite", url: SITE_URL, inLanguage: "mn" });
  });

  it("`<` тэмдэгтийг escape хийж </script> тасалдлаас сэргийлнэ", () => {
    expect(serializeJsonLd({ name: "</script><b>" })).toBe('{"name":"\\u003c/script>\\u003cb>"}');
  });
});
