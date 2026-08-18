import type { Drug } from "../../domain/drug";

/**
 * Hydrocortisone — Гидрокортизон
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

export const hydrocortisone: Drug = {
  id: "hydrocortisone",
  inn: "Hydrocortisone",
  innMn: "Гидрокортизон",
  category: "corticosteroid",
  rules: [
    {
      id: "hydrocortisone-general",
      indication: "general",
      route: "oral_iv",
      ageMinMonths: 0,
      basis: {
        kind: "per_kg_per_day",
        minMgPerKg: 5,
        maxMgPerKg: 10
      },
      frequency: "bd",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 200
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 400
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
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Стрессийн үед тунг 2–3 дахин нэмнэ (стрессийн тун)."
    },
    {
      level: "warn",
      messageMn: "Урт хугацааны хэрэглэлтийн дараа аажим бууруулна."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Бөөрний дайврын булчирхайн дутмагшлын орлуулга эмчилгээнд ашиглана. Өглөө 2/3, орой 1/3 хуваарилна.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
