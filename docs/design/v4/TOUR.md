# «Хэрхэн ашиглах» заавар (tour) — pixel perfect бриф

> Агент: `HANDOFF.md`-ийг бүтнээр, дараа нь энэ файлыг унш. HANDOFF-ийн §2 хориг энд бүрэн үйлчилнэ.

## 0. Одоогийн байдал (2026-11-10)

- Код бий: `components/tour/` (`Tour.tsx`, `TourCard.tsx`, `place-card.ts`, `tour-store.ts`,
  `tour-steps.ts`, `use-tour-target.ts`), `data-tour` тэмдэг 9 файлд, Тохиргоо → `RestartTourRow`.
- **Figma frame БАЙХГҮЙ.** Одоогийн харагдац нь V4 токеноор «ойролцоо» хийгдсэн — pixel perfect-ийн
  эх сурвалж алга. Тиймээс эхлээд Figma (Үе A), хэрэглэгч баталсны **дараа** код (Үе B).

## Үе A — Figma (код бичихгүй)

Файл `W1la5Yp9xqZwQmUnuJZyXZ`, хуудас `119:2`. Шинэ section «V4 · Tour».

| Frame | Хэмжээ | Суурь дэлгэц | Тодруулах (`data-tour`) |
|---|---|---|---|
| `tour-m-1…5` | 390×844 | Нүүр `120:62`, тест өгөгдөл (Ор 5 · 20 кг · 5 нас) | patient · search · tools · emergency · nav |
| `tour-d-1…5` | 1440×900 | Dashboard `126:354`, ижил өгөгдөл | patient · search · tools · emergency · nav (PillNav) |

1. Суурийг дээрх node-оос **хуулна**, өөрчлөхгүй. Зөвхөн дээр нь давхарга нэмнэ.
2. Давхаргын хэсэг бүр **variable/токен**-оор: бараан давхарга (шинэ `scrim` токен), spotlight
   (padding, radius, outline өргөн + өнгө), карт (өргөн ≤360, ирмэгээс 16, элементээс зай, radius,
   padding, дэвсгэр, хүрээ), тоолуур + dots, гарчиг, тайлбар, товчнууд:
   ghost «Дахиж харуулахгүй» (сүүлийн алхамд байхгүй), outline icon «‹» (1-р алхамд байхгүй),
   primary «Дараах» / сүүлийн алхамд «Ойлголоо», icon «×». Хүрэх талбай ≥44px.
3. Картын байрлал = `place-card.ts`-ийн дүрэм: элемент дэлгэцийн дээд хагаст → картыг доор нь,
   үгүй бол дээр нь; хэвтээ чиглэлд элементийн голд, ирмэгээс 16px дотор.
4. Scroll: элемент аль хэдийн харагдаж байвал гүйлгэхгүй (код `block: "nearest"` болно) —
   frame-ийг гүйлгээгүй байрлалаар зур.
5. Copy = `components/tour/tour-steps.ts`. Өөрчлөх бол Figma-д зурж, хэрэглэгчээр батлуулна.
6. Shadow, blur, animation — зурсан бол л кодод орно (§2.7).
7. Лавлах PNG (1x) → `docs/design/v4/ref/tour-{m,d}-{1..5}.png`. HANDOFF §1-д мөр, §5-д «Tour» хэсэг нэм.
8. **Зогсоод** хэрэглэгчид frame-ийн screenshot үзүүлж батлуул. Батлаагүй бол Үе B-г эхлүүлэхгүй.

## Үе B — Код ↔ Figma

1. Frame бүрт `get_design_context` — тоог таамаглахгүй.
2. Мэдэгдэж буй «ойролцоо» утгууд — Figma-гийн яг утгаар (arbitrary class зөвшөөрнө):
   - `Tour.tsx`: `rgb(0 0 0/0.6)` → `scrim` токен (`app/globals.css`, light + dark, `bun run contrast`);
     `PAD = 6`, `rounded-2xl`, `outline-2`; `motion-safe:transition-all duration-200` — Figma-д байхгүй бол хас.
   - `TourCard.tsx`: `rounded-2xl p-4 space-y-2 shadow-lg`, `text-lg` / `text-sm` / `text-xs`, `min-w-24`.
   - `place-card.ts`: `EDGE 16`, `GAP 14`, `MAX_WIDTH 360`, `MIN_ROOM 220` (өөрчилбөл `tests/tour` шинэчил).
   - `use-tour-target.ts`: `scrollIntoView({ block: "center" })` → `{ block: "nearest" }`.
3. **Өөрчлөхгүй:** логик, `localStorage` түлхүүр, алхам алгасах дүрэм, «Дахиж харуулахгүй»/«Ойлголоо»
   (дахиж гарахгүй) ба «×»/Esc (зөвхөн энэ удаа) ялгаа, `data-tour` нэрс, ESLint дүрэм.
4. `scripts/visual-diff.mjs` — `tour-m-1…5`, `tour-d-1…5` дэлгэц:
   - Tour дэлгэцэд л `dosage.tour.v1`-ийг **тавихгүй** (бусад дэлгэцэд `"done"` хэвээр) — screen-д `tour: true` гэх мэт туг.
   - setup: `getByRole("dialog")` гарахыг хүлээ → «Дараах»-ыг (n−1) удаа дар → 300ms хүлээ.
   - Давхарга `fixed` тул эдгээр дэлгэцэд `fullPage: false` (viewport 390×844 / 1440×900).
   - `top` mask: 4-р алхам (яаралтай) толгойд тул tour дэлгэцэд `top: 0`, frame-д толгой зурагдсан байх ёстой.
   - Босго 4%, лавлах зураг, mask-ийн бусад дүрэм — **өөрчлөхгүй**.
5. Давталт: `bun run build && bun run visual tour-m-1 … tour-d-5` → `.visual/*.diff.png`-г нээж хар → зас.
   Шалгуур ≤4%, өндөр ≤8px, setup алдаагүй. Хүрэхгүй бол HANDOFF §7-д шалтгаантай мөр.
6. Commit: эхлээд одоогийн commit-гүй кодыг `feat(tour): «Хэрхэн ашиглах» заавар нэмэх`, дараа нь
   `style(tour): Figma-д тааруулах`, `test(visual): tour дэлгэц нэмэх` гэх мэт жижиг алхмаар.

## Гараар шалгах

- Light горим (Figma зөвхөн dark) · 320px өргөн · tablet 768–1023 (nav алхам алгасагдана)
- Өвчтөнгүй (хоосон hero) үед 1-р алхам · `/dose/[slug]` (desktop-д хайлт толгойд)
- Гар: Tab, Esc, focus «Дараах» дээр · VoiceOver dialog-ийг уншдаг эсэх
- Тохиргоо → «Хэрхэн ашиглах заавар» → `/dose`-д дахин гарна
