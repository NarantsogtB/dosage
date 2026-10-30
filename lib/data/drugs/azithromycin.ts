import type { Drug } from "../../domain/drug";

/**
 * Azithromycin — Азитромицин
 *
 * ✅ БАТАЛГААЖСАН (2026-10-30) — WHO AWaRe antibiotic book (2022, Table
 * 50.1 «lower dose») + MSF Essential drugs (2025-06): 10 мг/кг өдөрт 1 удаа,
 * хоногт дээд 500 мг. Тун өөрчлөгдөөгүй.
 *
 * RCH Melbourne (2026-10) уух горим өөр: ≥6 сар — эхний өдөр 10 мг/кг,
 * дараа нь 5 мг/кг (pertussis); 10 мг/кг өдөр бүр нь зөвхөн IV. Насны
 * доод хязгаар 6 сар нь эх сурвалжаас хатуу. Хоёулаа эмчийн шийдвэр —
 * docs/sources/pending-decisions-2026-10.md.
 *
 * Үлдсэн: lastReviewed/reviewedBy (эмчийн хяналт), contraindicationsMn,
 * availableInMn.
 */

export const azithromycin: Drug = {
  id: "azithromycin",
  inn: "Azithromycin",
  innMn: "Азитромицин",
  category: "antibiotic",
  rules: [
    {
      id: "azithromycin-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 6,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 10,
        maxMgPerKg: 10
      },
      frequency: "od",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 500
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 500
        }
      ],
      sources: [
        {
          sourceId: "msf-essential-drugs",
          locator: "AZITHROMYCIN oral — Pneumonia due to M. pneumoniae and C. pneumoniae; Acute otitis media (2025-06)",
          quotedValue: "Child: 10 mg/kg (max. 500 mg) once daily for 5 days"
        },
        {
          sourceId: "who-aware-2022",
          locator: "Ch. 50 Dosing guidance – Children, Table 50.1, p. 642 (PDF p. 658)",
          quotedValue: "Azithromycin Oral: Lower dose: 10 mg/kg/dose given every 24 hours ... Up to a maximum daily dose of 500 mg"
        }
      ],
      evidenceLevel: "B_who",
      isDefault: true
    }
  ],
  formulations: [
    {
      kind: "liquid",
      id: "200mg-5ml-0",
      labelMn: "200mg/5ml уусмал",
      mgPerMl: 40
    },
    {
      kind: "solid",
      id: "250mg-1",
      labelMn: "250mg таблет",
      mgPerUnit: 250,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "500mg-2",
      labelMn: "500mg таблет",
      mgPerUnit: 500,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [],
  contraindicationsMn: [],
  notesMn: "3 хоногийн курс (10мг/кг/өдөр × 3). Хоолноос 1 цагийн өмнө эсвэл 2 цагийн дараа уух.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
