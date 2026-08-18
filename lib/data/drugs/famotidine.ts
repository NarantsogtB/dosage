import type { Drug } from "../../domain/drug";

/**
 * Famotidine — Фамотидин
 *
 * ⚠️ ЭХ СУРВАЛЖ БАТАЛГААЖААГҮЙ (evidenceLevel: "E_unverified").
 * MVP-ийн lib/drugs.ts-ээс автоматаар хөрвүүлсэн. Тунгийн утга нь
 * анхны хувилбартай ЯГ ИЖИЛ — өөрчлөөгүй.
 *
 * Хийх ажил (docs/SOURCES.md, 5-р хэсэг):
 *   1. WHO AWaRe / 2024 заавраас тунг баталгаажуулах
 *   2. sources[] бөглөх, evidenceLevel шинэчлэх
 *   3. lastReviewed, reviewedBy бөглөх
 *   4. contraindicationsMn нэмэх (druginfo.mohs.mn)
 *   5. formulation бүрд availableInMn тэмдэглэх
 *   6. warnings[].level-ийг эргэн харах (бүгд "warn" гэж хөрвүүлсэн)
 */

export const famotidine: Drug = {
  id: "famotidine",
  inn: "Famotidine",
  innMn: "Фамотидин",
  category: "gi",
  rules: [
    {
      id: "famotidine-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 12,
      basis: {
        kind: "per_kg_per_day",
        minMgPerKg: 0.5,
        maxMgPerKg: 1
      },
      frequency: "bd",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 20
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 40
        }
      ],
      sources: [],
      evidenceLevel: "E_unverified",
      isDefault: true
    }
  ],
  formulations: [
    {
      kind: "solid",
      id: "10mg-0",
      labelMn: "10mg таблет",
      mgPerUnit: 10,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "20mg-1",
      labelMn: "20mg таблет",
      mgPerUnit: 20,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "40mg-2",
      labelMn: "40mg таблет",
      mgPerUnit: 40,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [],
  contraindicationsMn: [],
  notesMn: "Хоолны 30–60 минутын өмнө уух. ГЭРББ, шархлааны өвчинд хэрэглэнэ.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
