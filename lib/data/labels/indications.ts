/**
 * Заалтын бүртгэл — `DosingRule.indication.code`-ийн цорын ганц эх.
 *
 * Дүрэм бүрийн `labelMn` нь эндхийн `labelMn`-ээр ЭХЛЭНЭ, хаалтад нарийвчлал
 * нэмж болно (жишээ «Уушгины хатгаа (2–59 сар)»). Бүртгэлгүй код хориотой —
 * `tests/data/indications.test.ts`.
 *
 * `synonyms` — өвчнөөр хайхад (Шат 4, `lib/search/match-indication-query.ts`):
 * монгол, латин/англи, товчлол.
 * Бүгд жижиг үсгээр.
 */
export interface IndicationEntry {
  readonly labelMn: string;
  readonly synonyms: readonly string[];
}

export const INDICATIONS = {
  pneumonia: {
    labelMn: "Уушгины хатгаа",
    synonyms: ["хатгаа", "пневмони", "уушгины хатгалгаа", "pneumonia", "cap"],
  },
  asthma: {
    labelMn: "Цочмог астма",
    synonyms: ["астма", "багтраа", "астмын хурц үе", "asthma"],
  },
  croup: {
    labelMn: "Цочмог ларинготрахеит",
    // «круп» — оросоор дамжсан нэр; хайлтад л үлдэнэ, дэлгэцэнд гарахгүй.
    synonyms: ["ларинготрахеобронхит", "круп", "хуурамч круп", "croup", "laryngotracheitis"],
  },
  diarrhoea: {
    labelMn: "Суулгалт",
    synonyms: ["гүйлгэх", "гастроэнтерит", "diarrhoea", "diarrhea", "gastroenteritis"],
  },
  dysentery: {
    labelMn: "Цусан суулга",
    synonyms: ["дизентери", "шигеллёз", "шигеллез", "dysentery", "shigellosis"],
  },
  anaerobic: {
    labelMn: "Анаэроб бактерийн халдвар",
    synonyms: ["анаэроб", "anaerobic"],
  },
  giardiasis: {
    labelMn: "Гиардиаз",
    synonyms: ["лямблиоз", "giardia", "giardiasis"],
  },
} as const satisfies Record<string, IndicationEntry>;

export type IndicationCode = keyof typeof INDICATIONS;

/** Бүртгэлтэй код эсэх. */
export const isIndicationCode = (code: string): code is IndicationCode =>
  Object.hasOwn(INDICATIONS, code);
