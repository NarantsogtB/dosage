import type { Drug } from "../../domain/drug";

/**
 * Diazepam — Диазепам
 *
 * ⚠️ 2026-08-20: MSF-ийн "DIAZEPAM oral" хуудас ЗӨВХӨН насанд хүрэгчийн
 * тунтай (child мөр байхгүй) — RCH-ийн одоогийн "Acute asthma"-тай адил
 * олон эх сурвалж хүүхдийн ЭНГИЙН уух диазепамыг баримтжуулдаггүй.
 * Харин Perth Children's Hospital-ийн Эмийн менежментийн гарын авлага
 * (2026-01 хянасан, 2026-03 батлагдсан) заалт тус бүрээр нарийн тунтай
 * — "Muscle spasms" заалтын дагуу энэ дүрмийг шинэчлэв.
 * ⛔ ГАНЦХАН эх сурвалж (PCH) тул known-gaps.ts-д бүртгэв — хоёр дахь
 * эх сурвалж (жишээ нь AMH Children's Dosing Companion, BNFc) хараахан
 * олдоогүй тул evidenceLevel-ийг зөвшөөрөгдсөнөөр л ахиулав.
 */

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
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote:
        "⚠️ ГАНЦ эх сурвалж (Perth Children's Hospital). Хоёр дахь эх " +
        "сурвалж дутуу — MSF зөвхөн насанд хүрэгчийн уух диазепамын " +
        "тунтай, RCH-ийн одоогийн premedication заавар midazolam-ыг " +
        "илүүд үздэг тул оюутны диазепамын тун онцгойлон заагаагүй. " +
        "AMH Children's Dosing Companion эсвэл BNFc-ээс хоёр дахь эх " +
        "сурвалж хайх шаардлагатай (лиценз шаардана)."
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
  notesMn:
    "Таталтын яаралтай тусламж (тооцоолуур энд тунг ГАРГАХГҮЙ, зөвхөн " +
    "лавлагаа): PCH-ийн дагуу 4 долоо хоног–12 нас: IV/IO 0.1–0.3 мг/кг " +
    "(дээд 10 мг), аарцгаар 0.3–0.5 мг/кг (дээд 10 мг), шаардлагатай " +
    "бол 10–15 минутын дараа нэг удаа давтаж болно.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
