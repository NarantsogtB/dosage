import type { Drug } from "../../domain/drug";

/**
 * Dexamethasone — Дексаметазон
 *
 * ✅ Астмын дүрэм — RCH Melbourne 0.3 мг/кг (дээд 16 мг) + MSF Clinical
 * guidelines (2023-06): 0.15–0.6 мг/кг нэг удаа (дээд 16 мг) — MSF
 * prednisolone-ыг эхний сонголт болгодог.
 *
 * ✅ Крупын дүрэм (2026-11-04) — MSF Clinical guidelines (Croup, 2024-10) +
 * RCH Croup (2024-09): 0.15–0.6 мг/кг нэг удаа. Өмнө нь «ерөнхий» заалттай
 * байсан ижил тун — эмчийн шийдвэрээр круп болгов. Тун өөрчлөгдөөгүй.
 * Дээд 16 мг (MSF); RCH хүнд крупт 12 мг — conflictNote.
 */

export const dexamethasone: Drug = {
  id: "dexamethasone",
  inn: "Dexamethasone",
  innMn: "Дексаметазон",
  category: "corticosteroid",
  rules: [
    {
      id: "dexamethasone-asthma",
      indication: {
        code: "asthma",
        labelMn: "Цочмог астма"
      },
      route: "oral",
      ageMinMonths: 12,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 0.3,
        maxMgPerKg: 0.3
      },
      frequency: "od",
      duration: {
        minDays: 1,
        maxDays: 2
      },
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 16
        }
      ],
      sources: [
        {
          sourceId: "rch-melbourne-cpg",
          locator: "Acute asthma — Oral steroid dosing (flowchart), 2023-07",
          quotedValue: "Dexamethasone 0.3 mg/kg (max 16 mg); IV preparation can be administered orally"
        },
        {
          sourceId: "rch-melbourne-cpg",
          locator: "Acute asthma — Other management considerations, 2023-07",
          quotedValue: "Dexamethasone causes less vomiting and has a longer half life"
        },
        {
          sourceId: "msf-clinical-guidelines",
          locator: "Acute asthma (asthma attack) — Severe attack (2023-06)",
          quotedValue: "If prednisolone is not available, or if the patient cannot take oral treatment, administer: Children: dexamethasone PO/IV/IM, one dose of 0.15 to 0.6 mg/kg (max. 16 mg)"
        }
      ],
      evidenceLevel: "C_international",
      isDefault: false,
      conflictNote: "2026-11-04: MSF Clinical guidelines (0.15–0.6 мг/кг, дээд 16 мг) хоёр дахь эх сурвалж — 0.3 мг/кг мужид багтана. MSF prednisolone-ыг эхний сонголт гэж үздэг."
    },
    {
      id: "dexamethasone-croup",
      indication: {
        code: "croup",
        labelMn: "Круп (ларинготрахеит)"
      },
      route: "oral",
      ageMinMonths: 0,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 0.15,
        maxMgPerKg: 0.6
      },
      frequency: "od",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 16
        }
      ],
      sources: [
        {
          sourceId: "msf-clinical-guidelines",
          locator: "Croup (laryngotracheitis and laryngotracheobronchitis) — Treatment, mild croup (2024-10)",
          quotedValue: "dexamethasone PO: 0.15 to 0.6 mg/kg (max. 16 mg) single dose"
        },
        {
          sourceId: "rch-melbourne-croup",
          locator: "Croup (laryngotracheobronchitis) — Medication (2024-09)",
          quotedValue: "Oral steroids: dexamethasone 0.15 mg/kg oral or prednisolone 1 mg/kg oral ... Dexamethasone 0.6 mg/kg (max 12 mg) PO/IM/IV"
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote: "Эмчийн шийдвэр (2026-11-04): «ерөнхий» → круп заалт, тун хэвээр. MSF: 0.15 мг/кг (эргэж ирэх боломжтой бол) эсвэл 0.6 мг/кг, дээд 16 мг. RCH: хөнгөн/дунд 0.15 мг/кг, хүнд 0.6 мг/кг (дээд 12 мг). Дээд 16 мг (MSF)-ийг үлдээв."
    }
  ],
  formulations: [
    {
      kind: "liquid",
      id: "2mg-5ml-0",
      labelMn: "2mg/5ml уусмал",
      mgPerMl: 0.4
    },
    {
      kind: "solid",
      id: "0-5mg-1",
      labelMn: "0.5mg таблет",
      mgPerUnit: 0.5,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "4mg-2",
      labelMn: "4mg таблет",
      mgPerUnit: 4,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Prednisolone-оос 6–7 дахин хүчтэй — тунд анхаарна."
    },
    {
      level: "info",
      messageMn: "Prednisolone-той харьцуулахад бөөлжилт бага, хагас задралын хугацаа урт (RCH)."
    }
  ],
  contraindicationsMn: [],
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
