import type { Drug } from "../../domain/drug";

/**
 * Metronidazole — Метронидазол
 *
 * ✅ БАТАЛГААЖСАН — MSF Essential drugs (2026-01, шинэчилсэн 2026-06) +
 * Children's Health Queensland "Paediatric Antibiocard" (V12.0, 2026-06).
 *
 * ⚠️ 2026-08-20: Жинхэнэ зааврууд ЗААЛТААР ялгаатай тунтай (анаэроб
 * халдвар 7.5–10 мг/кг tds; Giardia 30 мг/кг өдөрт нэг удаа 3 хоног;
 * амёбиаз 15 мг/кг tds — зөвхөн MSF-д байгаа, хоёр дахь эх сурвалж
 * дутуу тул одоохондоо дүрэм болгоогүй). Иймд хуучин "ерөнхий" ганц
 * дүрмийг (30–50 мг/кг/өдөр) ХАЯГААД заалт тус бүрээр 2 дүрэг болгов.
 */

export const metronidazole: Drug = {
  id: "metronidazole",
  inn: "Metronidazole",
  innMn: "Метронидазол",
  category: "antibiotic",
  rules: [
    {
      id: "metronidazole-anaerobic",
      indication: {
        code: "anaerobic",
        labelMn: "Анаэроб бактерийн халдвар"
      },
      route: "oral_iv",
      ageMinMonths: 1,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 7.5,
        maxMgPerKg: 10
      },
      frequency: "tds",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 500
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 1500
        }
      ],
      sources: [
        {
          sourceId: "msf-essential-drugs",
          locator: "METRONIDAZOLE oral — Dosage and duration, Infections due to anaerobic bacteria (2026 оны 1 сарын хэвлэл, 2026-06 шинэчилсэн)",
          quotedValue: "Child: 10 mg/kg 3 times daily"
        },
        {
          sourceId: "chq-antibiocard",
          locator: "Peritonitis / Cholangitis — Metronidazole IV (V12.0, 2026-06)",
          quotedValue: "Metronidazole IV 7.5 mg/kg/dose every 8 hours (Maximum 500 mg/dose)"
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true
    },
    {
      id: "metronidazole-giardiasis",
      indication: {
        code: "giardiasis",
        labelMn: "Гиардиаз (Giardia)"
      },
      route: "oral",
      ageMinMonths: 1,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 30,
        maxMgPerKg: 30
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
          maxMg: 2000
        }
      ],
      sources: [
        {
          sourceId: "msf-essential-drugs",
          locator: "METRONIDAZOLE oral — Dosage and duration, Giardiasis (2026 оны 1 сарын хэвлэл, 2026-06 шинэчилсэн)",
          quotedValue: "Child: 30 mg/kg once daily for 3 days"
        },
        {
          sourceId: "chq-antibiocard",
          locator: "Gastro-intestinal — Giardiasis (V12.0, 2026-06)",
          quotedValue: "Giardiasis Metronidazole 30 mg/kg/dose orally once daily (maximum 2 g/dose) for 3 days."
        }
      ],
      evidenceLevel: "C_international",
      isDefault: false
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
      id: "400mg-2",
      labelMn: "400mg таблет",
      mgPerUnit: 400,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Архи хэрэглэхийг хориглоно (дисульфирам хэлбэрийн урвал)."
    }
  ],
  contraindicationsMn: [],
  notesMn:
    "Анаэроб халдвар, Giardia-д баталгаажсан тунтай. Амёбиаз, " +
    "Trichomonas заалт МХБ баталгаажсангүй (зөвхөн 1 эх сурвалж) — " +
    "одоогоор тусдаа дүрэггүй; \"Анаэроб халдвар\" дүрмийг ойролцоо " +
    "тунгаар ашиглаж болзошгүй ч эмч клиникийн шийдвэрээрээ баталгаажуулна.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
