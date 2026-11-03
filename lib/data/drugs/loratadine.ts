import type { Drug } from "../../domain/drug";

/**
 * Loratadine — Лоратадин
 *
 * 🟡 ГАНЦ ЭХ СУРВАЛЖ (known-gap, 2026-11-04) — MSF Essential drugs
 * (LORATADINE oral, 2024-02 шинэчилсэн): 2-оос дээш нас, <30 кг 5 мг,
 * ≥30 кг 10 мг өдөрт 1 удаа (жингийн муж; 30 кг яг — 10 мг).
 * ⚠️ ТУН ӨӨРЧЛӨГДСӨН (2026-11-04, эмчийн шийдвэр): өмнө нь 0.2 мг/кг/хон
 * (15 кг → 3 мг) — MSF-ийн жингийн мужаас бага гардаг байв.
 * WHO Formulary 2010-ийг шалгаж иш татаагүй; RCH, PCH-д байхгүй.
 *
 * Үлдсэн: lastReviewed/reviewedBy (эмчийн хяналт), contraindicationsMn,
 * availableInMn.
 */

export const loratadine: Drug = {
  id: "loratadine",
  inn: "Loratadine",
  innMn: "Лоратадин",
  category: "antihistamine",
  rules: [
    {
      id: "loratadine-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 24,
      basis: {
        kind: "weight_band",
        bands: [
          {
            minWeightKg: 0,
            maxWeightKg: 30,
            doseMg: 5
          },
          {
            minWeightKg: 30,
            doseMg: 10
          }
        ]
      },
      frequency: "od",
      caps: [],
      sources: [
        {
          sourceId: "msf-essential-drugs",
          locator: "LORATADINE oral — Dosage (2024-02)",
          quotedValue: "Child over 2 years and under 30 kg: 5 mg (5 ml) once daily. Child over 30 kg and adult: 10 mg (1 tab) once daily"
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote: "Эмчийн шийдвэр (2026-11-04): MSF-ийн жингийн мужаар (<30 кг 5 мг, ≥30 кг 10 мг × 1). Өмнө нь 0.2 мг/кг/хон, дээд 10 мг."
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
      kind: "solid",
      id: "10mg-1",
      labelMn: "10mg таблет",
      mgPerUnit: 10,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [],
  contraindicationsMn: [],
  notesMn: "Хугацаа аль болох богино (хэдхэн хоног) — MSF.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
