import type { Drug } from "../../domain/drug";

/**
 * Cephalexin — Цефалексин
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

export const cephalexin: Drug = {
  id: "cephalexin",
  inn: "Cephalexin",
  innMn: "Цефалексин",
  category: "antibiotic",
  rules: [
    {
      id: "cephalexin-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 1,
      basis: {
        kind: "per_kg_per_day",
        minMgPerKg: 25,
        maxMgPerKg: 50
      },
      frequency: "qds",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 500
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 4000
        }
      ],
      sources: [],
      evidenceLevel: "E_unverified",
      isDefault: true
    }
  ],
  formulations: [
    {
      kind: "liquid",
      id: "125mg-5ml-0",
      labelMn: "125mg/5ml уусмал",
      mgPerMl: 25
    },
    {
      kind: "liquid",
      id: "250mg-5ml-1",
      labelMn: "250mg/5ml уусмал",
      mgPerMl: 50
    },
    {
      kind: "solid",
      id: "250mg-2",
      labelMn: "250mg капсул",
      mgPerUnit: 250,
      unitMn: "капсул",
      divisible: false
    },
    {
      kind: "solid",
      id: "500mg-3",
      labelMn: "500mg капсул",
      mgPerUnit: 500,
      unitMn: "капсул",
      divisible: false
    }
  ],
  warnings: [],
  contraindicationsMn: [],
  notesMn: "Хүнд халдварт 50 мг/кг/өдөр хүртэл нэмж болно.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
