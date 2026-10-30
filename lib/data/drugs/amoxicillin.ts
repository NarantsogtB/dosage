import type { Drug } from "../../domain/drug";

/**
 * Amoxicillin — Амоксициллин
 *
 * ✅ Уушгины хатгааны дүрэм БАТАЛГААЖСАН — WHO 2024 + Children's Minnesota 2025.
 * ⚠️ Ерөнхий дүрэм ХАРААХАН БАТАЛГААЖААГҮЙ.
 *
 * WHO 2024: "at least 40 mg/kg per dose twice daily (80 mg/kg per day)
 * for five days". Энэ нь ДАВТАМЖААР ялгаатай — өдөрт 2 удаа, 3 биш.
 *
 * 2026-08-20: Хэрэглэгч (эмч) ХӨЦМ-ийн 40мг/кг ба олон улсын 90мг/кг
 * хоорондын зөрүүг мэдэгдсэн. Шалгасны дүнд:
 *   - dosage.mn-ийн энэ дүрэм ХЭДИЙНЭЭ WHO 2024-ийн 40мг/кг НЭГ УДААГИЙН
 *     ТУН bd (=80мг/кг/өдөр) ашиглаж байгаа — ХӨЦМ-ийн 40мг/кг/ӨДӨР
 *     (хуучин, tds) ХЭРЭГЛЭГДЭЭГҮЙ.
 *   - Children's Minnesota CAP (2025) — 45мг/кг/тун bd (=90мг/кг/өдөр) —
 *     WHO-той ХОЛБООТОЙ 2 дахь бие даасан эх сурвалж болж баталгаажлаа.
 *   - 80 ба 90 мг/кг/өдөр хоёулаа ижил "өндөр тунгийн" парадигм —
 *     зөрүү бага (~12%), эх сурвалж/популяци өөр (WHO=LMIC, CMN=АНУ-ын
 *     тэсвэржилтийн түвшин). ХӨЦМ-ийн 40мг/кг/өдөр бол хуучирсан тоо.
 *   Дэлгэрэнгүй: доорх conflictNote.
 */

export const amoxicillin: Drug = {
  id: "amoxicillin",
  inn: "Amoxicillin",
  innMn: "Амоксициллин",
  category: "antibiotic",
  rules: [
    {
      id: "amoxicillin-pneumonia",
      indication: {
        code: "pneumonia",
        labelMn: "Уушгины хатгаа (2–59 сар)"
      },
      route: "oral",
      ageMinMonths: 2,
      ageMaxMonths: 59,
      basis: {
        kind: "per_kg_per_dose",
        minMgPerKg: 40,
        maxMgPerKg: 40
      },
      frequency: "bd",
      duration: {
        minDays: 3,
        maxDays: 5
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
          locator: "Recommendation 1 & 2a, Remarks",
          quotedValue: "at least 40 mg/kg per dose twice daily (80 mg/kg per day) for five days"
        },
        {
          sourceId: "who-imci-chartbook-2014",
          locator: "Give an Appropriate Oral Antibiotic — FOR PNEUMONIA, ACUTE EAR INFECTION",
          quotedValue: "Oral Amoxicillin — Give two times daily for 5 days; 4–<10 kg: 5 ml of 250mg/5ml; 10–<14 kg: 10 ml; 14–19 kg: 15 ml"
        },
        {
          sourceId: "childrens-mn-cap-2025",
          locator: "Table 1 (Antimicrobials) + Beta-lactam note 1, p.4",
          quotedValue: "Amoxicillin (PO) 45 mg/kg/dose BID, max single dose 2,000 mg. High-dose amoxicillin (90 mg/kg/day) divided BID is expected to be adequate for the treatment of uncomplicated pneumonia in the majority of children given the low rates of Streptococcus pneumoniae resistance to penicillin locally."
        }
      ],
      evidenceLevel: "B_who",
      isDefault: false,
      conflictNote:
        "⚠️ ХӨЦМ-ийн 40мг/кг/ӨДӨР (хуучин, өдөрт 3 удаа) гэсэн санагдацтай " +
        "ЗӨРЧИЛДӨХГҮЙ — dosage.mn энд WHO 2024-ийн 40мг/кг НЭГ УДААГИЙН ТУН, " +
        "өдөрт 2 удаа (= 80мг/кг/өдөр) ашигладаг тул аль хэдийн өндөр тунгийн " +
        "заавраар тооцдог. Children's Minnesota 2025 (90мг/кг/өдөр) үүнтэй " +
        "холбоотой хоёр дахь бие даасан баталгаажуулалт — тоо ойролцоо (80 vs " +
        "90), ялгаа нь орон нутгийн pneumococcus-ийн тэсвэржилтийн таамаглалаас " +
        "хамаарна (WHO=бүх орон, CMN=АНУ). Хэрэв танай эмнэлэгт ХӨЦМ-ийн " +
        "40мг/кг/өдөр (tds)-ийг хараахан ашиглаж байгаа бол энэ хуучирсан " +
        "тоо — эмчилгээ дутуу тунгаар хийгдэх эрсдэлтэй. Зөвхөн хурдан " +
        "амьсгал бол 3 хоног (ХДХВ бага тархалттай бүсэд), цээж хонхойвол " +
        "5 хоног."
    },
    {
      id: "amoxicillin-general",
      indication: "general",
      route: "oral",
      ageMinMonths: 0,
      basis: {
        kind: "per_kg_per_day",
        minMgPerKg: 40,
        maxMgPerKg: 90
      },
      frequency: "tds",
      caps: [
        {
          kind: "absolute",
          scope: "per_dose",
          maxMg: 1000
        },
        {
          kind: "absolute",
          scope: "per_day",
          maxMg: 3000
        }
      ],
      sources: [],
      evidenceLevel: "E_unverified",
      isDefault: true,
      conflictNote:
        "⚠️ Эх сурвалжгүй — энэ бол ЗААЛТГҮЙ (ерөнхий) дүрэм, зөвхөн " +
        "заалт тодорхойгүй үед л ашиглана. УУШГИНЫ ХАТГАА бол доорх " +
        "'Уушгины хатгаа (2–59 сар)' заалтыг ЗААВАЛ сонгож WHO 2024-ийн " +
        "баталгаажсан 40мг/кг/тун bd (=80мг/кг/өдөр) дүрмээр тооцоол — " +
        "энэ ерөнхий дүрмийн 40–90мг/кг/өдөр tds муж нь баталгаажаагүй " +
        "бөгөөд өдөрт 3 удаагийн давтамж нь WHO 2024-ийн шинэ зөвлөмжтэй " +
        "(bd) нийцэхгүй байж болзошгүй."
    }
  ],
  formulations: [
    {
      kind: "liquid",
      id: "125mg-5ml-0",
      labelMn: "125mg/5ml уусмал",
      mgPerMl: 25
    },
    {
      kind: "liquid",
      id: "250mg-5ml-1",
      labelMn: "250mg/5ml уусмал",
      mgPerMl: 50
    },
    {
      kind: "solid",
      id: "500mg-2",
      labelMn: "500mg капсул/таблет",
      mgPerUnit: 500,
      unitMn: "капсул",
      divisible: false
    }
  ],
  warnings: [],
  contraindicationsMn: [],
  notesMn: "Ердийн халдвар: 40–45 мг/кг/өдөр; уушгины хатгаа (WHO 2024): 40 мг/кг нэг удаагийн тун, өдөрт 2 удаа.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
