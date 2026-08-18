import { describe, expect, it } from "vitest";
import { DRUGS } from "@/lib/drugs";
import { calculateDosage } from "@/lib/calculations";
import type { Drug as LegacyDrug } from "@/lib/drugs";
import type { Patient } from "@/lib/domain/patient";
import { SAMPLE_PATIENTS } from "./fixtures/patients";

const EXPECTED_DRUG_COUNT = 50;

const evaluate = (drug: LegacyDrug, patient: Patient) => ({
  drug: drug.id,
  weightKg: patient.weightKg,
  ageMonths: patient.ageMonths,
  result: calculateDosage(drug, {
    weightKg: patient.weightKg,
    totalAgeMo: patient.ageMonths,
  }),
});

const evaluateDrug = (drug: LegacyDrug) =>
  SAMPLE_PATIENTS.map((patient) => evaluate(drug, patient));

const evaluateAll = () => DRUGS.flatMap(evaluateDrug);

const drugIds = () => DRUGS.map((drug) => drug.id);

/**
 * ХАМГААЛАЛТЫН ТОР.
 *
 * Энэ тест шинэ архитектурыг шалгахгүй — ОДООГИЙН зан төлөвийг царцаана.
 * Refactor хийх үед үр дүн өөрчлөгдвөл шууд илрүүлнэ.
 *
 * Snapshot өөрчлөгдвөл ХОЁР асуултын аль нэгийг л асууна:
 *   1. Энэ бол санаатай засвар мөн үү? (эх сурвалж + хянасан эмчийн нэртэй)
 *   2. Эсвэл refactor эмийн тунг эвдсэн үү?
 */
describe("Одоогийн тооцооллын зан төлөв", () => {
  it("бүх эмийн үр дүн өөрчлөгдөөгүй байх", () => {
    expect(evaluateAll()).toMatchSnapshot();
  });

  it("эмийн тоо санамсаргүй өөрчлөгдөхгүй байх", () => {
    expect(DRUGS.length).toBe(EXPECTED_DRUG_COUNT);
  });

  it("эмийн id давхардаагүй байх", () => {
    expect(new Set(drugIds()).size).toBe(DRUGS.length);
  });
});
