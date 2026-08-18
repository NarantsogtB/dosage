import { describe, expect, it } from "vitest";
import { applyCaps } from "@/lib/engine/caps/apply-caps";

const patient = { weightKg: 20, ageMonths: 60 };

describe("applyCaps", () => {
  it("хязгааргүй үед тунг өөрчлөхгүй", () => {
    const out = applyCaps({ minMg: 100, maxMg: 200 }, [], patient, 3);
    expect(out.range).toEqual({ minMg: 100, maxMg: 200 });
    expect(out.cappedAtMax).toBe(false);
  });

  it("нэг удаагийн тунгийн хязгаараар таслана", () => {
    const caps = [{ kind: "absolute", scope: "per_dose", maxMg: 150 } as const];
    const out = applyCaps({ minMg: 100, maxMg: 200 }, caps, patient, 3);
    expect(out.range.maxMg).toBe(150);
    expect(out.cappedAtMax).toBe(true);
  });

  it("өдрийн хязгаарыг давтамжид хуваана", () => {
    const caps = [{ kind: "absolute", scope: "per_day", maxMg: 300 } as const];
    const out = applyCaps({ minMg: 100, maxMg: 200 }, caps, patient, 3);
    expect(out.range.maxMg).toBe(100);
  });

  it("жинд суурилсан хязгаарыг дэмжинэ (domperidone 0.75 мг/кг/өдөр)", () => {
    const caps = [
      { kind: "per_kg", scope: "per_day", maxMgPerKg: 0.75 } as const,
    ];
    const out = applyCaps({ minMg: 10, maxMg: 10 }, caps, patient, 3);
    expect(out.range.maxMg).toBeCloseTo(5, 5);
  });
});
