import type { Drug } from "../../domain/drug";

/**
 * Doxycycline — Доксициклин
 *
 * ✅ БАТАЛГААЖСАН (2026-10-30) — WHO Model Formulary for Children (2010) + MSF:
 * 2 мг/кг/тун, өдөрт 2 удаа, дээд 100 мг. ⚠️ ТУН ӨӨРЧЛӨГДСӨН: өмнө 2–4 мг/кг/хон.
 * Эмчийн шийдвэр — ДЭМБ-ыг сонгов (conflictNote).
 *
 * Үлдсэн: lastReviewed/reviewedBy (эмчийн хяналт), contraindicationsMn,
 * availableInMn.
 */

export const doxycycline: Drug = {
  id: "doxycycline",
  inn: "Doxycycline",
  innMn: "Доксициклин",
  category: "antibiotic",
  rules: [
    {
      id: "doxycycline-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 96,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 2,
        maxMgPerKg: 2
      },
      frequency: "bd",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 100
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 200
        }
      ],
      sources: [
        {
          sourceId: "who-formulary-children-2010",
          locator: "6.2 Antibacterials — Doxycycline, Dose, p. 104",
          quotedValue: "Child over 8 years 2 mg/kg (maximum 100 mg) twice daily on day 1, then 2 mg/kg (maximum 100 mg) daily, or twice daily in severe infections such as rickettsia. Maximum daily dose 200 mg."
        },
        {
          sourceId: "msf-essential-drugs",
          locator: "DOXYCYCLINE oral — Other indications (2023-09)",
          quotedValue: "Child under 45 kg: 2 to 2.2 mg/kg (max. 100 mg) 2 times daily"
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote: "Эмчийн шийдвэр (2026-10-30): ЭМЯ-ны хүүхдийн удирдамж байхгүй тул ДЭМБ-ын утгыг сонгов. Өмнө нь 2–4 мг/кг/хон (1–2 мг/кг/тун). ДЭМБ-ын 2 мг/кг/тун × 2 (хүнд халдварт); MSF 2–2.2."
    }
  ],
  formulations: [
    {
      kind: "solid",
      id: "50mg-0",
      labelMn: "50mg таблет",
      mgPerUnit: 50,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "100mg-1",
      labelMn: "100mg таблет",
      mgPerUnit: 100,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "8 наснаас доош хүүхдэд ХОРИГЛОНО — шүдний өнгийн өөрчлөлт, ясны хөгжлийн саатал."
    },
    {
      level: "warn",
      messageMn: "Нарны гэрэлд мэдрэмтгий болдог — гэрлийн хамгаалалт хэрэглэх."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Хоолтой хамт, их хэмжээний усаар уух. Антацид, цайр, кальцийн эмтэй зэрэг уухгүй.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
