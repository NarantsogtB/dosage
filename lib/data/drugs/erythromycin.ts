import type { Drug } from "../../domain/drug";

/**
 * Erythromycin — Эритромицин
 *
 * ✅ БАТАЛГААЖСАН (2026-10-30) — MSF Essential drugs (2024-01) + WHO AWaRe
 * antibiotic book (2022). 30–50 мг/кг/хон, 4 хуваана, дээд 500 мг/тун — тохирч
 * байна. Тун өөрчлөгдөөгүй.
 *
 * ⚠️ MSF: 6 сараас доош, ялангуяа 2 долоо хоногоос доош нярайд хэрэглэхгүй
 * эсвэл болгоомжтой (пилорын гипертрофийн нарийсал). AWaRe-ийн 50 мг/кг/хон
 * нь нярайн хламидийн конъюнктивитэд — тиймээс насны доод 0 хэвээр.
 *
 * Үлдсэн: lastReviewed/reviewedBy (эмчийн хяналт), contraindicationsMn,
 * availableInMn.
 */

export const erythromycin: Drug = {
  id: "erythromycin",
  inn: "Erythromycin",
  innMn: "Эритромицин",
  category: "antibiotic",
  rules: [
    {
      id: "erythromycin-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 0,
      basis: {
        kind: "per_kg_per_day",
        minMgPerKg: 30,
        maxMgPerKg: 50
      },
      frequency: "qds",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 500
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 2000
        }
      ],
      sources: [
        {
          sourceId: "msf-essential-drugs",
          locator: "ERYTHROMYCIN oral — Dosage (2024-01)",
          quotedValue: "Child: 30 to 50 mg/kg daily in divided doses"
        },
        {
          sourceId: "who-aware-2022",
          locator: "Ch. 19 Chlamydial urogenital infection, Table 19.3 footnote f, p. 240 (PDF p. 256)",
          quotedValue: "erythromycin (oral): 50 mg/kg per day divided in 4 doses for 14 days."
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
  warnings: [
    {
      level: "warn",
      messageMn: "Ходоодны дотроос тайтгаруулах нөлөөтэй — хоолтой хамт уух."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Azithromycin, clarithromycin-тэй харьцуулахад ходоодны гаж нөлөө их. QT интервал уртасгах эрсдэлтэй.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
