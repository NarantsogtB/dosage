import type { Drug } from "../../domain/drug";

/**
 * Amoxicillin-clavulanate — Амоксициллин + Клавуланат
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

export const amoxicillinClavulanate: Drug = {
  id: "amoxicillin-clavulanate",
  inn: "Amoxicillin-clavulanate",
  innMn: "Амоксициллин + Клавуланат",
  category: "antibiotic",
  rules: [
    {
      id: "amoxicillin-clavulanate-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 3,
      basis: {
        kind: "per_kg_per_day",
        minMgPerKg: 40,
        maxMgPerKg: 90
      },
      frequency: "bd",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 875
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 1750
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
      id: "125-31-25mg-per-5ml-0",
      labelMn: "125/31.25mg per 5ml уусмал",
      mgPerMl: 25
    },
    {
      kind: "solid",
      id: "500-125mg-1",
      labelMn: "500/125mg таблет",
      mgPerUnit: 500,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "875-125mg-2",
      labelMn: "875/125mg таблет",
      mgPerUnit: 875,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Тун нь amoxicillin бүрэлдэхүүний хэмжээгээр тооцогдоно."
    }
  ],
  contraindicationsMn: [],
  notesMn: "2 удаа уух горимыг ашиглана (clavulanate-ийн хүлцэл сайн).",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
