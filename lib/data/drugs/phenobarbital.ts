import type { Drug } from "../../domain/drug";

/**
 * Phenobarbital — Фенобарбитал
 *
 * ✅ >1 сартай (4 долоо хоног) хүүхдэд БАТАЛГААЖСАН — MSF Essential drugs
 * (PHENOBARBITAL = PB oral, 2024-10 шинэчилсэн) + Perth Children's
 * Hospital Medication Management Manual (2023-11 хянасан, 2024-05/06
 * батлагдсан). Хоёулаа ЭХЛЭХ тун бага, аажим НЭМЭГДҮҮЛЖ ердийн барих
 * тунд хүрдэг titration схемийг заасан:
 *   - MSF: эхлэх 2–3 мг/кг/өдөр → 7 хоног тутам 1–2 мг/кг нэмж →
 *     хэрэгцээтэй бол 2–6 мг/кг/өдөр хүртэл.
 *   - PCH: эхлэх 1–2 мг/кг/өдөр → аажим нэмэгдүүлж ердийн барих тун
 *     3–6 мг/кг/өдөр → шаардлагатай бол 8 мг/кг/өдөр хүртэл.
 * ⚠️ ОДООГИЙН DosingRule схем "эхлэх тун → titration → барих тун" гэсэн
 * дараалсан үе шатыг илэрхийлж чадахгүй (зөвхөн ганц mg/kg муж). Тиймээс
 * доорх дүрэм хоёр эх сурвалжийн ХАМТ давхацдаг "ердийн БАРИХ тун"
 * (3–6 мг/кг/өдөр)-ыг илэрхийлнэ — ЭХЛЭХ тун БИШ. Эмч эмчилгээг доод
 * тунгаас (~1–2 мг/кг/өдөр) эхэлж, 1–2 долоо хоногийн зайтай аажим
 * нэмэгдүүлэх ёстойг notesMn-д тодотгов.
 * ⛔ НЯРАЙ (<1 сар / <4 долоо хоног) ХАРААХАН ОРУУЛААГҮЙ — PCH-ийн дагуу
 * нярайг тусдаа "Neonatal Medication Protocols"-оор зохицуулдаг тул.
 */

export const phenobarbital: Drug = {
  id: "phenobarbital",
  inn: "Phenobarbital",
  innMn: "Фенобарбитал",
  category: "anticonvulsant",
  rules: [
    {
      id: "phenobarbital-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 1,
      basis: {
        kind: "per_kg_per_day",
        minMgPerKg: 3,
        maxMgPerKg: 6
      },
      frequency: "od",
      caps: [
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 200
        }
      ],
      sources: [
        {
          sourceId: "msf-essential-drugs",
          locator: "PHENOBARBITAL = PB oral — Dosage (2024-10 шинэчилсэн)",
          quotedValue: "Child 1 month to 11 years: start with 2 to 3 mg/kg once daily at bedtime or 1 to 1.5 mg/kg 2 times daily for 2 weeks; increase the daily dose by increments of 1 to 2 mg/kg every week, up to 2 to 6 mg/kg once daily if necessary."
        },
        {
          sourceId: "pch-phenobarbital-monograph",
          locator: "Dosage & Dosage Adjustments — Focal (partial) seizures, generalised tonic-clonic seizures, Oral/Intravenous (сүүлд хянасан 2023-11)",
          quotedValue: "4 weeks – 12 years: Initially 1–2 mg/kg daily in 1 or 2 doses. If necessary, increase gradually, according to response and plasma phenobarbital concentration, to usual maintenance dose of 3–6 mg/kg daily in 1 or 2 doses. Up to 8 mg/kg daily may be required."
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote:
        "Энэ дүрэм ХОЁР эх сурвалжийн ХАМТ давхацдаг 'ердийн БАРИХ тун' " +
        "(3–6 мг/кг/өдөр)-ыг илэрхийлнэ — ЭХЛЭХ тун БИШ. MSF болон PCH " +
        "хоёулаа эмчилгээг бага тунгаас (MSF: 2–3 мг/кг/өдөр; PCH: " +
        "1–2 мг/кг/өдөр) эхэлж, 1–2 долоо хоногийн зайтай аажим " +
        "нэмэгдүүлэхийг зөвлөдөг. Тооцоолуур энэ titration схемийг ГАРГАХГҮЙ " +
        "— зөвхөн барих тунгийн мужийг харуулна, эхлэх тунг эмч клиникийн " +
        "дүгнэлтээрээ сонгоно."
    }
  ],
  formulations: [
    {
      kind: "liquid",
      id: "15mg-5ml-0",
      labelMn: "15mg/5ml уусмал",
      mgPerMl: 3
    },
    {
      kind: "solid",
      id: "15mg-1",
      labelMn: "15mg таблет",
      mgPerUnit: 15,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "30mg-2",
      labelMn: "30mg таблет",
      mgPerUnit: 30,
      unitMn: "таблет",
      divisible: true
    },
    {
      kind: "solid",
      id: "60mg-3",
      labelMn: "60mg таблет",
      mgPerUnit: 60,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [
    {
      level: "warn",
      messageMn: "Тайвшруулах нөлөөтэй — хүүхдийн сурлагад нөлөөлнө."
    },
    {
      level: "warn",
      messageMn: "Гэнэтийн зогсоохыг хориглоно — тунг аажим бууруулна."
    },
    {
      level: "warn",
      messageMn: "CYP450 индуктор — бусад эмийн метаболизмд нөлөөлнө."
    }
  ],
  contraindicationsMn: [],
  notesMn:
    "⚠️ Энэ тооцоолуур 'ердийн БАРИХ тун' (3–6 мг/кг/өдөр) харуулна — " +
    "ЭХЛЭХ тун БИШ. Эмчилгээг бага тунгаас (~1–2 мг/кг/өдөр) эхэлж, " +
    "1–2 долоо хоногийн зайтай аажим нэмэгдүүлнэ (MSF, PCH). " +
    "⚠️ Нярайд (<1 сар) энэ тооцоолуур ТУН ГАРГАХГҮЙ — PCH-ийн заавраар " +
    "нярайг тусдаа протоколоор зохицуулна.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
