import type { Drug } from "../../domain/drug";

/**
 * Phenobarbital — Фенобарбитал
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

export const phenobarbital: Drug = {
  id: "phenobarbital",
  inn: "Phenobarbital",
  innMn: "Фенобарбитал",
  category: "anticonvulsant",
  rules: [
    {
      id: "phenobarbital-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 0,
      basis: {
        kind: "per_kg_per_day",
        minMgPerKg: 3,
        maxMgPerKg: 5
      },
      frequency: "od",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 200
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
      kind: "liquid",
      id: "15mg-5ml-0",
      labelMn: "15mg/5ml уусмал",
      mgPerMl: 3
    },
    {
      kind: "solid",
      id: "15mg-1",
      labelMn: "15mg таблет",
      mgPerUnit: 15,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "30mg-2",
      labelMn: "30mg таблет",
      mgPerUnit: 30,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "60mg-3",
      labelMn: "60mg таблет",
      mgPerUnit: 60,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Тайвшруулах нөлөөтэй — хүүхдийн сурлагад нөлөөлнө."
    },
    {
      level: "warn",
      messageMn: "Гэнэтийн зогсоохыг хориглоно — тунг аажим бууруулна."
    },
    {
      level: "warn",
      messageMn: "CYP450 индуктор — бусад эмийн метаболизмд нөлөөлнө."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Нярайд эхний тун 20 мг/кг IV.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
