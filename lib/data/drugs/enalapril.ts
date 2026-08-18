import type { Drug } from "../../domain/drug";

/**
 * Enalapril — Эналаприл
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

export const enalapril: Drug = {
  id: "enalapril",
  inn: "Enalapril",
  innMn: "Эналаприл",
  category: "antihypertensive",
  rules: [
    {
      id: "enalapril-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 1,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 0.08,
        maxMgPerKg: 0.5
      },
      frequency: "od",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 40
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 40
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
      id: "2-5mg-0",
      labelMn: "2.5mg таблет",
      mgPerUnit: 2.5,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "5mg-1",
      labelMn: "5mg таблет",
      mgPerUnit: 5,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "10mg-2",
      labelMn: "10mg таблет",
      mgPerUnit: 10,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "20mg-3",
      labelMn: "20mg таблет",
      mgPerUnit: 20,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Бөөрний үйл ажиллагаа, цусны калий хянах."
    },
    {
      level: "warn",
      messageMn: "Жирэмсэнд хориглоно."
    },
    {
      level: "warn",
      messageMn: "Ангиоэдем — ховор боловч аюултай."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Эхлэх тун 0.08–0.1 мг/кг. Тунг аажим нэмж болно.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
