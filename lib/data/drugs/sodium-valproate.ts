import type { Drug } from "../../domain/drug";

/**
 * Sodium valproate — Натрийн вальпроат
 *
 * ✅ БАТАЛГААЖСАН (2026-11-03) — WHO Model Formulary for Children (2010) +
 * MSF Essential drugs (VALPROIC acid oral, 2024-10 шинэчилсэн): барих тун
 * 12.5–15 мг/кг × 2. ⚠️ ТУН ӨӨРЧЛӨГДСӨН (2026-10-30, эмчийн шийдвэр): WHO
 * 2010-ийн утгаар засав — conflictNote.
 * ⚠️ НАС ӨӨРЧЛӨГДСӨН (2026-11-03, эмчийн шийдвэр): 1 сар → 2 нас. MSF <2
 * насанд элэгний хордлогын эрсдэлээс болж хориглосон.
 *
 * MSF 2–11 насанд дээд 600 мг/тун гэсэн; дүрмийн 1000 мг/тун, 2500 мг/хон
 * нь ≥12 насны (MSF: 500 мг–1 г × 2, дээд 2.5 г/хон) хязгаартай таарна.
 * 15 мг/кг × 40 кг = 600 мг тул 2–11 насанд бодитоор бараг нөлөөгүй.
 *
 * Үлдсэн: lastReviewed/reviewedBy (эмчийн хяналт), contraindicationsMn,
 * availableInMn.
 */

export const sodiumValproate: Drug = {
  id: "sodium-valproate",
  inn: "Sodium valproate",
  innMn: "Натрийн вальпроат",
  category: "anticonvulsant",
  rules: [
    {
      id: "sodium-valproate-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 24,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 12.5,
        maxMgPerKg: 15
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
          maxMg: 2500
        }
      ],
      sources: [
        {
          sourceId: "who-formulary-children-2010",
          locator: "Sodium valproate — oral, p. 60",
          quotedValue: "Infant or Child initially 5–7.5 mg/kg twice daily. Usual maintenance dose is 12.5–15 mg/kg twice daily."
        },
        {
          sourceId: "msf-essential-drugs",
          locator: "VALPROIC acid = VPA = SODIUM VALPROATE oral — Epilepsy (2024-10)",
          quotedValue: "Child 2 to 11 years: start with 10 to 15 mg/kg once daily or 5 to 7.5 mg/kg 2 times daily; increase the daily dose by increments of 5 to 10 mg/kg every week, up to 12.5 to 15 mg/kg 2 times daily if necessary (max. 600 mg 2 times daily)."
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote: "Эмчийн шийдвэр (2026-10-30): ЭМЯ-ны хүүхдийн удирдамж байхгүй тул ДЭМБ-ын утгыг сонгов — WHO Model Formulary for Children 2010, p. 60: «Infant or Child initially 5–7.5 mg/kg twice daily. Usual maintenance dose is 12.5–15 mg/kg twice daily. Up to 30 mg/kg twice daily in infantile spasms may be required.» Өмнө нь 15–40 мг/кг/хон × 3, 0 сараас. Барих тун л тооцоолно (эхлэх тун, титраци — эмч). 2026-11-03: MSF Essential drugs (2024-10) 12.5–15 мг/кг × 2-ыг баталгаажуулав. Эмчийн шийдвэр (2026-11-03): MSF «Do not administer … to children under 2 years (increased risk of hepatotoxicity)» тул 1 сар → 2 наснаас."
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
      id: "200mg-1",
      labelMn: "200mg таблет",
      mgPerUnit: 200,
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
      messageMn: "2 нас хүртэл ба полифармацид ЭЛЭГНИЙ ХОРДЛОГЫН ЭРСДЭЛ ОНЦ ИХ."
    },
    {
      level: "warn",
      messageMn: "Жирэмсний үед тератоген нөлөөтэй — найдвартай жирэмслэлтээс хамгаалах арга хэрэглэх."
    },
    {
      level: "warn",
      messageMn: "Элэгний шинжилгээ, цусны бүрэлдэхүүн тогтмол хянах."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Хоолтой хамт уух. Тунг аажим нэмэх. Серум дахь түвшин: 50–100 мкг/мл.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
