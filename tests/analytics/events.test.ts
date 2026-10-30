import { describe, expect, it } from "vitest";
import type { AnalyticsEvent } from "@/lib/analytics/events";
import { parseEvent, toBlobs } from "@/lib/analytics/events";

const VALID: readonly AnalyticsEvent[] = [
  { name: "calculator_opened", calculator: "dose", mode: "standalone" },
  { name: "drug_selected", drugId: "amoxicillin" },
  { name: "search_no_result", query: "азитромицин" },
  { name: "weight_entered", bucket: "10-20" },
  {
    name: "calc_completed",
    drugId: "amoxicillin",
    formulationId: "125mg-5ml-0",
    bucket: "<10",
  },
  { name: "copy_result", drugId: "amoxicillin" },
  { name: "recent_drug_used", drugId: "amoxicillin" },
  { name: "install_prompt_shown", platform: "ios" },
  { name: "install_prompt_result", platform: "android", outcome: "accepted" },
];

describe("parseEvent", () => {
  it("бүх event хүчинтэй", () => {
    for (const event of VALID) expect(parseEvent(event)).toEqual(event);
  });

  it.each([
    ["үл мэдэгдэх нэр", { name: "foo" }],
    ["прототипийн нэр", { name: "toString" }],
    ["байхгүй эм", { name: "drug_selected", drugId: "not-a-drug" }],
    ["урт хайлт", { name: "search_no_result", query: "а".repeat(41) }],
    ["хоосон хайлт", { name: "search_no_result", query: "" }],
    ["тоон жин", { name: "weight_entered", bucket: 15 }],
    ["буруу bucket", { name: "weight_entered", bucket: "15" }],
    ["буруу тооцоолуур", { name: "calculator_opened", calculator: "x", mode: "browser" }],
    ["mode байхгүй", { name: "calculator_opened", calculator: "dose" }],
    ["буруу платформ", { name: "install_prompt_shown", platform: "windows" }],
    ["object биш", "drug_selected"],
    ["null", null],
  ])("%s → null", (_, input) => {
    expect(parseEvent(input)).toBeNull();
  });

  it("schema-д байхгүй талбарыг (жишээ нь жин) хаяна", () => {
    const parsed = parseEvent({
      name: "weight_entered",
      bucket: "10-20",
      weightKg: 14.2,
    });
    expect(parsed).toEqual({ name: "weight_entered", bucket: "10-20" });
  });
});

describe("toBlobs", () => {
  it("event + 3 талбар + улс, дутуу талбарыг хоосон мөрөөр", () => {
    expect(toBlobs(VALID[1], "MN")).toEqual([
      "drug_selected",
      "amoxicillin",
      "",
      "",
      "MN",
    ]);
  });

  it("calc_completed-ийн талбарууд schema-гийн дарааллаар", () => {
    expect(toBlobs(VALID[4], "MN")).toEqual([
      "calc_completed",
      "amoxicillin",
      "125mg-5ml-0",
      "<10",
      "MN",
    ]);
  });
});
