import type { Drug } from "../../domain/drug";

/**
 * Ciprofloxacin — Ципрофлоксацин
 *
 * ✅ Цусан суулгын дүрэм БАТАЛГААЖСАН — WHO 2024 (1-р эгнээ).
 * ✅ Ерөнхий дүрэм БАТАЛГААЖСАН (2026-10-30) — WHO AWaRe (2022) + MSF: 15 мг/кг
 *    өдөрт 2 удаа, дээд 500 мг/тун, 1 сараас. ⚠️ ТУН ӨӨРЧЛӨГДСӨН: өмнө 10–15
 *    мг/кг, 12 сараас. Эмчийн шийдвэр — ДЭМБ (conflictNote).
 */

export const ciprofloxacin: Drug = {
  id: "ciprofloxacin",
  inn: "Ciprofloxacin",
  innMn: "Ципрофлоксацин",
  category: "antibiotic",
  rules: [
    {
      id: "ciprofloxacin-dysentery",
      indication: {
        code: "dysentery",
        labelMn: "Цусан суулга (баасанд цус)"
      },
      route: "oral",
      ageMinMonths: 0,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 15,
        maxMgPerKg: 15
      },
      conflictNote: "⚠️ НАСНЫ ХЯЗГААР ӨӨРЧЛӨГДСӨН. MVP-д 12 сараас доош хориотой байсан. WHO 2024 нь суулгалтын зааврыг \"children up to 10 years\" гэж тодорхойлсон бөгөөд доод насны хязгаарыг тухайлан заагаагүй. Хүүхдийн эмчээр баталгаажуулах шаардлагатай.",
      frequency: "bd",
      duration: {
        minDays: 3,
        maxDays: 3
      },
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 500
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 1000
        }
      ],
      sources: [
        {
          sourceId: "who-pneumonia-diarrhoea-2024",
          locator: "Diarrhoea — antibiotics, Remarks",
          quotedValue: "first line: Ciprofloxacin: 15 mg/kg per dose twice daily for three days"
        },
        {
          sourceId: "who-imci-chartbook-2014",
          locator: "Give an Appropriate Oral Antibiotic — FOR DYSENTERY",
          quotedValue: "Give 15mg/kg two times daily for 3 days"
        }
      ],
      evidenceLevel: "B_who"
    },
    {
      id: "ciprofloxacin-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 1,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 15,
        maxMgPerKg: 15
      },
      frequency: "bd",
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
          sourceId: "who-aware-2022",
          locator: "Ch. 50 Dosing guidance – Children, Table 50.1, p. 646 (PDF p. 662)",
          quotedValue: "Oral: 15 mg/kg/dose given every 12 hours ... Up to a maximum daily dose of 1.5 g (oral)"
        },
        {
          sourceId: "msf-essential-drugs",
          locator: "CIPROFLOXACIN oral — Shigellosis, uncomplicated cutaneous anthrax (2023-09)",
          quotedValue: "Child 1 month and over: 15 mg/kg (max. 500 mg) 2 times daily"
        }
      ],
      evidenceLevel: "B_who",
      isDefault: true,
      conflictNote: "Эмчийн шийдвэр (2026-10-30): ЭМЯ-ны хүүхдийн удирдамж байхгүй тул ДЭМБ-ын утгыг сонгов. Өмнө нь 10–15 мг/кг, 12 сараас. Насны доод хязгаар 1 сар (MSF); AWaRe нас заагаагүй."
    }
  ],
  formulations: [
    {
      kind: "solid",
      id: "250mg-0",
      labelMn: "250mg таблет",
      mgPerUnit: 250,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "500mg-1",
      labelMn: "500mg таблет",
      mgPerUnit: 500,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Цочмог усархаг суулгалтад антибиотик хэрэглэхийг WHO зөвлөдөггүй — зөвхөн баасанд цус илэрвэл."
    },
    {
      level: "warn",
      messageMn: "Нярай болон бага насны хүүхдэд фторхинолон хэрэглэх нь тусгай анхаарал шаардана. Цусан суулгын заалтын насны хязгаар хянагдаж байна."
    }
  ],
  contraindicationsMn: [],
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
