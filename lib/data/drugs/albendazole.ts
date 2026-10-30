import type { Drug } from "../../domain/drug";

/**
 * Albendazole — Албендазол
 *
 * ✅ БАТАЛГААЖСАН (2026-10-30) — WHO Model Formulary for Children (2010) + MSF:
 * 2 наснаас дээш 400 мг нэг удаа, <10 кг — 200 мг. ⚠️ ТУН ӨӨРЧЛӨГДСӨН: өмнө
 * <20 кг — 200 мг. Эмчийн шийдвэр — ДЭМБ-ыг сонгов (conflictNote).
 *
 * Үлдсэн: lastReviewed/reviewedBy (эмчийн хяналт), contraindicationsMn,
 * availableInMn.
 */

export const albendazole: Drug = {
  id: "albendazole",
  inn: "Albendazole",
  innMn: "Албендазол",
  category: "antiparasitic",
  rules: [
    {
      id: "albendazole-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 24,
      basis: {
        kind: "weight_band",
        bands: [
          {
            minWeightKg: 0,
            maxWeightKg: 10,
            doseMg: 200
          },
          {
            minWeightKg: 10,
            doseMg: 400
          }
        ]
      },
      frequency: "od",
      duration: {
        minDays: 1,
        maxDays: 1
      },
      caps: [],
      sources: [
        {
          sourceId: "who-formulary-children-2010",
          locator: "6.1 Anthelminthics — Albendazole, hookworms, roundworms, pinworms, threadworms, p. 64",
          quotedValue: "Child 12 months–2 years 200 mg as a single dose; greater than 2 years or < 10 kg 400 mg as a single dose before food."
        },
        {
          sourceId: "msf-essential-drugs",
          locator: "ALBENDAZOLE oral — Ascariasis, enterobiasis, hookworm infections",
          quotedValue: "Adult and child over 6 months: 400 mg single dose; Child over 6 months but under 10 kg: 200 mg single dose"
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote: "Эмчийн шийдвэр (2026-10-30): ЭМЯ-ны хүүхдийн удирдамж байхгүй тул ДЭМБ-ын утгыг сонгов. Өмнө нь <20 кг — 200 мг. 2 наснаас дээш 400 мг (ДЭМБ, MSF); <10 кг-д 200 мг (MSF) хэвээр."
    }
  ],
  formulations: [
    {
      kind: "solid",
      id: "200mg-0",
      labelMn: "200mg таблет",
      mgPerUnit: 200,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "400mg-1",
      labelMn: "400mg таблет",
      mgPerUnit: 400,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [],
  contraindicationsMn: [],
  notesMn: "Нэг удаагийн тун. Хоолтой хамт эсвэл дараа уух. Эхийн хэвлийд: хэрэглэхгүй.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
