import type { Drug } from "../../domain/drug";

/**
 * Promethazine — Прометазин
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

export const promethazine: Drug = {
  id: "promethazine",
  inn: "Promethazine",
  innMn: "Прометазин",
  category: "antihistamine",
  rules: [
    {
      id: "promethazine-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 24,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 0.1,
        maxMgPerKg: 0.25
      },
      frequency: "tds",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 25
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 75
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
      id: "5mg-5ml-0",
      labelMn: "5mg/5ml уусмал",
      mgPerMl: 1
    },
    {
      kind: "solid",
      id: "10mg-1",
      labelMn: "10mg таблет",
      mgPerUnit: 10,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "25mg-2",
      labelMn: "25mg таблет",
      mgPerUnit: 25,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "2 нас хүрээгүй хүүхдэд амьсгал дарангуйлах аюултай — ХОРИГЛОНО."
    },
    {
      level: "warn",
      messageMn: "Хүчтэй тайвшруулах нөлөөтэй."
    },
    {
      level: "warn",
      messageMn: "Экстрапирамидын урвал, NMS эрсдэлтэй."
    }
  ],
  contraindicationsMn: [],
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
