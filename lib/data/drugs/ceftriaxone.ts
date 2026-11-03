import type { Drug } from "../../domain/drug";

/**
 * Ceftriaxone — Цефтриаксон
 *
 * ✅ Цусан суулгын дүрэм БАТАЛГААЖСАН — WHO 2024 (2-р эгнээ, 50–80 мг/кг) +
 *    MSF Clinical guidelines (Shigellosis) + WHO Formulary 2010. ⚠️ ДЭЭД ТУН
 *    ӨӨРЧЛӨГДСӨН (2026-11-04, эмчийн шийдвэр): 4 г → хоногт 1 г (MSF, WHO 2010).
 * ✅ Ерөнхий дүрэм БАТАЛГААЖСАН (2026-10-30) — WHO AWaRe (2022) + MSF:
 *    80–100 мг/кг өдөрт 1 удаа, дээд 3 г, 1 сараас. ⚠️ ТУН ӨӨРЧЛӨГДСӨН: өмнө
 *    50–100 мг/кг, дээд 4 г, 0 сараас. Эмчийн шийдвэр — ДЭМБ (conflictNote).
 * ⚠️ formulations хоосон — Монголын бүртгэлээс нөхөх шаардлагатай.
 */

export const ceftriaxone: Drug = {
  id: "ceftriaxone",
  inn: "Ceftriaxone",
  innMn: "Цефтриаксон",
  category: "antibiotic",
  rules: [
    {
      id: "ceftriaxone-dysentery",
      indication: {
        code: "dysentery",
        labelMn: "Цусан суулга (2-р эгнээ)"
      },
      route: "iv_im",
      ageMinMonths: 0,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 50,
        maxMgPerKg: 80
      },
      frequency: "od",
      duration: {
        minDays: 3,
        maxDays: 3
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
          locator: "Diarrhoea — antibiotics, Remarks",
          quotedValue: "second line: Ceftriaxone: 50–80 mg/kg daily for three days"
        },
        {
          sourceId: "msf-clinical-guidelines",
          locator: "Shigellosis — Antibiotherapy (хуудсанд огноо заагаагүй)",
          quotedValue: "ceftriaxone IM for 3 days Children: 50 to 100 mg/kg once daily (max. 1 g daily)"
        },
        {
          sourceId: "who-formulary-children-2010",
          locator: "Ceftriaxone — Dose (заалтад shigellosis орно), p. 89",
          quotedValue: "Infant and Child under 50 kg 50–100 mg/kg daily (maximum dose 1 g); higher dose reserved for severe infections."
        }
      ],
      evidenceLevel: "B_who",
      conflictNote: "Эмчийн шийдвэр (2026-11-04): дээд тун 4 г → хоногт 1 г (MSF Shigellosis, WHO Formulary 2010 хоёулаа «max 1 g»). 50–80 мг/кг (WHO 2024) хэвээр."
    },
    {
      id: "ceftriaxone-general",
      isDefault: true,
      indication: "general",
      route: "iv_im",
      ageMinMonths: 1,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 80,
        maxMgPerKg: 100
      },
      frequency: "od",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 3000
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 3000
        }
      ],
      sources: [
        {
          sourceId: "who-aware-2022",
          locator: "Ch. 50 Dosing guidance – Children, Table 50.1, p. 645 (PDF p. 661)",
          quotedValue: "Ceftriaxone IV/IM: Lower dose: 80 mg/kg/dose given once daily Higher dose: 100 mg/kg/dose given once daily Up to a maximum daily dose of 3 g"
        },
        {
          sourceId: "msf-essential-drugs",
          locator: "CEFTRIAXONE injectable — Dosage (2023-09)",
          quotedValue: "Child 1 month and over (< 50 kg): 50 to 100 mg/kg (max. 4 g) once daily"
        }
      ],
      evidenceLevel: "B_who",
      conflictNote: "Эмчийн шийдвэр (2026-10-30): ЭМЯ-ны хүүхдийн удирдамж байхгүй тул ДЭМБ-ын утгыг сонгов. Өмнө нь 50–100 мг/кг, дээд 4 г, 0 сараас. Дээд 3 г (ДЭМБ) vs 4 г (MSF, RCH); доод 80 (ДЭМБ) vs 50 (MSF, RCH). Нярай (<1 сар) хасагдав — MSF 1 сараас, RCH «avoid in neonates»."
    }
  ],
  formulations: [],
  warnings: [
    {
      level: "warn",
      messageMn: "Нярайд билирубин өндөр үед болон кальци агуулсан судсаар хийх уусмалтай хамт хэрэглэхийг цээрлэнэ."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Бэлдмэлийн мэдээлэл дутуу — Монголд бүртгэлтэй тунгийн хэлбэрийг druginfo.mohs.mn-ээс нөхөх.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
