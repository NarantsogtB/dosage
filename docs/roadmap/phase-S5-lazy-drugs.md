# Шат S5 — Хайлтын индекс + эмийг хойшлуулж ачаалах

**Trigger:** ~150 эм, эсвэл эмийн chunk gzip 100KB давах (одоо 51 эм ≈ 42KB gz).
**Хугацаа:** 2–3 өдөр · Plan mode · **Унших:** `lib/data/drugs/index.ts` (эхний 10 мөр),
`lib/search/`, `components/calculator/InputColumn.tsx`, `use-selected-drugs.ts`,
`lib/drug-page/`

## Хийх
1. `drugs/index.ts`-ийг script-ээр генерацла (гар импорт биш) + тест.
2. Хайлтын хөнгөн индекс: id, inn, innMn, ангилал, заалт+синоним, хамгийн
   хүчтэй нотолгоо. Жагсаалт/хайлт зөвхөн үүнийг ачаална.
3. Бүтэн эмийг сонгоход ачаалах (dynamic import эсвэл build-д `<id>.json`).
   Engine өөрчлөгдөхгүй.
4. Offline: бүх эмийг precache (Шат 1) — эсвэл «сүүлд хэрэглэсэн» + шилдэг N.
   Plan-д санал болго.
5. Bundle-ийн хэмжээний budget-ийг `bun run check`-д нэм.

## Шалгуур
Эхний ачааллын JS эмийн тооноос үл хамааран тогтмол. Хайлтын хурд <50мс (500 fixture эм).
