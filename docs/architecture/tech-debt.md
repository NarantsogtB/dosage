<!-- ARCHITECTURE.md-аас хуваасан. Бусад хэсэг: ./README.md -->
## 7. Мэдэгдэж буй өр (technical debt)

| Зүйл | Байршил | Шийдэх алхам |
|---|---|---|
| ~~`if (drug.id === "domperidone")`~~ | шинэ engine-д алга | ✅ |
| 50 эм `D_unverified` — эх сурвалжгүй | `lib/data/drugs/` | **7 (гол өр)** |
| ~~`lang="en"`~~ | `app/layout.tsx` | ✅ `lang="mn"` |
| ~~Geist кирилл дэмжихгүй~~ | `app/layout.tsx` | ✅ Inter + JetBrains Mono |
| ~~Эмийн тоо зөрүүтэй~~ | `DRUGS.length`-ээс уншина | ✅ |
| ~~`PrintTemplate.tsx` 562 мөр~~ | `components/print/` | ✅ 5 файл болов |
| Нас тохирохгүй үед мессеж ерөнхий | `calculate-dosage.ts` | 6 |
| ~~Хуучин engine + 492KB snapshot~~ | — | ✅ S1 (2026-10-30) |
