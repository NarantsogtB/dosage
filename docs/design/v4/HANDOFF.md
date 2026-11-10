# V4 Handoff — Figma → код (pixel perfect гэрээ)

> **Агент (Claude Code) энэ файлыг дэлгэц бүрийн өмнө бүтнээр нь уншина.**
> Энд бичсэн тоо, өнгө, текстийг «ойролцоо», «илүү энгийн», «одоо байгаа компонентод тааруулж»
> өөрчлөхийг **хориглоно**. Хийж чадахгүй зүйл гарвал зогсоод §7-ийн хүснэгтэд бичиж, хэрэглэгчээс асуу.

Figma файл: `W1la5Yp9xqZwQmUnuJZyXZ` · хуудас `119:2` «V4 · Dark (Golomt-style)».
Тест өгөгдөл (бүх дэлгэцэд ижил): **Ор 5 · 20 кг · 5 нас · 110 см**, хоёр дахь өвчтөн **Ор 7 · 60 кг · 10 нас**.

## 1. Үнэний эх сурвалж

| Дэлгэц | Route | Mobile 390 | Desktop 1440 | Лавлах зураг |
|---|---|---|---|---|
| Landing | `/` | `154:1859` | `156:1911` | `ref/landing-{m,d}.png` |
| Түлэгдэлт | `/burns` | `138:1549` | `140:1675` | `ref/burns-{m,d}.png` |
| Шингэн | `/fluids` | `163:1961` | `163:2510` | `ref/fluids-{m,d}.png` |
| Яаралтай | `/emergency` | `163:2232` | `163:2855` | `ref/emergency-{m,d}.png` |

Дараалал: **Figma node > лавлах PNG > энэ файл > бусад баримт**. Зөрвөл Figma зөв.
Figma MCP байгаа бол хэсэг бүрийг бичихийн өмнө `get_design_context(fileKey, nodeId)` дууд — тоог
таамаглахгүй, тэндээс ав. Лавлах PNG-г (`docs/design/v4/ref/`) **хэзээ ч засахгүй, дахин үүсгэхгүй**.

## 2. Хориотой (өмнө нь гарсан алдаа)

1. `from-tile/30 … to-transparent` шиг **өөр** gradient. Hero gradient = §3-ын `--hero-*` токен, өөр биш.
2. Tailwind-ийн хамгийн ойрын класс руу бөөрөнхийлөх (13px → `text-sm` 14px, 18px → `rounded-2xl` 16px).
   Яг тэнцүү класс байхгүй бол arbitrary: `text-[13px]`, `rounded-[18px]`, `gap-2.5`.
3. Бүтэц хялбарчлах: карт нэгтгэх, tile-ийг жагсаалт болгох, hero-г картад оруулах, хэсэг хасах.
4. Хуучин компонентыг (`PatientInput`, `Card`, `Alert`) «загвар нь ойролцоо» гэж үлдээх. Хуучин
   хэлбэр харагдаж байвал дэлгэц **дуусаагүй**.
5. Copy өөрчлөх, богиносгох, нэмэх. Текст = Figma (тоо = engine-ээс, §5).
6. `bun run visual`-ийн босго, mask, лавлах зургийг өөрчлөх. Тест унавал **кодыг** засна.
7. Animation, shadow, blur нэмэх (Figma-д байхгүй).

## 3. Токен (Figma variable → CSS → Tailwind)

Байгаа (9a, `app/globals.css` `.dark`): `bg/ink=--background #05070D` · `surface/card=--card #1B1F27` ·
`surface/raised=--muted #272C36` · `line/subtle=--border #2B313C` · `text/primary=--foreground #F2F4F7` ·
`text/muted=--muted-foreground #9AA3AF` · `accent/teal=--primary #5DBCC1` · `accent/tile=--tile #16808A` ·
`signal/danger=--destructive #EF736C` · `signal/warning=--warning #E6B55D` · `evidence/*`.

**Дутуу — эхлээд нэм** (`.dark` дотор + `@theme inline`-д `--color-*`):

