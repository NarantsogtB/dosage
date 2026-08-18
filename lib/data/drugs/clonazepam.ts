import type { Drug } from "../../domain/drug";

/**
 * Clonazepam — Клоназепам
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

export const clonazepam: Drug = {
  id: "clonazepam",
  inn: "Clonazepam",
  innMn: "Клоназепам",
  category: "anticonvulsant",
  rules: [
    {
      id: "clonazepam-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 0,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 0.01,
        maxMgPerKg: 0.05
      },
      frequency: "bd",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 10
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 20
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
      id: "0-5mg-5ml-0",
      labelMn: "0.5mg/5ml уусмал",
      mgPerMl: 0.1
    },
    {
      kind: "solid",
      id: "0-5mg-1",
      labelMn: "0.5mg таблет",
      mgPerUnit: 0.5,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "2mg-2",
      labelMn: "2mg таблет",
      mgPerUnit: 2,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Хамааралт байдал болон тэвчлэг (tolerance) үүсэх эрсдэлтэй."
    },
    {
      level: "warn",
      messageMn: "Гэнэтийн зогсоохыг хориглоно — таталт нэмэгдэх аюул."
    },
    {
      level: "warn",
      messageMn: "Тайвшруулах нөлөөтэй — машин жолоодохгүй."
    }
  ],
  contraindicationsMn: [],
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
