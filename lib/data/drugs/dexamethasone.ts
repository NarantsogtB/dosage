import type { Drug } from "../../domain/drug";

/**
 * Dexamethasone — Дексаметазон
 *
 * ✅ Астмын дүрэм — RCH Melbourne 0.3 мг/кг (дээд 16 мг).
 * ⚠️ Ганц эх сурвалж — known-gaps-д бүртгэсэн.
 * ⚠️ Ерөнхий дүрэм баталгаажаагүй.
 */

export const dexamethasone: Drug = {
  id: "dexamethasone",
  inn: "Dexamethasone",
  innMn: "Дексаметазон",
  category: "corticosteroid",
  rules: [
    {
      id: "dexamethasone-asthma",
      indication: {
        code: "asthma",
        labelMn: "Цочмог астма"
      },
      route: "oral",
      ageMinMonths: 12,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 0.3,
        maxMgPerKg: 0.3
      },
      frequency: "od",
      duration: {
        minDays: 1,
        maxDays: 2
      },
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 16
        }
      ],
      sources: [
        {
          sourceId: "rch-melbourne-cpg",
          locator: "Acute asthma — Oral steroid dosing (flowchart), 2023-07",
          quotedValue: "Dexamethasone 0.3 mg/kg (max 16 mg); IV preparation can be administered orally"
        },
        {
          sourceId: "rch-melbourne-cpg",
          locator: "Acute asthma — Other management considerations, 2023-07",
          quotedValue: "Dexamethasone causes less vomiting and has a longer half life"
        }
      ],
      evidenceLevel: "C_international",
      isDefault: false,
      conflictNote: "⚠️ Ганц эх сурвалж (RCH). Starship-аар хөндлөн шалгах шаардлагатай."
    },
    {
      id: "dexamethasone-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 0,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 0.15,
        maxMgPerKg: 0.6
      },
      frequency: "od",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 16
        }
      ],
      sources: [],
      evidenceLevel: "E_unverified",
      isDefault: true,
      conflictNote: "⚠️ Эх сурвалжгүй."
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
      id: "0-5mg-1",
      labelMn: "0.5mg таблет",
      mgPerUnit: 0.5,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "4mg-2",
      labelMn: "4mg таблет",
      mgPerUnit: 4,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Prednisolone-оос 6–7 дахин хүчтэй — тунд анхаарна."
    },
    {
      level: "info",
      messageMn: "Prednisolone-той харьцуулахад бөөлжилт бага, хагас задралын хугацаа урт (RCH)."
    }
  ],
  contraindicationsMn: [],
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
