import type { Drug } from "../../domain/drug";

/**
 * Omeprazole — Омепразол
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

export const omeprazole: Drug = {
  id: "omeprazole",
  inn: "Omeprazole",
  innMn: "Омепразол",
  category: "gi",
  rules: [
    {
      id: "omeprazole-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 12,
      basis: {
        kind: "per_kg_per_day",
        minMgPerKg: 0.7,
        maxMgPerKg: 3.5
      },
      frequency: "od",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 40
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
      labelMn: "10mg капсул",
      mgPerUnit: 10,
      unitMn: "капсул",
      divisible: false
    },
    {
      kind: "solid",
      id: "20mg-1",
      labelMn: "20mg капсул",
      mgPerUnit: 20,
      unitMn: "капсул",
      divisible: false
    },
    {
      kind: "solid",
      id: "40mg-2",
      labelMn: "40mg капсул",
      mgPerUnit: 40,
      unitMn: "капсул",
      divisible: false
    }
  ],
  warnings: [],
  contraindicationsMn: [],
  notesMn: "Хоолны 30–60 минутын өмнө уух. ГЭРББ-д: 0.7–1 мг/кг. Хэрэгцээтэй бол 2 удаа хуваан уух.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
