import type { Drug } from "../../domain/drug";

/**
 * Aciclovir — Ацикловир
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

export const aciclovir: Drug = {
  id: "aciclovir",
  inn: "Aciclovir",
  innMn: "Ацикловир",
  category: "antiviral",
  rules: [
    {
      id: "aciclovir-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 3,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 20,
        maxMgPerKg: 20
      },
      frequency: "qds",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 800
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 4000
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
      id: "200mg-5ml-0",
      labelMn: "200mg/5ml уусмал",
      mgPerMl: 40
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
      messageMn: "Ус ихээр уулгах — бөөрний чулуу үүсэх магадлалыг бууруулна."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Варицелла (салхин цэцэг): 20 мг/кг 4 удаа × 5 хоног. Герпес симплекс: 5 удаа/өдөр хэрэглэх болно.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
