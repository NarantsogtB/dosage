import type { Drug } from "../../domain/drug";

/**
 * Cetirizine — Цетиризин
 *
 * 🟡 ГАНЦ ЭХ СУРВАЛЖ (known-gap, 2026-11-04) — RCH Melbourne CPG
 * «Urticaria» (2023-03 шинэчилсэн), цочмог чонон хөрвөс: насны мужаар.
 * ⚠️ ТУН ӨӨРЧЛӨГДСӨН (2026-11-04, эмчийн шийдвэр): өмнө нь бүх насанд
 * 0.25 мг/кг өдөрт 1 удаа (дээд 10 мг) — 1-ээс дээш насанд RCH-ээс ~2 дахин
 * бага гардаг байв. Одоо RCH-ийн 4 муж:
 *   6–11 сар 0.25 мг/кг (дээд 2.5 мг) × 1 · 1–2 нас 2.5 мг × 2 ·
 *   2–6 нас 5 мг × 1 · 6–18 нас 10 мг × 1.
 * RCH 2–6 насанд 2.5 мг × 2, 6–12 насанд 5 мг × 2 гэсэн хувилбарыг ч
 * зөвшөөрдөг (хоногийн нийт ижил). WHO Formulary 2010, MSF-д байхгүй.
 *
 * Үлдсэн: lastReviewed/reviewedBy (эмчийн хяналт), contraindicationsMn,
 * availableInMn.
 */

export const cetirizine: Drug = {
  id: "cetirizine",
  inn: "Cetirizine",
  innMn: "Цетиризин",
  category: "antihistamine",
  rules: [
    {
      id: "cetirizine-6-11m",
      indication: "general",
      route: "oral",
      ageMinMonths: 6,
      ageMaxMonths: 11,
      basis: { kind: "per_kg_per_dose", minMgPerKg: 0.25, maxMgPerKg: 0.25 },
      frequency: "od",
      caps: [{ kind: "absolute", scope: "per_dose", maxMg: 2.5 }],
      sources: [
        {
          sourceId: "rch-melbourne-urticaria",
          locator: "Urticaria — Treatment, Acute urticaria (сүүлд шинэчилсэн 2023-03)",
          quotedValue: "6-11 months: 0.25 mg/kg (max 2.5 mg) oral daily"
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote: "Эмчийн шийдвэр (2026-11-04): RCH-ийн насны мужаар. Өмнө нь бүх насанд 0.25 мг/кг × 1 (дээд 10 мг)."
    },
    {
      id: "cetirizine-1-2y",
      indication: "general",
      route: "oral",
      ageMinMonths: 12,
      ageMaxMonths: 23,
      basis: { kind: "fixed", minMg: 2.5, maxMg: 2.5 },
      frequency: "bd",
      caps: [],
      sources: [
        {
          sourceId: "rch-melbourne-urticaria",
          locator: "Urticaria — Treatment, Acute urticaria (сүүлд шинэчилсэн 2023-03)",
          quotedValue: "1-2 years: 2.5 mg oral twice daily"
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote: "Эмчийн шийдвэр (2026-11-04): RCH-ийн насны мужаар. Өмнө нь бүх насанд 0.25 мг/кг × 1 (дээд 10 мг)."
    },
    {
      id: "cetirizine-2-6y",
      indication: "general",
      route: "oral",
      ageMinMonths: 24,
      ageMaxMonths: 71,
      basis: { kind: "fixed", minMg: 5, maxMg: 5 },
      frequency: "od",
      caps: [],
      sources: [
        {
          sourceId: "rch-melbourne-urticaria",
          locator: "Urticaria — Treatment, Acute urticaria (сүүлд шинэчилсэн 2023-03)",
          quotedValue: "2-6 years: 5 mg oral daily or 2.5 mg oral twice daily"
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote: "Эмчийн шийдвэр (2026-11-04): RCH-ийн насны мужаар. Өмнө нь бүх насанд 0.25 мг/кг × 1 (дээд 10 мг). RCH 2.5 мг × 2-ыг ч зөвшөөрнө."
    },
    {
      id: "cetirizine-6-18y",
      indication: "general",
      route: "oral",
      ageMinMonths: 72,
      basis: { kind: "fixed", minMg: 10, maxMg: 10 },
      frequency: "od",
      caps: [],
      sources: [
        {
          sourceId: "rch-melbourne-urticaria",
          locator: "Urticaria — Treatment, Acute urticaria (сүүлд шинэчилсэн 2023-03)",
          quotedValue: "6-12 years: 10 mg oral daily or 5 mg oral twice daily"
        },
        {
          sourceId: "rch-melbourne-urticaria",
          locator: "Urticaria — Treatment, Acute urticaria (сүүлд шинэчилсэн 2023-03)",
          quotedValue: "12-18 years: 10 mg oral daily"
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote: "Эмчийн шийдвэр (2026-11-04): RCH-ийн насны мужаар. Өмнө нь бүх насанд 0.25 мг/кг × 1 (дээд 10 мг). RCH 6–12 насанд 5 мг × 2-ыг ч зөвшөөрнө."
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
  notesMn: "Тун насаар тогтоогдоно (RCH). Архаг чонон хөрвөсөд RCH хоногийн тунг 4 дахин хүртэл нэмэхийг зөвшөөрдөг — эмчийн шийдвэр.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
