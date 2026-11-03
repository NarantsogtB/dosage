import type { Drug } from "../../domain/drug";

/**
 * Ambroxol — Амброксол
 *
 * ⛔ RETIRED (2026-11-03, эмчийн шийдвэр) — тооцоолуураас ХАССАН.
 * Шалтгаан: Салс шингэрүүлэгч — WHO/MSF/хүүхдийн эмнэлгийн зааварт байхгүй, нотолгоо сул.
 * Өгөгдлийг түүх болгон үлдээв; эх сурвалж хайхгүй.
 *
 * ⚠️ ЭХ СУРВАЛЖ БАТАЛГААЖААГҮЙ (evidenceLevel: "E_unverified").
 * ⚠️ Олон улсын хүүхдийн зааварт (WHO Formulary 2010, MSF, RCH) байхгүй (2026-10-30).
 * Жагсаалтад үлдээх эсэх — эмчийн шийдвэр (docs/sources/pending-decisions-2026-10.md, багц 7).
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

export const ambroxol: Drug = {
  id: "ambroxol",
  inn: "Ambroxol",
  innMn: "Амброксол",
  category: "mucolytic",
  rules: [
    {
      id: "ambroxol-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 0,
      basis: {
        kind: "per_kg_per_day",
        minMgPerKg: 1.2,
        maxMgPerKg: 1.6
      },
      frequency: "tds",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 30
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 90
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
      id: "15mg-5ml-0",
      labelMn: "15mg/5ml уусмал",
      mgPerMl: 3
    },
    {
      kind: "liquid",
      id: "30mg-5ml-1",
      labelMn: "30mg/5ml уусмал",
      mgPerMl: 6
    },
    {
      kind: "solid",
      id: "30mg-2",
      labelMn: "30mg таблет",
      mgPerUnit: 30,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [],
  contraindicationsMn: [],
  notesMn: "2 нас хүртэл: 1.2 мг/кг/өдөр 2 удаа. Хоолтой хамт уух. Хангалттай шингэн уулгах.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "retired"
};
