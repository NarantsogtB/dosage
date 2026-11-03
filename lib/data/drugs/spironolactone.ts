import type { Drug } from "../../domain/drug";

/**
 * Spironolactone — Спиронолактон
 *
 * ✅ БАТАЛГААЖСАН (2026-11-03) — WHO Model Formulary for Children (2010) +
 * MSF Essential drugs (SPIRONOLACTONE oral, Remarks): хаван/шингэн
 * хуримтлалтай хүүхдэд 1–3 мг/кг/хон, 1–2 хувааж. ⚠️ ТУН ӨӨРЧЛӨГДСӨН
 * (2026-10-30, эмчийн шийдвэр): WHO 2010-ийн утгаар засав — conflictNote.
 * 2026-11-03-нд тунд гар хүрээгүй, зөвхөн эх сурвалж нэмэв.
 *
 * MSF хүүхдийн дээд тун заагаагүй — дээд 100 мг/хон нь WHO 2010-оос.
 * MSF-ийн хуудсанд «Last updated» огноо байхгүй (2026 оны хэвлэл).
 *
 * Үлдсэн: lastReviewed/reviewedBy (эмчийн хяналт), contraindicationsMn,
 * availableInMn.
 */

export const spironolactone: Drug = {
  id: "spironolactone",
  inn: "Spironolactone",
  innMn: "Спиронолактон",
  category: "diuretic",
  rules: [
    {
      id: "spironolactone-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 1,
      basis: {
        kind: "per_kg_per_day",
        minMgPerKg: 1,
        maxMgPerKg: 3
      },
      frequency: "bd",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 50
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 100
        }
      ],
      sources: [
        {
          sourceId: "who-formulary-children-2010",
          locator: "Spironolactone — oral, p. 356",
          quotedValue: "Infant or Child 1 month–12 years 1–3 mg/kg daily in 1–2 divided doses (maximum 100 mg daily)"
        },
        {
          sourceId: "msf-essential-drugs",
          locator: "SPIRONOLACTONE oral — Remarks (2026 оны хэвлэл)",
          quotedValue: "In children with oedema, the daily dose is 1 to 3 mg/kg once daily or 0.5 to 1.5 mg/kg 2 times daily."
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote: "Эмчийн шийдвэр (2026-10-30): ЭМЯ-ны хүүхдийн удирдамж байхгүй тул ДЭМБ-ын утгыг сонгов — WHO Model Formulary for Children 2010, p. 356: «Infant or Child 1 month–12 years 1–3 mg/kg daily in 1–2 divided doses (maximum 100 mg daily)». Өмнө нь 0 сараас — нярайд (1–2 мг/кг/хон) өөр тул 1 сараас. 2026-11-03: MSF Essential drugs (1–3 мг/кг/хон) хоёр дахь эх сурвалжаар баталгаажуулав; MSF дээд тун заагаагүй."
    }
  ],
  formulations: [
    {
      kind: "solid",
      id: "25mg-0",
      labelMn: "25mg таблет",
      mgPerUnit: 25,
      unitMn: "таблет",
      divisible: true
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
      id: "100mg-2",
      labelMn: "100mg таблет",
      mgPerUnit: 100,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Цусны калий нэмэгдэх (гиперкалиеми) — ACE дарангуйлагч, ARB-тэй хамт болгоомжтой."
    },
    {
      level: "warn",
      messageMn: "Калийн хоол хүнс (банана, улаан лооль) хязгаарлах."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Фурасемидтэй хамт хэрэглэхэд калийг хэмнэнэ. Хоолтой хамт уух.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
