import type { Drug } from "../../domain/drug";

/**
 * Captopril — Каптоприл
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

export const captopril: Drug = {
  id: "captopril",
  inn: "Captopril",
  innMn: "Каптоприл",
  category: "antihypertensive",
  rules: [
    {
      id: "captopril-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 0,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 0.1,
        maxMgPerKg: 0.5
      },
      frequency: "tds",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 25
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 150
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
      id: "6-25mg-0",
      labelMn: "6.25mg таблет",
      mgPerUnit: 6.25,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "12-5mg-1",
      labelMn: "12.5mg таблет",
      mgPerUnit: 12.5,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "25mg-2",
      labelMn: "25mg таблет",
      mgPerUnit: 25,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Цусны калий нэмэгдэх болон бөөрний үйл ажиллагаа хянах."
    },
    {
      level: "warn",
      messageMn: "Хуурай ханиалгыг өдөөж болно — ACE дарангуйлагчийн нийтлэг гаж нөлөө."
    },
    {
      level: "warn",
      messageMn: "Жирэмсэнд хориглоно."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Хоолноос 1 цагийн өмнө уух. Нярайд эхлэх тун 0.1 мг/кг.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
