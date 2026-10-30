import type { Drug } from "../../domain/drug";

/**
 * Furosemide — Фуросемид
 *
 * ⚠️ ЭХ СУРВАЛЖ БАТАЛГААЖААГҮЙ (evidenceLevel: "E_unverified").
 * ⚠️ ТУН ӨӨРЧЛӨГДСӨН (2026-10-30, эмчийн шийдвэр): WHO Model Formulary for
 * Children 2010-ийн утгаар засав — conflictNote. 2020+ хоёр дахь эх сурвалж
 * олдоогүй тул E хэвээр.
 * MVP-ийн lib/drugs.ts-ээс автоматаар хөрвүүлсэн. Тунгийн утга нь
 * анхны хувилбартай ЯГ ИЖИЛ — өөрчлөөгүй.
 *
 * ⚠️ 2026-08-20: Баталгаажуулах гэж MSF Essential drugs (зөвхөн "Adult:"
 * тун өгсөн, хүүхдийн мөр байхгүй), RCH Paediatric Injectable Guidelines
 * (тун биш зөвхөн IV дилюци/хурдны заавар өгсөн), RCH nephrology хуудас
 * (жор биш, эцэг эхэд зориулсан видео) — эдгээрийг шалгасан боловч ЕРӨНХИЙ
 * (нярай бус) хүүхдийн mg/kg тунг АЛЬ НЬ Ч өгөхгүй байна.
 * Queensland Clinical Guidelines-ийн "Furosemide (frusemide)" НЯРАЙН
 * monograph (2025-03, дараагийн review 2030-03) яг 1–2 мг/кг гэсэн одоо
 * байгаа тоотой давхцсан ч энэ нь ГАНЦХАН эх сурвалж бөгөөд ЗӨВХӨН
 * нярайд (gestational age-аар давтамжилдаг) хамаарна — >1 сартай
 * хүүхдэд шууд ашиглах боломжгүй.
 * ⛔ Тиймээс ЭНЭ ДҮРМИЙГ баталгаажуулаагүй ХЭВЭЭР үлдээв — sources: [].
 * Дараагийн алхам: BNF for Children эсвэл Australian Medicines Handbook
 * Children's Dosing Companion (лицензтэй) -аас ерөнхий хүүхдийн mg/kg
 * тунг олох, эсвэл дүрмийг "нярай" (QLD эх сурвалж) / "ерөнхий" гэж
 * хуваах бол хоёр дахь эх сурвалж хайх шаардлагатай.
 *
 * Хийх ажил (docs/SOURCES.md, 5-р хэсэг):
 *   1. WHO AWaRe / 2024 заавраас тунг баталгаажуулах
 *   2. sources[] бөглөх, evidenceLevel шинэчлэх
 *   3. lastReviewed, reviewedBy бөглөх
 *   4. contraindicationsMn нэмэх (druginfo.mohs.mn)
 *   5. formulation бүрд availableInMn тэмдэглэх
 *   6. warnings[].level-ийг эргэн харах (бүгд "warn" гэж хөрвүүлсэн)
 */

export const furosemide: Drug = {
  id: "furosemide",
  inn: "Furosemide",
  innMn: "Фуросемид",
  category: "diuretic",
  rules: [
    {
      id: "furosemide-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 1,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 0.5,
        maxMgPerKg: 2
      },
      frequency: "bd",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 40
        },
        {
          kind: "per_kg",
          scope: "per_day",
          maxMgPerKg: 12
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 80
        }
      ],
      sources: [],
      evidenceLevel: "E_unverified",
      isDefault: true,
      conflictNote: "Эмчийн шийдвэр (2026-10-30): ЭМЯ-ны хүүхдийн удирдамж байхгүй тул ДЭМБ-ын утгыг сонгов — WHO Model Formulary for Children 2010, p. 318 (амаар): «Infant or Child 0.5–2 mg/kg 2–3 times daily; ... maximum 12 mg/kg (80 mg) daily». Өмнө нь 1–2 мг/кг, амаар/судсаар, хоногт дээд 600 мг, 0 сараас. Судсаар (0.5–1 мг/кг 8 цаг тутам) ба нярайн (12–24 цаг тутам) тун өөр тул энэ дүрмээс хасав. 2020+ хоёр дахь эх сурвалжгүй — E."
    }
  ],
  formulations: [
    {
      kind: "liquid",
      id: "40mg-5ml-0",
      labelMn: "40mg/5ml уусмал",
      mgPerMl: 8
    },
    {
      kind: "solid",
      id: "20mg-1",
      labelMn: "20mg таблет",
      mgPerUnit: 20,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "40mg-2",
      labelMn: "40mg таблет",
      mgPerUnit: 40,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Цусны кали, натри, шингэний тэнцвэрийг хянах."
    },
    {
      level: "warn",
      messageMn: "Чихрийн шижингийн эм, аминогликозидтай харилцан нөлөөлөл байна."
    }
  ],
  contraindicationsMn: [],
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
