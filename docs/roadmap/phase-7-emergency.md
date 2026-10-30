# Шат 7 — Яаралтай тусламжийн горим `/emergency`

**Хугацаа:** ~2 долоо хоног · Plan mode · **Хамаарал:** 1 (offline), 6 (IV), S3 ·
**Унших:** `docs/recipes/add-calculator.md`, `lib/data/CLAUDE.md`, `docs/sources/tiers.md`

## Аюулгүй байдал (заавал)
- `E_unverified` мөр энэ хуудсанд **огт харагдахгүй**. Мөр бүр эх сурвалжтай.
- Бодит тун нэмэхээс өмнө эм тус бүрийн ишлэлийг хэрэглэгчид үзүүлж батлуул.
- Насаар жин тооцох томьёо энэ шатанд НЭМЭХГҮЙ.

## Хийх
- Нэг жин → нэг дэлгэц, том тоо, animation-гүй.
- Эм: adrenaline, atropine, adenosine, amiodarone, midazolam/diazepam,
  glucose г.м. — ердийн Drug/DosingRule (`route` iv/io), `category: "emergency"`.
- Эм бус: defibrillation J/кг, ETT хэмжээ, bolus — `lib/calculators/emergency/`.
- Эх сурвалж: `docs/sources/tiers.md`-ийн зөвшөөрөгдсөн (жишээ WHO ETAT). Шинэ
  эх сурвалжийн шатыг нэмэх бол шалтгаантай асуу.
- Нэг хуудас «жингийн карт» хэвлэх.

## Шалгуур
Тооцоо бүрийн тест; unverified шүүгдэж байгаа тест; offline-д ажиллана.
