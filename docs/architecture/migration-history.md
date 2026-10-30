<!-- ARCHITECTURE.md-аас хуваасан. Бусад хэсэг: ./README.md -->
## 5. Шилжүүлэлтийн төлөвлөгөө

Одоогийн байдал: **шинэ engine бэлэн, өгөгдөл хуучин хэвээр.**
Апп ажиллаж байна — `lib/calculations.ts` хөндөгдөөгүй.

| Алхам | Ажил | Төлөв |
|---|---|---|
| 1 | Lint дүрэм, Vitest, хавтасны бүтэц | ✅ |
| 2 | Domain типүүд (Drug + DosingRule[] + DoseCap) | ✅ |
| 3 | Engine функцүүд, файл тутамд нэг үүрэг | ✅ |
| 4 | Snapshot хамгаалалт (хуучин engine) | ✅ |
| 5 | 50 эмийг `lib/data/drugs/<id>.ts` рүү шилжүүлэх | ✅ |
| 6 | UI-г шинэ engine рүү залгах | ✅ |
| 7 | Эх сурвалж нэмэх (50 эм), `D_unverified` арилгах | ⬜ |

### Алхам 5 — юу хийгдсэн, юу үлдсэн

`scripts/migrate-drugs.mjs` нь **нэг удаагийн** codemod. Ажилласан, дахин
ажиллуулахгүй. Одооноос `lib/data/drugs/` нь эх сурвалж — гараар засварлана.

**Хийгдсэн:** бүтцийн хөрвүүлэлт. `domperidone`-ы hardcode хязгаар
өгөгдөл болов. Тунгийн утга **нэг ч миллиграммаар өөрчлөгдөөгүй** —
`tests/equivalence.test.ts` 350 тохиолдол дээр 0 ялгаа баталсан.

**Үлдсэн:** эм бүр `evidenceLevel: "D_unverified"`, `sources: []`,
`lastReviewed: "1970-01-01"`. Эдгээр нь **зориуд илэрхий худал** утга —
бөглөгдөөгүйг нуухгүй, харин тоолж болохуйц өр болгож харуулна.
`docs/SOURCES.md`-ийн ажлын урсгалын дагуу эм бүрд:

```
sources[] → evidenceLevel → lastReviewed → reviewedBy
          → contraindicationsMn → availableInMn → warnings[].level
```

Файл бүрийн толгойд энэ 6 алхмын жагсаалт тайлбар болгон байгаа.

### Тэнцвэрийн тест зогссон (2026-10-30, roadmap S1)

Хуучин engine (`lib/drugs.ts`, `lib/calculations.ts`), `equivalence.test.ts`,
492KB snapshot, codemod устгагдсан. Хамгаалж байсан basis/cap/хэлбэрийн
салаа нь `tests/engine/`-д fixture тест болж, бодит өгөгдөлд тоо биш
инвариант (`real-drug-invariants.test.ts`) үлдсэн. Шийдвэр: `docs/DECISIONS.md`.

**Тэнцвэрээс санаатай салсан эмүүд** (`tests/helpers/intentional-changes.ts`-ээс,
дэлгэрэнгүй шалтгаан git түүхэнд):

| Эм | Өөрчлөлт | Эх сурвалж |
|---|---|---|
| zinc-sulfate | 1–2 мг/кг (дээд 20) → тогтмол 5 мг | `who-pneumonia-diarrhoea-2024` |
| ciprofloxacin | Цусан суулга: 15 мг/кг/тун, 3 хоног; насны доод 12 → 0 сар ⚠️ эмчийн баталгаа хүлээж буй | `who-pneumonia-diarrhoea-2024` |
| prednisolone | Астма: 1 мг/кг (дээд 40), 2–3 хоног | `rch-melbourne-cpg` |
| paracetamol | 10–15 мг/кг → 15 мг/кг (>1 сар), 10 мг/кг (<1 сар) | `rch-melbourne-cpg` |
| metronidazole | Нэг дүрэм → анаэроб (7.5–10 мг/кг tds) ба Giardia (30 мг/кг od, 3 хоног) | `msf-essential-drugs` |
| gentamicin | 5 мг/кг → 4.5–7.5 мг/кг, ≥1 сар; нярайн тун ороогүй | `msf-essential-drugs` |
| diazepam | Уух: 0.1 мг/кг, өдрийн дээд 15 мг, ≥1 сар | `pch-medication-manual` |
| phenobarbital | Барих тун 3–6 мг/кг/өдөр, ≥1 сар; per_dose cap хасав | `msf-essential-drugs` |
| ondansetron | 0.1–0.15 мг/кг, bd, cap 4/8 мг, зөвхөн уух | `msf-essential-drugs` |
| omeprazole | <5 кг per_kg_per_day, ≥5 кг weight_band; насны доод 12 → 0 | `msf-essential-drugs` |

### Эмчийн шийдвэрээр өөрчилсөн тун (2026-10-30, roadmap 0b)

«Монголын удирдамжтай хамгийн ойр» → ЭМЯ-ны хүүхдийн удирдамж байхгүй тул
ДЭМБ. Дэлгэрэнгүй: `docs/sources/pending-decisions-2026-10.md`.

| Дүрэм | Өмнө | Дараа |
|---|---|---|
| amoxicillin-general | 40–90 мг/кг/хон × 3, дээд 1 г / 3 г | 80–90 мг/кг/хон × 2, дээд 1 г / 2 г |
| amoxicillin-clavulanate-general | 40–90 мг/кг/хон × 2 | 80–90 мг/кг/хон × 2 |
| ceftriaxone-general | 50–100 мг/кг, дээд 4 г, 0 сар | 80–100 мг/кг, дээд 3 г, 1 сар |
| cephalexin-general | 25–50 мг/кг/хон × 4, дээд 500 мг | 25 мг/кг × 2, дээд 1 г |
| ciprofloxacin-general | 10–15 мг/кг × 2, 12 сар | 15 мг/кг × 2, 1 сар |
| doxycycline-general | 2–4 мг/кг/хон × 2 | 2 мг/кг × 2 |
| nitrofurantoin-general | 5–7 мг/кг/хон × 4, дээд 400 мг/хон | 1 мг/кг × 4, дээд 200 мг/хон |
| albendazole-general | <20 кг 200 мг, ≥20 кг 400 мг | <10 кг 200 мг, ≥10 кг 400 мг |
| fluconazole-general | 3–12 мг/кг, дээд 400 мг | 3–6 мг/кг, дээд 200 мг |
| furosemide-general | 1–2 мг/кг амаар/IV, дээд 600 мг/хон, 0 сар | 0.5–2 мг/кг амаар, дээд 80 мг/хон, 1 сар |
| spironolactone-general | 0 сараас | 1 сараас |
| sodium-valproate-general | 15–40 мг/кг/хон × 3, 0 сар | 12.5–15 мг/кг × 2, 1 сар |
| enalapril-general | 0.08–0.5 мг/кг | 0.1–0.5 мг/кг, хоногт ≤1 мг/кг |
| hydrocortisone | active | draft (нуусан) |

### Эм бүр нэг файл — яагаад

`lib/data/drugs/paracetamol.ts` (~40 мөр) хэлбэрээр. Шалтгаан:

- 500 эмтэй болоход нэг файл 15,000 мөр болохгүй
- Git diff цэвэр — нэг эм өөрчлөгдвөл нэг файл өөрчлөгдөнө
- Хянасан эмчийн нэрийг эм тус бүрд бүртгэхэд тохиромжтой
- Дараа database рүү шилжихэд мөр бүр нэг бичлэг болно
