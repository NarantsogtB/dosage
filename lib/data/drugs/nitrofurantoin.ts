import type { Drug } from "../../domain/drug";

/**
 * Nitrofurantoin — Нитрофурантоин
 *
 * ✅ БАТАЛГААЖСАН, ГАНЦ ЭХ СУРВАЛЖ (2026-10-30) — WHO AWaRe (2022): 1 мг/кг/тун
 * 6 цаг тутам, хоногт дээд 200 мг. ⚠️ ТУН ӨӨРЧЛӨГДСӨН: өмнө 5–7 мг/кг/хон,
 * дээд 400 мг/хон. Эмчийн шийдвэр — ДЭМБ-ыг сонгов (conflictNote, known-gaps).
 *
 * Үлдсэн: lastReviewed/reviewedBy (эмчийн хяналт), contraindicationsMn,
 * availableInMn.
 */

export const nitrofurantoin: Drug = {
  id: "nitrofurantoin",
  inn: "Nitrofurantoin",
  innMn: "Нитрофурантоин",
  category: "antibiotic",
  rules: [
    {
      id: "nitrofurantoin-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 3,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 1,
        maxMgPerKg: 1
      },
      frequency: "qds",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 50
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 200
        }
      ],
      sources: [
        {
          sourceId: "who-aware-2022",
          locator: "Ch. 50 Dosing guidance – Children, Table 50.1, p. 650 (PDF p. 666)",
          quotedValue: "Nitrofurantoin Oral: 2 mg/kg/dose given every 12 hours; or 1 mg/kg/dose given every 6 hours (immediate release formulation) Up to a maximum daily dose of 200 mg"
        }
      ],
      evidenceLevel: "B_who",
      isDefault: true,
      conflictNote: "Эмчийн шийдвэр (2026-10-30): ЭМЯ-ны хүүхдийн удирдамж байхгүй тул ДЭМБ-ын утгыг сонгов. Өмнө нь 5–7 мг/кг/хон × 4, дээд 400 мг/хон. ДЭМБ-ын 1 мг/кг × 4 (шууд ялгардаг хэлбэр), хоногт дээд 200 мг."
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
      messageMn: "Зөвхөн шээсний замын халдварт хэрэглэнэ — системийн халдварт тохирохгүй."
    },
    {
      level: "warn",
      messageMn: "Бөөрний дутагдалтай өвчтөнд хориглоно (GFR < 45 мл/мин)."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Хоолтой хамт уух. Шээсийг шар-улбар өнгөтэй болгоно — хэвийн үзэгдэл.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
