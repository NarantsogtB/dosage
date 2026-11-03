import { describe, expect, it } from "vitest";
import { maxDoseTone } from "@/lib/format/max-dose-tone";

describe("maxDoseTone", () => {
  it("80%-иас доош бол neutral", () => {
    expect(maxDoseTone(50, false)).toBe("neutral");
    expect(maxDoseTone(79, false)).toBe("neutral");
  });

  it("80–100% бол warning", () => {
    expect(maxDoseTone(80, false)).toBe("warning");
    expect(maxDoseTone(100, false)).toBe("warning");
  });

  it("тасалсан бол хувиас үл хамааран destructive", () => {
    expect(maxDoseTone(100, true)).toBe("destructive");
    expect(maxDoseTone(40, true)).toBe("destructive");
  });
});
