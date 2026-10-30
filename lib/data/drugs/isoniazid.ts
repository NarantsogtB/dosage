import type { Drug } from "../../domain/drug";

/**
 * Isoniazid — Изониазид
 *
 * ✅ БАТАЛГААЖСАН (2026-10-30) — WHO TB Module 5 (2022, хавсралт) + WHO
 * Model Formulary for Children (2010): 10 мг/кг өдөрт 1 удаа, дээд 300 мг —
 * тохирч байна. Тун өөрчлөгдөөгүй.
 *
 * Тэмдэглэл: эх сурвалжууд муж өгдөг (2022: 7–15, 2010: 10–15 мг/кг; бага
 * насанд дээд тал). Энд дунд утга 10 мг/кг. Формуляр «3 сараас дээш» гэсэн,
 * TB 2022 бүх хүүхдэд — насны доод 0 хэвээр.
 *
 * Үлдсэн: lastReviewed/reviewedBy (эмчийн хяналт), contraindicationsMn,
 * availableInMn.
 */

export const isoniazid: Drug = {
  id: "isoniazid",
  inn: "Isoniazid",
  innMn: "Изониазид",
  category: "antitb",
  rules: [
    {
      id: "isoniazid-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 0,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 10,
        maxMgPerKg: 10
      },
      frequency: "od",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 300
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 300
        }
      ],
      sources: [
        {
          sourceId: "who-tb-module5-2022",
          locator: "Annex — recommendations carried over, p. 111 (PDF)",
          quotedValue: "Isoniazid (H) 10 mg/kg (range 7–15 mg/kg);maximum dose 300 mg/day"
        },
        {
          sourceId: "who-formulary-children-2010",
          locator: "6.2 Antibacterials — Isoniazid, Dose, p. 125",
          quotedValue: "Infant or Child greater than 3 months 10 mg/kg (range 10–15 mg/kg) once daily (maximum 300 mg daily)."
        }
      ],
      evidenceLevel: "B_who",
      isDefault: true
    }
  ],
  formulations: [
    {
      kind: "liquid",
      id: "50mg-5ml-0",
      labelMn: "50mg/5ml уусмал",
      mgPerMl: 10
    },
    {
      kind: "solid",
      id: "100mg-1",
      labelMn: "100mg таблет",
      mgPerUnit: 100,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "300mg-2",
      labelMn: "300mg таблет",
      mgPerUnit: 300,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Элэгний гэмтлийн эрсдэл — элэгний шинжилгээг үе үе хянах."
    },
    {
      level: "warn",
      messageMn: "Захын мэдрэлийн үрэвслээс сэргийлэх зорилгоор B6 витамин (пиридоксин) хамт хэрэглэх."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Rifampicin-тэй хамт хэрэглэх нь стандарт горим. Хоолноос 30–60 минутын өмнө уух.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
