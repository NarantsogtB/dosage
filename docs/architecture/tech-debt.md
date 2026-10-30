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
| Тоймлол хязгаараас ≤0.05 мг давж болно (domperidone 15 кг: 3.75 → 3.8 мг, per_kg хязгаар 3.75) | `math/round-dose.ts` → `build-outcome.ts` | Эмнэлзүйн шийдвэр: таслалтын дараа доош тоймлох уу? `real-drug-invariants.test.ts` хүлцэл 0.05 |
