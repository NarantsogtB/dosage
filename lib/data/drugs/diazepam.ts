import type { Drug } from "../../domain/drug";
import type { DosingRule } from "../../domain/dosing-rule";

/**
 * Diazepam — Диазепам
 *
 * ⚠️ 2026-08-20: MSF-ийн "DIAZEPAM oral" хуудас ЗӨВХӨН насанд хүрэгчийн
 * тунтай (child мөр байхгүй) — RCH-ийн одоогийн "Acute asthma"-тай адил
 * олон эх сурвалж хүүхдийн ЭНГИЙН уух диазепамыг баримтжуулдаггүй.
 * Харин Perth Children's Hospital-ийн Эмийн менежментийн гарын авлага
 * (2026-01 хянасан, 2026-03 батлагдсан) заалт тус бүрээр нарийн тунтай
 * — "Muscle spasms" заалтын дагуу энэ дүрмийг шинэчлэв.
 * ✅ 2026-11-04: хоёр дахь эх сурвалж — WHO Formulary for Children 2010
 * (p. 285, булчингийн татталт/түгшүүр): амаар 0.05–0.3 мг/кг/тун 8–12 цаг
 * тутам. Одоогийн 0.1 мг/кг × 3 мужид багтана. Known-gap-аас хасав.
 * ✅ 2026-11-04 (Шат 7b): эмч баталсан — таталт: IV/IO 0.3 мг/кг (дээд 10 мг),
 * шулуун гэдсээр 0.5 мг/кг (<12 нас дээд 10 мг, ≥12 нас дээд 20 мг). MSF 2024
 * + WHO Pocket Book 2013. `/emergency`-д харагдана.
 */

const MSF_SEIZURE = {
  sourceId: "msf-paediatric-care-2024",
  locator: "Seizures — Management of convulsive seizures, p. 235",
  quotedValue:
    "rectal (PR) diazepam 0.5 mg/kg (< 12 years: max. 10 mg/dose; ≥ 12 years: max. 20 mg/dose). " +
    "– IV/IO access: diazepam IV 0.3 mg/kg (max. 10 mg/dose).",
} as const;

const WHO_SEIZURE = {
  sourceId: "who-pocketbook-2",
  locator: "Drug dosages quick reference (front matter) — Diazepam, convulsions",
  quotedValue: "Diazepam (for convulsions): Rectal: 0.5 mg/kg, IV: 0.2–0.3 mg/kg (p. 15)",
} as const;

const SEIZURE = { code: "status_epilepticus", labelMn: "Таталт" } as const;

const seizureRule = (
  id: string,
  route: "iv_io" | "pr",
  mgPerKg: number,
  ages: { readonly min: number; readonly max?: number; readonly capMg: number },
) => ({
  id,
  indication: SEIZURE,
  route,
  ageMinMonths: ages.min,
  ageMaxMonths: ages.max,
  basis: { kind: "per_kg_per_dose", minMgPerKg: mgPerKg, maxMgPerKg: mgPerKg },
  frequency: "stat",
  caps: [{ kind: "absolute", scope: "per_dose", maxMg: ages.capMg }],
  sources: [MSF_SEIZURE, WHO_SEIZURE],
  evidenceLevel: "C_international",
  conflictNote: "WHO Pocket Book 2013 — IV 0.2–0.3 мг/кг; эмч MSF 2024-ийн 0.3 мг/кг-ийг баталсан.",
} as const satisfies DosingRule);

export const diazepam: Drug = {
  id: "diazepam",
  inn: "Diazepam",
  innMn: "Диазепам",
  category: "cns",
  rules: [
    {
      id: "diazepam-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 1,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 0.1,
        maxMgPerKg: 0.1
      },
      frequency: "tds",
      caps: [
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 15
        }
      ],
      sources: [
        {
          sourceId: "pch-medication-manual",
          locator: "Dosage & Dosage Adjustments — Muscle spasms, Oral (2026-01 хянасан)",
          quotedValue: "4 weeks to 12 years: Initially 0.1 mg/kg/dose up to 3 times daily. Adjust dose to response. Usual maximum 15 mg daily."
        },
        {
          sourceId: "who-formulary-children-2010",
          locator: "Diazepam — Muscle spasm and anxiety, oral, p. 285",
          quotedValue: "Oral: Child all ages 0.05–0.3 mg/kg/dose 8–12 hourly."
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote: "PCH: тунг хариу урвалаар тохируулна, ердийн дээд 15 мг/өдөр."
    },
    seizureRule("diazepam-seizure-iv", "iv_io", 0.3, { min: 1, capMg: 10 }),
    seizureRule("diazepam-seizure-pr-under-12", "pr", 0.5, { min: 1, max: 143, capMg: 10 }),
    seizureRule("diazepam-seizure-pr-12-plus", "pr", 0.5, { min: 144, capMg: 20 }),
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
      id: "2mg-1",
      labelMn: "2mg таблет",
      mgPerUnit: 2,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "5mg-2",
      labelMn: "5mg таблет",
      mgPerUnit: 5,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "10mg-3",
      labelMn: "10mg таблет",
      mgPerUnit: 10,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Амьсгал боогдуулах аюул — тун хэтрүүлэхэд амьсгалын дарангуйлал."
    },
    {
      level: "warn",
      messageMn: "Хамааралт байдал (dependence) үүсэх эрсдэлтэй тул урт хугацааны хэрэглэлт хориглоно."
    },
    {
      level: "warn",
      messageMn: "Машин жолоодох, аюултай үйл ажиллагаанаас зайлсхийх."
    }
  ],
  contraindicationsMn: [],
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
