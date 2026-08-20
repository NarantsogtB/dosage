import type { Drug } from "../../domain/drug";

/**
 * Ondansetron — Ондансетрон
 *
 * ✅ >6 сартай хүүхдэд БАТАЛГААЖСАН (уух зам) — MSF Essential drugs
 * (ONDANSETRON oral, 2026-04 шинэчилсэн) + RCH Melbourne Gastroenteritis
 * (2025-08 шинэчилсэн). Хоёулаа 0.1–0.15 мг/кг/тун дээр давхацна.
 *
 * ⚠️ MSF 6 сар–11 насны бүлэгт ГАНЦ ЦЭГТ дээд тун 4 мг гэж ТОДОРХОЙ
 * заасан ("0.1 to 0.15 mg/kg (max. 4 mg) up to 2 times daily"). RCH-ийн
 * жингийн хүснэгт >30 кг хүүхдэд 8 мг хүртэл (0.15 мг/кг томьёогоор)
 * зөвшөөрдөг боловч энэ бүлэг ихэвчлэн 12-оос дээш настай эсвэл 12
 * насны заагт ойрхон хүүхдийг хамардаг. Аюулгүй байдлыг эрхэмлэж энэ
 * тооцоолуур MSF-ийн 4 мг/тун хязгаарыг БҮХ >6 сартай өвчтөнд ашигладаг
 * (RCH-ийн дагуу том, жинтэй хүүхдэд бага зэрэг консерватив гарч
 * болзошгүй) — gentamicin-general дүрэмтэй ижил зарчим.
 * ⛔ IV зам одоогоор эх сурвалжгүй тул route: "oral" болгож хассан
 * (өмнө нь "oral_iv" байсан ч IV-ийн тунг батлах эх сурвалж олдоогүй).
 */

export const ondansetron: Drug = {
  id: "ondansetron",
  inn: "Ondansetron",
  innMn: "Ондансетрон",
  category: "antiemetic",
  rules: [
    {
      id: "ondansetron-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 6,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 0.1,
        maxMgPerKg: 0.15
      },
      frequency: "bd",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 4
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 8
        }
      ],
      sources: [
        {
          sourceId: "msf-essential-drugs",
          locator: "ONDANSETRON oral — Dosage (2026-04 шинэчилсэн, 2026-06 нийтэлсэн)",
          quotedValue: "Child 6 months to 12 years: 0.1 to 0.15 mg/kg (max. 4 mg) up to 2 times daily. In children with persistent vomiting, a single dose is usually enough to facilitate hydration, by reducing vomiting."
        },
        {
          sourceId: "rch-melbourne-gastroenteritis",
          locator: "Gastroenteritis — Medications (сүүлд шинэчилсэн 2025-08)",
          quotedValue: "Recommended initial ondansetron doses (oral): 8-15 kg: 2 mg / 15-30 kg: 4 mg / >30 kg: 8 mg. Ongoing ondansetron dosing is 0.15 mg/kg."
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote:
        "MSF 6 сар–11 насны бүлэгт дээд тунг 4 мг гэж тодорхой заасан. " +
        "RCH-ийн жингийн хүснэгт >30 кг хүүхдэд 0.15 мг/кг томьёогоор " +
        "8 мг хүртэл зөвшөөрдөг. Энэ тооцоолуур аюулгүй байдлыг эрхэмлэж " +
        "MSF-ийн 4 мг/тун (8 мг/өдөр, bd) хязгаарыг БҮХ >6 сартай " +
        "өвчтөнд ашигладаг тул том, жинтэй хүүхдэд бага зэрэг консерватив " +
        "гарч болзошгүй."
    }
  ],
  formulations: [
    {
      kind: "liquid",
      id: "4mg-5ml-0",
      labelMn: "4mg/5ml уусмал",
      mgPerMl: 0.8
    },
    {
      kind: "solid",
      id: "4mg-1",
      labelMn: "4mg таблет",
      mgPerUnit: 4,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "8mg-2",
      labelMn: "8mg таблет",
      mgPerUnit: 8,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "QT интервал уртасгах эрсдэлтэй — зүрхний эмгэгтэй өвчтөнд болгоомжтой."
    }
  ],
  contraindicationsMn: [
    "6 сараас бага насны хүүхэд.",
    "Удаан QT синдром (congenital long QT), зүрхний дутагдал, брадикарди — болгоомжтой хэрэглэх/хянах."
  ],
  notesMn:
    "Ихэнх тохиолдолд ГАНЦ тун шингэн ундаалахад хангалттай (MSF, RCH " +
    "хоёулаа). Элэгний дутагдалтай өвчтөнд өдрийн дээд тун 8 мг хүртэл " +
    "багасгана (MSF).",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
