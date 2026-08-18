import type { Drug } from "../../domain/drug";

/**
 * Ceftriaxone — Цефтриаксон
 *
 * ✅ Цусан суулгын дүрэм БАТАЛГААЖСАН — WHO 2024 (2-р эгнээ, 50–80 мг/кг).
 * ⚠️ Ерөнхий дүрэм баталгаажаагүй бөгөөд дээд хязгаар нь илүү өндөр (100).
 * ⚠️ formulations хоосон — Монголын бүртгэлээс нөхөх шаардлагатай.
 */

export const ceftriaxone: Drug = {
  id: "ceftriaxone",
  inn: "Ceftriaxone",
  innMn: "Цефтриаксон",
  category: "antibiotic",
  rules: [
    {
      id: "ceftriaxone-dysentery",
      indication: {
        code: "dysentery",
        labelMn: "Цусан суулга (2-р эгнээ)"
      },
      route: "iv_im",
      ageMinMonths: 0,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 50,
        maxMgPerKg: 80
      },
      frequency: "od",
      duration: {
        minDays: 3,
        maxDays: 3
      },
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 4000
        }
      ],
      sources: [
        {
          sourceId: "who-pneumonia-diarrhoea-2024",
          locator: "Diarrhoea — antibiotics, Remarks",
          quotedValue: "second line: Ceftriaxone: 50–80 mg/kg daily for three days"
        }
      ],
      evidenceLevel: "B_who"
    },
    {
      id: "ceftriaxone-general",
      isDefault: true,
      indication: "general",
      route: "iv_im",
      ageMinMonths: 0,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 50,
        maxMgPerKg: 100
      },
      frequency: "od",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 4000
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 4000
        }
      ],
      sources: [],
      evidenceLevel: "E_unverified",
      conflictNote: "⚠️ Эх сурвалжгүй. Дээд хязгаар 100 мг/кг нь WHO 2024-ийн цусан суулгын 80 мг/кг-аас өндөр — менингит зэрэг өөр заалттай холбоотой байж болзошгүй, тодруулах шаардлагатай."
    }
  ],
  formulations: [],
  warnings: [
    {
      level: "warn",
      messageMn: "Нярайд билирубин өндөр үед болон кальци агуулсан судсаар хийх уусмалтай хамт хэрэглэхийг цээрлэнэ."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Бэлдмэлийн мэдээлэл дутуу — Монголд бүртгэлтэй тунгийн хэлбэрийг druginfo.mohs.mn-ээс нөхөх.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
