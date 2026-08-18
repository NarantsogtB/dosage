import type { Drug } from "../../domain/drug";

/**
 * Doxycycline — Доксициклин
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

export const doxycycline: Drug = {
  id: "doxycycline",
  inn: "Doxycycline",
  innMn: "Доксициклин",
  category: "antibiotic",
  rules: [
    {
      id: "doxycycline-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 96,
      basis: {
        kind: "per_kg_per_day",
        minMgPerKg: 2,
        maxMgPerKg: 4
      },
      frequency: "bd",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 100
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 200
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
      id: "100mg-1",
      labelMn: "100mg таблет",
      mgPerUnit: 100,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "8 наснаас доош хүүхдэд ХОРИГЛОНО — шүдний өнгийн өөрчлөлт, ясны хөгжлийн саатал."
    },
    {
      level: "warn",
      messageMn: "Нарны гэрэлд мэдрэмтгий болдог — гэрлийн хамгаалалт хэрэглэх."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Хоолтой хамт, их хэмжээний усаар уух. Антацид, цайр, кальцийн эмтэй зэрэг уухгүй.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
