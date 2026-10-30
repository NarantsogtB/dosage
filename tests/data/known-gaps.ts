/**
 * МЭДЭГДЭЖ БУЙ ЦООРХОЙН БҮРТГЭЛ.
 *
 * Хоёр эх сурвалжийн дүрмийг ХАНГААГҮЙ боловч эхний эх сурвалж нь
 * найдвартай тул түр зөвшөөрсөн дүрмүүд.
 *
 * Энэ жагсаалт ХООСОН болох нь зорилт. Дүрмийг сулруулахын оронд
 * цоорхойг ил бүртгэж, тоолж болохуйц болгов.
 */
export interface KnownGap {
  readonly ruleId: string;
  readonly gap: string;
  readonly next: string;
}

export const KNOWN_GAPS: readonly KnownGap[] = [
  {
    ruleId: "ceftriaxone-dysentery",
    gap: "Ганц эх сурвалжтай (WHO 2024). Хоёр дахь нь дутуу.",
    next: "IMCI chart booklet эсвэл WHO AWaRe (2022)-оос цефтриаксоны тунг олох.",
  },
  {
    ruleId: "dexamethasone-asthma",
    gap: "Ганц эх сурвалж (RCH Melbourne). Хоёр дахь нь дутуу.",
    next: "Starship NZ-ийн астмын зааврыг Chrome-оор нээж дексаметазоны тунг шалгах.",
  },
  {
    ruleId: "diazepam-general",
    gap:
      "Ганц эх сурвалж (Perth Children's Hospital Medication Management " +
      "Manual). MSF зөвхөн насанд хүрэгчийн уух диазепамын тунтай; RCH-ийн " +
      "premedication заавар midazolam-ыг илүүд үздэг тул хүүхдийн уух " +
      "диазепамын тунг өөр эх сурвалжаас олоход хүндрэлтэй байна.",
    next:
      "AMH Children's Dosing Companion эсвэл BNF for Children (лицензтэй " +
      "лавлах) -аас 'muscle spasm' заалтын хүүхдийн тунг олж баталгаажуулах.",
  },
  {
    ruleId: "omeprazole-weightband",
    gap:
      "Ганц эх сурвалж (MSF). ≥5кг жинтэй хүүхдийн тогтмол мг тунг " +
      "(5–10кг→5мг, 10–20кг→10мг, ≥20кг→20мг) хоёр дахь эх сурвалжтай " +
      "хараахан баталгаажуулаагүй.",
    next:
      "BNF for Children эсвэл AMH Children's Dosing Companion (лицензтэй " +
      "лавлах) -аас ижил жингийн мужийн тунг олж баталгаажуулах.",
  },
  {
    ruleId: "azithromycin-general",
    gap:
      "Ганц эх сурвалж (MSF 2025-06): 10 мг/кг өдөрт 1 удаа (дээд 500 мг). " +
      "RCH Melbourne-ийн уух горим (≥6 сар) нь 10 мг/кг → 5 мг/кг тул " +
      "хоёр дахь эх сурвалж болохгүй.",
    next:
      "WHO AWaRe 2022 эсвэл Starship-ийн CAP/AOM зааврыг шалгах; эсвэл " +
      "эмч RCH-ийн 10→5 мг/кг горимыг сонгох (pending-decisions-2026-10.md).",
  },
];

const GAP_IDS = new Set(KNOWN_GAPS.map((item) => item.ruleId));

/** Тухайн дүрэм мэдэгдэж буй цоорхойн жагсаалтад байгаа эсэх. */
export const isKnownGap = (ruleId: string): boolean => GAP_IDS.has(ruleId);