| Figma | CSS var | Утга | Класс |
|---|---|---|---|
| bg/sheet | `--sheet` | `#0A0D14` | `bg-sheet` |
| bg/hero-top | `--hero-top` | `#0F4A52` | `from-hero-top` |
| bg/hero-bottom | `--hero-bottom` | `#05080D` (апп дэлгэц) | `to-hero-bottom` |
| surface/glass | — | `white` | `bg-white/12`, `border-white/18` гэх мэт opacity-тай |

Landing hero gradient 3 зогсоолтой: `#0F4A52 0%` → `#0A1C24 70%` → `#05080D 100%`.
Цайвар (light) горимд эдгээр токены утгыг Figma-д хараахан зураагүй — `:root`-д одоогийн
`--background`, `--card`-аар түр орлуул, §7-д тэмдэглэ.

Фонт: Onest (9a). Тоо бүр `.num` (tabular-nums).

## 4. Хуваалцсан анатоми (mobile 390)

Бүх хэмжээ px. «r» = border-radius, «p» = padding (дээд, баруун, доод, зүүн), «g» = gap.

| Хэсэг | Хэмжээ | Tailwind (жишээ) |
|---|---|---|
| Hero дэвсгэр | 0-ээс sheet-ийн доод 40px хүртэл, linear 180° `hero-top → hero-bottom` | `bg-linear-to-b from-hero-top to-hero-bottom` |
| Дээд мөр | y=56 (safe-area орно), px 16, өндөр 48 | |
| Дугуй товч (‹, ✕) | 48×48, r-full, `white/12` дэвсгэр, 1px `white/18` хүрээ, дүрс 22 | `size-12 rounded-full bg-white/12 border border-white/18` |
| Гарчиг | 20 SemiBold, төвд | `text-xl font-semibold` |
| Hero блок | y=120, col, g 8, төвд | `mt-4 flex flex-col items-center gap-2` |
| Өвчтөний мөр | 15 Medium muted + chevDown 16, g 6 — **дарвал өвчтөн солих** | `text-[15px] font-medium` |
| Том тоо | 72 Bold + нэгж (burns «%» 34 SemiBold; шингэн/яаралтай 22 SemiBold) muted, g 6, baseline | `text-[72px] font-bold leading-none` |
| Hero тайлбар | 13 Regular muted | `text-[13px]` |
| Chip | r-full, p 7/12, `white/8` (landing/hero) эсвэл `white/10`, 13 Medium | `rounded-full px-3 py-[7px] text-[13px]` |
| Анхааруулах chip | `warning/14` дэвсгэр, 1px `warning/40`, alert 14, 13 Medium warning | |
| Sheet | `bg-sheet`, дээд r 32, p 24/16/130/16, g 16 | `rounded-t-[32px] px-4 pt-6 pb-[130px] space-y-4` |
| Карт | `surface/card`, r 24, p 16/18, col g 12 | `rounded-3xl bg-card px-[18px] py-4 gap-3` |
| Картын толгой | tile 40×40 r 12 `accent/tile` + дүрс 20 цагаан; гарчиг 17 SemiBold; дэд 12 Regular muted; g 10 | |
| Картын том тоо | 40 Bold + нэгж 16 Medium muted, g 8 | `text-[40px]` |
| Tile (утгын хайрцаг) | `surface/raised`, r 18, p 12/14, col g 4; шошго 12 muted; утга 20 Bold; хурд 14 SemiBold teal | `rounded-[18px] bg-muted px-3.5 py-3` |
| Tile мөр | 2 tile хажуу, g 10, тэнцүү өргөн | `grid grid-cols-2 gap-2.5` |
| Тэмдэглэл | дүрс 16 + 12 Regular muted, g 8 | |
| Disclaimer (шар) | r 20, p 14/16, `warning/10` дэвсгэр, 1px `warning/35`; гарчиг 14 SemiBold warning + alert 16; бие 12 muted | |
| Аюулын хайрцаг | r 18, p 12/14, `danger/10`, 1px `danger/35`; гарчиг 14 SemiBold danger | |
| Сегмент таб | r-full, `surface/card`, p 4, g 4; идэвхтэй = `text/primary` дэвсгэр + `bg/ink` текст 14 SemiBold; бусад 14 muted, py 10 | |
| Жагсаалтын карт | `surface/card`, r 24, px 18; мөр py 14, хооронд 1px `line/subtle` | |
| Tab bar | одоогийн `BottomNav` (9b) — **өөрчлөхгүй** | |

