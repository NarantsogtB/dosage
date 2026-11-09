import { describe, expect, it } from "vitest";
import { DEFAULT_PREFS, parsePrefs } from "@/components/settings/prefs";

describe("parsePrefs", () => {
  it("хадгалсан нэгжийг сэргээнэ", () => {
    expect(parsePrefs(JSON.stringify({ weightUnit: "g" }))).toEqual({ weightUnit: "g" });
    expect(parsePrefs(JSON.stringify({ weightUnit: "kg" }))).toEqual({ weightUnit: "kg" });
  });

  it("null, эвдэрсэн, үл таних утга → анхдагч", () => {
    expect(parsePrefs(null)).toEqual(DEFAULT_PREFS);
    expect(parsePrefs("{не json")).toEqual(DEFAULT_PREFS);
    expect(parsePrefs(JSON.stringify({ weightUnit: "lb" }))).toEqual(DEFAULT_PREFS);
    expect(parsePrefs("5")).toEqual(DEFAULT_PREFS);
  });
});
