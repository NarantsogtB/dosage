/**
 * САНААТАЙ ӨӨРЧЛӨЛТИЙН БҮРТГЭЛ.
 *
 * Эх сурвалж баталгаажуулах явцад MVP-ийн тунгаас зориуд салсан эмүүд.
 * Тэнцвэрийн тест эдгээрийг алгасна — БУСАД бүх эм хэвээр байх ёстой.
 *
 * Шинэ мөр нэмэхдээ ЗААВАЛ шалтгаан, эх сурвалжийг бичнэ.
 */
export interface IntentionalChange {
  readonly drugId: string;
  readonly reason: string;
  readonly sourceId: string;
}

export const INTENTIONAL_CHANGES: readonly IntentionalChange[] = [
  {
    drugId: "zinc-sulfate",
    reason:
      "1–2 мг/кг (дээд 20 мг) → тогтмол 5 мг. WHO 2024 нь 5 мг нь 20 мг-тай " +
      "ижил үр дүнтэй, бөөлжилт 29% бага гэж тогтоов.",
    sourceId: "who-pneumonia-diarrhoea-2024",
  },
  {
    drugId: "ciprofloxacin",
    reason:
      "Цусан суулгын заалтад 15 мг/кг нэг удаагийн тун, 3 хоног. " +
      "Насны доод хязгаар 12 сар → 0 (заавар 10 хүртэлх насыг хамарна). " +
      "⚠️ Насны өөрчлөлт хүүхдийн эмчийн баталгаажуулалт хүлээж байна.",
    sourceId: "who-pneumonia-diarrhoea-2024",
  },
  {
    drugId: "prednisolone",
    reason:
      "Астмын заалтад 1 мг/кг (дээд 40 мг), 2–3 хоног. RCH + Starship нийцэв.",
    sourceId: "rch-melbourne-cpg",
  },
];

const CHANGED_IDS = new Set(INTENTIONAL_CHANGES.map((item) => item.drugId));

/** Тухайн эмийн тун зориуд өөрчлөгдсөн эсэх. */
export const isIntentionallyChanged = (drugId: string): boolean =>
  CHANGED_IDS.has(drugId);
