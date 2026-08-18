import type { Drug } from "../../domain/drug";

/**
 * Ondansetron — Ондансетрон
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

export const ondansetron: Drug = {
  id: "ondansetron",
  inn: "Ondansetron",
  innMn: "Ондансетрон",
  category: "antiemetic",
  rules: [
    {
      id: "ondansetron-general",
      indication: "general",
      route: "oral_iv",
      ageMinMonths: 6,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 0.15,
        maxMgPerKg: 0.15
      },
      frequency: "q8h",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 8
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 24
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
      id: "4mg-5ml-0",
      labelMn: "4mg/5ml уусмал",
      mgPerMl: 0.8
    },
    {
      kind: "solid",
      id: "4mg-1",
      labelMn: "4mg таблет",
      mgPerUnit: 4,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "8mg-2",
      labelMn: "8mg таблет",
      mgPerUnit: 8,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "QT интервал уртасгах эрсдэлтэй — зүрхний эмгэгтэй өвчтөнд болгоомжтой."
    }
  ],
  contraindicationsMn: [],
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
