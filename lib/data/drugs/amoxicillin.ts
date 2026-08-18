import type { Drug } from "../../domain/drug";

/**
 * Amoxicillin — Амоксициллин
 *
 * ✅ Уушгины хатгааны дүрэм БАТАЛГААЖСАН — WHO 2024.
 * ⚠️ Ерөнхий дүрэм ХАРААХАН БАТАЛГААЖААГҮЙ.
 *
 * WHO 2024: "at least 40 mg/kg per dose twice daily (80 mg/kg per day)
 * for five days". Энэ нь ДАВТАМЖААР ялгаатай — өдөрт 2 удаа, 3 биш.
 */

export const amoxicillin: Drug = {
  id: "amoxicillin",
  inn: "Amoxicillin",
  innMn: "Амоксициллин",
  category: "antibiotic",
  rules: [
    {
      id: "amoxicillin-pneumonia",
      indication: {
        code: "pneumonia",
        labelMn: "Уушгины хатгаа (2–59 сар)"
      },
      route: "oral",
      ageMinMonths: 2,
      ageMaxMonths: 59,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 40,
        maxMgPerKg: 40
      },
      frequency: "bd",
      duration: {
        minDays: 3,
        maxDays: 5
      },
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 1000
        }
      ],
      sources: [
        {
          sourceId: "who-pneumonia-diarrhoea-2024",
          locator: "Recommendation 1 & 2a, Remarks",
          quotedValue: "at least 40 mg/kg per dose twice daily (80 mg/kg per day) for five days"
        },
        {
          sourceId: "who-imci-chartbook-2014",
          locator: "Give an Appropriate Oral Antibiotic — FOR PNEUMONIA, ACUTE EAR INFECTION",
          quotedValue: "Oral Amoxicillin — Give two times daily for 5 days; 4–<10 kg: 5 ml of 250mg/5ml; 10–<14 kg: 10 ml; 14–19 kg: 15 ml"
        }
      ],
      evidenceLevel: "B_who",
      isDefault: false,
      conflictNote: "Зөвхөн хурдан амьсгал бол 3 хоног (ХДХВ бага тархалттай бүсэд), цээж хонхойвол 5 хоног."
    },
    {
      id: "amoxicillin-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 0,
      basis: {
        kind: "per_kg_per_day",
        minMgPerKg: 40,
        maxMgPerKg: 90
      },
      frequency: "tds",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 1000
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 3000
        }
      ],
      sources: [],
      evidenceLevel: "E_unverified",
      isDefault: true,
      conflictNote: "⚠️ Эх сурвалжгүй. Уушгины хатгааны заалт сонговол WHO 2024-ийн дагуу өдөрт 2 удаа болно."
    }
  ],
  formulations: [
    {
      kind: "liquid",
      id: "125mg-5ml-0",
      labelMn: "125mg/5ml уусмал",
      mgPerMl: 25
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
      labelMn: "500mg капсул/таблет",
      mgPerUnit: 500,
      unitMn: "капсул",
      divisible: false
    }
  ],
  warnings: [],
  contraindicationsMn: [],
  notesMn: "Ердийн халдвар: 40–45 мг/кг/өдөр; уушгины хатгаа (WHO 2024): 40 мг/кг нэг удаагийн тун, өдөрт 2 удаа.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
