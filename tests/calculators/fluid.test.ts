import { describe, expect, it } from "vitest";
import { maintenanceMlPerDay, maintenanceMlPerHour } from "@/lib/calculators/fluid/maintenance";
import { bolusMl } from "@/lib/calculators/fluid/bolus";

const patient = (weightKg: number) => ({ weightKg, ageMonths: 24 });

describe("Holliday-Segar тэтгэх шингэн", () => {
  it("10 кг хүртэл 100 мл/кг", () => {
    expect(maintenanceMlPerDay(patient(8))).toBe(800);
    expect(maintenanceMlPerDay(patient(10))).toBe(1000);
  });

  it("10–20 кг: 1000 + 50 мл/кг", () => {
    expect(maintenanceMlPerDay(patient(15))).toBe(1250);
    expect(maintenanceMlPerDay(patient(20))).toBe(1500);
  });

  it("20 кг-аас дээш: 1500 + 20 мл/кг", () => {
    expect(maintenanceMlPerDay(patient(30))).toBe(1700);
    expect(maintenanceMlPerDay(patient(50))).toBe(2100);
  });

  it("цагийн хурд нь өдрийн тунг 24-т хуваасантай тэнцүү", () => {
    expect(maintenanceMlPerHour(patient(15))).toBeCloseTo(52.08, 2);
  });
});

describe("Болюс", () => {
  it("стандарт 20 мл/кг", () => {
    expect(bolusMl(patient(12))).toBe(240);
  });

  it("хүнд хоол тэжээлийн дутагдалтайд 10 мл/кг", () => {
    expect(bolusMl(patient(12), true)).toBe(120);
  });
});
