import type { Drug } from "../../domain/drug";

/**
 * Domperidone — Домперидон
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

export const domperidone: Drug = {
  id: "domperidone",
  inn: "Domperidone",
  innMn: "Домперидон",
  category: "antiemetic",
  rules: [
    {
      id: "domperidone-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 1,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 0.25,
        maxMgPerKg: 0.25
      },
      frequency: "tds",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 10
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 30
        },
        {
          kind: "per_kg",
          scope: "per_day",
          maxMgPerKg: 0.75
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
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Өдөрт нийт тун 0.75 мг/кг/өдөр-ийг хэтрүүлэхгүй байх (жингийн дагуу хязгаар)."
    },
    {
      level: "warn",
      messageMn: "QT интервал уртасгах эрсдэлтэй. Урт хугацаагаар хэрэглэхгүй."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Хоолны 15–30 минутын өмнө уух. Эмчилгээний курс ≤1 долоо хоног байхыг зөвлөдөг.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
