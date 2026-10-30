import { describe, expect, it } from "vitest";
import { MAX_RECENT, parseRecent, pushRecent } from "@/lib/recent/recent-drugs";

describe("pushRecent", () => {
  it("шинэ эмийг эхэнд нэмнэ", () => {
    expect(pushRecent(["paracetamol"], "ibuprofen")).toEqual(["ibuprofen", "paracetamol"]);
  });

  it("байгаа эмийг эхэнд шилжүүлнэ, давхардуулахгүй", () => {
    expect(pushRecent(["a", "b", "c"], "c")).toEqual(["c", "a", "b"]);
  });

  it(`дээд тал нь ${MAX_RECENT}`, () => {
    const ids = ["a", "b", "c", "d", "e"];
    expect(pushRecent(ids, "f")).toEqual(["f", "a", "b", "c", "d"]);
  });
});

describe("parseRecent", () => {
  it("хүчинтэй жагсаалтыг уншина", () => {
    expect(parseRecent('["amoxicillin","paracetamol"]')).toEqual(["amoxicillin", "paracetamol"]);
  });

  it.each([
    ["null", null],
    ["эвдэрсэн JSON", "[amox"],
    ["массив биш", '{"a":1}'],
    ["хоосон мөр", ""],
  ])("%s → хоосон", (_, raw) => {
    expect(parseRecent(raw)).toEqual([]);
  });

  it("үл мэдэгдэх эм, тоо, давхардлыг хаяна", () => {
    expect(parseRecent('["amoxicillin","gone-drug",5,"amoxicillin"]')).toEqual(["amoxicillin"]);
  });

  it(`${MAX_RECENT}-аас илүүг таслана`, () => {
    const raw = JSON.stringify(["amoxicillin", "paracetamol", "ibuprofen", "cetirizine", "loratadine", "omeprazole"]);
    expect(parseRecent(raw)).toHaveLength(MAX_RECENT);
  });
});
