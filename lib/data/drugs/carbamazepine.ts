import type { Drug } from "../../domain/drug";

/**
 * Carbamazepine — Карбамазепин
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

export const carbamazepine: Drug = {
  id: "carbamazepine",
  inn: "Carbamazepine",
  innMn: "Карбамазепин",
  category: "anticonvulsant",
  rules: [
    {
      id: "carbamazepine-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 24,
      basis: {
        kind: "per_kg_per_day",
        minMgPerKg: 10,
        maxMgPerKg: 20
      },
      frequency: "bd",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 500
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 1000
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
      id: "400mg-cr-2",
      labelMn: "400mg CR таблет",
      mgPerUnit: 400,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Цусны бүрэлдэхүүнийг хянах — апластик цус багадалт, лейкопени эрсдэл."
    },
    {
      level: "warn",
      messageMn: "Наатрийн хэмжээ буурах боломжтой — ялангуяа ахмад настанд."
    },
    {
      level: "warn",
      messageMn: "HLA-B*1502 генийн шинжилгээ (Азийн угсаатанд) хийсний дараа эхлэх."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Тунг аажмаар нэмнэ. Хоолтой хамт уух.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
