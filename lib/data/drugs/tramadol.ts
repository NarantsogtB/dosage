import type { Drug } from "../../domain/drug";

/**
 * Tramadol — Трамадол
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

export const tramadol: Drug = {
  id: "tramadol",
  inn: "Tramadol",
  innMn: "Трамадол",
  category: "cns",
  rules: [
    {
      id: "tramadol-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 144,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 1,
        maxMgPerKg: 2
      },
      frequency: "q4_6h",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 100
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 400
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
      id: "50mg-0",
      labelMn: "50mg таблет",
      mgPerUnit: 50,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "100mg-sr-1",
      labelMn: "100mg капсул (SR)",
      mgPerUnit: 100,
      unitMn: "капсул",
      divisible: false
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "12 наснаас доош хүүхдэд ХЭРЭГЛЭХИЙГ ХОРИГЛОНО."
    },
    {
      level: "warn",
      messageMn: "Опиоидын гаж нөлөө: дотор муухайрах, өтгөн хатах, тайвшруулах нөлөө."
    },
    {
      level: "warn",
      messageMn: "Таталт өдөөх боломжтой — таталтын өвчтэй болгоомжтой."
    },
    {
      level: "warn",
      messageMn: "CYP2D6 ultra-metabolizer — хэт хурдан метаболизмтай өвчтөнд аюултай."
    }
  ],
  contraindicationsMn: [],
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