Desktop 1440: одоогийн 9g shell (`DeskShell`, header, 296px зүүн багана) хэвээр. Төв хэсэг 832px:
breadcrumb (r 20, `bg-sheet`, p 14/18) → hero карт (r 28, p 24/28, linear 90° `#0F4A52 → #08171C`,
том тоо 72 + chip баруун талд) → 2 багана (g 16), карт бүр mobile-ийнхтэй **ижил** компонент.

## 5. Дэлгэц тус бүр

**Шингэн `/fluids`** (`163:1961`, `163:2510`)
- Өвчтөн = идэвхтэй өвчтөн (`usePatientForm`, `/emergency` шиг). Тусдаа `PatientInput` маягт **устгана**.
  Өвчтөн байхгүй/жингүй бол Нүүрийн «Жин оруулах» урсгал руу (9b-ийн `PatientSheet`).
- Hero: том тоо = бүтэн тэтгэх хурд (мл/цаг); chip: хоногийн мл, ⅔ хурд.
- Сегмент таб «Тэтгэх · Болюс · Дутагдал» = scroll-spy anchor (хуудас солихгүй).
- Карт: Тэтгэх (`MaintenanceCard`), Болюс (`BolusCard` + хүнд хоол тэжээлийн дутагдлын аюулын хайрцаг),
  Дутагдал (`DeficitCard`: тоон талбар + 3/5/7/10 хурдан сонголт), шар disclaimer хамгийн доор.
- Утга бүр engine-ээс; Figma-гийн тоо = 20 кг-ийн бодит гаралт (60, 1500, 40, 200, 400, 300, 1000, 101.7).

**Яаралтай `/emergency`** (`163:2232`, `163:2855`)
- Hero: жин (72) + «Жинг хэмжсэн үү?» анхааруулах chip. Нас эндээс оруулахгүй.
- «N мөр · зөвхөн эх сурвалжтай» + «Хэвлэх карт» товч (`EmergencyPrintCard`, хэвлэх загвар хэвээр).
- «ЭМ» жагсаалт: нэр 16 SemiBold + evidence chip; заалт · зам 12 muted; баруун талд тун 28 Bold + нэгж
  14 muted; мл 16 Bold teal; хэлбэр 11 muted. «ШИНГЭН» жагсаалт evidence chip-гүй.
- Desktop: эм зүүн, шингэн + disclaimer баруун.

**Түлэгдэлт `/burns`** (`138:1549`, `140:1675`) — диаграм (9f) хэвээр, түүний **эргэн тойрон**:
- Hero: БГТ % (72) + Lund-Browder chip + ≥10% анхааруулах chip. Өндөр — өвчтөний мэдээллээс
  (`Ор 5 · … · 110 см`), байхгүй бол өвчтөний мөрөөр нэмүүлнэ.
- Сонгосон бүс = жагсаалтын карт (цэг · нэр · зэрэг · % · ✕), Parkland/Галвестон = карт + 2 tile,
  Шээсний зорилт, disclaimer `white/5` (шар биш).
- Desktop: төв 520 (хоёр талыг зэрэг) + aside 288 (БГТ gradient карт, томьёо бүр компакт).

**Landing `/`** — `phase-9-v4-redesign.md` §9i.

## 6. Ажлын урсгал (дэлгэц бүрд)

1. `get_design_context` → компонентуудаа бич (Тест өгөгдөл → `bun run dev`).
2. `bun run build && bun run visual <screen>-m <screen>-d`
3. `.visual/<screen>-m.diff.png`-г **нээж хар** (улаан = зөрүү). Засаад 2-р алхам руу.
4. Шалгуур: ялгаа ≤ **4%**, өндрийн зөрүү ≤ 8px, setup алдаагүй. Хүрэхгүй бол §7-д шалтгаан.
   Босго яагаад 4%: нүдээр ижил fluids-m 3.9% — Figma, Chromium текстийг өөрөөр anti-alias хийдэг.
   Mask: дугуй булан + дээд зурвас (mobile 56 = Figma-ийн status bar ↔ `SiteHeader`, desktop 84 = `SiteHeader`).
5. PR-д: `.visual/report.md` + mobile/desktop screenshot + §7 хүснэгт.

