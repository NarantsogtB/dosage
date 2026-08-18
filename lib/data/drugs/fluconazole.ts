import type { Drug } from "../../domain/drug";

/**
 * Fluconazole — Флуконазол
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

export const fluconazole: Drug = {
  id: "fluconazole",
  inn: "Fluconazole",
  innMn: "Флуконазол",
  category: "antifungal",
  rules: [
    {
      id: "fluconazole-general",
      indication: "general",
      route: "oral_iv",
      ageMinMonths: 6,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 3,
        maxMgPerKg: 12
      },
      frequency: "od",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 400
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
      kind: "liquid",
      id: "50mg-5ml-0",
      labelMn: "50mg/5ml уусмал",
      mgPerMl: 10
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
      id: "150mg-2",
      labelMn: "150mg таблет",
      mgPerUnit: 150,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "200mg-3",
      labelMn: "200mg таблет",
      mgPerUnit: 200,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Элэгний гэмтлийн эрсдэл — урт курст элэгний шинжилгээ хянах."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Кандидоз: 6 мг/кг. Криптококк менингит: 12 мг/кг. Хэвлийн кандидоз: 6–12 мг/кг.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
