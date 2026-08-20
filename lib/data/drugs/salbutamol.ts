import type { Drug } from "../../domain/drug";

/**
 * Salbutamol — Салбутамол
 *
 * ⚠️ ЭХ СУРВАЛЖ БАТАЛГААЖААГҮЙ (evidenceLevel: "E_unverified").
 * MVP-ийн lib/drugs.ts-ээс автоматаар хөрвүүлсэн. Тунгийн утга нь
 * анхны хувилбартай ЯГ ИЖИЛ — өөрчлөөгүй.
 *
 * ⚠️ 2026-08-20: АМААР уух (route: "oral") тунг баталгаажуулахаар
 * гурван эх сурвалж шалгасан — RCH Melbourne "Acute asthma" (2023-07),
 * WHO IMCI for High-HIV Settings (2008, NBK144140), MSF Essential drugs
 * (2026) — ГУРВАЛАА зөвхөн ИНХАЛЯЦИ (MDI 100 мкг/сорви + spacer)
 * хэлбэрийг заадаг бөгөөд амаар уух шахмал/сиропын тунг мэдээлдэггүй.
 * Учир нь амаар уух хэлбэр нь инхаляцитай харьцуулахад нөлөөлөл бага,
 * гаж нөлөө их тул орчин үеийн зааврууд ерөнхийдөө санал болгодоггүй.
 * ⛔ Тиймээс ЭНЭ ДҮРМИЙГ баталгаажуулаагүй ХЭВЭЭР үлдээв (тоо
 * зохиохгүй байх дүрмийг мөрдөв) — sources: [] хэвээр.
 * Дараагийн алхам: (1) BNF for Children зэрэг лицензтэй лавлахаас
 * амаар уух тунг олох, эсвэл (2) энэ дүрмийг ИНХАЛЯЦИ (жинд үл
 * хамаарах тогтмол тун) болгон архитектурын хувьд өөрчлөх эсэхийг
 * шийдэх — сүүлийнх нь бүтээгдэхүүний шийдвэр, эмчийн зөвшөөрөл хэрэгтэй.
 *
 * Хийх ажил (docs/SOURCES.md, 5-р хэсэг):
 *   1. WHO AWaRe / 2024 заавраас тунг баталгаажуулах
 *   2. sources[] бөглөх, evidenceLevel шинэчлэх
 *   3. lastReviewed, reviewedBy бөглөх
 *   4. contraindicationsMn нэмэх (druginfo.mohs.mn)
 *   5. formulation бүрд availableInMn тэмдэглэх
 *   6. warnings[].level-ийг эргэн харах (бүгд "warn" гэж хөрвүүлсэн)
 */

export const salbutamol: Drug = {
  id: "salbutamol",
  inn: "Salbutamol",
  innMn: "Салбутамол",
  category: "respiratory",
  rules: [
    {
      id: "salbutamol-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 24,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 0.1,
        maxMgPerKg: 0.15
      },
      frequency: "tds",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 4
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 32
        }
      ],
      sources: [],
      evidenceLevel: "E_unverified",
      isDefault: true
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
      messageMn: "Амаар уух хэлбэр — инхалятортай харьцуулахад нөлөөлөл бага, гаж нөлөө их."
    },
    {
      level: "warn",
      messageMn: "Сэтгэл хөдлөл, чичиргэнэ, зүрхний цохилт ихсэх боломжтой."
    }
  ],
  contraindicationsMn: [],
  notesMn: "Инхалятор (MDI/небулайзер) боломжтой бол тэр нь илүүд үздэг.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
