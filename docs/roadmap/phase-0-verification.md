# Шат 0 — Эх сурвалж баталгаажуулалт

> **Энэ файл бол «50 эмийг яаж баталгаажуулах вэ?» асуултын ГАНЦ хариулт.**
> Шинэ төлөвлөгөө бүү гарга — доорх бүлгийг дагаж, дууссан мөрийг ✅ болго.
> Тоог `bun run evidence:report` → `docs/EVIDENCE-STATUS.md`-ээс ав.
> Эмчийн шийдвэрийн түүх: `docs/sources/pending-decisions-2026-10.md`.

## Төлөв (2026-11-03)

45 эм (5 retired) · **31 баталгаажсан** · 14 үлдсэн (15 `E` дүрэм). A түвшин 0.
Бүлэг 1 ✅, Бүлэг 4 ✅ (2026-11-03).

Үлдсэн 14 эм **2 өөр төрлийн** асуудалтай — бүлэг бүр өөр шийдэлтэй:

| Бүлэг | Эм | Асуудал | Хэн | Шийдэл |
|---|---|---|---|---|
| ✅ **1. Бараг бэлэн** | furosemide (+PCH 2024), spironolactone (+MSF), sodium-valproate (+MSF 2024, эмч: 2 наснаас), enalapril (known-gap — 2020+ олдсонгүй) | Тунг эмч шийдсэн. Ганц эх сурвалж (WHO Formulary 2010) — «≥2 эх сурвалж, ≥1 нь 2020+» дүрэм биелэхгүй | Агент | 2020+ хоёр дахь эх сурвалж (MSF, PCH, RCH, Starship, CHQ) олж нэм. Олдохгүй бол `known-gaps.ts`-д |
| **2. Эх сурвалж хайх** | carbamazepine, clonazepam, metoclopramide, captopril, famotidine, cetirizine, loratadine, diphenhydramine, acetylcysteine, salbutamol (амаар) | WHO/MSF/AWaRe-д хүүхдийн тун байхгүй | Агент → зөрвөл эмч | Хүүхдийн эмнэлгийн 2 заавар (PCH, RCH CPG, Starship, CHQ, QCG) → `C_international`. diazepam, ondansetron, phenobarbital, omeprazole-ийг яг ингэж хийсэн |
| **3. Бүтэц өөрчлөх** | aciclovir, hydrocortisone (draft), methylprednisolone, dexamethasone, propranolol | Engine-д тохирох тунгийн хэлбэр байхгүй (насаар тогтмол мг, мг/м²) эсвэл «ерөнхий» дүрмийг заалтаар хуваах шаардлагатай | Эмч (аль заалтыг үлдээх) → агент | Шат S4 (нэгж/basis)-тай хамт. Түр зуур одоогийн байдлаар |
| ✅ **4. Үлдээх үү, хасах уу** | loperamide, domperidone, ambroxol, promethazine, tramadol — **5-уулаа retired** (DECISIONS 2026-11-03) | Эх сурвалж хайх асуудал биш — эмнэлзүйн шийдвэр | **Зөвхөн эмч** | Эм бүрд: хасах (`status: "retired"`) эсвэл эх сурвалжтайгаар үлдээх |

## Дараалал

1. ✅ **Бүлэг 4** — эмч 5-уланг хасав (2026-11-03). `evidence:report` retired-ийг тоолохгүй.
2. ✅ **Бүлэг 1** — агент, 1 session (2026-11-03).
3. **Бүлэг 2** — агент, 2–3 session (нэг удаад 3–5 эм). Зөрүү гарвал эмч батална.
4. **Бүлэг 3** — Шат S4-ийн дараа.

## CLI prompt-ууд

Бүлэг 1:
```
docs/roadmap/phase-0-verification.md-ийн Бүлэг 1-ийг хий. Эмчийн шийдсэн
тунг өөрчлөхгүй — зөвхөн 2020+ хоёр дахь эх сурвалж нэмж docs/recipes/verify-drug.md-ийг дага.
```

Бүлэг 2 (давтана):
```
docs/roadmap/phase-0-verification.md-ийн Бүлэг 2-оос <эм1>, <эм2>, <эм3>-ийг
docs/recipes/verify-drug.md-ийн дагуу баталгаажуул.
```

Бүлэг 4 (эмч шийдсэний дараа):
```
docs/roadmap/phase-0-verification.md Бүлэг 4: <эм>-ийг retired болго,
<эм>-ийг үлдээж эх сурвалж хай. Шийдвэрийг docs/DECISIONS.md-д бич.
```

Бүлэг бүрийн дараа: `bun run evidence:report`, энэ файлын «Төлөв»-ийг шинэчил.

## Анхаар: «баталгаажсан» ≠ «эмч хянасан»

`evidenceLevel` = эх сурвалж бүрдсэн. Эмчийн эцсийн хяналт = `reviewedBy` +
`lastReviewed` — бүх бүлэг дууссаны дараа тусдаа нэг давалгаа.
