import type { Drug } from "../../domain/drug";

/**
 * Amoxicillin-clavulanate — Амоксициллин + Клавуланат
 *
 * ✅ БАТАЛГААЖСАН, ГАНЦ ЭХ СУРВАЛЖ (2026-10-30) — WHO AWaRe (2022): 80–90 мг/кг/хон
 * (амоксициллин), өдөрт 2 удаа. ⚠️ ТУН ӨӨРЧЛӨГДСӨН: өмнө 40–90 мг/кг/хон.
 * Эмчийн шийдвэр — ДЭМБ-ыг сонгов (conflictNote, known-gaps).
 *
 * Үлдсэн: lastReviewed/reviewedBy (эмчийн хяналт), contraindicationsMn,
 * availableInMn.
 */

export const amoxicillinClavulanate: Drug = {
  id: "amoxicillin-clavulanate",
  inn: "Amoxicillin-clavulanate",
  innMn: "Амоксициллин + Клавуланат",
  category: "antibiotic",
  rules: [
    {
      id: "amoxicillin-clavulanate-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 3,
      basis: {
        kind: "per_kg_per_day",
        minMgPerKg: 80,
        maxMgPerKg: 90
      },
      frequency: "bd",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 875
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 1750
        }
      ],
      sources: [
        {
          sourceId: "who-aware-2022",
          locator: "Ch. 50 Dosing guidance – Children, Table 50.1, p. 641 (PDF p. 657)",
          quotedValue: "Oral: 80–90 mg/kg/day (amoxicillin component) ... ≥ 20 kg: 500 mg of amoxicillin/dose given every 8 hours or 1 g of amoxicillin/ dose given every 12 hours"
        }
      ],
      evidenceLevel: "B_who",
      isDefault: true,
      conflictNote: "Эмчийн шийдвэр (2026-10-30): ЭМЯ-ны хүүхдийн удирдамж байхгүй тул ДЭМБ-ын утгыг сонгов. Өмнө нь 40–90 мг/кг/хон. MSF (25 мг/кг × 2), RCH (22.5 мг/кг × 2) бага тунтай — ДЭМБ-ын 80–90 мг/кг/хон-ыг сонгов. Дээд 875 мг/тун хэвээр (875/125 мг шахмал); AWaRe ≥20 кг-д 1 г."
    }
  ],
  formulations: [
    {
      kind: "liquid",
      id: "125-31-25mg-per-5ml-0",
      labelMn: "125/31.25mg per 5ml уусмал",
      mgPerMl: 25
    },
    {
      kind: "solid",
      id: "500-125mg-1",
      labelMn: "500/125mg таблет",
      mgPerUnit: 500,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "875-125mg-2",
      labelMn: "875/125mg таблет",
      mgPerUnit: 875,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Тун нь amoxicillin бүрэлдэхүүний хэмжээгээр тооцогдоно."
    }
  ],
  contraindicationsMn: [],
  notesMn: "2 удаа уух горимыг ашиглана (clavulanate-ийн хүлцэл сайн).",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
