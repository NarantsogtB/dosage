import type { Drug } from "../../domain/drug";

/**
 * Spironolactone — Спиронолактон
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

export const spironolactone: Drug = {
  id: "spironolactone",
  inn: "Spironolactone",
  innMn: "Спиронолактон",
  category: "diuretic",
  rules: [
    {
      id: "spironolactone-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 0,
      basis: {
        kind: "per_kg_per_day",
        minMgPerKg: 1,
        maxMgPerKg: 3
      },
      frequency: "bd",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 50
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 100
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
      id: "25mg-0",
      labelMn: "25mg таблет",
      mgPerUnit: 25,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "50mg-1",
      labelMn: "50mg таблет",
      mgPerUnit: 50,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "100mg-2",
      labelMn: "100mg таблет",
      mgPerUnit: 100,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Цусны калий нэмэгдэх (гиперкалиеми) — ACE дарангуйлагч, ARB-тэй хамт болгоомжтой."
    },
    {
      level: "warn",
      messageMn: "Калийн хоол хүнс (банана, улаан лооль) хязгаарлах."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Фурасемидтэй хамт хэрэглэхэд калийг хэмнэнэ. Хоолтой хамт уух.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
