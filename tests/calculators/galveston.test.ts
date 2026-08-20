import { describe, expect, it } from "vitest";
import { mostellerBsaM2 } from "@/lib/calculators/bsa/mosteller";
import { galveston } from "@/lib/calculators/burns/galveston";
import { exceedsIvyLimit, ivyLimitMl } from "@/lib/calculators/burns/ivy-limit";
import { targetMlPerHour, urineTargetOf } from "@/lib/calculators/burns/urine-target";

const child = { weightKg: 20, ageMonths: 60, heightCm: 110 };
const noHeight = { weightKg: 20, ageMonths: 60 };

describe("Mosteller БГТ", () => {
  it("√(110 × 20 / 3600) ≈ 0.782 м²", () => {
    expect(mostellerBsaM2(child)).toBeCloseTo(0.782, 3);
  });

  it("өндөргүй бол null — таамаглахгүй", () => {
    expect(mostellerBsaM2(noHeight)).toBeNull();
  });
});

describe("Гальвестон", () => {
  it("5000 мл/м² түлэгдсэн + 2000 мл/м² БГТ", () => {
    const result = galveston(child, 30);
    expect(result).not.toBeNull();
    if (!result) return;

    // БГТ = √(110 × 20 / 3600) = 0.781736 м²
    // түлэгдсэн = 0.781736 × 0.30 = 0.234521 м²
    // 5000 × 0.234521 + 2000 × 0.781736 = 1172.60 + 1563.47 = 2736.08 мл
    expect(result.totalMl).toBeCloseTo(2736.08, 1);
    expect(result.firstBlockMl).toBeCloseTo(1368.04, 1);
    expect(result.laterBlockMl).toBeCloseTo(684.02, 1);
  });

  it("хуваарь ½ · ¼ · ¼ нийлбэр нь нийт дүнтэй тэнцэнэ", () => {
    const result = galveston(child, 30);
    if (!result) throw new Error("тооцоолол амжилтгүй");
    const sum = result.firstBlockMl + result.laterBlockMl * 2;
    expect(sum).toBeCloseTo(result.totalMl, 6);
  });

  it("өндөргүй бол тооцоолохгүй", () => {
    expect(galveston(noHeight, 30)).toBeNull();
  });
});

describe("Шээсний гарцын зорилт", () => {
  it("30 кг-аас бага: 0.5–1.0 мл/кг/цаг", () => {
    const target = urineTargetOf(child);
    expect(target.minMlPerKgPerHour).toBe(0.5);
    expect(targetMlPerHour(child, target)).toEqual({ minMl: 10, maxMl: 20 });
  });

  it("олигурийн босго 0.3 мл/кг/цаг", () => {
    expect(urineTargetOf(child).oliguriaBelow).toBe(0.3);
  });
});

describe("Ivy хязгаар", () => {
  it("20 кг → 5000 мл/24 цаг", () => {
    expect(ivyLimitMl(child)).toBe(5000);
  });

  it("хязгаар давсныг илрүүлнэ", () => {
    expect(exceedsIvyLimit(child, 5200)).toBe(true);
    expect(exceedsIvyLimit(child, 2400)).toBe(false);
  });
});
