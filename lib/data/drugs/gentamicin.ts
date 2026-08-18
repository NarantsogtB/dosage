import type { Drug } from "../../domain/drug";

/**
 * Gentamicin — Гентамицин
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

export const gentamicin: Drug = {
  id: "gentamicin",
  inn: "Gentamicin",
  innMn: "Гентамицин",
  category: "antibiotic",
  rules: [
    {
      id: "gentamicin-general",
      indication: "general",
      route: "iv_im",
      ageMinMonths: 0,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 5,
        maxMgPerKg: 5
      },
      frequency: "od",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 160
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 320
        }
      ],
      sources: [],
      evidenceLevel: "E_unverified",
      isDefault: true
    }
  ],
  formulations: [],
  warnings: [
    {
      level: "warn",
      messageMn: "Чихний мэдрэлийн гэмтэл (ototoxicity) болон бөөрний гэмтлийн (nephrotoxicity) эрсдэлтэй."
    },
    {
      level: "warn",
      messageMn: "Бөөрний үйл ажиллагаа, сонсгол шалгах шаардлагатай."
    },
    {
      level: "warn",
      messageMn: "Урт хугацааны эмчилгээнд цусан дахь түвшин хэмжих шаардлагатай (TDM)."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Нярайд (0–1 сар): 2.5–3 мг/кг 12 цаг тутам. Нас гүйцсэнд: өдөрт нэг удаа 5–7 мг/кг.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
