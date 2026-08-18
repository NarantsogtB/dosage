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
];

const GAP_IDS = new Set(KNOWN_GAPS.map((item) => item.ruleId));

/** Тухайн дүрэм мэдэгдэж буй цоорхойн жагсаалтад байгаа эсэх. */
export const isKnownGap = (ruleId: string): boolean => GAP_IDS.has(ruleId);
