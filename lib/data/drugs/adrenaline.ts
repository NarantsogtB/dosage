import type { Drug } from "../../domain/drug";

/**
 * Adrenaline (epinephrine) — Адреналин
 *
 * ✅ 2026-11-04 (Шат 7b): эмч баталсан — зүрх зогсолт IV/IO 10 мкг/кг (дээд
 * 1 мг); анафилакси IM 0.01 мг/кг (дээд 0.3 мг, <12 нас, MSF). Infusion
 * (мкг/кг/мин) энд ОРООГҮЙ.
 *
 * 🔧 2026-11-10 (эмчийн засвар): Монголд зөвхөн 1 мг/мл (1:1000) ампул
 * зарагддаг (эмчийн мэдээлэл) — эхний бэлдмэл болгож IV/IO замыг нэмэв,
 * тиймээс /emergency дээр 1 мг/мл-ээр (жишээ 40 кг → 0.4 мл) харагдана.
 * 0.1 мг/мл (1:10 000)-ийг шингэлсэн хэлбэрээр үлдээв.
 */

const RCH_RESUSCITATION = {
  sourceId: "rch-melbourne-resuscitation",
  locator: "Resuscitation — Drugs (Last updated December 2025)",
  quotedValue: "Adrenaline (1:10,000) 10 microg/kg = 0.1 mL/kg IV/IM/intraosseous (max 1 mg)",
} as const;

export const adrenaline: Drug = {
  id: "adrenaline",
  inn: "Adrenaline",
  innMn: "Адреналин",
  category: "emergency",
  rules: [
    {
      id: "adrenaline-cardiac-arrest",
      indication: { code: "cardiac_arrest", labelMn: "Зүрх зогсолт" },
      route: "iv_io",
      ageMinMonths: 1,
      doseUnit: "mcg",
      basis: { kind: "per_kg_per_dose", minMgPerKg: 10, maxMgPerKg: 10 },
      frequency: "stat",
      caps: [{ kind: "absolute", scope: "per_dose", maxMg: 1000 }],
      sources: [
        {
          sourceId: "msf-paediatric-care-2024",
          locator: "Cardiopulmonary resuscitation — Advanced life support, p. 34",
          quotedValue: "Administer epinephrine IV/IO: 10 micrograms/kg every 3 to 5 minutes",
        },
        RCH_RESUSCITATION,
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote: "3–5 минут тутам давтана (MSF). Дээд 1 мг нэг тунд (RCH).",
    },
    {
      id: "adrenaline-anaphylaxis",
      indication: { code: "anaphylaxis", labelMn: "Анафилакси" },
      route: "im",
      ageMinMonths: 1,
      ageMaxMonths: 143,
      doseUnit: "mcg",
      basis: { kind: "per_kg_per_dose", minMgPerKg: 10, maxMgPerKg: 10 },
      frequency: "stat",
      caps: [{ kind: "absolute", scope: "per_dose", maxMg: 300 }],
      sources: [
        {
          sourceId: "msf-paediatric-care-2024",
          locator: "Anaphylaxis — Management, p. 47",
          quotedValue:
            "Administer epinephrine IM: 0.01 mg/kg (1 mg/mL (1:1000) undiluted solution in 1 mL syringe) " +
            "single dose into the mid-anterolateral thigh (maximum dose of 0.3 mg for children < 12 years",
        },
        RCH_RESUSCITATION,
      ],
      evidenceLevel: "C_international",
      conflictNote:
        "Дээд хязгаар зөрүүтэй: MSF <12 насанд 0.3 мг (эмч баталсан), RCH 1 мг; " +
        "WHO Pocket Book 2013 тогтмол 0.15 мл (1:1000). Ташааны урд-гадна талд.",
    },
  ],
  formulations: [
    {
      kind: "liquid",
      id: "1mg-ml-1",
      labelMn: "1 мг/мл (1:1000) ампул",
      mgPerMl: 1,
      routes: ["iv", "io", "im"],
      availableInMn: true,
    },
    {
      kind: "liquid",
      id: "0.1mg-ml-0",
      labelMn: "0.1 мг/мл (1:10 000) — 1 мг/мл ампулыг 10 мл болгож шингэлсэн",
      mgPerMl: 0.1,
      routes: ["iv", "io"],
    },
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Концентрацыг шалга: 1 мг/мл (1:1000) ба 0.1 мг/мл (1:10 000)-ийн мл 10 дахин ялгаатай.",
    },
  ],
  contraindicationsMn: [],
  sources: [],
  lastReviewed: "2026-11-04",
  status: "active",
};
