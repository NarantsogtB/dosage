import type { Drug } from "../../domain/drug";

/**
 * Ferrous sulfate (элементар төмөр) — Төмрийн сульфат
 *
 * ✅ БАТАЛГААЖСАН (2026-10-30) — MSF Essential drugs + WHO Model Formulary
 * for Children (2010): төмөр дутлын цус багадалт, элементар төмөр 3–6 мг/кг/хон
 * 2 хуваана — тохирч байна. Тун өөрчлөгдөөгүй.
 *
 * Тэмдэглэл: дээд 60 мг/тун, 120 мг/хон нь эх сурвалжаас хатуу (MSF 6–12 нас
 * 65 мг × 2, Формуляр хоногт 200 мг). Насны доод 4 сар — эх сурвалж 1 сараас.
 * Урьдчилан сэргийлэх тун (1–2 мг/кг) энд хамаарахгүй.
 *
 * Үлдсэн: lastReviewed/reviewedBy (эмчийн хяналт), contraindicationsMn,
 * availableInMn.
 */

export const ferrousSulfate: Drug = {
  id: "ferrous-sulfate",
  inn: "Ferrous sulfate (элементар төмөр)",
  innMn: "Төмрийн сульфат",
  category: "iron",
  rules: [
    {
      id: "ferrous-sulfate-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 4,
      basis: {
        kind: "per_kg_per_day",
        minMgPerKg: 3,
        maxMgPerKg: 6
      },
      frequency: "bd",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 60
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 120
        }
      ],
      sources: [
        {
          sourceId: "msf-essential-drugs",
          locator: "FERROUS salts oral — Treatment of iron-deficiency anaemia (elemental iron)",
          quotedValue: "Child 1 month to < 6 years: 1.5 to 3 mg/kg 2 times daily"
        },
        {
          sourceId: "who-formulary-children-2010",
          locator: "10.1 Antianaemia medicines — Ferrous salt, Treatment of iron deficiency anaemia, p. 297",
          quotedValue: "Infant and Child 3–6 mg/kg (maximum 200 mg) of elemental iron daily, given in 2–3 divided doses."
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true
    }
  ],
  formulations: [
    {
      kind: "liquid",
      id: "25mg-5ml-0",
      labelMn: "25mg/5ml уусмал (элементар)",
      mgPerMl: 5
    },
    {
      kind: "solid",
      id: "200mg-feso-65mg-1",
      labelMn: "200mg FeSO₄ = 65mg элементар таблет",
      mgPerUnit: 65,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Тун нь ЭЛЕМЕНТАР ТӨМРӨӨР тооцогдоно. Ferrous sulfate 200mg = ~65mg элементар төмөр."
    },
    {
      level: "warn",
      messageMn: "Шүдийг өнгөрүүлж болно — шингэн хэлбэрийг соргоор уулгах."
    },
    {
      level: "warn",
      messageMn: "Антацид, тетрациклин, ципрофлоксациныг хамт хэрэглэхгүй."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Хоолны дундуур уух (гаж нөлөөг бууруулна). С аминдэм хамт уух нь шингэлтийг сайжруулна.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
