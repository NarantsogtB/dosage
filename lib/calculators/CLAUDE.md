# lib/calculators — эм бус тооцоолуурууд

`<нэр>/` хавтас бүрд томьёо тутамд нэг цэвэр функц. React, I/O байхгүй.
Одоо: `burns/` (TBSA Lund-Browder, Parkland, Galveston, urine target, ivy limit,
age band), `fluid/` (maintenance, bolus), `bsa/` (Mosteller).

## Дүрэм

- Томьёо бүрийн JSDoc-д эх сурвалж (зохиогч/удирдамж, он, хуудас).
  Коэффициент, хязгаар зохиохгүй — ишлэлгүй бол зогсоод асуу.
- Тест `tests/calculators/<нэр>.test.ts` — нийтлэгдсэн жишээ тооцоогоор,
  хил дээрх утга (0, хамгийн бага/их жин).
- Түлэгдэлтийн эх сурвалжийн тэмдэглэл: `docs/BURNS-SOURCE-NOTES.md`.
- `fluid/` нь `/burns`-д ашиглагддаг — өөрчилбөл burns тест давах ёстой.
- Шинэ тооцоолуур бүхэлд нь: `docs/recipes/add-calculator.md`.
