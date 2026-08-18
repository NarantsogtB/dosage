import type { Drug } from "../../domain/drug";

/**
 * Mebendazole — Мебендазол
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

export const mebendazole: Drug = {
  id: "mebendazole",
  inn: "Mebendazole",
  innMn: "Мебендазол",
  category: "antiparasitic",
  rules: [
    {
      id: "mebendazole-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 24,
      basis: {
        kind: "weight_band",
        bands: [
          {
            minWeightKg: 0,
            doseMg: 100
          }
        ]
      },
      frequency: "bd",
      duration: {
        minDays: 3,
        maxDays: 3
      },
      caps: [],
      sources: [],
      evidenceLevel: "E_unverified",
      isDefault: true
    }
  ],
  formulations: [
    {
      kind: "solid",
      id: "100mg-0",
      labelMn: "100mg таблет",
      mgPerUnit: 100,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "liquid",
      id: "100mg-5ml-1",
      labelMn: "100mg/5ml уусмал",
      mgPerMl: 20
    }
  ],
  warnings: [],
  contraindicationsMn: [],
  notesMn: "Жингээс үл хамаарсан тогтмол тун. 3 хоногийн курс. Enterobius-д: нэг тун 100мг, 2 долоо хоногийн дараа давтана.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
