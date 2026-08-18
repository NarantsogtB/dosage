import type { Drug } from "../../domain/drug";

/**
 * Metoclopramide — Метоклопрамид
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

export const metoclopramide: Drug = {
  id: "metoclopramide",
  inn: "Metoclopramide",
  innMn: "Метоклопрамид",
  category: "antiemetic",
  rules: [
    {
      id: "metoclopramide-general",
      indication: "general",
      route: "oral_iv",
      ageMinMonths: 12,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 0.15,
        maxMgPerKg: 0.15
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
      messageMn: "Экстрапирамидын урвал (дистони, акатизи) — хүүхэд, залуу насанд хамгийн их эрсдэлтэй."
    },
    {
      level: "warn",
      messageMn: "5 мг/кг/өдөр-ийг хэтрүүлэхгүй. Богино курсоор (≤5 хоног) хэрэглэх."
    }
  ],
  contraindicationsMn: [],
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
