import type { Drug } from "../../domain/drug";

/**
 * Zinc sulfate — Цайрын сульфат
 *
 * ✅ БАТАЛГААЖСАН — WHO 2024.
 *
 * ⚠️ ТУН ЭРС ӨӨРЧЛӨГДСӨН: өмнөх 1–2 мг/кг (дээд 20 мг) → тогтмол 5 мг.
 * WHO 2024 нь 20 мг-тай харьцуулахад 5 мг нь ижил үр дүнтэй, бөөлжилт
 * 29% бага (RR 0.71) гэж тогтоосон.
 */

export const zincSulfate: Drug = {
  id: "zinc-sulfate",
  inn: "Zinc sulfate (элементар цайр)",
  innMn: "Цайрын сульфат",
  category: "vitamin",
  rules: [
    {
      id: "zinc-diarrhoea",
      indication: {
        code: "diarrhoea",
        labelMn: "Суулгалт (10 хүртэлх нас)"
      },
      route: "oral",
      ageMinMonths: 0,
      ageMaxMonths: 120,
      basis: {
        kind: "fixed",
        minMg: 5,
        maxMg: 5
      },
      frequency: "od",
      duration: {
        minDays: 10,
        maxDays: 14
      },
      caps: [],
      sources: [
        {
          sourceId: "who-pneumonia-diarrhoea-2024",
          locator: "Recommendation 3c",
          quotedValue: "WHO suggests a 5 mg dose of oral zinc (Conditional, Low certainty)"
        },
        {
          sourceId: "who-pneumonia-diarrhoea-2024",
          locator: "Recommendation 3c, Remarks — duration",
          quotedValue: "For the duration of treatment, refer to existing recommendations (10–14 days)"
        }
      ],
      evidenceLevel: "B_who",
      isDefault: true,
      conflictNote: "⚠️ ТУН БУУРСАН. Өмнөх WHO зөвлөмж 20 мг байсан. 2024 оны заавар 5 мг санал болгож байна — бөөлжилт 29% бага (RR 0.71), үр дүн ижил. Элементар цайраар тооцно."
    }
  ],
  formulations: [
    {
      kind: "liquid",
      id: "10mg-5ml-0",
      labelMn: "10mg/5ml уусмал (элементар)",
      mgPerMl: 2
    },
    {
      kind: "solid",
      id: "10mg-1",
      labelMn: "10mg таблет (элементар)",
      mgPerUnit: 10,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "20mg-2",
      labelMn: "20mg таблет (элементар)",
      mgPerUnit: 20,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "info",
      messageMn: "Цайрын глюконат хэлбэр нь бөөлжилт багатай гэж WHO тэмдэглэсэн."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Элементар цайраар тооцно. Цочмог болон удаан үргэлжилсэн суулгалт хоёуланд.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
