import type { Drug } from "../../domain/drug";

/**
 * Ibuprofen — Ибупрофен
 *
 * ✅ БАТАЛГААЖСАН — RCH Melbourne (2024-10) + MSF Essential drugs (2026-01,
 * шинэчилсэн 2026-06). Хоёр бие даасан, 2020+ эх сурвалж тохирч байна;
 * зөрчил илрээгүй.
 */

export const ibuprofen: Drug = {
  id: "ibuprofen",
  inn: "Ibuprofen",
  innMn: "Ибупрофен",
  category: "analgesic",
  rules: [
    {
      id: "ibuprofen-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 3,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 5,
        maxMgPerKg: 10
      },
      frequency: "q6_8h",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 400
        },
        {
          kind: "per_kg",
          scope: "per_day",
          maxMgPerKg: 30
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 2400
        }
      ],
      sources: [
        {
          sourceId: "rch-melbourne-cpg",
          locator: "Acute pain management — Systemic analgesia, Ibuprofen PO (2024 оны 10 сард шинэчилсэн)",
          quotedValue: ">3 months: 10 mg/kg (max 400 mg) 6-8 hourly with food ... 30 mg/kg/day (max 2.4 g)"
        },
        {
          sourceId: "msf-essential-drugs",
          locator: "IBUPROFEN oral — Dosage, Pain/fever (2026 оны 1 сарын хэвлэл, 2026-06 шинэчилсэн)",
          quotedValue: "Child over 3 months: 5 to 10 mg/kg 3 to 4 times daily (max. 30 mg/kg daily)"
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true
    }
  ],
  formulations: [
    {
      kind: "liquid",
      id: "100mg-5ml-0",
      labelMn: "100mg/5ml уусмал",
      mgPerMl: 20
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
      messageMn: "Бөөрний дутагдал, хэвлийн шархлаа, цусны бүлэгнэлтийн эмгэгтэй өвчтөнд болгоомжтой хэрэглэх."
    },
    {
      level: "warn",
      messageMn: "3 сараас доош нас — хориглоно."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Хооллох үед эсвэл хоолны дараа уух. Хангалттай хэмжээний шингэнээр даруулж ууна.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
