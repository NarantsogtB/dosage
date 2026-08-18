import type { Drug } from "../../domain/drug";

/**
 * Ibuprofen — Ибупрофен
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

export const ibuprofen: Drug = {
  id: "ibuprofen",
  inn: "Ibuprofen",
  innMn: "Ибупрофен",
  category: "analgesic",
  rules: [
    {
      id: "ibuprofen-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 3,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 5,
        maxMgPerKg: 10
      },
      frequency: "q6_8h",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 400
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 2400
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
      id: "100mg-5ml-0",
      labelMn: "100mg/5ml уусмал",
      mgPerMl: 20
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
      messageMn: "Бөөрний дутагдал, хэвлийн шархлаа, цусны бүлэгнэлтийн эмгэгтэй өвчтөнд болгоомжтой хэрэглэх."
    },
    {
      level: "warn",
      messageMn: "3 сараас доош нас — хориглоно."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Хооллох үед эсвэл хоолны дараа уух. Хангалттай хэмжээний шингэнээр даруулж ууна.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
