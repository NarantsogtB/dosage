import type { Drug } from "../../domain/drug";

/**
 * Ferrous sulfate (элементар төмөр) — Төмрийн сульфат
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

export const ferrousSulfate: Drug = {
  id: "ferrous-sulfate",
  inn: "Ferrous sulfate (элементар төмөр)",
  innMn: "Төмрийн сульфат",
  category: "iron",
  rules: [
    {
      id: "ferrous-sulfate-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 4,
      basis: {
        kind: "per_kg_per_day",
        minMgPerKg: 3,
        maxMgPerKg: 6
      },
      frequency: "bd",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 60
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 120
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
      id: "25mg-5ml-0",
      labelMn: "25mg/5ml уусмал (элементар)",
      mgPerMl: 5
    },
    {
      kind: "solid",
      id: "200mg-feso-65mg-1",
      labelMn: "200mg FeSO₄ = 65mg элементар таблет",
      mgPerUnit: 65,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Тун нь ЭЛЕМЕНТАР ТӨМРӨӨР тооцогдоно. Ferrous sulfate 200mg = ~65mg элементар төмөр."
    },
    {
      level: "warn",
      messageMn: "Шүдийг өнгөрүүлж болно — шингэн хэлбэрийг соргоор уулгах."
    },
    {
      level: "warn",
      messageMn: "Антацид, тетрациклин, ципрофлоксациныг хамт хэрэглэхгүй."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Хоолны дундуур уух (гаж нөлөөг бууруулна). С аминдэм хамт уух нь шингэлтийг сайжруулна.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
