import type { Drug } from "../../domain/drug";

/**
 * Rifampicin — Рифампицин
 *
 * ✅ БАТАЛГААЖСАН (2026-10-30) — WHO TB Module 5 (2022, хавсралт) + WHO
 * Model Formulary for Children (2010): 15 мг/кг (10–20) өдөрт 1 удаа, дээд
 * 600 мг — тохирч байна. Тун өөрчлөгдөөгүй.
 *
 * Тэмдэглэл: сүрьеэгийн менингитын богино эрчимтэй горимд 22.5–30 мг/кг
 * (TB 2022) — энд хамаарахгүй.
 *
 * Үлдсэн: lastReviewed/reviewedBy (эмчийн хяналт), contraindicationsMn,
 * availableInMn.
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
      sources: [
        {
          sourceId: "who-tb-module5-2022",
          locator: "Annex — recommendations carried over, p. 111 (PDF)",
          quotedValue: "Rifampicin (R) 15 mg/kg (range 10–20 mg/kg);maximum dose 600 mg/day"
        },
        {
          sourceId: "who-formulary-children-2010",
          locator: "6.2 Antibacterials — Rifampicin, Dose, p. 127",
          quotedValue: "Infant or Child 15 mg/kg (range 10–20 mg) once daily. Maximum 600 mg daily."
        }
      ],
      evidenceLevel: "B_who",
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
