import type { Source } from "../../domain/source";

/**
 * Эх сурвалжийн бүртгэл. Дэлгэрэнгүйг docs/SOURCES.md-ээс үзнэ үү.
 * Энэ бол ӨГӨГДӨЛ — логик бичихгүй.
 */
export const SOURCES: Record<string, Source> = {
  // ── ҮНДСЭН СУУРЬ: 2022–2025, бүгд үнэ төлбөргүй ──────────────────────────

  "who-aware-2022": {
    id: "who-aware-2022",
    citation:
      "World Health Organization. The WHO AWaRe (Access, Watch, Reserve) " +
      "antibiotic book. Geneva: WHO; 2022.",
    publisher: "World Health Organization",
    edition: "1st edition (шинэчлэгдэж байна)",
    year: 2022,
    url: "https://www.who.int/publications/i/item/9789240062382",
    tier: "open",
    reuse: { kind: "cc-by-nc-sa-3.0-igo" },
    lastVerified: "2026-08-17",
    relevanceMn:
      "★ АНТИБИОТИКИЙН ҮНДСЭН ЭХ СУРВАЛЖ. Хүүхэд, насанд хүрэгчдийн 30+ " +
      "түгээмэл халдварт эмийн сонголт, ТУН, хэрэглэх зам, ҮРГЭЛЖЛЭХ ХУГАЦААГ " +
      "нэг дор өгнө. Firstline-тай хамтарсан үнэгүй веб/мобайл апптай. " +
      "Antimicrobial stewardship (AWaRe ангилал) нь Монголын эмнэлэгт " +
      "чухал ач холбогдолтой.",
  },

  "who-pneumonia-diarrhoea-2024": {
    id: "who-pneumonia-diarrhoea-2024",
    citation:
      "World Health Organization. Guideline on management of pneumonia and " +
      "diarrhoea in children up to 10 years of age. Geneva: WHO; 2024.",
    publisher: "World Health Organization",
    edition: "2024",
    year: 2024,
    url: "https://www.ncbi.nlm.nih.gov/books/NBK611560/",
    tier: "open",
    reuse: { kind: "cc-by-nc-sa-3.0-igo" },
    lastVerified: "2026-08-17",
    relevanceMn:
      "★ Уушгины хатгаа, суулгалт — хүүхдийн эндэгдлийн 23%. " +
      "ЧУХАЛ ӨӨРЧЛӨЛТ: amoxicillin ≥40 мг/кг НЭГ УДААГИЙН ТУН, өдөрт 2 удаа " +
      "(=80 мг/кг/өдөр), 5 хоног. 2013 оны Pocket Book-ийн 40–50 мг/кг/өдөр-өөс " +
      "ялгаатай бөгөөд ДАВТАМЖ нь ч өөр (bd vs tid). " +
      "drugs.ts дахь Amoxicillin-ийн frequency: 'tid' — ЭНЭ ЗААВРААР ШАЛГАХ.",
  },

  "who-sbi-infants-2024": {
    id: "who-sbi-infants-2024",
    citation:
      "World Health Organization. WHO recommendations for management of " +
      "serious bacterial infections in infants aged 0–59 days. Geneva: WHO; 2024.",
    publisher: "World Health Organization",
    edition: "2024 (2024-12-08)",
    year: 2024,
    url: "https://www.who.int/publications/i/item/9789240102903",
    tier: "open",
    reuse: { kind: "cc-by-nc-sa-3.0-igo" },
    lastVerified: "2026-08-17",
    relevanceMn:
      "★ НЯРАЙН ХЭСГИЙН ҮНДСЭН ЭХ СУРВАЛЖ. 0–59 хоногтой нярайн сепсис, " +
      "менингит, уушгины хатгаа. 11 зөвлөмж (4 шинэ, 7 шинэчилсэн). " +
      "Эмнэлэг болон эмнэлгийн бус нөхцөлд тус тусад нь — Монголын сумын " +
      "эмнэлэгт яг тохирно. drugs.ts-д minAgeMo: 0 гэсэн эмүүдийг энэ " +
      "зааврын дагуу дахин шалгах.",
  },

  "who-emlc-2025": {
    id: "who-emlc-2025",
    citation:
      "World Health Organization. WHO Model List of Essential Medicines for " +
      "Children, 10th list. Geneva: WHO; 2025.",
    publisher: "World Health Organization",
    edition: "10th list",
    year: 2025,
    url: "https://www.who.int/groups/expert-committee-on-selection-and-use-of-essential-medicines/essential-medicines-lists",
    tier: "open",
    reuse: { kind: "cc-by-nc-sa-3.0-igo" },
    lastVerified: "2026-08-17",
    relevanceMn:
      "2025 оны 9 сард шинэчлэгдсэн, хүүхдэд зориулсан 374 эм. " +
      "ТУНГИЙН эх сурвалж биш — харин 'дараагийн 50 эм юу байх вэ?' гэсэн " +
      "асуултын хариулт. Мөн хүүхдэд тохирох ФОРМУЛЯЦИЙГ (хөвмөл, дисперс " +
      "шахмал) заасан байдаг.",
  },

  "mn-burns-2015": {
    id: "mn-burns-2015",
    citation:
      "Түлэгдэлт. Хүүхдийг түлэгдэлтээс урьдчилан сэргийлэх хөтөлбөр. " +
      "Орч. Б.Цэцэгсайхан (АУ-ны доктор), С.Төгсдэлгэр (НЭМ-ийн магистр). " +
      "Хянасан: Э.Галбадрах (ГССҮТ, Түлэнхийн нөхөн сэргээх заслын тасгийн " +
      "эрхлэгч), Ж.Олзвой (Хүний гавъяат эмч, клиникийн профессор), " +
      "Л.Наранбат (АШУҮИС). Улаанбаатар: Эрүүл Үрс Гэрэлт Ирээдүй ТББ; 2015.",
    publisher: "Эрүүл Үрс Гэрэлт Ирээдүй ТББ (saveinfants.mn)",
    edition: "2015",
    year: 2015,
    url: "https://www.saveinfants.mn/wp-content/uploads/2016/04/tulegdelt_saveinfants.mn_.pdf",
    tier: "cite-only",
    reuse: {
      kind: "cite-only",
      note:
        "«Ашиг олох зорилгоор худалдахыг хориглоно» гэсэн заалттай — " +
        "арилжааны бус хэрэглээнд тохирно. Хүснэгт, өгүүлбэрийг бүтнээр " +
        "хуулахгүй; утгыг гаргаж авч ишлэнэ.",
    },
    lastVerified: "2026-08-18",
    relevanceMn:
      "★ МОНГОЛ ХЭЛ ДЭЭРХ ТҮЛЭГДЭЛТИЙН ЦОРЫН ГАНЦ БҮРЭН ЭХ СУРВАЛЖ. " +
      "Эх материал: Handbook of Burns Vol.1 (Jeschke et al.), Total Burn " +
      "Care (Herndon), Emergency Management of Severe Burns (ANZBA, 17 дахь " +
      "хэвлэл 2013/2014), Түлэгдэлт хөлдөлт (Ж.Олзвой 2006). " +
      "Монголын түлэнхийн салбарын тэргүүлэх мэргэжилтнүүд хянасан тул " +
      "олон улсын эх сурвалжийг Монголын практикт буулгасан гүүр болно. " +
      "⚠️ 2015 он — 2020+ шаардлагыг ганцаараа хангахгүй, шинэ эх сурвалжтай " +
      "хосолж ишлэгдэнэ. " +
      "⚠️ ЭМЯ-аар батлагдаагүй, ТББ-ын хэвлэл тул A_mn_approved БИШ.",
  },

  "mn-imci-chartbook-2019": {
    id: "mn-imci-chartbook-2019",
    citation:
      "Эрүүл мэндийн яам, UNICEF Mongolia. Хүүхдийн өвчний цогц менежмент " +
      "(ХӨЦМ) — эмнэлзүйн хүснэгтийн эмхэтгэл. Улаанбаатар; 2019.",
    publisher: "ЭМЯ / UNICEF Mongolia",
    edition: "2019",
    year: 2019,
    tier: "regulatory-mn",
    reuse: {
      kind: "public-domain-mn-law",
      note:
        "ЭМЯ-ны албан ёсны хөтөлбөрийн материал. ДЭМБ/UNICEF-ийн IMCI-г " +
        "Монголд дасгасан хувилбар. Хүснэгтийг бүтнээр хуулахгүй — утгыг " +
        "гаргаж авч, эх сурвалжийг ишлэнэ.",
    },
    lastVerified: "2026-08-17",
    relevanceMn:
      "★★ ЭМЯ-ААР БАТЛАГДСАН, МОНГОЛ ХЭЛ ДЭЭР, ЖИНГИЙН МУЖААР ТУНТАЙ. " +
      "Энэ эх сурвалжид тулгуурласан дүрэм A_mn_approved түвшинд орно. " +
      "Монголын эмч нар үүгээр сургагдсан тул тооцоолуур нь тэдний бодит " +
      "дадалтай нийцнэ. " +
      "⚠️ 2019 он — 2020+ шаардлагыг ГАНЦААРАА хангахгүй тул ДЭМБ-ын " +
      "2022–2024 оны зааврын аль нэгтэй хосолж ишлэгдэнэ. " +
      "⚠️ IMCI 2014-ийн үеийн агуулгатай: WHO 2024 нь цайрыг 20 → 5 мг " +
      "болгож бууруулсан. Зөрчилдвөл conflictNote-д бүртгэж, эмч шийднэ.",
  },

  "who-imci-chartbook-2014": {
    id: "who-imci-chartbook-2014",
    citation:
      "World Health Organization / UNICEF. Integrated Management of Childhood " +
      "Illness (IMCI) — Chart Booklet. Geneva: WHO; March 2014.",
    publisher: "WHO / UNICEF",
    edition: "March 2014",
    year: 2014,
    url: "https://www.who.int/publications/i/item/9789241506823",
    tier: "open",
    reuse: { kind: "cc-by-nc-sa-3.0-igo" },
    lastVerified: "2026-08-17",
    relevanceMn:
      "★ ЖИНГИЙН МУЖААР ТУНГИЙН ХҮСНЭГТ. Анхан шатны тусламжийн эмүүдийг " +
      "(amoxicillin, ciprofloxacin, paracetamol, cotrimoxazole, төмөр, " +
      "A аминдэм, цайр, diazepam, salbutamol) насны/жингийн муж бүрд " +
      "шахмал/мл-ээр шууд заасан. Тооцоолол хийхгүй байхаар зориудаар " +
      "зохиогдсон — бидний схемийн weight_band-д яг тохирно. " +
      "★★ Монголд ХӨЦМ нэрээр ЭМЯ 2000 оноос нэвтрүүлсэн, монгол хэл дээрх " +
      "хувилбар байдаг — тэр баримтыг олж ашиглавал A_mn_approved түвшин болно. " +
      "⚠️ 2014 он — WHO 2024-тэй зөрчилдвөл 2024 давуу (жишээ: цайр 20 → 5 мг).",
  },

  "who-formulary-children-2010": {
    id: "who-formulary-children-2010",
    citation:
      "World Health Organization. WHO Model Formulary for Children 2010. " +
      "Geneva: WHO; 2010. ISBN 9789241599320.",
    publisher: "World Health Organization",
    edition: "1st edition",
    year: 2010,
    url: "https://www.who.int/publications/i/item/9789241599320",
    tier: "open",
    reuse: { kind: "cc-by-nc-sa-3.0-igo" },
    lastVerified: "2026-08-17",
    relevanceMn:
      "★ ЭМЭЭР ИНДЕКСЛЭГДСЭН ЦОРЫН ГАНЦ НЭЭЛТТЭЙ ЭХ СУРВАЛЖ. 240+ эмийн " +
      "хэрэглээ, ТУН, гаж нөлөө, хориглох заалт. WHO-ийн өвчнөөр " +
      "индексэлсэн зааврууд хамардаггүй ангилалуудыг (антигистамин, PPI, " +
      "бөөлжилт намдаах, зүрх судас, таталтын эсрэг) энэ л хамарна. " +
      "⚠️ 2010 он — антибиотикт ГАНЦААРАА ашиглахгүй, AWaRe (2022) давуу. " +
      "Тогтвортой ангилалд (антигистамин, витамин г.м.) хүчинтэй.",
  },

  // ── ТУСЛАХ: хуучин боловч тодорхой хэсэгтээ хүчинтэй ─────────────────────

  "who-pocketbook-2": {
    id: "who-pocketbook-2",
    citation:
      "World Health Organization. Pocket book of hospital care for children: " +
      "guidelines for the management of common childhood illnesses. 2nd ed. Geneva: WHO; 2013.",
    publisher: "World Health Organization",
    edition: "2nd edition (3 дахь хэвлэл гараагүй)",
    year: 2013,
    url: "https://www.who.int/publications/i/item/978-92-4-154837-3",
    tier: "open",
    reuse: {
      kind: "cc-by-nc-sa-3.0-igo",
      note:
        "2017 оноос өмнөх хэвлэл тул албан ёсоор CC лицензээр дахин гараагүй. " +
        "WHO арилжааны бус ашиглалтыг дэмждэг.",
    },
    lastVerified: "2026-08-17",
    relevanceMn:
      "⚠️ ЗЭРЭГЛЭЛ БУУРУУЛСАН. 13 жилийн настай, 3 дахь хэвлэл гараагүй. " +
      "АНТИБИОТИКИЙН ТУНД ГАНЦААРАА АШИГЛАХГҮЙ — AWaRe (2022) болон " +
      "уушгины хатгааны заавар (2024) давуу. " +
      "ХАРИН дараах зүйлд ХҮЧИНТЭЙ ХЭВЭЭР: аюулын шинж тэмдэг (danger signs), " +
      "шингэн эмчилгээ, хүнд хэлбэрийн хоол тэжээлийн дутагдал, дэмжих " +
      "эмчилгээ, эмнэлгийн бус нөхцөлийн зохион байгуулалт.",
  },

  // ───────────────────────────────────────────────────────────────────────────
  // TIER 2 — Монгол улсын албан ёсны эх сурвалж. ЗААВАЛ ДАВУУ ЭРХТЭЙ.
  // ───────────────────────────────────────────────────────────────────────────

  "mn-hdc-guidelines": {
    id: "mn-hdc-guidelines",
    citation:
      "Эрүүл мэндийн хөгжлийн төв. Эмнэлзүйн заавар, удирдамжийн эмхэтгэл. Улаанбаатар.",
    publisher: "Эрүүл мэндийн хөгжлийн төв (ЭМХТ)",
    edition: "цахим эмхэтгэл",
    year: 2025,
    url: "https://hdc.gov.mn/post/1141/",
    tier: "regulatory-mn",
    reuse: { kind: "public-domain-mn-law" },
    lastVerified: "2026-08-17",
    relevanceMn:
      "ЭМЯ-ны сайдын тушаалаар батлагдсан. Олон улсын эх сурвалжтай ЗӨРЧИЛДВӨЛ " +
      "Монголын эмчийн хувьд ЭНЭ ДАВУУ. Хүүхдэд хамаатай: астма, уушгины хатгаа, " +
      "яаралтай тусламжийн эрэмбэ. Анхаар: сайтын зарим PDF линк буруу " +
      "(хатгаа/АБӨ/астма гурав нэг л A130.pdf руу заасан) — эх файлыг тус тусад нь баталгаажуулах.",
  },

  "mn-drug-registry": {
    id: "mn-drug-registry",
    citation:
      "Эм, эмнэлгийн хэрэгслийн хяналт, зохицуулалтын газар. " +
      "Монгол Улсын эмийн бүртгэлд бүртгэлтэй эмийн жагсаалт.",
    publisher: "ЭЭХХЗГ / ЭМЯ",
    edition: "тогтмол шинэчлэгддэг",
    year: 2026,
    url: "https://www.emiinjor.mn/",
    tier: "regulatory-mn",
    reuse: { kind: "public-domain-mn-law" },
    lastVerified: "2026-08-17",
    relevanceMn:
      "~3,900 эм бүртгэлтэй. ТУНГИЙН эх сурвалж БИШ — харин ямар concentration, " +
      "ямар formulation Монголд БОДИТООР байгааг тодорхойлно. " +
      "Amoxicillin 400mg/5ml Монголд байхгүй бол UI дээр санал болгох нь утгагүй. " +
      "formulation.availableInMn талбарын эх сурвалж.",
  },

  "mn-druginfo-spc": {
    id: "mn-druginfo-spc",
    citation:
      "Эрүүл мэндийн яам. Бүртгэлтэй эм, оношлуур, эрүүл мэндийн нэмэлт " +
      "бүтээгдэхүүний мэдээллийн сан (LicemedWeb) — зөвшөөрөгдсөн хэрэглэх заавар.",
    publisher: "ЭМЯ / ЭЭХХЗГ",
    edition: "цахим сан, тогтмол шинэчлэгддэг",
    year: 2026,
    url: "http://druginfo.mohs.mn/",
    tier: "regulatory-mn",
    reuse: {
      kind: "public-domain-mn-law",
      note:
        "Төрийн нээлттэй мэдээллийн сан. Гэхдээ ЗААВРЫН ТЕКСТ-ийг бүтээгдэхүүний " +
        "лиценз эзэмшигч бичсэн тул урт хэсгийг бүтнээр нь дахин нийтлэхгүй. " +
        "Бүтэцтэй БАРИМТ (тун хэмжээ, эмийн хэлбэр, олгох нөхцөл, хориглох заалт) " +
        "гаргаж авч, эх сурвалжийг ишлэнэ.",
    },
    lastVerified: "2026-08-17",
    relevanceMn:
      "⚠️ ТУНГИЙН ГОЛ ЭХ СУРВАЛЖ БОЛГОЖ БОЛОХГҮЙ. Заавар дахь тун нь бүртгэлийн " +
      "үед ирүүлсэн, ихэвчлэн хуучирсан байдаг (жишээ: Амоксан-ий заавар " +
      "20–40 мг/кг/өдөр гэсэн бол WHO 40–50, хүнд халдварт 80–90 мг/кг/өдөр). " +
      "ХАРИН дараах зүйлд ХАМГИЙН САЙН эх сурвалж: " +
      "(1) Монголд бодитоор байгаа concentration/formulation, " +
      "(2) кирилл INN нэршил (латин INN-тэй тааруулахад), " +
      "(3) олгох нөхцөл (жороор/жоргүй/мансууруулах), " +
      "(4) хориглох заалт, гаж нөлөө монгол хэлээр, " +
      "(5) ЗШЭ/Хүүхэд/ тэмдэглэгээ — хүүхдэд зөвшөөрөгдсөн заавартай эсэх, " +
      "(6) бүртгэлийн хүчинтэй хугацаа.",
  },

  // ───────────────────────────────────────────────────────────────────────────
  // TIER 3 — Зөвхөн БАТАЛГААЖУУЛАЛТАД. ХУУЛЖ БОЛОХГҮЙ.
  // ───────────────────────────────────────────────────────────────────────────

  "rch-melbourne-cpg": {
    id: "rch-melbourne-cpg",
    citation:
      "The Royal Children's Hospital Melbourne. Clinical Practice Guidelines " +
      "— Acute pain management.",
    publisher: "RCH Melbourne",
    edition: "цахим, тогтмол шинэчлэгддэг (Acute pain management: 2024 оны 10 сард шинэчилсэн)",
    year: 2024,
    url: "https://www.rch.org.au/clinicalguide/guideline_index/Analgesia_and_Sedation/",
    tier: "cite-only",
    reuse: {
      kind: "cite-only",
      note:
        "Үнэ төлбөргүй харна, гэхдээ RCH-ийн зохиогчийн эрхтэй. " +
        "Хүснэгт, өгүүлбэр ХУУЛАХГҮЙ — тунгийн УТГЫГ гаргаж авч, өөрийн " +
        "монгол текстээр бичиж, эх сурвалжийг ишлэнэ. Тоо нь баримт тул " +
        "зохиогчийн эрхээр хамгаалагддаггүй.",
    },
    lastVerified: "2026-08-20",
    relevanceMn: "Чанартай, тогтмол шинэчлэгддэг, үнэ төлбөргүй. Cross-check-ийн гол хэрэгсэл.",
  },

  "rch-melbourne-gastroenteritis": {
    id: "rch-melbourne-gastroenteritis",
    citation:
      "The Royal Children's Hospital Melbourne. Clinical Practice Guidelines " +
      "— Gastroenteritis.",
    publisher: "RCH Melbourne",
    edition: "цахим, тогтмол шинэчлэгддэг (сүүлд шинэчилсэн 2025-08)",
    year: 2025,
    url: "https://www.rch.org.au/clinicalguide/guideline_index/Gastroenteritis/",
    tier: "cite-only",
    reuse: {
      kind: "cite-only",
      note:
        "Үнэ төлбөргүй харна, гэхдээ RCH-ийн зохиогчийн эрхтэй. " +
        "Хүснэгт, өгүүлбэр ХУУЛАХГҮЙ — тунгийн УТГЫГ гаргаж авч, өөрийн " +
        "монгол текстээр бичиж, эх сурвалжийг ишлэнэ.",
    },
    lastVerified: "2026-08-20",
    relevanceMn:
      "★ Суулгалт/бөөлжилттэй хүүхдэд ондансетрон хэрэглэх стандарт " +
      "заавар — жингийн мужаар анхны тунг, mg/кг томьёог хоёуланг нь " +
      "өгдөг. MSF-тэй хамт хоёр дахь бие даасан баталгаажуулалт болно.",
  },

  "starship-nz": {
    id: "starship-nz",
    citation: "Starship Child Health. Clinical Guidelines. Auckland, New Zealand.",
    publisher: "Starship Child Health",
    edition: "цахим, тогтмол шинэчлэгддэг",
    year: 2025,
    url: "https://starship.org.nz/guidelines/",
    tier: "cite-only",
    reuse: { kind: "cite-only", note: "Зохиогчийн эрхтэй. Зөвхөн cross-check." },
    lastVerified: "2026-08-17",
    relevanceMn: "RCH-тэй хамт хоёр дахь бие даасан баталгаажуулалт болно.",
  },

  "chq-antibiocard": {
    id: "chq-antibiocard",
    citation:
      "Children's Health Queensland Hospital and Health Service. " +
      "Paediatric Antibiocard: Empirical Antibiotic Guidelines. " +
      "CHQ-GDL-01202, V12.0.",
    publisher: "Children's Health Queensland (Queensland Health)",
    edition: "V12.0 (батлагдсан 2026-06-23, хүчинтэй 2026-07-30 — 2031 хүртэл)",
    year: 2026,
    url: "https://www.childrens.health.qld.gov.au/__data/assets/pdf_file/0037/176878/Antibiocard.pdf",
    tier: "cite-only",
    reuse: {
      kind: "cite-only",
      note:
        "Queensland Health-ийн албан ёсны эмнэлзүйн заавар, үнэ төлбөргүй " +
        "PDF. Тодорхой CC лиценз заагаагүй тул cite-only гэж үзэв — " +
        "хүснэгт хуулахгүй, тунгийн утгыг гаргаж авч ишлэнэ.",
    },
    lastVerified: "2026-08-20",
    relevanceMn:
      "★ Австралийн муж улсын хүүхдийн эмнэлгийн сүлжээний эмпирик " +
      "антибиотикийн заавар — жил бүр шинэчлэгддэг, өвчлөлөөр " +
      "индексэлсэн, mg/kg тунгаа тодорхой заасан. RCH-тэй ижил зэрэглэлийн " +
      "Австралийн эх сурвалж боловч ӨӨР байгууллага тул бие даасан " +
      "хоёр дахь баталгаажуулалт болно.",
  },

  "pch-medication-manual": {
    id: "pch-medication-manual",
    citation:
      "Perth Children's Hospital, Child and Adolescent Health Service " +
      "(WA Health). Medication Management Manual — Monograph: Diazepam.",
    publisher: "Perth Children's Hospital (WA Health, Australia)",
    edition: "сүүлд хянасан 2026-01, батлагдсан 2026-03, дараагийн review 2029-02",
    year: 2026,
    url: "https://pch.health.wa.gov.au/~/media/Files/Hospitals/PCH/General-documents/Health-professionals/MedicationMonographs/Diazepam.pdf",
    tier: "cite-only",
    reuse: {
      kind: "cite-only",
      note:
        "Western Australia-ийн эрүүл мэндийн албаны албан ёсны заавар, " +
        "үнэ төлбөргүй PDF. Тодорхой CC лиценз заагаагүй тул cite-only.",
    },
    lastVerified: "2026-08-20",
    relevanceMn:
      "★ Австралийн хүүхдийн эмнэлгийн эмийн зааврын дэлгэрэнгүй " +
      "monograph — заалт тус бүрээр (булчингийн таталт, түгшүүр, " +
      "premedication, эпилепсийн статус) ялгаатай mg/kg тунтай. " +
      "⚠️ Одоогоор энэ эм дээр ганц эх сурвалж — хоёр дахь нь дутуу " +
      "(known-gaps.ts-г үз).",
  },

  "pch-phenobarbital-monograph": {
    id: "pch-phenobarbital-monograph",
    citation:
      "Perth Children's Hospital, Child and Adolescent Health Service " +
      "(WA Health). Medication Management Manual — Monograph: Phenobarbital.",
    publisher: "Perth Children's Hospital (WA Health, Australia)",
    edition: "сүүлд хянасан 2023-11, батлагдсан 2024-05, endorsed 2024-06, дараагийн review 2026-11",
    year: 2024,
    url: "https://www.pch.health.wa.gov.au/~/media/Files/Hospitals/PCH/General-documents/Health-professionals/MedicationMonographs/Phenobarbital.pdf",
    tier: "cite-only",
    reuse: {
      kind: "cite-only",
      note:
        "Western Australia-ийн эрүүл мэндийн албаны албан ёсны заавар, " +
        "үнэ төлбөргүй PDF. Тодорхой CC лиценз заагаагүй тул cite-only.",
    },
    lastVerified: "2026-08-20",
    relevanceMn:
      "★ Ерөнхий хүүхдийн (4 долоо хоногоос 18 нас хүртэл) фенобарбиталын " +
      "уух/IV тунг заалт бүрээр нарийн зааж, эхлэх тун → аажим нэмэгдүүлэх " +
      "→ ердийн барих тун гэсэн titration схемийг тодорхой заасан цорын " +
      "ганц эх сурвалж. Нярайн (<4 долоо хоног) тунг тусад нь заасан " +
      "'Neonatal Medication Protocols'-руу чиглүүлдэг тул нярайн тунг " +
      "энд ОРУУЛААГҮЙ.",
  },

  "qcg-neonatal-omeprazole": {
    id: "qcg-neonatal-omeprazole",
    citation:
      "Queensland Clinical Guidelines. Neonatal monograph: Omeprazole. " +
      "ID NMedQ23.105-V1-R28. Queensland Health.",
    publisher: "Queensland Health (Clinical Excellence Queensland)",
    edition: "V1 (хүчинтэй 2023-06-13, дараагийн review 2028-06-13)",
    year: 2023,
    url: "https://www.health.qld.gov.au/__data/assets/pdf_file/0027/1225485/nmq-omeprazole.pdf",
    tier: "cite-only",
    reuse: {
      kind: "cite-only",
      note:
        "Queensland Health-ийн албан ёсны эмнэлзүйн заавар, үнэ төлбөргүй " +
        "PDF. Тодорхой CC лиценз заагаагүй тул cite-only гэж үзэв — " +
        "хүснэгт хуулахгүй, тунгийн утгыг гаргаж авч ишлэнэ.",
    },
    lastVerified: "2026-08-20",
    relevanceMn:
      "★ НЯРАЙН тунгийн монограф — эхлэх 1 мг/кг/өдөр, 7–14 хоногийн дараа " +
      "хариу үнэлж, шаардлагатай бол 0.5 мг/кг/өдрөөр нэмэгдүүлж, дээд " +
      "2.5 мг/кг/өдөр хүртэл titration хийдэг. MSF-ийн <5кг бүлгийн " +
      "0.7–1.4 мг/кг (дээд 2.8 мг/кг)-тэй хэмжээгээрээ нийцнэ — жижиг " +
      "нярай/өвчтөнд хоёр дахь бие даасан баталгаажуулалт болно. " +
      "⚠️ ≥5кг жинтэй хүүхдийн тогтмол мг тунг (5/10/20мг) баталгаажуулахгүй " +
      "— зөвхөн нярайн mg/kg titration схемийг л хамарна.",
  },

  "msf-essential-drugs": {
    id: "msf-essential-drugs",
    citation:
      "Médecins Sans Frontières. Essential drugs — practical guidelines.",
    publisher: "Médecins Sans Frontières (MSF)",
    edition: "2026 оны 1 сарын хэвлэл (сүүлд шинэчилсэн: 2026 оны 6 сар)",
    year: 2026,
    url: "https://medicalguidelines.msf.org/en/viewport/EssDr/english/essential-drugs-16682376.html",
    tier: "cite-only",
    reuse: {
      kind: "cite-only",
      note:
        "Үнэ төлбөргүй харна, гэхдээ MSF-ийн зохиогчийн эрхтэй " +
        "(«No reproduction, translation and adaptation may be done without " +
        "the prior permission of the Copyright owner»). Хүснэгт, өгүүлбэр " +
        "ХУУЛАХГҮЙ — тунгийн УТГЫГ гаргаж авч, өөрийн монгол текстээр бичиж, " +
        "эх сурвалжийг ишлэнэ.",
    },
    lastVerified: "2026-08-20",
    relevanceMn:
      "★ Олон улсын гуманитар анагаах ухааны байгууллагын эмнэлзүйн " +
      "зааврын гарын авлага. Эм тус бүрийн хуудсанд «Last updated» огноотой. " +
      "RCH-тэй хамт хоёр дахь бие даасан баталгаажуулалт болно. Насны " +
      "мужаар (жишээ нь <1 сар / ≥1 сар / >3 сар) тунгийн ялгааг тодорхой " +
      "заасан тул хүүхдийн тунгийн эх сурвалж болгоход тохиромжтой. " +
      "⚠️ Retracted WHO 2012 «Persisting pain in children» зааврыг ОРЛУУЛАХ " +
      "зорилгоор сонгосон (тэр эх сурвалжийг ДЭМБ 2020 онд буцаан татсан).",
  },
};
