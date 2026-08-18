import type { Drug } from "../../domain/drug";

/**
 * Metronidazole — Метронидазол
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

export const metronidazole: Drug = {
  id: "metronidazole",
  inn: "Metronidazole",
  innMn: "Метронидазол",
  category: "antibiotic",
  rules: [
    {
      id: "metronidazole-general",
      indication: "general",
      route: "oral_iv",
      ageMinMonths: 1,
      basis: {
        kind: "per_kg_per_day",
        minMgPerKg: 30,
        maxMgPerKg: 50
      },
      frequency: "tds",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 500
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 1500
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
      id: "200mg-5ml-0",
      labelMn: "200mg/5ml уусмал",
      mgPerMl: 40
    },
    {
      kind: "solid",
      id: "200mg-1",
      labelMn: "200mg таблет",
      mgPerUnit: 200,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "400mg-2",
      labelMn: "400mg таблет",
      mgPerUnit: 400,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Архи хэрэглэхийг хориглоно (дисульфирам хэлбэрийн урвал)."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Анаэроб халдвар, Giardia, Trichomonas, амёбиазид хэрэглэнэ.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
