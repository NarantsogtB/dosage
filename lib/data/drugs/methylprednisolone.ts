import type { Drug } from "../../domain/drug";

/**
 * Methylprednisolone — Метилпреднизолон
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

export const methylprednisolone: Drug = {
  id: "methylprednisolone",
  inn: "Methylprednisolone",
  innMn: "Метилпреднизолон",
  category: "corticosteroid",
  rules: [
    {
      id: "methylprednisolone-general",
      indication: "general",
      route: "oral_iv",
      ageMinMonths: 0,
      basis: {
        kind: "per_kg_per_day",
        minMgPerKg: 1,
        maxMgPerKg: 2
      },
      frequency: "bd",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 500
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 1000
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
      id: "4mg-0",
      labelMn: "4mg таблет",
      mgPerUnit: 4,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "16mg-1",
      labelMn: "16mg таблет",
      mgPerUnit: 16,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Пульс-эмчилгээнд: 10–30 мг/кг/өдөр IV (макс 1г) — эмнэлгийн тохиргоонд хэрэглэнэ."
    }
  ],
  contraindicationsMn: [],
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
