import { describe, expect, it } from "vitest";
import { formatDose } from "@/lib/format/format-dose";
import { doseParts } from "@/lib/format/dose-parts";

const range = (minMg: number, maxMg = minMg) => ({ minMg, maxMg });

describe("Тунгийн бичиглэл — мкг/мг аюулгүй (S4)", () => {
  it("мг хэвээр: 180 мг, 120–180 мг", () => {
    expect(formatDose(range(180))).toBe("180 мг");
    expect(formatDose(range(120, 180))).toBe("120–180 мг");
  });

  it("1 мг-аас бага: «0.1 мг (100 мкг)»", () => {
    expect(formatDose(range(0.1), "mg")).toBe("0.1 мг (100 мкг)");
  });

  it("1000 мкг ба түүнээс их: «1500 мкг (1.5 мг)»", () => {
    expect(formatDose(range(1500), "mcg")).toBe("1500 мкг (1.5 мг)");
    expect(formatDose(range(50), "mcg")).toBe("50 мкг");
  });

  it("ЕД, ммоль — давхар бичиглэлгүй", () => {
    expect(formatDose(range(2), "units")).toBe("2 ЕД");
    expect(formatDose(range(1), "mmol")).toBe("1 ммоль");
  });

  it("doseParts: нэгж, давхар бичиглэл тусдаа", () => {
    expect(doseParts(range(0.25), "mg")).toEqual({ value: "0.25", unit: "мг", alternate: "250 мкг" });
    expect(doseParts(range(5), "mg").alternate).toBeUndefined();
  });
});
