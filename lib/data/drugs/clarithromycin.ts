import type { Drug } from "../../domain/drug";

/**
 * Clarithromycin — Кларитромицин
 *
 * ✅ БАТАЛГААЖСАН, ГАНЦ ЭХ СУРВАЛЖ (2026-10-30) — WHO AWaRe antibiotic book
 * (2022), Table 50.1: 7.5 мг/кг/тун 12 цаг тутам, хоногт дээд 1 г. Тун
 * өөрчлөгдөөгүй. `tests/data/known-gaps.ts`.
 *
 * MSF Essential drugs-д зөвхөн насанд хүрэгчийн тун (H. pylori), RCH-ийн
 * Antimicrobial guidelines-д байхгүй. Насны доод 6 сар — эх сурвалжаас
 * хатуу (AWaRe нас заагаагүй).
 *
 * Үлдсэн: lastReviewed/reviewedBy (эмчийн хяналт), contraindicationsMn,
 * availableInMn.
 */

export const clarithromycin: Drug = {
  id: "clarithromycin",
  inn: "Clarithromycin",
  innMn: "Кларитромицин",
  category: "antibiotic",
  rules: [
    {
      id: "clarithromycin-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 6,
      basis: {
        kind: "per_kg_per_day",
        minMgPerKg: 15,
        maxMgPerKg: 15
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
          sourceId: "who-aware-2022",
          locator: "Ch. 50 Dosing guidance – Children, Table 50.1, p. 646 (PDF p. 662)",
          quotedValue: "Clarithromycin Oral: 7.5 mg/kg/dose given every 12 hours Up to a maximum daily dose of 1 g"
        }
      ],
      evidenceLevel: "B_who",
      isDefault: true
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
      labelMn: "250mg таблет",
      mgPerUnit: 250,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "500mg-3",
      labelMn: "500mg таблет",
      mgPerUnit: 500,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [],
  contraindicationsMn: [],
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
