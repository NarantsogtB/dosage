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
    ruleId: "clarithromycin-general",
    gap:
      "Ганц эх сурвалж (WHO AWaRe 2022, Table 50.1: 7.5 мг/кг 12 цаг тутам, " +
      "хоногт дээд 1 г). MSF-д зөвхөн насанд хүрэгчийн тун, RCH-д байхгүй.",
    next:
      "Starship эсвэл PCH-ийн хүүхдийн кларитромицины тунг олох; эсвэл " +
      "зөрүү гарвал BNFc-ээр tie-break (DECISIONS 2026-10-30).",
  },
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
    ruleId: "cetirizine-2-6y",
    gap: "Ганц эх сурвалж (RCH Urticaria, 2023-03). WHO Formulary 2010, MSF-д байхгүй (2026-11-04).",
    next: "Starship, PCH эсвэл CHQ-ийн хүүхдийн цетиризины тунг олох.",
  },
  {
    ruleId: "cetirizine-6-18y",
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
    ruleId: "loratadine-general",
    gap: "Ганц эх сурвалж (MSF Essential drugs, 2024-02). RCH, PCH-д байхгүй (2026-11-04).",
    next: "WHO Formulary 2010-ийн лоратадины хуудсыг locator-тойгоор шалгаж иш татах.",
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
