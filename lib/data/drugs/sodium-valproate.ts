import type { Drug } from "../../domain/drug";

/**
 * Sodium valproate — Натрийн вальпроат
 *
 * ⚠️ ЭХ СУРВАЛЖ БАТАЛГААЖААГҮЙ (evidenceLevel: "E_unverified").
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
      ageMinMonths: 0,
      basis: {
        kind: "per_kg_per_day",
        minMgPerKg: 15,
        maxMgPerKg: 40
      },
      frequency: "tds",
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