Script setup-ийн selector (`scripts/visual-diff.mjs`)-ийг кодтой тааруулж засаж болно —
өгөгдөл (20 кг, 110 см, бүс, 5%) болон лавлах зургийг өөрчлөхгүй.

## 7. Зөрүүний бүртгэл (PR бүрд хуулна)

9h/9i-ийн үр дүн (2026-11-09, `bun run visual`): fluids-m 3.90% ✅ · fluids-d 2.72% ✅ ·
emergency-d 2.39% ✅ · emergency-m 4.30% · burns-d 3.64% (+168px) · burns-m 5.95% (+65px) ·
landing-d 4.99% · landing-m 14.73% (+108px). Хэтэрсэн бүгд доорх зөрүүнээс (өөр алдаа үлдээгүй):

| Дэлгэц | Хэсэг | Figma | Код | Шалтгаан | Хэрэглэгч зөвшөөрсөн? |
|---|---|---|---|---|---|
| emergency-m | Замын нэр | «IV/IO» | «Судсаар / Ясны хөндийд (IV/IO)» (`ROUTE_LABELS`) | Өгөгдлийн текст — товчлол зохиохгүй; Figma-гийн copy буруу | ☐ |
| emergency-m | Болюсын мөр | «Болюс 10 мл/кг» + «Шок · 0.9% NaCl» | `item.labelMn` бүтнээрээ | Өгөгдлийн текст | ☐ |
| burns-m/d | Өндөр | оролт зураагүй | Гальвестоны картанд «Өндөр … см» талбар | Өвчтөний бүртгэлд өндөр алга; оролтгүй бол Гальвестон тооцоологдохгүй | ☐ |
| burns-d | Aside | компакт disclaimer bg-sheet | `NoticeBox` (r 20) | Нэг компонент | ☐ |
| landing-m/d | Жишээ | эх сурвалжийн нэр + ишлэл | + бүтэн citation мөр | Эх сурвалжийн мөрдөгдөх байдал (traceability) — хасахгүй | ☐ |
| landing | Давтамж | «өдөрт 2 удаа» | «×2/өдөр» (`FREQUENCY_SHORT`) | Өгөгдлийн текст | ☐ |
| landing | Хязгаарлалт, хэрэгслийн тайлбар | богиносгосон | кодын бүтэн текст | Эмнэлзүйн шударга байдлын текст — Figma-д би богиносгосон | ☐ |
| landing-m | 2-р CTA | «Бүх хэрэгсэл» | «Түлэгдэлтийн шингэн» | Кодын CTA, desktop-той ижил | ☐ |
| landing | Eyebrow, section aria-label | «Амьд жишээ · жинг өөрчлөөд үз» | «Бодит жишээ · жинг өөрчлөөд үз» | Хэрэглэгч (эмч) copy-г өөрчилсөн | ✅ |
| emergency | Hero chip | «Жинг жигнэсэн үү?» | «Жинг хэмжсэн үү?» | Хэрэглэгч (эмч) copy-г өөрчилсөн | ✅ |
| бүх mobile | Tab bar | хөвөгч pill (120:39) | **код Figma руу шилжсэн** (өмнө нь бүтэн өргөнтэй мөр байсан) | 9b-ийн зөрүүг засав; `ActionBar` 94px дээр | — |
| бүх тоо | `.num` | пропорциональ | tabular-nums («1 500» мэт өргөн) | Дизайн системийн дүрэм: эмнэлзүйн тоо баганаар | ☐ |
| desktop | Зүүн багана | Figma sidebar (r 24) | 9g-ийн `PatientColumn` (r 16) | 9g-ийн хүрээ, энд өөрчлөөгүй | ☐ |

Хүлээн зөвшөөрөгдөх цорын ганц шалтгаан: эмнэлзүйн аюулгүй байдал, a11y (контраст, 44px товч,
keyboard), эсвэл бодит өгөгдөл Figma-гийн текстээс урт. «Илүү гоё», «хялбар» — шалтгаан биш.

Тэмдэглэл: Figma-д tab bar-ын хүрээ цагаан бүтэн харагдаж байгаа нь Figma-гийн хязгаарлалт
(variable-д opacity ажилладаггүй) — код дээрх `BottomNav`-ыг өөрчлөхгүй.
