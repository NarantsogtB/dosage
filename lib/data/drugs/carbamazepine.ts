import type { Drug } from "../../domain/drug";

/**
 * Carbamazepine — Карбамазепин
 *
 * ✅ БАТАЛГААЖСАН (2026-11-03) — WHO Model Formulary for Children (2010) +
 * MSF Essential drugs (CARBAMAZEPINE oral, 2024-10 шинэчилсэн): барих тун
 * 5 мг/кг × 2–3 (10–15 мг/кг/хон), хоногт дээд 20 мг/кг. Тун өөрчлөгдөөгүй.
 *
 * Эх сурвалжаас консерватив хэвээр үлдээсэн (conflictNote): 2 наснаас (эх
 * сурвалж 1 сараас), дээд 1000 мг/хон (MSF ≥12 насанд 1800 мг). Эхлэх тун
 * (5 мг/кг/хон) ба титрацийг тооцоолуур харуулахгүй — эмчийн шийдвэр.
 *
 * Үлдсэн: lastReviewed/reviewedBy (эмчийн хяналт), contraindicationsMn,
 * availableInMn.
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
      sources: [
        {
          sourceId: "who-formulary-children-2010",
          locator: "Carbamazepine — Epilepsy, oral, p. 50",
          quotedValue: "usual maintenance dose 5 mg/kg 2–3 times daily (up to 20 mg/kg daily may be needed)"
        },
        {
          sourceId: "msf-essential-drugs",
          locator: "CARBAMAZEPINE oral — Epilepsy (2024-10)",
          quotedValue: "Child 1 month to 11 years: start with 5 mg/kg once daily or 2.5 mg/kg 2 times daily; increase the daily dose by increments of 2.5 to 5 mg/kg every 3 to 7 days, up to 5 mg/kg 2 or 3 times daily if necessary (max. 20 mg/kg daily)."
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote: "2026-11-03: WHO Formulary 2010 + MSF (2024-10) барих тун 10–15 мг/кг/хон, дээд 20 мг/кг/хон — одоогийн 10–20 мг/кг/хон таарна. Дүрэм эх сурвалжаас консерватив: 2 наснаас (эх сурвалж 1 сараас), дээд 1000 мг/хон (MSF ≥12 нас 1800 мг/хон). Эхлэх тун (5 мг/кг/хон) ба титраци — эмч."
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
