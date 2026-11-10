import type { Drug } from "../../domain/drug";

/**
 * Metoclopramide — Метоклопрамид
 *
 * 🟡 ГАНЦ ЭХ СУРВАЛЖ (known-gap, 2026-11-03) — EMA Article 31 referral
 * (2013), Annex III: 1–18 насанд 0.1–0.15 мг/кг × 3 хүртэл, хоногт дээд
 * 0.5 мг/кг, <1 насанд хориглосон. Одоогийн тун (0.15 мг/кг × 3 = 0.45
 * мг/кг/хон, 1 наснаас, дээд 10/30 мг) таарна — өөрчлөөгүй.
 *
 * Эмчийн шийдвэр (2026-11-03): хүүхдийн эмнэлгийн заавар байхгүй тул
 * зохицуулагчийн (EMA) шошгыг эх сурвалжаар зөвшөөрөв (DECISIONS).
 * Хайсан: MSF (2024-02) — зөвхөн насанд хүрэгч; PCH, RCH — байхгүй;
 * WHO Formulary 2010 — насаар тогтмол мг (хуудсыг шалгаж иш татаагүй).
 *
 * ⚠️ EMA: хүүхдэд ХОЁРДУГААР сонголт (химийн эмчилгээний хожуу бөөлжилт,
 * мэс заслын дараах бөөлжилт), ≤5 хоног (мэс засал ≤48 цаг), тун хооронд
 * ≥6 цаг. Экстрапирамидын урвал хүүхдэд түгээмэл.
 *
 * 🔧 2026-11-10 (эмчийн засвар): бэлдмэл «5mg/5ml уусмал» (1 мг/мл) БУРУУ
 * байсан — Монголд худалдаалагддаг тарилгын уусмал 0.5% = 5 мг/мл, 2 мл
 * ампул (hpoint.mn/products/11607). Ампулаар (IV/IM) солив.
 *
 * Үлдсэн: lastReviewed/reviewedBy (эмчийн хяналт), contraindicationsMn,
 * availableInMn.
 */

export const metoclopramide: Drug = {
  id: "metoclopramide",
  inn: "Metoclopramide",
  innMn: "Метоклопрамид",
  category: "antiemetic",
  rules: [
    {
      id: "metoclopramide-general",
      indication: "general",
      route: "oral_iv",
      ageMinMonths: 12,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 0.15,
        maxMgPerKg: 0.15
      },
      frequency: "tds",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 10
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 30
        }
      ],
      sources: [
        {
          sourceId: "ema-metoclopramide-referral-2013",
          locator: "Annex III, SmPC 4.2 — paediatric patients aged 1–18 years (IV ба oral CINV)",
          quotedValue: "The recommended dose is 0.1 to 0.15 mg/kg body weight, repeated up to three times daily by oral route. The maximum dose in 24 hours is 0.5 mg/kg body weight."
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote: "Эмчийн шийдвэр (2026-11-03): EMA-ийн шошгыг эх сурвалжаар зөвшөөрөв. EMA 0.1–0.15 мг/кг × 3, дээд 0.5 мг/кг/хон, <1 насанд хориглосон — одоогийн 0.15 мг/кг × 3 (0.45 мг/кг/хон), 1 наснаас таарна. EMA хүүхдэд хоёрдугаар сонголт, ≤5 хоног гэж хязгаарласан."
    }
  ],
  formulations: [
    {
      kind: "liquid",
      id: "5mg-ml-0",
      labelMn: "5 мг/мл (0.5%) 2 мл ампул",
      mgPerMl: 5,
      routes: ["iv", "im"],
      availableInMn: true
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
  warnings: [
    {
      level: "warn",
      messageMn: "Экстрапирамидын урвал (дистони, акатизи) — хүүхэд, залуу насанд хамгийн их эрсдэлтэй."
    },
    {
      level: "warn",
      messageMn: "5 мг/кг/өдөр-ийг хэтрүүлэхгүй. Богино курсоор (≤5 хоног) хэрэглэх."
    }
  ],
  contraindicationsMn: [],
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
