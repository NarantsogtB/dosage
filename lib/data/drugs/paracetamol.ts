import type { Drug } from "../../domain/drug";

/**
 * Paracetamol — Парацетамол
 *
 * ✅ БАТАЛГААЖСАН — RCH Melbourne (2024-10) + MSF Essential drugs (2026-01,
 * шинэчилсэн 2026-06). Хоёр бие даасан, 2020+ эх сурвалж тохирч байна.
 *
 * Насаар 2 дүрэгдсэн: MSF нярайд (<1 сар) НЭГ УДААГИЙН тунг 10 мг/кг
 * болгож тусад нь бууруулдаг тул "paracetamol-neonate" тусад нь гаргав —
 * доорх conflictNote-ыг үз.
 */

export const paracetamol: Drug = {
  id: "paracetamol",
  inn: "Paracetamol",
  innMn: "Парацетамол",
  category: "analgesic",
  rules: [
    {
      id: "paracetamol-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 1,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 15,
        maxMgPerKg: 15
      },
      frequency: "q4_6h",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 1000
        },
        {
          kind: "per_kg",
          scope: "per_day",
          maxMgPerKg: 60
        }
      ],
      sources: [
        {
          sourceId: "rch-melbourne-cpg",
          locator: "Acute pain management — Systemic analgesia, Paracetamol PO (2024 оны 10 сард шинэчилсэн)",
          quotedValue: "15 mg/kg (max 1 g) 4-6 hourly ... >1 month: 90 mg/kg/day (max 4 g) for severe pain for max 48 hours, then 60 mg/kg/day subsequently"
        },
        {
          sourceId: "msf-essential-drugs",
          locator: "PARACETAMOL = ACETAMINOPHEN oral — Dosage (2026 оны 1 сарын хэвлэл, 2026-06 шинэчилсэн)",
          quotedValue: "Child 1 month and over: 15 mg/kg 3 or 4 times daily (max. 60 mg/kg daily)"
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true
    },
    {
      id: "paracetamol-neonate",
      indication: "general",
      route: "oral",
      ageMinMonths: 0,
      ageMaxMonths: 1,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 10,
        maxMgPerKg: 10
      },
      frequency: "q4_6h",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 1000
        },
        {
          kind: "per_kg",
          scope: "per_day",
          maxMgPerKg: 40
        }
      ],
      sources: [
        {
          sourceId: "msf-essential-drugs",
          locator: "PARACETAMOL = ACETAMINOPHEN oral — Dosage (2026 оны 1 сарын хэвлэл, 2026-06 шинэчилсэн)",
          quotedValue: "Child under 1 month: 10 mg/kg 3 or 4 times daily (max. 40 mg/kg daily)"
        },
        {
          sourceId: "rch-melbourne-cpg",
          locator: "Acute pain management — Systemic analgesia, Paracetamol PO (2024 оны 10 сард шинэчилсэн)",
          quotedValue: "15 mg/kg (max 1 g) 4-6 hourly ... Birth-1 month: 60 mg/kg/day"
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote:
        "RCH нэг удаагийн тунг (15 мг/кг) бүх насанд адил зөвлөж, зөвхөн " +
        "ӨДРИЙН нийт тунгаараа насаар ялгадаг (нярайд 60 мг/кг/өдөр). MSF " +
        "харин нярайд (<1 сар) НЭГ УДААГИЙН тунг тусад нь 10 мг/кг болгож " +
        "бууруулж, өдрийн дээд хэмжээг 40 мг/кг болгосон. Аюулгүй байдлыг " +
        "эрхэмлэж энэ дүрэмд MSF-ийн бага тунг үндсэн болгов; эмч клиникийн " +
        "шийдвэрээрээ RCH-ийн 15 мг/кг хүртэл нэмэгдүүлж болно."
    }
  ],
  formulations: [
    {
      kind: "liquid",
      id: "120mg-5ml-0",
      labelMn: "120mg/5ml уусмал",
      mgPerMl: 24
    },
    {
      kind: "liquid",
      id: "250mg-5ml-1",
      labelMn: "250mg/5ml уусмал",
      mgPerMl: 50
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
  warnings: [],
  contraindicationsMn: [],
  notesMn:
    "Хоолны дараа уух. Нярай (<1 сар): 10 мг/кг тун ашиглана. " +
    "Хүнд өвдөлтөд RCH-ийн зөвлөмжөөр >1 сартай хүүхдэд 48 цагийн " +
    "хугацаанд 90 мг/кг/өдөр (дээд 4 г) хүртэл нэмэгдүүлж болно — " +
    "энэ тооцоолуур стандарт (60 мг/кг/өдөр) тунг үзүүлнэ.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
