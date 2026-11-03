import type { Drug } from "../../domain/drug";

/**
 * Captopril — Каптоприл
 *
 * 🟡 ГАНЦ ЭХ СУРВАЛЖ (known-gap, 2026-11-04) — Perth Children's Hospital
 * monograph (2023-12 хянасан): 4 д.х–12 сар ердийн 0.1–0.3 мг/кг/тун,
 * 1–12 нас 0.3–0.5 мг/кг/тун, 2–3 удаа; дээд 6 мг/кг/хон (150 мг/хон).
 * Одоогийн 0.1–0.5 мг/кг × 3 хоёр бүлгийг хамарна — тун өөрчлөөгүй.
 * ⚠️ НАС ӨӨРЧЛӨГДСӨН (2026-11-04, эмчийн шийдвэр): 0 → 1 сараас. PCH
 * нярайг тусдаа протоколоор өгдөг. WHO Formulary 2010, MSF-д хүүхдийн тун
 * байхгүй.
 *
 * 2026-08-20: Хэрэглэгч (эмч) насанд хүрэгчид энэ тооцоолуурыг ашиглаж
 * байгааг мэдэгдсэн. Шалгасны дүн:
 *   - Насанд хүрэгчийн каптоприл ФИКС тунтай (жингээс ҮЛ ХАМААРНА:
 *     6.25–25мг эхэлж, хариу үзэж 50мг хүртэл нэмэгдүүлнэ, дээд
 *     150мг/өдөр) — кг-аар тооцох арга огт хэрэглэгддэггүй.
 *   - Давтамж ӨДӨРТ 1 БИШ — ӨДӨРТ 2–3 УДАА (BID–TID). Каптоприл нь
 *     богино хагас задралын хугацаатай тул энэ нь бусад ACE inhibitor
 *     (lisinopril, enalapril — өдөрт 1 удаа)-аас ялгарах гол шинж.
 *   - Иймд dosage.mn-д "насанд хүрэгчийн тун" гэсэн боломж НЭМЭХГҮЙ —
 *     энэ бол хүүхдийн жинд суурилсан тооцоолуур, насанд хүрэгчийн
 *     фикс/титрацийн тун үүнд огт хамаарахгүй. Оронд нь
 *     `lib/engine/eligibility/check-age-range.ts`-д 18 нас (216 сар)-с
 *     дээш насыг БҮХ эмд ЗОГСООХ ерөнхий хамгаалалт нэмсэн — зөвхөн
 *     captopril биш, ижил төрлийн бусад (enalapril, propranolol,
 *     spironolactone г.м.) эмд ч хамаарна.
 *
 * Үлдсэн: lastReviewed/reviewedBy (эмчийн хяналт), contraindicationsMn,
 * availableInMn.
 */

export const captopril: Drug = {
  id: "captopril",
  inn: "Captopril",
  innMn: "Каптоприл",
  category: "antihypertensive",
  rules: [
    {
      id: "captopril-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 1,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 0.1,
        maxMgPerKg: 0.5
      },
      frequency: "tds",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 25
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 150
        }
      ],
      sources: [
        {
          sourceId: "pch-captopril-monograph",
          locator: "Dosage — Hypertension, proteinuria in nephritis: 1-12 years (сүүлд хянасан 2023-12)",
          quotedValue: "Initial (test) dose 0.1 mg/kg (maximum dose 6.25 mg), then if tolerated titrate to response, usual dose 0.3 to 0.5 mg/kg/dose 2 to 3 times daily. Maximum dose: 6 mg/kg/DAY (up to 150 mg/DAY), in 2 or 3 divided doses"
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote: "Эмчийн шийдвэр (2026-11-04): PCH-ийг ганц эх сурвалжаар (known-gap) нэмж, 0 → 1 сараас (нярай PCH-д тусдаа протокол). PCH: 4 д.х–12 сар ердийн 0.1–0.3 мг/кг/тун, 1–12 нас 0.3–0.5 мг/кг/тун; 12–18 нас тогтмол 12.5–25 мг/тун. Одоогийн 0.1–0.5 мг/кг × 3, дээд 25 мг/тун, 150 мг/хон хэвээр. Эхлэх (test) тун ба титраци — эмч."
    }
  ],
  formulations: [
    {
      kind: "solid",
      id: "6-25mg-0",
      labelMn: "6.25mg таблет",
      mgPerUnit: 6.25,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "12-5mg-1",
      labelMn: "12.5mg таблет",
      mgPerUnit: 12.5,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "25mg-2",
      labelMn: "25mg таблет",
      mgPerUnit: 25,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Цусны калий нэмэгдэх болон бөөрний үйл ажиллагаа хянах."
    },
    {
      level: "warn",
      messageMn: "Хуурай ханиалгыг өдөөж болно — ACE дарангуйлагчийн нийтлэг гаж нөлөө."
    },
    {
      level: "warn",
      messageMn: "Жирэмсэнд хориглоно."
    }
  ],
  contraindicationsMn: [],
  notesMn:
    "Хоолноос 1 цагийн өмнө уух. Эхлэх (test) тун 0.1 мг/кг (дээд 6.25 мг), дараа нь титраци. " +
    "⚠️ Энэ бол ХҮҮХДИЙН (кг-аар тооцсон) тун — насанд хүрэгчид ХЭРЭГЛЭХГҮЙ. " +
    "Насанд хүрэгчийн каптоприл ФИКС тунтай (6.25–25мг, титрацаар 50мг " +
    "хүртэл), өдөрт 2–3 удаа (1 БИШ) өгдөг.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
