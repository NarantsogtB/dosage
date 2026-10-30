import type { Drug } from "../../domain/drug";

/**
 * Sodium valproate — Натрийн вальпроат
 *
 * ⚠️ ЭХ СУРВАЛЖ БАТАЛГААЖААГҮЙ (evidenceLevel: "E_unverified").
 * ⚠️ ТУН ӨӨРЧЛӨГДСӨН (2026-10-30, эмчийн шийдвэр): WHO Model Formulary for
 * Children 2010-ийн утгаар засав — conflictNote. 2020+ хоёр дахь эх сурвалж
 * олдоогүй тул E хэвээр.
 * MVP-ийн lib/drugs.ts-ээс автоматаар хөрвүүлсэн. Тунгийн утга нь
 * анхны хувилбартай ЯГ ИЖИЛ — өөрчлөөгүй.
 *
 * Хийх ажил (docs/SOURCES.md, 5-р хэсэг):
 *   1. WHO AWaRe / 2024 заавраас тунг баталгаажуулах
 *   2. sources[] бөглөх, evidenceLevel шинэчлэх
 *   3. lastReviewed, reviewedBy бөглөх
 *   4. contraindicationsMn нэмэх (druginfo.mohs.mn)
 *   5. formulation бүрд availableInMn тэмдэглэх
 *   6. warnings[].level-ийг эргэн харах (бүгд "warn" гэж хөрвүүлсэн)
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
      ageMinMonths: 1,
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
      sources: [],
      evidenceLevel: "E_unverified",
      isDefault: true,
      conflictNote: "Эмчийн шийдвэр (2026-10-30): ЭМЯ-ны хүүхдийн удирдамж байхгүй тул ДЭМБ-ын утгыг сонгов — WHO Model Formulary for Children 2010, p. 60: «Infant or Child initially 5–7.5 mg/kg twice daily. Usual maintenance dose is 12.5–15 mg/kg twice daily. Up to 30 mg/kg twice daily in infantile spasms may be required.» Өмнө нь 15–40 мг/кг/хон × 3, 0 сараас. Барих тун л тооцоолно (эхлэх тун, титраци — эмч). 2020+ хоёр дахь эх сурвалжгүй — E."
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
