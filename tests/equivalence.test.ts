import { describe, expect, it } from "vitest";
import type { Drug as LegacyDrug } from "@/lib/drugs";
import type { Patient } from "@/lib/domain/patient";
import { DRUGS as LEGACY_DRUGS } from "@/lib/drugs";
import { DRUGS as NEW_DRUGS, DRUG_BY_ID } from "@/lib/data/drugs";
import { calculateDosage as legacyCalculate } from "@/lib/calculations";
import { calculateDosage } from "@/lib/engine";
import { SAMPLE_PATIENTS } from "./fixtures/patients";
import { compare, type Diff } from "./helpers/compare-engines";
import { isIntentionallyChanged } from "./helpers/intentional-changes";

/**
 * ТЭНЦВЭРИЙН ТЕСТ.
 *
 * Шинэ engine + шилжүүлсэн өгөгдөл нь хуучин хослолтой ЯГ ИЖИЛ
 * үр дүн өгөх ёстой. Шилжүүлэлт бол зөвхөн БҮТЦИЙН өөрчлөлт —
 * эмийн тун нэг ч миллиграммаар өөрчлөгдөхгүй.
 *
 * Энэ тест уначихвал шилжүүлэлт эмийн тунг эвдсэн гэсэн үг.
 */
const compareOne = (legacy: LegacyDrug, patient: Patient): Diff | null =>
  compare({
    legacy: legacyCalculate(legacy, {
      weightKg: patient.weightKg,
      totalAgeMo: patient.ageMonths,
    }),
    next: calculateDosage(DRUG_BY_ID.get(legacy.id)!, patient),
    drugId: legacy.id,
    patient,
  });

const compareDrug = (legacy: LegacyDrug): readonly (Diff | null)[] =>
  SAMPLE_PATIENTS.map((patient) => compareOne(legacy, patient));

const isDiff = (value: Diff | null): value is Diff => value !== null;

const isUnexpected = (diff: Diff): boolean =>
  !isIntentionallyChanged(diff.drugId);

const collectDiffs = (): readonly Diff[] =>
  LEGACY_DRUGS.flatMap(compareDrug).filter(isDiff).filter(isUnexpected);

const sortedIds = (drugs: readonly { id: string }[]): readonly string[] =>
  drugs.map((drug) => drug.id).sort();

describe("Хуучин ба шинэ engine-ийн тэнцвэр", () => {
  it("бүх эм шилжсэн байх", () => {
    expect(NEW_DRUGS.length).toBe(LEGACY_DRUGS.length);
  });

  it("id-ууд бүрэн таарах", () => {
    expect(sortedIds(NEW_DRUGS)).toEqual(sortedIds(LEGACY_DRUGS));
  });

  it("санаатай өөрчлөөгүй эмийн тун хэвээр байх", () => {
    expect(collectDiffs()).toEqual([]);
  });
});
