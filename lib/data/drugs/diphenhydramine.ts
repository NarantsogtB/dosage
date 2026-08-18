import type { Drug } from "../../domain/drug";

/**
 * Diphenhydramine — Дифенгидрамин
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

export const diphenhydramine: Drug = {
  id: "diphenhydramine",
  inn: "Diphenhydramine",
  innMn: "Дифенгидрамин",
  category: "antihistamine",
  rules: [
    {
      id: "diphenhydramine-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 24,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 1.25,
        maxMgPerKg: 1.25
      },
      frequency: "q6h",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 50
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 300
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
      id: "12-5mg-5ml-0",
      labelMn: "12.5mg/5ml уусмал",
      mgPerMl: 2.5
    },
    {
      kind: "solid",
      id: "25mg-1",
      labelMn: "25mg таблет",
      mgPerUnit: 25,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "50mg-2",
      labelMn: "50mg таблет",
      mgPerUnit: 50,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Тайвшруулах нөлөөтэй — машин жолоодох үед болгоомжтой хэрэглэх."
    },
    {
      level: "warn",
      messageMn: "2 нас хүрээгүй хүүхдэд хэрэглэж болохгүй."
    }
  ],
  contraindicationsMn: [],
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
