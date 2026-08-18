import type { Drug } from "../../domain/drug";

/**
 * Isoniazid — Изониазид
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

export const isoniazid: Drug = {
  id: "isoniazid",
  inn: "Isoniazid",
  innMn: "Изониазид",
  category: "antitb",
  rules: [
    {
      id: "isoniazid-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 0,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 10,
        maxMgPerKg: 10
      },
      frequency: "od",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 300
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
      id: "50mg-5ml-0",
      labelMn: "50mg/5ml уусмал",
      mgPerMl: 10
    },
    {
      kind: "solid",
      id: "100mg-1",
      labelMn: "100mg таблет",
      mgPerUnit: 100,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "300mg-2",
      labelMn: "300mg таблет",
      mgPerUnit: 300,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Элэгний гэмтлийн эрсдэл — элэгний шинжилгээг үе үе хянах."
    },
    {
      level: "warn",
      messageMn: "Захын мэдрэлийн үрэвслээс сэргийлэх зорилгоор B6 витамин (пиридоксин) хамт хэрэглэх."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Rifampicin-тэй хамт хэрэглэх нь стандарт горим. Хоолноос 30–60 минутын өмнө уух.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
