import { describe, expect, it } from "vitest";
import type { DosageOutcome } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import { DRUGS } from "@/lib/data/drugs";
import { calculateDosage } from "@/lib/engine";
import { matchesRoute } from "@/lib/engine/formulation/route-match";
import { SAMPLE_PATIENTS } from "../fixtures/patients";

/*
 * БОДИТ өгөгдлийн инвариант. Хуучин snapshot тоог царцаадаг байсан —
 * өгөгдөл баталгаажих бүрд эвдэрнэ. Энд тоо биш, үргэлж үнэн байх ёстой
 * шинжийг шалгана: эм × төлөөлөх өвчтөн бүрд.
 */
const EPSILON = 0.01;


interface Case {
  readonly drug: Drug;
  readonly out: DosageOutcome;
}

const casesOf = (drug: Drug): readonly Case[] =>
  SAMPLE_PATIENTS.map((patient) => calculateDosage(drug, patient)).flatMap((result) =>
    result.type === "dosage" ? [{ drug, out: result.data }] : [],
  );

const outcomes = (): readonly Case[] => DRUGS.flatMap(casesOf);

/** Нөхцөлийг зөрчсөн эмийн id-ууд — алдааны мессежид аль эм болохыг харуулна. */
const failing = (broken: (item: Case) => boolean): readonly string[] =>
  outcomes().filter(broken).map((item) => item.drug.id);

const isValidAmount = (value: number): boolean => Number.isFinite(value) && value >= 0;

const badRange = ({ out }: Case): boolean =>
  !isValidAmount(out.perDose.minMg) || out.perDose.minMg > out.perDose.maxMg + EPSILON;

const overLimit = ({ out }: Case): boolean => out.perDose.maxMg > out.limitMg + EPSILON;

const badDaily = ({ out }: Case): boolean =>
  Math.abs(out.perDay.maxMg - out.perDose.maxMg * out.dosesPerDay) > 1;

/** Дүрмийн замд тохирох бэлдмэл бүрд (Шат 6/7: IM ампул IV дүрэмд орохгүй). */
const missingAmounts = ({ drug, out }: Case): boolean =>
  out.amounts.length < drug.formulations.filter((f) => matchesRoute(f, out.rule.route)).length;

const ids = (): readonly string[] => DRUGS.map((drug) => drug.id);

describe("бодит эмийн инвариант", () => {
  it("эмийн жагсаалт хоосон биш, id давхардахгүй", () => {
    expect(DRUGS.length).toBeGreaterThan(0);
    expect(new Set(ids()).size).toBe(DRUGS.length);
  });

  it("бүх эм × өвчтөнд алдаа шидэхгүй", () => {
    expect(outcomes).not.toThrow();
    expect(outcomes().length).toBeGreaterThan(0);
  });

  it("нэг удаагийн тун: доод ≤ дээд, сөрөг биш, төгсгөлөг", () => {
    expect(failing(badRange)).toEqual([]);
  });

  it("нэг удаагийн тун идэвхтэй хязгаараас давахгүй (тоймлол ч давуулахгүй)", () => {
    expect(failing(overLimit)).toEqual([]);
  });

  it("өдрийн нийт = нэг удаагийн тун × давтамж", () => {
    expect(failing(badDaily)).toEqual([]);
  });

  it("замд тохирох бэлдмэл бүрд хэмжээ гарна", () => {
    expect(failing(missingAmounts)).toEqual([]);
  });
});
