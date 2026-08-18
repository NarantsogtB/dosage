import type { Drug } from "../../domain/drug";

/**
 * Propranolol — Пропранолол
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

export const propranolol: Drug = {
  id: "propranolol",
  inn: "Propranolol",
  innMn: "Пропранолол",
  category: "antihypertensive",
  rules: [
    {
      id: "propranolol-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 0,
      basis: {
        kind: "per_kg_per_day",
        minMgPerKg: 0.5,
        maxMgPerKg: 1
      },
      frequency: "tds",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 80
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 160
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
      id: "40mg-2",
      labelMn: "40mg таблет",
      mgPerUnit: 40,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Астма, бронхоспазм, хэрэгжилттэй хориглоно."
    },
    {
      level: "warn",
      messageMn: "Гэнэтийн зогсоохыг хориглоно — зүрхний тахикарди нэмэгдэх аюул."
    },
    {
      level: "warn",
      messageMn: "Бага насны хүүхдэд гипогликеми үүсгэж болно."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Зүрхний сул дорой байдал, цусны даралт, тиротоксикоз, гемангиомад хэрэглэнэ.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
