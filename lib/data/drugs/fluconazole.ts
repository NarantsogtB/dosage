import type { Drug } from "../../domain/drug";

/**
 * Fluconazole — Флуконазол
 *
 * ✅ БАТАЛГААЖСАН (2026-10-30) — WHO Model Formulary for Children (2010) + MSF:
 * кандидоз/системийн микоз 3–6 мг/кг өдөрт 1 удаа, дээд 200 мг. ⚠️ ТУН
 * ӨӨРЧЛӨГДСӨН: өмнө 3–12 мг/кг, дээд 400 мг (олон заалтын нийлбэр). Криптококк
 * менингит тусдаа заалт — хараахан ороогүй. Эмчийн шийдвэр (conflictNote).
 *
 * Үлдсэн: lastReviewed/reviewedBy (эмчийн хяналт), contraindicationsMn,
 * availableInMn.
 *
 * 💉 2026-11-10: Монголд худалдаалагддаг тарилгын бэлдмэл emonos.mn-ээс
 * (эмчийн шийдвэр — бэлдмэлийн эх сурвалж): «Проканазол 100мл /Флуконазол 0.2%/» → 2 мг/мл IV.
 */

export const fluconazole: Drug = {
  id: "fluconazole",
  inn: "Fluconazole",
  innMn: "Флуконазол",
  category: "antifungal",
  rules: [
    {
      id: "fluconazole-general",
      indication: "general",
      route: "oral_iv",
      ageMinMonths: 6,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 3,
        maxMgPerKg: 6
      },
      frequency: "od",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 200
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
          locator: "6.3 Antifungal medicines — Fluconazole, Systemic mycoses, p. 139",
          quotedValue: "Child over 2 years 3–6 mg/kg (maximum 200 mg) daily for at least 6 months."
        },
        {
          sourceId: "msf-essential-drugs",
          locator: "FLUCONAZOLE oral — Oesophageal/oropharyngeal candidiasis (2023-09)",
          quotedValue: "Child 1 month and over: 3 to 6 mg/kg (max. 200 mg) once daily"
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote: "Эмчийн шийдвэр (2026-10-30): ЭМЯ-ны хүүхдийн удирдамж байхгүй тул ДЭМБ-ын утгыг сонгов. Өмнө нь 3–12 мг/кг, дээд 400 мг (олон заалтын нийлбэр). Одоо кандидоз/системийн микоз 3–6 мг/кг (дээд 200). Криптококк менингит (6–12 мг/кг, дээд 800) — тусдаа заалт, тооцоолуурт хараахан ороогүй."
    }
  ],
  formulations: [
    {
      kind: "liquid",
      id: "2mg-ml-iv",
      labelMn: "2 мг/мл (0.2%) 100 мл судсаар дусаах уусмал",
      mgPerMl: 2,
      routes: ["iv"],
      availableInMn: true
    },
    {
      kind: "liquid",
      id: "50mg-5ml-0",
      labelMn: "50mg/5ml уусмал",
      mgPerMl: 10
    },
    {
      kind: "solid",
      id: "50mg-1",
      labelMn: "50mg таблет",
      mgPerUnit: 50,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "150mg-2",
      labelMn: "150mg таблет",
      mgPerUnit: 150,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "200mg-3",
      labelMn: "200mg таблет",
      mgPerUnit: 200,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Элэгний гэмтлийн эрсдэл — урт курст элэгний шинжилгээ хянах."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Кандидоз, системийн микоз: 3–6 мг/кг (дээд 200 мг). Криптококк менингит (6–12 мг/кг, дээд 800 мг) — тусдаа горим, энэ тооцоолол хамаарахгүй.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
