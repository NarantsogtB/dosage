import type { Drug } from "../../domain/drug";

/**
 * Enalapril — Эналаприл
 *
 * 🟡 ГАНЦ ЭХ СУРВАЛЖ (known-gap) — WHO Model Formulary for Children (2010):
 * 0.1 мг/кг-аас эхэлж, хоногт дээд 1 мг/кг. ⚠️ ТУН ӨӨРЧЛӨГДСӨН (2026-10-30,
 * эмчийн шийдвэр): WHO 2010-ийн утгаар засав — conflictNote.
 *
 * 2026-11-03: 2020+ хоёр дахь эх сурвалж олдсонгүй —
 *   - MSF Essential drugs: зөвхөн насанд хүрэгчийн тун.
 *   - PCH Medication Management Manual: эналаприлын monograph байхгүй.
 *   - RCH CPG Hypertension (2021-06): зөвхөн нифедипин, эналаприл үгүй.
 *   - Starship «ACE inhibitors in paediatrics»: агуулга нээгдэхгүй, хуучин
 *     (~2015) бөгөөд 0.05–0.5 мг/кг/тун × 2 гэж өөр давтамжтай.
 * Дараагийн алхам: tests/data/known-gaps.ts.
 *
 * Үлдсэн: lastReviewed/reviewedBy (эмчийн хяналт), contraindicationsMn,
 * availableInMn.
 */

export const enalapril: Drug = {
  id: "enalapril",
  inn: "Enalapril",
  innMn: "Эналаприл",
  category: "antihypertensive",
  rules: [
    {
      id: "enalapril-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 1,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 0.1,
        maxMgPerKg: 0.5
      },
      frequency: "od",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 40
        },
        {
          kind: "per_kg",
          scope: "per_day",
          maxMgPerKg: 1
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 40
        }
      ],
      sources: [
        {
          sourceId: "who-formulary-children-2010",
          locator: "Enalapril — oral, p. 314",
          quotedValue: "Infant or Child initially 100 micrograms/kg once daily ... increased as necessary up to a maximum of 1 mg/kg daily in 1–2 divided doses"
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote: "Эмчийн шийдвэр (2026-10-30): ЭМЯ-ны хүүхдийн удирдамж байхгүй тул ДЭМБ-ын утгыг сонгов — WHO Model Formulary for Children 2010, p. 314: «Infant or Child initially 100 micrograms/kg once daily ... increased as necessary up to a maximum of 1 mg/kg daily in 1–2 divided doses». Өмнө нь доод 0.08 мг/кг. Дээд 40 мг/хон-ыг эх сурвалж заагаагүй (хэвээр). 2020+ хоёр дахь эх сурвалж олдоогүй — known-gap (2026-11-03)."
    }
  ],
  formulations: [
    {
      kind: "solid",
      id: "2-5mg-0",
      labelMn: "2.5mg таблет",
      mgPerUnit: 2.5,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "5mg-1",
      labelMn: "5mg таблет",
      mgPerUnit: 5,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "10mg-2",
      labelMn: "10mg таблет",
      mgPerUnit: 10,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "20mg-3",
      labelMn: "20mg таблет",
      mgPerUnit: 20,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Бөөрний үйл ажиллагаа, цусны калий хянах."
    },
    {
      level: "warn",
      messageMn: "Жирэмсэнд хориглоно."
    },
    {
      level: "warn",
      messageMn: "Ангиоэдем — ховор боловч аюултай."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Эхлэх тун 0.08–0.1 мг/кг. Тунг аажим нэмж болно.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
