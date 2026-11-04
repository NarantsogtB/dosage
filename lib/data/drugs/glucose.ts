import type { Drug } from "../../domain/drug";

/**
 * Glucose 10% — Глюкоз 10%
 *
 * ✅ 2026-11-04 (Шат 7b): эмч баталсан — гипогликемид 10% уусмал 2 мл/кг
 * IV/IO. Тун нь ЭЗЭЛХҮҮНЭЭР (мл), бэлдмэлийн хөрвүүлэлт шаардлагагүй.
 */

export const glucose: Drug = {
  id: "glucose",
  inn: "Glucose 10%",
  innMn: "Глюкоз 10%",
  category: "emergency",
  rules: [
    {
      id: "glucose-hypoglycaemia",
      indication: { code: "hypoglycaemia", labelMn: "Гипогликеми" },
      route: "iv_io",
      ageMinMonths: 1,
      doseUnit: "mL",
      basis: { kind: "per_kg_per_dose", minMgPerKg: 2, maxMgPerKg: 2 },
      frequency: "stat",
      caps: [],
      sources: [
        {
          sourceId: "msf-paediatric-care-2024",
          locator: "Cardiopulmonary resuscitation — Post-resuscitation care, p. 33",
          quotedValue:
            "Treat hypoglycaemia (BGL < 3.3 mmol/L or < 60 mg/dL) with 2 mL/kg of glucose (dextrose) 10% IV/IO over 2-3 minutes",
        },
        {
          sourceId: "rch-melbourne-hypoglycaemia",
          locator: "Hypoglycaemia — Management (Last updated August 2025)",
          quotedValue: "Give glucose 10% 2 mL/kg IV bolus in severe hypoglycaemia",
        },
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote:
        "2–3 минутын турш (MSF). WHO Pocket Book 2013 — 10% глюкоз 5 мл/кг; " +
        "эмч 2020+ эх сурвалжийн 2 мл/кг-ийг баталсан.",
    },
  ],
  formulations: [],
  warnings: [],
  contraindicationsMn: [],
  sources: [],
  lastReviewed: "2026-11-04",
  status: "active",
};
