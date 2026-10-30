# Шат 0 — Эх сурвалж баталгаажуулалт

**Зорилго:** баталгаажаагүй дүрмийг (2026-10-30: 41 / 58 — `docs/EVIDENCE-STATUS.md`) B/C (боломжтой бол A) болгох. Шинэ
эм нэмэхээс илүү чухал.

## 0a — Статус тайлан (нэг удаа)
`scripts/evidence-report.ts` → `bun run evidence:report` → `docs/EVIDENCE-STATUS.md`:
- Эхэнд нийт тоо түвшин тус бүрээр.
- Эм бүрийн дүрэм бүр: заалт, зам, basis, evidenceLevel, source id-ууд,
  lastReviewed, known-gap эсэх. Баталгаажаагүй нь дээр.
- Файлын эхэнд «автоматаар үүсгэсэн — гараар засахгүй».
- Тест: тоо нь `components/landing/landing-stats.ts`-тэй таарах.
- Өгөгдөлд гар хүрэхгүй.

## 0b — Batch (7 хоног бүр)
Prompt: `docs/roadmap/phase-0-verification.md-ийн 0b-г <эм1>, <эм2>, <эм3>-д хий.`
Агент `docs/recipes/verify-drug.md`-ийг дагана.

Эрэмбэ: парацетамол, ибупрофен, амоксициллин, цефтриаксон, азитромицин,
дараа нь `docs/EVIDENCE-STATUS.md` + analytics-ийн хамгийн их сонгогдсон эм.
Дуусахад `evidence:report`-ийг дахин ажиллуулж өмнөх/дараах тоог хэл.
