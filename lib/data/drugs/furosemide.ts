import type { Drug } from "../../domain/drug";

/**
 * Furosemide — Фуросемид
 *
 * ✅ БАТАЛГААЖСАН (2026-11-03) — WHO Model Formulary for Children (2010) +
 * Perth Children's Hospital monograph (2024-07 хянасан): ≥1 сартай хүүхдэд
 * амаар 0.5–2 мг/кг/тун. ⚠️ ТУН ӨӨРЧЛӨГДСӨН (2026-10-30, эмчийн шийдвэр):
 * WHO 2010-ийн утгаар засав — conflictNote. 2026-11-03-нд тунд гар хүрээгүй,
 * зөвхөн эх сурвалж нэмэв.
 *
 * PCH нь 6–12 цаг тутам өгөх, хариу муу бол 6 мг/кг/тун хүртэл нэмэхийг
 * зөвшөөрдөг. Тооцоолуур ердийн 0.5–2 мг/кг-ийг × 2, WHO-гийн хоногийн дээд
 * хязгаартай (12 мг/кг, 80 мг) өгнө — титраци эмчийн шийдвэр.
 * ⛔ Судсаар ба нярайн тун энэ дүрэмд ороогүй.
 *
 * Үлдсэн: lastReviewed/reviewedBy (эмчийн хяналт), contraindicationsMn,
 * availableInMn.
 */

export const furosemide: Drug = {
  id: "furosemide",
  inn: "Furosemide",
  innMn: "Фуросемид",
  category: "diuretic",
  rules: [
    {
      id: "furosemide-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 1,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 0.5,
        maxMgPerKg: 2
      },
      frequency: "bd",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 40
        },
        {
          kind: "per_kg",
          scope: "per_day",
          maxMgPerKg: 12
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 80
        }
      ],
      sources: [
        {
          sourceId: "who-formulary-children-2010",
          locator: "Furosemide — oral, p. 318",
          quotedValue: "Infant or Child 0.5–2 mg/kg 2–3 times daily; ... maximum 12 mg/kg (80 mg) daily"
        },
        {
          sourceId: "pch-furosemide-monograph",
          locator: "Dosage — Children ≥ 4 weeks, Oral (сүүлд хянасан 2024-07)",
          quotedValue: "Oral: 0.5–2 mg/kg/dose every 6–12 hours. If response is not adequate after 6–8 hours, the dose may be increased by 1–2 mg/kg/dose, up to a maximum of 6 mg/kg/dose."
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote: "Эмчийн шийдвэр (2026-10-30): ЭМЯ-ны хүүхдийн удирдамж байхгүй тул ДЭМБ-ын утгыг сонгов — WHO Model Formulary for Children 2010, p. 318 (амаар): «Infant or Child 0.5–2 mg/kg 2–3 times daily; ... maximum 12 mg/kg (80 mg) daily». Өмнө нь 1–2 мг/кг, амаар/судсаар, хоногт дээд 600 мг, 0 сараас. Судсаар (0.5–1 мг/кг 8 цаг тутам) ба нярайн (12–24 цаг тутам) тун өөр тул энэ дүрмээс хасав. 2026-11-03: PCH monograph (2024) хоёр дахь эх сурвалжаар 0.5–2 мг/кг/тун-г баталгаажуулав (PCH 6–12 цаг тутам, 6 мг/кг/тун хүртэл титраци зөвшөөрдөг — тооцоолуур ердийн тунг л өгнө)."
    }
  ],
  formulations: [
    {
      kind: "liquid",
      id: "40mg-5ml-0",
      labelMn: "40mg/5ml уусмал",
      mgPerMl: 8
    },
    {
      kind: "solid",
      id: "20mg-1",
      labelMn: "20mg таблет",
      mgPerUnit: 20,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "40mg-2",
      labelMn: "40mg таблет",
      mgPerUnit: 40,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Цусны кали, натри, шингэний тэнцвэрийг хянах."
    },
    {
      level: "warn",
      messageMn: "Чихрийн шижингийн эм, аминогликозидтай харилцан нөлөөлөл байна."
    }
  ],
  contraindicationsMn: [],
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
