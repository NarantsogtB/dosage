import type { Drug } from "../../domain/drug";

/**
 * Omeprazole — Омепразол (гастроэзофагийн рефлюкс)
 *
 * MSF Essential drugs (OMEPRAZOLE oral) нь ЖИНГИЙН МУЖААР ялгаатай хоёр
 * төрлийн тунгийн схем өгдөг тул хоёр дүрэгт хуваав:
 *
 * ✅ <5кг (голдуу нярай): БАТАЛГААЖСАН, 2 эх сурвалж — MSF (0.7–1.4 мг/кг,
 * дээд 2.8 мг/кг/өдөр) + Queensland Clinical Guidelines Neonatal
 * monograph (эхлэх 1 мг/кг/өдөр → titration → дээд 2.5 мг/кг/өдөр).
 * Хэмжээгээрээ нийцдэг (1–2.8 мг/кг мужид багтана).
 *
 * ✅ ≥5кг (2026-11-04): MSF-ийн тогтмол мг тунгийн хүснэгт (5–10кг→5мг,
 * 10–20кг→10мг, ≥20кг→20мг, өдөрт 1 удаа) + WHO Formulary 2010 (p. 363:
 * 1 сар–2 нас 0.7 мг/кг → 3 мг/кг хүртэл, 2–12 нас 1 мг/кг 1–2 удаа).
 * MSF-ийн мужууд ≈0.5–1 мг/кг — WHO-гийн мужийн доод хэсэгт нийцнэ.
 * Known-gap-аас хасав.
 * ⚠️ Энэ мужид <5кг-ийн 0.7–1.4мг/кг томьёог ШУУД сунгаж болохгүй —
 * MSF-ийн өөрийнх нь тогтмол тун (жишээ 15кг→10мг ≈ 0.67мг/кг) нь
 * <5кг-ийн мг/кг-аас багасдаг тул томьёогоор сунгавал МСФ-ийн зөвлөснөөс
 * илүү тун гарна (жишээ: 15кг × 1мг/кг=15мг > MSF-ийн зөвшөөрсөн 10мг).
 */

export const omeprazole: Drug = {
  id: "omeprazole",
  inn: "Omeprazole",
  innMn: "Омепразол",
  category: "gi",
  rules: [
    {
      id: "omeprazole-weightband",
      indication: "general",
      route: "oral",
      ageMinMonths: 0,
      weightMinKg: 5,
      basis: {
        kind: "weight_band",
        bands: [
          {
            minWeightKg: 5,
            maxWeightKg: 10,
            doseMg: 5
          },
          {
            minWeightKg: 10,
            maxWeightKg: 20,
            doseMg: 10
          },
          {
            minWeightKg: 20,
            doseMg: 20
          }
        ]
      },
      frequency: "od",
      caps: [],
      sources: [
        {
          sourceId: "msf-essential-drugs",
          locator: "OMEPRAZOLE oral — Dosage, Gastro-oesophageal reflux",
          quotedValue: "Child 5 to 10 kg: 5 mg once daily in the morning. Child 10 to 20 kg: 10 mg once daily in the morning. Child over 20 kg and adult: 20 mg once daily in the morning."
        },
        {
          sourceId: "who-formulary-children-2010",
          locator: "17.1 Omeprazole — Dose, p. 363",
          quotedValue: "Infant or Child 1 month–2 years 700 micrograms/kg once daily, increased if necessary to 3 mg/kg (maximum 20 mg) once daily; 2–12 years 1 mg/kg once or twice daily (maximum 40 mg/day)."
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote:
        "⚠️ ГАНЦ эх сурвалж (MSF). Хоёр дахь бие даасан эх сурвалж " +
        "(жишээ нь BNFC, AMH Children's Dosing Companion) хараахан " +
        "олдоогүй — known-gaps.ts-г үз."
    },
    {
      id: "omeprazole-infant",
      indication: "general",
      route: "oral",
      ageMinMonths: 0,
      weightMaxKg: 5,
      basis: {
        kind: "per_kg_per_day",
        minMgPerKg: 0.7,
        maxMgPerKg: 1.4
      },
      frequency: "od",
      caps: [
        {
          kind: "per_kg",
          scope: "per_day",
          maxMgPerKg: 2.8
        }
      ],
      sources: [
        {
          sourceId: "msf-essential-drugs",
          locator: "OMEPRAZOLE oral — Dosage, Gastro-oesophageal reflux",
          quotedValue: "Child under 5 kg: 0.7 to 1.4 mg/kg (max. 2.8 mg/kg daily) once daily in the morning"
        },
        {
          sourceId: "qcg-neonatal-omeprazole",
          locator: "Oral — Dosage (V1, хүчинтэй 2023-06-13)",
          quotedValue: "Initial dose: 1 mg/kg once daily (or divide into equal doses twice daily). After 7–14 days of treatment, review clinical response. If required, increase by 0.5 mg/kg per day. Maximum dose of 2.5 mg/kg once daily."
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote:
        "QCG-ийн заавар нярайд (Neonatal monograph) зориулагдсан " +
        "titration схем боловч хэмжээгээрээ MSF-ийн <5кг бүлгийн 0.7–1.4 " +
        "мг/кг (дээд 2.8 мг/кг) мужтай нийцдэг тул бие даасан хоёр дахь " +
        "баталгаажуулалт болно."
    }
  ],
  formulations: [
    {
      kind: "solid",
      id: "10mg-0",
      labelMn: "10mg капсул",
      mgPerUnit: 10,
      unitMn: "капсул",
      divisible: false
    },
    {
      kind: "solid",
      id: "20mg-1",
      labelMn: "20mg капсул",
      mgPerUnit: 20,
      unitMn: "капсул",
      divisible: false
    },
    {
      kind: "solid",
      id: "40mg-2",
      labelMn: "40mg капсул",
      mgPerUnit: 40,
      unitMn: "капсул",
      divisible: false
    }
  ],
  warnings: [],
  contraindicationsMn: [],
  notesMn:
    "Өглөө, хоолны 30–60 минутын өмнө уух. Капсулыг нээж болохгүй — " +
    "10мг disperse таблетыг усанд уусгаж хэрэглэнэ. ГЭРБ-ийн богино " +
    "хугацааны эмчилгээ 3 хоног, урт хугацааны 4–8 долоо хоног (MSF).",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
