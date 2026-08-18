import type { Drug } from "../../domain/drug";

/**
 * Albendazole — Албендазол
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

export const albendazole: Drug = {
  id: "albendazole",
  inn: "Albendazole",
  innMn: "Албендазол",
  category: "antiparasitic",
  rules: [
    {
      id: "albendazole-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 24,
      basis: {
        kind: "weight_band",
        bands: [
          {
            minWeightKg: 0,
            maxWeightKg: 20,
            doseMg: 200
          },
          {
            minWeightKg: 20,
            doseMg: 400
          }
        ]
      },
      frequency: "od",
      duration: {
        minDays: 1,
        maxDays: 1
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
      id: "200mg-0",
      labelMn: "200mg таблет",
      mgPerUnit: 200,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "400mg-1",
      labelMn: "400mg таблет",
      mgPerUnit: 400,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [],
  contraindicationsMn: [],
  notesMn: "Нэг удаагийн тун. Хоолтой хамт эсвэл дараа уух. Эхийн хэвлийд: хэрэглэхгүй.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
