import type { Drug } from "@/lib/domain/drug";
import type { DosingRule } from "@/lib/domain/dosing-rule";

const SOURCES = [{ sourceId: "who-aware-2022", locator: "тест" }];

const BASE_RULE: DosingRule = {
  id: "base",
  indication: "general",
  route: "oral",
  ageMinMonths: 0,
  basis: { kind: "per_kg_per_dose", minMgPerKg: 10, maxMgPerKg: 10 },
  frequency: "bd",
  caps: [],
  sources: SOURCES,
  evidenceLevel: "B_who",
};

/** Тестийн дүрэм. Заасан талбарыг л дарж бичнэ. */
export const makeRule = (overrides: Partial<DosingRule> = {}): DosingRule => ({
  ...BASE_RULE,
  ...overrides,
});

/** Тестийн эм. */
export const makeDrug = (
  rules: readonly DosingRule[],
  overrides: Partial<Drug> = {},
): Drug => ({
  id: "test-drug",
  inn: "Test",
  innMn: "Тест",
  category: "antibiotic",
  rules,
  formulations: [
    { kind: "liquid", id: "susp", labelMn: "250мг/5мл", mgPerMl: 50 },
  ],
  warnings: [],
  contraindicationsMn: [],
  sources: SOURCES,
  lastReviewed: "2026-08-17",
  status: "active",
  ...overrides,
});
