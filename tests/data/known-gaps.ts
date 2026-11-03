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
    ruleId: "amoxicillin-clavulanate-general",
    gap:
      "Ганц эх сурвалж (WHO AWaRe 2022: 80–90 мг/кг/хон). MSF (25 мг/кг × 2), " +
      "RCH (22.5 мг/кг × 2) бага тунтай — эмч ДЭМБ-ыг сонгосон (2026-10-30).",
    next: "AWaRe-тэй нийцэх хоёр дахь 2020+ эх сурвалж (Starship, PCH) олох.",
  },
  {
    ruleId: "nitrofurantoin-general",
    gap:
      "Ганц эх сурвалж (WHO AWaRe 2022: 1 мг/кг × 4, хоногт дээд 200 мг). MSF-д " +
      "зөвхөн насанд хүрэгчийн тун, RCH-д байхгүй.",
    next: "RCH UTI CPG эсвэл Starship-ийн нитрофурантоины хүүхдийн тунг олох.",
  },
  {
    ruleId: "enalapril-general",
    gap:
      "Ганц эх сурвалж (WHO Model Formulary for Children 2010: 0.1 мг/кг-аас " +
      "эхэлж, хоногт дээд 1 мг/кг) — 2020-оос өмнөх. MSF-д зөвхөн насанд " +
      "хүрэгчийн тун, PCH-д monograph байхгүй, RCH Hypertension CPG-д " +
      "эналаприл ороогүй (2026-11-03 шалгав).",
    next:
      "Starship-ийн «ACE inhibitors in paediatrics» шинэчилсэн хувилбар эсвэл " +
      "өөр 2020+ хүүхдийн эмнэлгийн заавар (CHQ, SCH) олох; зөрвөл BNFc-ээр " +
      "tie-break.",
  },
  {
    ruleId: "captopril-general",
    gap:
      "Ганц эх сурвалж (PCH monograph, 2023-12). WHO Formulary 2010, MSF-д " +
      "хүүхдийн тун байхгүй (2026-11-04 шалгав).",
    next: "RCH, Starship эсвэл CHQ-ийн хүүхдийн каптоприлын тунг олох.",
  },
  {
    ruleId: "cetirizine-6-11m",
    gap: "Ганц эх сурвалж (RCH Urticaria, 2023-03). WHO Formulary 2010, MSF-д байхгүй (2026-11-04).",
    next: "Starship, PCH эсвэл CHQ-ийн хүүхдийн цетиризины тунг олох.",
  },
  {
    ruleId: "cetirizine-1-2y",
    gap: "Ганц эх сурвалж (RCH Urticaria, 2023-03). WHO Formulary 2010, MSF-д байхгүй (2026-11-04).",
    next: "Starship, PCH эсвэл CHQ-ийн хүүхдийн цетиризины тунг олох.",
  },
  {
    ruleId: "acetylcysteine-2-7y",
    gap: "Ганц эх сурвалж (AEMPS SmPC, 2020-09) — зохицуулагчийн шошго. Хүүхдийн эмнэлгийн заавар (WHO, MSF, PCH, RCH)-д амаар салс шингэрүүлэх заалт байхгүй (2026-11-04).",
    next: "Монголын бүртгэлийн заавар (druginfo.mohs.mn)-ыг гараар татаж D_label_only хоёр дахь эх сурвалж болгох.",
  },
  {
    ruleId: "acetylcysteine-over-7y",
    gap: "Ганц эх сурвалж (AEMPS SmPC, 2020-09) — зохицуулагчийн шошго. Хүүхдийн эмнэлгийн заавар (WHO, MSF, PCH, RCH)-д амаар салс шингэрүүлэх заалт байхгүй (2026-11-04).",
    next: "Монголын бүртгэлийн заавар (druginfo.mohs.mn)-ыг гараар татаж D_label_only хоёр дахь эх сурвалж болгох.",
  },
  {
    ruleId: "metoclopramide-general",
    gap:
      "Ганц эх сурвалж (EMA Article 31 referral, 2013) — 2020-оос өмнөх, " +
      "зохицуулагчийн шошго. MSF-д зөвхөн насанд хүрэгч, PCH/RCH-д байхгүй " +
      "(2026-11-03 шалгав).",
    next:
      "WHO Formulary 2010-ийн метоклопрамидын хуудсыг (насаар тогтмол мг, " +
      "дээд 500 мкг/кг/хон) locator-тойгоор иш татах; 2020+ хүүхдийн " +
      "эмнэлгийн заавар (Starship, CHQ) олох.",
  },
];

const GAP_IDS = new Set(KNOWN_GAPS.map((item) => item.ruleId));

/** Тухайн дүрэм мэдэгдэж буй цоорхойн жагсаалтад байгаа эсэх. */
export const isKnownGap = (ruleId: string): boolean => GAP_IDS.has(ruleId);
