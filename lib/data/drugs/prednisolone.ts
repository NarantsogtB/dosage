import type { Drug } from "../../domain/drug";

/**
 * Prednisolone — Преднизолон
 *
 * ✅ Астмын дүрэм БАТАЛГААЖСАН — RCH Melbourne + Starship NZ нийцэв.
 *    Хоёулаа 1 мг/кг. Дээд хязгаар зөрүүтэй (50 vs 40) — conflictNote үз.
 * ⚠️ Ерөнхий дүрэм баталгаажаагүй.
 */

export const prednisolone: Drug = {
  id: "prednisolone",
  inn: "Prednisolone",
  innMn: "Преднизолон",
  category: "corticosteroid",
  rules: [
    {
      id: "prednisolone-asthma",
      indication: {
        code: "asthma",
        labelMn: "Цочмог астма"
      },
      route: "oral",
      ageMinMonths: 12,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 1,
        maxMgPerKg: 1
      },
      frequency: "od",
      duration: {
        minDays: 2,
        maxDays: 3
      },
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 40
        }
      ],
      sources: [
        {
          sourceId: "rch-melbourne-cpg",
          locator: "Acute asthma — Oral steroid dosing (flowchart), 2023-07",
          quotedValue: "Prednisolone 1 mg/kg (max 50 mg)"
        },
        {
          sourceId: "starship-nz",
          locator: "Acute asthma and wheeze — management",
          quotedValue: "oral prednisolone 1mg/kg (max 40mg), if age ≥5 years"
        }
      ],
      evidenceLevel: "C_international",
      conflictNote: "⚠️ ДЭЭД ХЯЗГААР ЗӨРЖ БАЙНА: RCH 50 мг, Starship 40 мг. Илүү болгоомжтой 40 мг-ыг сонгов — 40 кг-аас хүнд хүүхдэд л ялгаа гарна. Мөн насны заалт зөрүүтэй: RCH ≥6 нас, Starship ≥5 нас. Хүүхдийн эмчийн шийдвэр хүлээж байна."
    },
    {
      id: "prednisolone-general",
      isDefault: true,
      indication: "general",
      route: "oral",
      ageMinMonths: 0,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 1,
        maxMgPerKg: 2
      },
      frequency: "od",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 60
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 60
        }
      ],
      sources: [],
      evidenceLevel: "E_unverified",
      conflictNote: "⚠️ Эх сурвалжгүй. Астмын заалт сонговол баталгаажсан дүрэм үйлчилнэ."
    }
  ],
  formulations: [
    {
      kind: "liquid",
      id: "5mg-5ml-0",
      labelMn: "5mg/5ml уусмал",
      mgPerMl: 1
    },
    {
      kind: "liquid",
      id: "15mg-5ml-1",
      labelMn: "15mg/5ml уусмал",
      mgPerMl: 3
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
      id: "25mg-3",
      labelMn: "25mg таблет",
      mgPerUnit: 25,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Урт хугацаагаар хэрэглэхэд аажим тунг бууруулан зогсооно."
    },
    {
      level: "warn",
      messageMn: "Цусны чихрийн хэмжээ, цусны даралт хянах шаардлагатай."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Астмын үед 2–3 хоног. RCH: 1–5 насны дунд зэргийн астмад стероид цээрлэнэ.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
