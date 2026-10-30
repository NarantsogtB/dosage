import type { Drug } from "../../domain/drug";

/**
 * Cephalexin — Цефалексин
 *
 * ✅ БАТАЛГААЖСАН (2026-10-30) — WHO AWaRe (2022) + MSF: 25 мг/кг/тун, өдөрт 2
 * удаа. ⚠️ ТУН ӨӨРЧЛӨГДСӨН: өмнө 25–50 мг/кг/хон × 4, дээд 500 мг/тун.
 * Эмчийн шийдвэр — ДЭМБ-ыг сонгов (conflictNote).
 *
 * Үлдсэн: lastReviewed/reviewedBy (эмчийн хяналт), contraindicationsMn,
 * availableInMn.
 */

export const cephalexin: Drug = {
  id: "cephalexin",
  inn: "Cephalexin",
  innMn: "Цефалексин",
  category: "antibiotic",
  rules: [
    {
      id: "cephalexin-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 1,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 25,
        maxMgPerKg: 25
      },
      frequency: "bd",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 1000
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 2000
        }
      ],
      sources: [
        {
          sourceId: "who-aware-2022",
          locator: "Ch. 50 Dosing guidance – Children, Table 50.1, p. 643 (PDF p. 659)",
          quotedValue: "Cefalexin Oral: 25 mg/kg/dose given every 12 hours Maximum daily dose: use adult dosing"
        },
        {
          sourceId: "msf-essential-drugs",
          locator: "CEFALEXIN oral — Dosage (2024-01)",
          quotedValue: "Child 1 month to under 12 years: 12.5 to 25 mg/kg 2 times daily"
        }
      ],
      evidenceLevel: "B_who",
      isDefault: true,
      conflictNote: "Эмчийн шийдвэр (2026-10-30): ЭМЯ-ны хүүхдийн удирдамж байхгүй тул ДЭМБ-ын утгыг сонгов. Өмнө нь 25–50 мг/кг/хон, өдөрт 4 удаа, дээд 500 мг/тун. Дээд 1 г/тун: MSF «Child 12 years and over and adult: 1 g 2 times daily». RCH өөр горимтой (20 мг/кг × 3)."
    }
  ],
  formulations: [
    {
      kind: "liquid",
      id: "125mg-5ml-0",
      labelMn: "125mg/5ml уусмал",
      mgPerMl: 25
    },
    {
      kind: "liquid",
      id: "250mg-5ml-1",
      labelMn: "250mg/5ml уусмал",
      mgPerMl: 50
    },
    {
      kind: "solid",
      id: "250mg-2",
      labelMn: "250mg капсул",
      mgPerUnit: 250,
      unitMn: "капсул",
      divisible: false
    },
    {
      kind: "solid",
      id: "500mg-3",
      labelMn: "500mg капсул",
      mgPerUnit: 500,
      unitMn: "капсул",
      divisible: false
    }
  ],
  warnings: [],
  contraindicationsMn: [],
  notesMn: "Хүнд халдварт 50 мг/кг/өдөр хүртэл нэмж болно.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
