# docs — индекс

> Агентад: энэ хүснэгтээс **зөвхөн ажилд хэрэгтэй нэг-хоёр файлыг** сонгож унш.
> Том баримт хэсэг хэсгээрээ хавтсанд хуваагдсан — индексээс нь эхэл.

## Ажлаар

| Хийх ажил | Унших |
|---|---|
| Шинэ эм нэмэх | `recipes/add-drug.md` |
| Эм баталгаажуулах | `EVIDENCE-STATUS.md` (аль нь дутуу), `sources/pending-decisions-2026-10.md` (эмчийн шийдвэр хүлээж буй) → `recipes/verify-drug.md` → шаардлагатай бол `sources/tiers.md` |
| Шинэ тооцоолуур/хуудас | `recipes/add-calculator.md` |
| «Хэрхэн ашиглах» заавар (tour) Figma-д тааруулах | `design/v4/HANDOFF.md` → `design/v4/TOUR.md` |
| Roadmap-ийн шат хэрэгжүүлэх | `roadmap/README.md` → тухайн `roadmap/phase-*.md` |
| Engine өөрчлөх | `lib/engine/CLAUDE.md` (+ `architecture/calculation-flow.md`) |
| UI / дизайн | `components/CLAUDE.md` → `design-system/README.md` |
| Analytics event | `ANALYTICS.md` (§3 Event-үүд) |
| Deploy, домэйн | `DEPLOY.md` |
| Түлэгдэлт | `BURNS-SOURCE-NOTES.md` |
| «Яагаад ингэсэн бэ?» | `DECISIONS.md` (шинэ нь дээрээ) |
| Бүтэц тэлэх боломж | `architecture/scalability-2026-10.md` |

## Бүх баримт

| Файл/хавтас | Хэмжээ | Агуулга |
|---|---|---|
| `sources/` | 14 жижиг файл | Эх сурвалжийн стратеги (хуучин SOURCES.md) |
| `architecture/` | 9 файл | Давхарга, хавтас, кодын дүрэм, урсгал, тэлэх үнэлгээ |
| `design-system/` | 12 файл | Figma ↔ код handoff (хуучин DESIGN-SYSTEM.md) |
| `roadmap/` | шат бүр файл | 2026-11 → 2027-01 төлөвлөгөө |
| `recipes/` | 3 файл | Алхам алхмаар заавар |
| `DESIGN.md` | 5KB | Дизайны зарчим, бичиглэл, өнгө |
| `HEURISTICS.md` | 9KB | NN/g 10 эвристик үнэлгээ (2026-08-18) |
| `ANALYTICS.md` | 9KB | Event schema, хувийн нууц, SQL |
| `DEPLOY.md` | 6KB | Cloudflare Pages, redirect |
| `DECISIONS.md` | 8KB | ADR лог |
| `EVIDENCE-STATUS.md` | генерацлагдсан | Дүрэм бүрийн нотолгооны түвшин — `bun run evidence:report`, гараар засахгүй |
| `BURNS-SOURCE-NOTES.md` | 10KB | Түлэгдэлтийн номын хуудас тус бүрийн тэмдэглэл |

`SOURCES.md`, `ARCHITECTURE.md`, `DESIGN-SYSTEM.md`, `ROADMAP-NEXT.md` нь
одоо зөвхөн шинэ байршил руу заасан холбоос (хуучин линк эвдрэхгүйн тулд).
