import type { Drug } from "../../domain/drug";
import type { DosingRule } from "../../domain/dosing-rule";

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
 * ампул (emonos.mn: «Метоклопрамид 0.5%-2мл No.5»; hpoint.mn/products/11607).
 * 10 мг шахмал мөн emonos-д байна. Анхааруулгын «5 мг/кг/өдөр» → EMA-ийн
 * 0.5 мг/кг/хон (10 дахин алдаа байсан).
 *
 * ➕ 2026-11-10 (эмчийн шийдвэр): drugs.com-оос PONV ба GERD дүрэм нэмэв.
 * drugs.com нь tiers.md-д хориотой — зөвхөн энэ эмд үл хамаарал. CINV-ийн
 * 1–2 мг/кг/тун EMA-ийн хоногийн дээд 0.5 мг/кг-аас 4–8 дахин их тул
 * ОРУУЛААГҮЙ. <1 насны хоригийг (EMA) шинэ дүрмүүдэд ч хадгалав.
 * GERD-ийн 0.4–0.8 мг/кг/хон нь EMA-ийн 0.5 мг/кг/хон-оос давж болно —
 * conflictNote-д.
 *
 * Үлдсэн: lastReviewed/reviewedBy (эмчийн хяналт), contraindicationsMn.
 */

const DRUGS_COM_PONV = {
  sourceId: "drugs-com-metoclopramide",
  locator: "Usual Pediatric Dose for Postoperative Nausea and Vomiting (2026-08-25)",
  quotedValue: "Children less than or equal to 14 years: 0.1 to 0.2 mg/kg/dose (maximum dose: 10 mg/dose)",
} as const;

const PONV = { code: "ponv", labelMn: "Мэс заслын дараах дотор муухайрах, бөөлжих" } as const;

const PONV_NOTE =
  "Эмчийн шийдвэр (2026-11-10): drugs.com (tiers.md-д хориотой, үл хамаарал). " +
  "6–8 цаг тутам шаардлагатай үед давтана. EMA: <1 насанд хориглосон, хоногт " +
  "дээд 0.5 мг/кг, ≤48 цаг — 1 наснаас эхлүүлэв.";

const ponvChild: DosingRule = {
  id: "metoclopramide-ponv",
  indication: PONV,
  route: "iv",
  ageMinMonths: 12,
  ageMaxMonths: 179,
  basis: { kind: "per_kg_per_dose", minMgPerKg: 0.1, maxMgPerKg: 0.2 },
  frequency: "q6_8h",
  caps: [{ kind: "absolute", scope: "per_dose", maxMg: 10 }],
  sources: [DRUGS_COM_PONV],
  evidenceLevel: "C_international",
  isDefault: false,
  conflictNote: PONV_NOTE,
};

const ponvAdolescent: DosingRule = {
  id: "metoclopramide-ponv-adolescent",
  indication: { code: "ponv", labelMn: "Мэс заслын дараах дотор муухайрах, бөөлжих (>14 нас)" },
  route: "iv",
  ageMinMonths: 180,
  basis: { kind: "fixed", minMg: 10, maxMg: 10 },
  frequency: "q6_8h",
  caps: [{ kind: "absolute", scope: "per_dose", maxMg: 10 }],
  sources: [
    {
      sourceId: "drugs-com-metoclopramide",
      locator: "Usual Pediatric Dose for Postoperative Nausea and Vomiting (2026-08-25)",
      quotedValue: "Children greater than 14 years and Adults: 10 mg ... may repeat every 6 to 8 hours as needed",
    },
  ],
  evidenceLevel: "C_international",
  isDefault: false,
  conflictNote: PONV_NOTE,
};

const gerd: DosingRule = {
  id: "metoclopramide-gerd",
  indication: { code: "gerd", labelMn: "Ходоод улаан хоолойн сөөргөө" },
  route: "oral_iv",
  ageMinMonths: 12,
  basis: { kind: "per_kg_per_day", minMgPerKg: 0.4, maxMgPerKg: 0.8 },
  frequency: "qds",
  caps: [],
  sources: [
    {
      sourceId: "drugs-com-metoclopramide",
      locator: "Usual Pediatric Dose for Gastroesophageal Reflux Disease (2026-08-25)",
      quotedValue: "Infants and Children: 0.4 to 0.8 mg/kg/day in 4 divided doses",
    },
  ],
  evidenceLevel: "C_international",
  isDefault: false,
  conflictNote:
    "Эмчийн шийдвэр (2026-11-10): drugs.com (tiers.md-д хориотой, үл хамаарал). " +
    "drugs.com: хүүхдэд FDA-аар батлагдаагүй, дээд тун заагаагүй. ⚠️ EMA хоногт " +
    "дээд 0.5 мг/кг, <1 насанд хориглосон — 0.5-аас дээш тун EMA-аас давна; " +
    "1 наснаас эхлүүлэв.",
};

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
    },
    ponvChild,
    ponvAdolescent,
    gerd
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
      divisible: true,
      availableInMn: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Экстрапирамидын урвал (дистони, акатизи) — хүүхэд, залуу насанд хамгийн их эрсдэлтэй."
    },
    {
      level: "warn",
      messageMn: "EMA: хоногт 0.5 мг/кг-аас хэтрүүлэхгүй, <1 насанд хэрэглэхгүй. Богино курсоор (≤5 хоног) хэрэглэх."
    }
  ],
  contraindicationsMn: [],
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
