# lib/data — эмнэлзүйн өгөгдөл

Энд **логик бичихгүй**. ESLint-ийн хэмжээний дүрэм энд хаалттай.

## Эмийн файл (`drugs/<id>.ts`)

- Нэг эм = нэг файл, `export const <camelId>: Drug`. Төрөл: `lib/domain/drug.ts`,
  `dosing-rule.ts`, `dosing-basis.ts`, `dose-cap.ts`, `formulation.ts`, `source.ts`.
- `drugs/index.ts`-д импорт + `DRUGS` массивт мөр нэмнэ (цагаан толгойн дараалал).
- Файлын толгойн тайлбар = эх сурвалжийн түүх (юуг, юугаар, хэзээ
  баталгаажуулсан, зөрүү). Засахдаа шинэчил.
- Эм олон `rules`-тэй: заалт (`indication`), нас (сар), жин, `basis`
  (`per_kg_per_dose` | `per_kg_per_day` | `weight_band` | `fixed`), `frequency`,
  `duration`, `caps`, `route`, `evidenceLevel`, `sources`, `isDefault`, `conflictNote`.
- Нэгж: одоогоор **зөвхөн мг**. мкг/ED/ммоль хэрэгтэй бол зогсоод асуу
  (`docs/roadmap/phase-S4-units.md`).
- Худалдааны нэр (brand) ОРУУЛАХГҮЙ — зөвхөн INN (`inn`, `innMn`).
- `status`: `active` | `draft` | `retired`.

## Нотолгоо (дүрэм тус бүрд)

| Түвшин | Утга |
|---|---|
| `A_mn_approved` | ЭМЯ-ны тушаалаар батлагдсан заавар |
| `B_who` | ДЭМБ 2022–2025 |
| `C_international` | RCH, Starship, PCH г.м. |
| `D_label_only` | Зөвхөн Монголын бүртгэлийн заавар |
| `E_unverified` | Эх сурвалжгүй — `sources: []` байх ЁСТОЙ |

`tests/data/verified-drugs.test.ts` шалгана: E биш дүрэм бүр **≥2 эх сурвалж**,
тус бүр `locator` + `quotedValue`, ≥1 нь 2020+. Түр үл хамаарал зөвхөн
`tests/data/known-gaps.ts`-д тайлбар + дараагийн алхамтай.

`evidenceLevel` = эх сурвалжийн чанар. Эмчийн хяналт = `reviewedBy` +
`lastReviewed` — тусдаа, хольж болохгүй.

## Эх сурвалж (`sources/registry.ts`)

Шинэ эх сурвалж нэмэхээс өмнө зөвшөөрөгдсөн эсэхийг шалга:
`docs/sources/tiers.md` (шатлал, хориотой жагсаалт — UpToDate, Lexicomp…; BNFc зөвхөн зөрүү шийдэхэд).
Хүснэгт, өгүүлбэр хуулахгүй — утгыг гаргаж, өөрийн монгол текстээр бичнэ.

## Жор

- Шинэ эм: `docs/recipes/add-drug.md`
- Баталгаажуулах: `docs/recipes/verify-drug.md`
