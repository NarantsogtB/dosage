# lib/calculators — эм бус тооцоолуурууд

`<нэр>/` хавтас бүрд томьёо тутамд нэг цэвэр функц. React, I/O байхгүй.
Одоо: `burns/` (TBSA Lund-Browder, Parkland, Galveston, urine target, ivy limit,
age band), `fluid/` (maintenance, bolus, deficit — `/fluids`), `bsa/` (Mosteller).

## Дүрэм

- Томьёо бүрийн JSDoc-д эх сурвалж (зохиогч/удирдамж, он, хуудас).
  Коэффициент, хязгаар зохиохгүй — ишлэлгүй бол зогсоод асуу.
- Тест `tests/calculators/<нэр>.test.ts` — нийтлэгдсэн жишээ тооцоогоор,
  хил дээрх утга (0, хамгийн бага/их жин).
- Түлэгдэлтийн эх сурвалжийн тэмдэглэл: `docs/BURNS-SOURCE-NOTES.md`.
- `fluid/` — `/fluids` (RCH IV fluids 2026, WHO Pocket Book 2013). Эмчийн
  шийдвэр: DECISIONS 2026-11-04.
- `emergency/items.ts` — `/emergency`-ийн эм бус мөр (болюс 10/20 мл/кг; эх
  сурвалж ≥2 + эмчийн баталгаагүй бол нэмэхгүй — Шат 7b).
- `registry.ts` — тооцоолуурын НЭГ бүртгэл (nav, sitemap, analytics эндээс
  уншина). React-гүй — серверт ч ажилладаг.
- Шинэ тооцоолуур бүхэлд нь: `docs/recipes/add-calculator.md`.
