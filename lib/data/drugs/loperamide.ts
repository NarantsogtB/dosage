import type { Drug } from "../../domain/drug";

/**
 * Loperamide — Лоперамид
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

export const loperamide: Drug = {
  id: "loperamide",
  inn: "Loperamide",
  innMn: "Лоперамид",
  category: "gi",
  rules: [
    {
      id: "loperamide-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 24,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 0.1,
        maxMgPerKg: 0.1
      },
      frequency: "tds",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 2
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 8
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
      id: "1mg-5ml-0",
      labelMn: "1mg/5ml уусмал",
      mgPerMl: 0.2
    },
    {
      kind: "solid",
      id: "2mg-1",
      labelMn: "2mg капсул/таблет",
      mgPerUnit: 2,
      unitMn: "капсул",
      divisible: false
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "2 нас хүрээгүй хүүхдэд хориглоно."
    },
    {
      level: "warn",
      messageMn: "Цус буюу хэмхдэс бүхий суулгалтад (халдварт колит) хэрэглэхгүй."
    },
    {
      level: "warn",
      messageMn: "Суулгалтын шалтгааныг эмчлэх — шинж тэмдгийг дарах дангаараа хэрэглэхгүй."
    }
  ],
  contraindicationsMn: [],
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
