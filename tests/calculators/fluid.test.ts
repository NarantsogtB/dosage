import { describe, expect, it } from "vitest";
import {
  isAtCeiling,
  maintenanceMlPerDay,
  maintenanceMlPerHour,
  maintenanceParts,
} from "@/lib/calculators/fluid/maintenance";
import { bolusMl, malnourishedBolusMl } from "@/lib/calculators/fluid/bolus";
import { deficitMl, rehydrationPlan } from "@/lib/calculators/fluid/deficit";

const patient = (weightKg: number) => ({ weightKg, ageMonths: 24 });
const rateOf = (day: { rateMlPerHour: number }) => Math.round(day.rateMlPerHour);
const percentOf = (day: { deficitPercent: number }) => day.deficitPercent;

describe("Тэтгэх шингэн — RCH IV fluids (2026-01)", () => {
  it("мл/хон: 100 / 50 / 20 мл/кг", () => {
    expect(maintenanceMlPerDay(patient(8))).toBe(800);
    expect(maintenanceMlPerDay(patient(15))).toBe(1250);
    expect(maintenanceMlPerDay(patient(30))).toBe(1700);
    expect(maintenanceMlPerDay(patient(60))).toBe(2300);
  });

  it("мл/цаг: RCH-ийн хүснэгт (4-2-1)", () => {
    const table: readonly [number, number][] = [[5, 20], [10, 40], [15, 50], [20, 60], [35, 75], [55, 95]];
    for (const [kg, mlPerHour] of table) expect(maintenanceMlPerHour(patient(kg)), `${kg} кг`).toBe(mlPerHour);
  });

  it(">60 кг: 2400 мл/хон, 100 мл/цаг дээд", () => {
    expect(isAtCeiling(patient(70))).toBe(true);
    expect(maintenanceMlPerDay(patient(70))).toBe(2400);
    expect(maintenanceMlPerHour(patient(70))).toBe(100);
  });

  it("«Яаж тооцсон» шатууд", () => {
    expect(maintenanceParts(patient(15))).toEqual([
      { kg: 10, mlPerKg: 100, ml: 1000 },
      { kg: 5, mlPerKg: 50, ml: 250 },
    ]);
  });
});

describe("Болюс", () => {
  it("RCH 10–20 мл/кг", () => {
    expect(bolusMl(patient(12), 10)).toBe(120);
    expect(bolusMl(patient(12), 20)).toBe(240);
  });

  it("хүнд хоол тэжээлийн дутагдал — WHO 15 мл/кг", () => {
    expect(malnourishedBolusMl(patient(12))).toBe(180);
  });
});

describe("Дутагдал — RCH Dehydration / IV fluids", () => {
  it("10 кг, 5% → 500 мл (RCH-ийн жишээ)", () => {
    expect(deficitMl(patient(10), 5)).toBe(500);
  });

  it("хурд = maintenance + 5%/24 цаг — RCH-ийн хүснэгттэй ойролцоо", () => {
    expect(rateOf(rehydrationPlan(patient(4), 5)[0])).toBe(24);
    expect(rateOf(rehydrationPlan(patient(10), 5)[0])).toBe(61);
  });

  it("24 цагт ≤5%: 3% → 1 өдөр, 7% → 5 + 2, 10% → 5 + 5", () => {
    expect(rehydrationPlan(patient(10), 3).map(percentOf)).toEqual([3]);
    expect(rehydrationPlan(patient(10), 7).map(percentOf)).toEqual([5, 2]);
    expect(rehydrationPlan(patient(10), 10).map(percentOf)).toEqual([5, 5]);
  });
});
