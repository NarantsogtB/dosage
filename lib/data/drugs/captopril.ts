import type { Drug } from "../../domain/drug";

/**
 * Captopril — Каптоприл
 *
 * ⚠️ ЭХ СУРВАЛЖ БАТАЛГААЖААГҮЙ (evidenceLevel: "E_unverified").
 * MVP-ийн lib/drugs.ts-ээс автоматаар хөрвүүлсэн. Тунгийн утга нь
 * анхны хувилбартай ЯГ ИЖИЛ — өөрчлөөгүй.
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
 * Хийх ажил (docs/SOURCES.md, 5-р хэсэг):
 *   1. WHO AWaRe / 2024 заавраас ХҮҮХДИЙН тунг баталгаажуулах
 *   2. sources[] бөглөх, evidenceLevel шинэчлэх
 *   3. lastReviewed, reviewedBy бөглөх
 *   4. contraindicationsMn нэмэх (druginfo.mohs.mn)
 *   5. formulation бүрд availableInMn тэмдэглэх
 *   6. warnings[].level-ийг эргэн харах (бүгд "warn" гэж хөрвүүлсэн)
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
      ageMinMonths: 0,
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
      sources: [],
      evidenceLevel: "E_unverified",
      isDefault: true
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
    "Хоолноос 1 цагийн өмнө уух. Нярайд эхлэх тун 0.1 мг/кг. " +
    "⚠️ Энэ бол ХҮҮХДИЙН (кг-аар тооцсон) тун — насанд хүрэгчид ХЭРЭГЛЭХГҮЙ. " +
    "Насанд хүрэгчийн каптоприл ФИКС тунтай (6.25–25мг, титрацаар 50мг " +
    "хүртэл), өдөрт 2–3 удаа (1 БИШ) өгдөг.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
