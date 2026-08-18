import type { Drug } from "../../domain/drug";

/**
 * Diazepam — Диазепам
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

export const diazepam: Drug = {
  id: "diazepam",
  inn: "Diazepam",
  innMn: "Диазепам",
  category: "cns",
  rules: [
    {
      id: "diazepam-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 6,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 0.1,
        maxMgPerKg: 0.3
      },
      frequency: "tds",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 10
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 30
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
      id: "2mg-5ml-0",
      labelMn: "2mg/5ml уусмал",
      mgPerMl: 0.4
    },
    {
      kind: "solid",
      id: "2mg-1",
      labelMn: "2mg таблет",
      mgPerUnit: 2,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "5mg-2",
      labelMn: "5mg таблет",
      mgPerUnit: 5,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "10mg-3",
      labelMn: "10mg таблет",
      mgPerUnit: 10,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Амьсгал боогдуулах аюул — тун хэтрүүлэхэд амьсгалын дарангуйлал."
    },
    {
      level: "warn",
      messageMn: "Хамааралт байдал (dependence) үүсэх эрсдэлтэй тул урт хугацааны хэрэглэлт хориглоно."
    },
    {
      level: "warn",
      messageMn: "Машин жолоодох, аюултай үйл ажиллагаанаас зайлсхийх."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Таталтын яаралтай тусламж: 0.3–0.5 мг/кг аарцгаар (rectally) эсвэл 0.2–0.3 мг/кг IV.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
