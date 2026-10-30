import type { Drug } from "../../domain/drug";

/**
 * Mebendazole — Мебендазол
 *
 * ✅ БАТАЛГААЖСАН (2026-10-30) — MSF Essential drugs + WHO Model Formulary
 * for Children (2010): 100 мг өдөрт 2 удаа, 3 хоног (аскарид, трихоцефал,
 * анкилостом) — тохирч байна. Тун өөрчлөгдөөгүй.
 *
 * Тэмдэглэл: эх сурвалжууд 6 сараас (10 кг-аас доош 50 мг). Насны доод 24
 * сар нь илүү хатуу — хэвээр. Enterobius-д нэг удаагийн 100 мг (notesMn).
 * ДЭМБ-ын 2022+ эх сурвалж биш тул C.
 *
 * Үлдсэн: lastReviewed/reviewedBy (эмчийн хяналт), contraindicationsMn,
 * availableInMn.
 */

export const mebendazole: Drug = {
  id: "mebendazole",
  inn: "Mebendazole",
  innMn: "Мебендазол",
  category: "antiparasitic",
  rules: [
    {
      id: "mebendazole-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 24,
      basis: {
        kind: "weight_band",
        bands: [
          {
            minWeightKg: 0,
            doseMg: 100
          }
        ]
      },
      frequency: "bd",
      duration: {
        minDays: 3,
        maxDays: 3
      },
      caps: [],
      sources: [
        {
          sourceId: "msf-essential-drugs",
          locator: "MEBENDAZOLE oral — Ascariasis, trichuriasis, hookworm",
          quotedValue: "Child over 6 months and adult: 100 mg 2 times daily for 3 days"
        },
        {
          sourceId: "who-formulary-children-2010",
          locator: "6.1 Anthelminthics — Mebendazole, Whipworms, roundworms, hookworms, p. 67",
          quotedValue: "greater than 10 kg or from 1 year 100 mg twice daily for 3 days."
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true
    }
  ],
  formulations: [
    {
      kind: "solid",
      id: "100mg-0",
      labelMn: "100mg таблет",
      mgPerUnit: 100,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "liquid",
      id: "100mg-5ml-1",
      labelMn: "100mg/5ml уусмал",
      mgPerMl: 20
    }
  ],
  warnings: [],
  contraindicationsMn: [],
  notesMn: "Жингээс үл хамаарсан тогтмол тун. 3 хоногийн курс. Enterobius-д: нэг тун 100мг, 2 долоо хоногийн дараа давтана.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
