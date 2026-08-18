import type { Drug } from "../../domain/drug";

/**
 * Rifampicin — Рифампицин
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

export const rifampicin: Drug = {
  id: "rifampicin",
  inn: "Rifampicin",
  innMn: "Рифампицин",
  category: "antitb",
  rules: [
    {
      id: "rifampicin-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 0,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 10,
        maxMgPerKg: 20
      },
      frequency: "od",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 600
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 600
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
      id: "100mg-5ml-0",
      labelMn: "100mg/5ml уусмал",
      mgPerMl: 20
    },
    {
      kind: "solid",
      id: "150mg-1",
      labelMn: "150mg капсул",
      mgPerUnit: 150,
      unitMn: "капсул",
      divisible: false
    },
    {
      kind: "solid",
      id: "300mg-2",
      labelMn: "300mg капсул",
      mgPerUnit: 300,
      unitMn: "капсул",
      divisible: false
    },
    {
      kind: "solid",
      id: "450mg-3",
      labelMn: "450mg капсул",
      mgPerUnit: 450,
      unitMn: "капсул",
      divisible: false
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Шилжилтийн эм — олон тооны эмийн солилцоонд нөлөөлнө (CYP450 индуктор)."
    },
    {
      level: "warn",
      messageMn: "Шээс, нулимс, шүлсийг улаан-улбар өнгөтэй болгоно — хэвийн үзэгдэл."
    },
    {
      level: "warn",
      messageMn: "Элэгний гэмтлийн эрсдэлтэй — элэгний шинжилгээ хянах."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Хоолноос 30 минутын өмнө буюу хоолны 2 цагийн дараа уух. Исониазидтэй хамт уух.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
