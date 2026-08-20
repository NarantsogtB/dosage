import type { Drug } from "../../domain/drug";

/**
 * Gentamicin — Гентамицин
 *
 * ✅ >1 сартай хүүхдэд БАТАЛГААЖСАН — MSF Essential drugs (Gentamicin
 * injectable, 2023-09 шинэчилсэн) + Children's Health Queensland
 * Antibiocard (V12.0, 2026-06).
 *
 * ⛔ НЯРАЙ (<1 сар) ХАРААХАН БАТАЛГААЖААГҮЙ — зөвхөн шалтгаангүй биш,
 * ХОЁР шалтгаантай:
 *   1. Эх сурвалжийн зөрүү: MSF нярайг ТӨРСНӨӨС ХОЙШХИ ХОНОГ + жингээр
 *      3 дэд мужид хуваадаг (0-7 хоног <2кг: 3мг/кг; 0-7 хоног ≥2кг:
 *      5мг/кг; 8 хоног-1 сар: 5мг/кг), CHQ Antibiocard нярайн тунг өөр
 *      баримт бичигт (ANMF/NeoMedQ) заасан бөгөөд шууд иш татаагүй.
 *   2. Архитектурын хязгаарлалт: одоогийн DosingRule схем зөвхөн
 *      ageMinMonths/ageMaxMonths (сараар) ба weightMinKg/weightMaxKg
 *      дэмждэг — "төрснөөс хойших хоног" гэсэн мужийг илэрхийлэх
 *      талбар байхгүй. MSF-ийн нярайн тунг ойролцоолж оруулбал жинхэнэ
 *      зааврыг гажуудуулах эрсдэлтэй тул ОРУУЛААГҮЙ.
 * Тиймээс gentamicin-general дүрэм ageMinMonths: 1-ээс эхэлнэ — 0-1
 * сартай нярайд тооцоолол ГАРАХГҮЙ (fabricate хийхээс сэргийлэв).
 * Дараагийн алхам: DosingRule-д ageMinDays/ageMaxDays талбар нэмэх
 * эсэхийг архитектурын түвшинд шийдэх, дараа нь MSF-ийн нярайн 3
 * мужийг хоёр дахь эх сурвалжтай (ANMF шууд унших) баталгаажуулах.
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
      ageMinMonths: 1,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 4.5,
        maxMgPerKg: 7.5
      },
      frequency: "od",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 320
        }
      ],
      sources: [
        {
          sourceId: "msf-essential-drugs",
          locator: "GENTAMICIN injectable — Dosage, Other severe bacterial infections (2023-09 шинэчилсэн)",
          quotedValue: "Child 1 month and over: 4.5 to 7.5 mg/kg once daily"
        },
        {
          sourceId: "chq-antibiocard",
          locator: "Cardiac / Endocarditis — Gentamicin IV (V12.0, 2026-06)",
          quotedValue: "If more than 1 month and less than 10 years old: 7.5 mg/kg once daily (maximum 320 mg/day)."
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote:
        "CHQ Antibiocard 10-аас дээш настай хүүхдэд дээд хэмжээг " +
        "560 мг/өдөр (6 мг/кг) хүртэл нэмэгдүүлдэг. Энэ тооцоолуур " +
        "аюулгүй байдлыг эрхэмлэж 320 мг/өдөрийн хязгаарыг бүх насанд " +
        "(≥1 сар) ашигладаг тул том, жинтэй өсвөр насныханд бага зэрэг " +
        "консерватив гарч болзошгүй."
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
  notesMn:
    "⚠️ Нярайд (<1 сар) энэ тооцоолуур ТУН ГАРГАХГҮЙ — MSF-ийн заавраар " +
    "нярайг төрснөөс хойших хоног, жингээр нарийн ялгадаг тул энд " +
    "тооцоолохгүй: 0–7 хоног (<2кг) 3 мг/кг; 0–7 хоног (≥2кг) 5 мг/кг; " +
    "8 хоног–1 сар 5 мг/кг өдөрт нэг удаа; 1–3 сар 2.5 мг/кг 8 цаг " +
    "тутам. Эмч эдгээр тоог гараар хэрэглэнэ үү.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
