import type { Drug } from "../../domain/drug";

/**
 * Acetylcysteine — Ацетилцистеин
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

export const acetylcysteine: Drug = {
  id: "acetylcysteine",
  inn: "Acetylcysteine",
  innMn: "Ацетилцистеин",
  category: "mucolytic",
  rules: [
    {
      id: "acetylcysteine-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 24,
      basis: {
        kind: "per_kg_per_day",
        minMgPerKg: 10,
        maxMgPerKg: 15
      },
      frequency: "bd",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 300
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 600
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
      id: "100mg-0",
      labelMn: "100mg гранул/эффервесцент",
      mgPerUnit: 100,
      unitMn: "гранул",
      divisible: false
    },
    {
      kind: "solid",
      id: "200mg-1",
      labelMn: "200mg гранул",
      mgPerUnit: 200,
      unitMn: "гранул",
      divisible: false
    },
    {
      kind: "solid",
      id: "600mg-2",
      labelMn: "600mg эффервесцент таблет",
      mgPerUnit: 600,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [],
  contraindicationsMn: [],
  notesMn: "Усаар уусгаж уух. Бронхоспазм өдөөж болно — астмын өвчтөнд болгоомжтой.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
