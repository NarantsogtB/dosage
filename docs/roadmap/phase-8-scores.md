# Шат 8 — Clinical scores

**Хугацаа:** ~1 долоо хоног · **Хамаарал:** S3 · **Унших:** `docs/recipes/add-calculator.md`,
`lib/calculators/CLAUDE.md`

## Хийх
`lib/calculators/<нэр>/` цэвэр функц + тест, бүртгэлд group `scores`:
- GCS (насанд хүрэгч + хүүхдийн хэлбэр)
- Bedside Schwartz eGFR
- Corrected sodium (глюкоз)
- Corrected calcium (альбумин)
- Anion gap

## Шаардлага
- SI нэгж анхдагч (ммоль/л, мкмоль/л) — Монголын лаборатори; уламжлалт
  нэгжийн toggle.
- Томьёо бүр анхны нийтлэл/удирдамжийн ишлэлтэй; тест нь нийтлэгдсэн жишээгээр.
- Тайлбар (interpretation) зөвхөн эх сурвалжид байгаа хүрээгээр.
