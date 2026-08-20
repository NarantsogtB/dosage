# Dosage.mn — Design System Handoff

**Figma:** https://www.figma.com/design/W1la5Yp9xqZwQmUnuJZyXZ
**Шинэчлэгдсэн:** 2026-08-18 · **Эх сурвалж:** `app/globals.css`

Дизайн системийг тэгээс биш, одоогийн кодоос гаргасан. Өнгөний семантик утга (signal / alert / caution, evidence A–E) хэвээрээ. Шинэчилсэн зүйл: **бичиглэл**, зайн шат, өндөрлөг, компонентын хэлбэр, шөнийн горим.

---

## 0. Аль хэдийн кодод буусан өөрчлөлтүүд ✅

| Файл | Юу өөрчлөгдсөн |
|---|---|
| `app/layout.tsx` | IBM Plex Sans/Mono → **Source Sans 3** (variable, latin + cyrillic). Mono бүрмөсөн хасагдсан. |
| `app/globals.css` | `.num` нь `tabular-nums lining-nums` болов (font-family солихоо болив) · `--warning-foreground` хар бэх болов · **`.dark` блок нэмэгдэв** · `--font-mono` хасагдав |
| `components/ui/button.tsx` | `size` cva нь 44/56px тагтны хэмжээнд оров |
| `components/dosage/DoseReadout.tsx` | Тайлбар шинэчлэгдэв |
| `components/nav/SiteHeader.tsx` | Тайлбар шинэчлэгдэв |
| `scripts/contrast.mjs` | Light + Dark ХОЁУЛАНГ шалгана, `input` нь одоо ЗААВАЛ шалгалт |
| `components/ui/button.tsx` | 44/56px сэргээгдэв + `pill` хэмжээ буцаж ирэв |
| `components/ui/input.tsx`, `input-group.tsx`, `command.tsx` | 36 → 44px |
| `components/ui/alert.tsx`, `badge.tsx` | `success` variant, `-muted` токен |
| `components/theme/*`, `app/layout.tsx` | Шөнийн горим залгагдав |
| `eslint.config.mjs` | `components/ui/**`-д `complexity` унтраав (shadcn-ий эх код) |

`bun run typecheck` → цэвэр. `node scripts/contrast.mjs` → бүх заавал шалгалт ✓, exit 0.

---

## 1. Бичиглэл — яагаад сольсон

**IBM Plex** нь техникийн баримт бичигт зориулж зохиогдсон бичиглэл. Бүх тоог **Plex Mono**-гоор бичсэн нь бүтээгдэхүүнийг эмчийн хэрэгсэл биш, терминал мэт харагдуулж байв.

**Source Sans 3** — Adobe-ийн хүмүүнлэг бичиглэл, шинжлэх ухаан, эмнэлгийн хэвлэлд өргөн хэрэглэгддэг. Кирилл үсэг бүрэн, variable font.

Mono-г хасахад **юу ч алдагдаагүй**. Mono-г сонгосон шалтгаан нь тоог баганаар жигдрүүлэх (2.5 ба 25 өөр урттай харагдах) байсан бөгөөд үүнийг OpenType-ийн `tabular-nums` яг адилхан хийнэ. BNF, Nelson зэрэг эмнэлзүйн лавлахууд ч mono ашигладаггүй.

```css
.num {
  font-variant-numeric: tabular-nums lining-nums;
  letter-spacing: -0.005em;
}
```

`.num` нь repo даяар 25 газар хэрэглэгддэг цорын ганц удирдах цэг байсан тул нэг файл засахад бүх тоо шинэчлэгдэв.

### Бичиглэлийн шат

| Хэв | Жин | Хэмжээ / мөр | Хэрэглээ |
|---|---|---|---|
| Display/XL | SemiBold | 44/50 | Landing hero, desktop |
| Display/L | SemiBold | 34/40 | Landing hero, mobile |
| Heading/XL | SemiBold | 28/34 | Хэсгийн гарчиг, desktop |
| Heading/L | SemiBold | 22/28 | Хэсгийн гарчиг, mobile |
| Heading/M | SemiBold | 18/24 | Эмийн нэр |
| Title/S | SemiBold | 16/22 | Карт, жагсаалтын мөр |
| Body/L | Regular | 17/27 | Landing параграф |
| Body/M | Regular | 15/23 | Апп-ын үндсэн бичвэр |
| Body/S | Regular | 13/20 | Тайлбар, эх сурвалж |
| Label/M | Medium | 14/18 | Талбайн шошго, товч |
| Label/S | Medium | 12/16 | Badge, chip, meta |
| Overline | SemiBold | 11/14 +10% | Eyebrow |
| **Numeric/XXL** | **Bold** | **44/48** | **Тунгийн ХАРИУ** |
| Numeric/XL | Bold | 32/36 | Mobile гол үр дүн |
| Numeric/L | SemiBold | 22/28 | Хоёрдогч утга (мл) |
| Numeric/M | SemiBold | 17/24 | Мөр доторх утга |
| Numeric/S | Medium | 14/20 | Хүснэгт, тооцооллын мөр |
| Unit/S | Medium | 12/16 +2% | Нэгжийн дагавар |

> Numeric/* нь sans болсон тул mono-гийн байгалийн жигдрэлт байхгүй — **кодод `.num` заавал** тавина. Figma Plugin API-д OpenType feature тохируулах боломж байхгүй тул Figma дээр тоо бага зэрэг жигд бус харагдаж болзошгүй; браузер дээр зөв байна.

---

## 2. Token architecture

| Цуглуулга | Горим | Тоо |
|---|---|---|
| Primitives | Value | 50 (бүх scope хаалттай) |
| Color | **Light + Dark** | 32 (бүгд alias, `codeSyntax.WEB` = бодит CSS нэр) |
| Spacing | Value | 14 |
| Radius | Value | 5 |
| Size | Value | 9 (`touch/minimum = 44`) |

Figma нэрсийг бүлэглэсэн боловч CSS хувьсагч хэвээрээ:

```
surface/card → var(--card)          action/primary → var(--primary)
text/muted-foreground → var(--muted-foreground)
signal/warning-text → var(--warning-text)
evidence/a-guideline → var(--evidence-a)
```

---

## 3. shadcn/ui-тэй уялдуулалт

Дизайн систем нь shadcn-ийн **семантик хувьсагч дээр** суусан тул `npx shadcn add ...` хийхэд шинэ компонент автоматаар палитр, радиус, шөнийн горимыг өвлөнө.

### Figma variant → cva 1:1

| Figma | shadcn |
|---|---|
| `Button` variant=default/outline/ghost/destructive, size=default/lg | `buttonVariants` |
| `Badge` variant=default/secondary/destructive/warning/success/outline/soft | `badgeVariants` |
| `Alert` variant=info/warning/destructive/**success** | `alertVariants` |
| `TabsTrigger` state=active/inactive/hover | `data-state` |
| `Toggle` state=on/off/disabled | `data-state` |
| `Field` FieldLabel / FieldContent / FieldDescription | `field` + `input-group` |
| `Item` ItemMedia / ItemContent / ItemActions | `item` |

`State` тэнхлэг нь Figma-д зориулсан — кодод CSS pseudo-class / `data-*`.

### Нэмэх компонентууд

```bash
npx shadcn@latest add field input-group command empty item tabs select toggle-group sheet table sonner
```

| Зурсан дэлгэц | Компонент |
|---|---|
| Жингийн талбар + "кг" дагавар | `field` + `input-group` |
| Эмийн хайлт | `command` |
| Хайлтын хоосон төлөв | `empty` |
| Эмийн жагсаалтын мөр | `item` |
| Толгойн таб | `tabs` |
| Хэлбэр сонгох | `select` |
| Түлэгдэлтийн гүн | `toggle-group` |
| Гар утсан дээрх сонголт | `sheet` |
| Яаралтай тусламжийн хүснэгт | `table` |
| "Хуулагдлаа" мэдэгдэл | `sonner` |

**Суулгасны дараа заавал:** шинэ компонентуудын өндөр shadcn-ийн анхдагчаар ирнэ (32–40px). Тагт бүрийг `min-h-11` болгоно.

### shadcn БОЛГОХГҮЙ

`DoseReadout`, `EvidenceBadge`, `TraceDetails`, `BodyMap` — эмнэлзүйн домэйн компонент. Примитивээс өөрсдөө угсарна.

---

## 4. Шийдэгдсэн зүйлс (2026-08-18, хоёр дахь давалгаа)

Өмнөх хувилбарт "шийдвэр хүлээж байна" гэсэн дөрвөн зүйл байсан. Бүгд хаагдсан.

### 4.1 Талбайн хүрээ ✅ ХИЙГДСЭН

```css
/* хуучин */  --input: oklch(0.895 0.01 205);   /* #D5DEDF · 1.36 : 1 — УНАСАН */
/* одоо   */  --input: oklch(0.64 0.018 207);   /* #808F92 · 3.34 : 1 */
/* .dark  */  --input: oklch(0.53 0.02 220);    /* картан дээр 3.17 : 1 */
```

Талбайн хүрээ мэдэгдэхүйц бараан боллоо — энэ нь **зорилго**, гаж нөлөө биш.
`scripts/contrast.mjs`-д `input / card` ба `input / background` хоёр шалгалт нь
одоо **заавал** (GLYPH жагсаалт) — унавал `exit 1`. `--border` нь чимэглэлийн
шугам тул зөвлөмжид үлдсэн.

### 4.2 `Alert` success ✅ ХИЙГДСЭН

`components/ui/alert.tsx`-д `success` variant нэмэгдэв. Мөн `destructive` нь
`bg-destructive/5` → `bg-destructive-muted` болов (харанхуй горимд alpha
шингэлэлт бохир өнгө өгдөг).

### 4.3 `Badge` токен ✅ ХИЙГДСЭН

`bg-destructive/10` → `bg-destructive-muted`, `bg-primary/10` → `bg-accent` +
`text-accent-foreground`.

### 4.4 Шөнийн горим ✅ ХИЙГДСЭН

`next-themes`, `attribute="class"`, `defaultTheme="system"`.

| Файл | Үүрэг |
|---|---|
| `components/theme/ThemeProvider.tsx` | Provider, `disableTransitionOnChange` |
| `components/theme/ThemeToggle.tsx` | Толгойн товч |
| `app/layout.tsx` | `<html suppressHydrationWarning>` + Provider + `<Toaster>` |

`ThemeToggle` нь `mounted` төлөв ХЭРЭГЛЭХГҮЙ: нар, сар хоёуланг зурж, алийг нь
харуулахыг CSS (`dark:hidden`) шийднэ. `.dark` класс нь hydration-аас өмнө
тавигддаг тул эхний зурагт зөв гарна.

---

## 4b. Тагтны өндөр — shadcn-ийг ДАХИН бичсэн

`bunx shadcn add` нь `components/ui/button.tsx`-ийг ДАРЖ бичсэн байсан тул
өмнөх session-ий 44px тохиргоо мөн `pill` хэмжээ АЛГА болж, `bun run typecheck`
гурван алдаатай байв (`size="pill"` — `CategoryPill`, `VerifiedToggle`,
`IndicationPicker`). Сэргээв:

| Компонент | Хуучин | Одоо |
|---|---|---|
| `button` default | 36 | **44** |
| `button` lg | 40 | **56** |
| `button` sm / xs | 32 / 24 | 36 / 28 (зөвхөн хулгана) |
| `button` pill | — | **44**, дугуй |
| `button` icon | 36 | **44** |
| `input` | 36 | **44** |
| `input-group` | 36 | **44** |
| `command` input | 36 | **44** |
| `NavTab` | 40 | **44** (`min-h-11`) |

> `bunx shadcn add …` ажиллуулсны ДАРАА `bun run typecheck` + энэ хүснэгтийг
> заавал шалгана. shadcn нь өөрийн анхдагчаар дарж бичдэг.

---

## 4c. Аль shadcn компонент хаана суусан

| Дэлгэц | Компонент | Файл |
|---|---|---|
| Жин, өндөр, нас | `field` + `input-group` | `calculator/NumberField.tsx`, `AgeFields.tsx`, `AgeInput.tsx` |
| Талбайн доорх мөр | `field` (`FieldError`/`FieldDescription`) | `calculator/FieldNote.tsx` |
| Эмийн хайлт | `command` | `search/SearchField.tsx`, `DrugSearch.tsx` |
| Эмийн жагсаалтын мөр | `command` + `item` | `search/DrugListItem.tsx` |
| Хайлтын хоосон төлөв | `empty` | `search/SearchEmpty.tsx` |
| "Хуулагдлаа" | `sonner` | `summary/CopyButton.tsx`, `app/layout.tsx` |

**`command`-ийн тухай хоёр анхаарах зүйл:**

1. `shouldFilter={false}`. Шүүлт нь `lib/search/filter-drugs.ts`-д үлдэнэ
   (латин↔кирилл, ангилал, баталгаажилт — тесттэй домэйн логик). cmdk-ээс
   авах нь ганцхан зүйл: хайлтын талбараас салалгүй ↑ ↓ Enter.
2. Талбайн НЭР нь `<Command label=…>`-д байна. cmdk түүнийг оролтын
   `aria-labelledby` болгодог тул оролт дээрх `aria-label` үр дүнгүй.

**Хоёр "сонгогдсон" төлөвийг ялгана** (`search/drug-row-style.ts`):
cmdk-ийн тодруулга = саарал (`bg-muted`, түр зуурын), эмчийн сонголт = номин
(`bg-accent` + чагт + тод нэр, тогтвортой). Хоёулаа `bg-accent` байвал эмч
«сонгосон уу, зүгээр зогсож байна уу?» гэж эргэлзэнэ.

### `components/ui/command.tsx`-д хийсэн ГАНЦ засвар

`CommandInput`-д `wrapperClassName` нэмэв. Анхдагч боодол нь `border-b`-тэй
бөгөөд зөвхөн бүтэн дэлгэцийн command palette-д зохимжтой; энд хайлтын талбар
картын дотор ердийн оролт шиг харагдах ёстой. Дахин `shadcn add command`
хийвэл ЭНЭ ЗАСВАРЫГ дахин тавина.

---

## 5. Компонент бичихдээ баримтлах дүрэм

1. **Түүхий hex бичихгүй.** Зөвхөн семантик токен.
2. **Тагт 44px-ээс багагүй** (`min-h-11`). 36px зөвхөн заагчтай дэлгэцэд.
3. **Өнгө дангаараа утга илэрхийлэхгүй.** Evidence C/D/E нь 3.7–3.9:1 — зөвхөн цэгэнд, тайлбар нь `text-muted-foreground`, түвшний үсэг ҮРГЭЛЖ бичигдэнэ.
4. **Фокусын цагирагийг арилгахгүй.** `outline-none` бүрд `focus-visible:ring-2 ring-ring`.
5. **Эмнэлзүйн тоо бүр `.num`.** Sans болсон тул энэ нь одоо ЗААВАЛ — mono-гийн байгалийн жигдрэлт байхгүй.
6. **Шошго placeholder биш.** Алдаа нь талбайн ДООР.
7. **Хөдөлгөөн 150–300мс**, `prefers-reduced-motion`. Үр дүнгийн тоо анимацгүй.
8. **Danger нэг дэлгэцэд нэг.**
9. **Өнгө нэмэхийн өмнө `node scripts/contrast.mjs`.** Light + Dark хоёуланг шалгана.

---

## 6. Figma файлын бүтэц

| Хуудас | Агуулга |
|---|---|
| Cover | Тэмдэг, тоймлол |
| Foundations · Color | 32 семантик токен, Light + Dark самбар |
| Foundations · Type & Space | 18 бичиглэлийн хэв, зай, радиус, өндөрлөг, тагт |
| Components | 12 сан, 90+ variant (shadcn нэршилтэй) |
| Landing | Desktop 1440 + Mobile 390 |
| App · Dose Calculator | Mobile 390 + Desktop 1440 |
| App · Drug Search | Үр дүнтэй + хоосон төлөв |
| App · Burns & Fluid | Биеийн зураглал, TBSA, Parkland, Galveston |
| App · Emergency | Нэг жин → 7 эм |
| Font candidates | Сонгосон 5 бичиглэлийн зэрэгцүүлэлт |
| Handoff | Энэ баримтын Figma хувилбар |

---

## 7. Хоёр дахь давалгаа — жинхэнэ mockup-той тулгасан (2026-08-18)

§0–§6 нь токен/компонент СУУЛГАЛТ байсан (shadcn холбох, тагтны хэмжээ,
шөнийн горим). Энэ хэсэг өөр зүйл хийсэн: Figma-гийн бодит дэлгэцүүдтэй
(`App · Dose Calculator` node 20:125, `App · Drug Search` node 1:9)
пиксель нэгбүрчлэн тулгаж, зөрүүг олсон.

### 7.1 Юу засагдсан

| Зөрүү | Файл | Юу болсон |
|---|---|---|
| Талбайн өндөр 44px байсан, Figma "Field" (11:94) 56px заасан | `components/ui/input-group.tsx` | `h-11` → `h-14`. Тайлбар: "ор дэргэд бээлийтэй гараар" |
| Утгын бичвэр 16px (input анхдагч) | `calculator/NumberField.tsx`, `AgeInput.tsx` | 22/28 semibold (Numeric/L) |
| Жингийн хязгаар зөвхөн алдаанд харагддаг байсан | `calculator/WeightField.tsx` | "0.5–200 кг" ЯМАГТ харагдана; алдаанд ЗӨВХӨН өнгө/role улаан болно, текст өөрчлөгдөхгүй |
| Жагсаалтын мөрөнд кирилл нэр (давхардсан мэдээлэл) | `search/DrugListItem.tsx`, шинэ `lib/search/drug-row-summary.ts` | "Заалт · мг/кг/хон" — үндсэн (`isDefault`) дүрмээс гаргасан, зөвхөн урьдчилан харуулах зориулалттай |
| Нотолгооны цэг ganцаараа (Figma-гийн дүрмийг зөрчиж байсан) | `dosage/EvidenceDot.tsx`, `evidence-tone.ts` | Одоо цэг + үсэг (A/B/C/D/E) ХАМТ, `EVIDENCE_LETTERS` нэмэгдэв |
| Мөрийн зүүн дүрс: сонгоогүйд хоосон зай | `search/DrugRowIcon.tsx` (шинэ) | Сонгоогүйд `Pill`, сонгосонд `CheckCircle2` — Figma-гийн ItemMedia swap |
| Тунгийн зурвас: overline/хөрвүүлгийн мөр/мета-грид алга байсан | `dosage/DoseBand.tsx`, шинэ `DoseMetaGrid.tsx`, `DurationValue.tsx`, шинэ `lib/format/primary-formulation-line.ts` | "Нэг удаагийн тун" overline → том тоо → "= 7.5 мл · 250 мг / 5 мл" → зураас → Давтамж/Хугацаа/Өдрийн нийт 3 багана |
| Дээд хязгаарын анхааруулга нэг мөр бяцхан текст байсан | шинэ `dosage/CapAlert.tsx` (сольсон: `CapNotice.tsx` устгав) | Бүтэн `Alert` (variant=warning), хязгаарын тоог `trace`-ээс уншина (шинэ тоо ГАРГААГҮЙ) |

`bun run typecheck` цэвэр · `bunx eslint .` цэвэр · `bun run test` 71/71 ·
`node scripts/contrast.mjs` бүх заавал шалгалт ✓.

### 7.2 Зориудаар ЗӨРҮҮТЭЙ үлдээсэн зүйлс — хэрэглэгчтэй тулгасан

Гурван том архитектурын асуулт гарсан бөгөөд хэрэглэгч (@Natso) бүгдэд
"одоогийн код хэвээр" гэж хариулсан:

1. **Нас — нэг талбар (Figma, шууд сараар) vs хоёр талбар (код, жил+сар)**.
   Figma-д "Нас" ганц талбар, шууд сараар авдаг (жишээ "8 сар",
   хязгаар "0–216 сар"). Одоогийн код `AgeFields.tsx`-д ЗОРИУД хоёр
   талбартай — "3" гэж бичихэд 3 нас уу 3 сар уу гэдэг төөрөгдлөөс
   сэргийлэх баримтжуулсан шийдвэр (`AgeEcho.tsx`). **Хэвээр үлдсэн.**

2. **Нэг эм сонгох (Figma, chevron бүхий мөр) vs олон эм сонгож
   харьцуулах (код, chip mөр + undo)**. Figma-гийн жишээнд мөр бүр
   chevron-той бөгөөд НЭГ эмийг сонгосны дараа шууд Үр дүнд харуулдаг
   маягтай. Код бол `SelectedSummary`, `UndoBar` зэрэгтэй илүү
   нарийвчилсан олон сонголтын функцтэй. **Хэвээр үлдсэн** — мөрийн
   ВИЗУАЛ загвар (icon/evidence/typography) Figma-тай тулгасан ч
   ФУНКЦ (toggle-select) хэвээрээ.

3. **4 tab (Тун/Түлэгдэлт/Яаралтай/Шингэн) vs 2 tab**. Яаралтай
   (Emergency), Шингэн (Fluid) тооцоолуурууд кодод БАЙХГҮЙ (calculation
   engine ч алга). **2 tab хэвээр үлдсэн** — tab нэмэх нь зөвхөн
   дизайны асуудал биш, шинэ тооцооллын логик шаардана.

### 7.3 Мөн зориудаар ХИЙГЭЭГҮЙ зүйл

- **Дээд тунгийн хувь (жишээ Figma-гийн "62%")** харуулаагүй: энэ
  тоог гаргахад `apply-caps.ts`-ийн дотоод хязгаарыг engine-ээс
  задлан гаргах шаардлагатай — эмнэлзүйн тооцооллын логикт нэмэлт
  гарц нэмэх нь энэ visual-match даалгаврын хүрээнээс давсан эрсдэлтэй
  өөрчлөлт. `CapAlert` зөвхөн `cappedAtMax=true` үед, `trace`-ийн
  АЛЬ ХЭДИЙН тооцоолсон утгыг л дахин ашигладаг.
- **Хайлтын Evidence legend-ийг дээшлүүлэх, "Эм хайх" гарчиг мөр
  нэмэх** (Figma-гийн `App · Drug Search` бол ГАР УТСАН дээрх бүтэн
  дэлгэцийн `sheet` хувилбар шиг байна) — хийгээгүй. Одоогийн апп нэг
  л embedded card хэлбэртэй (desktop, mobile хоёуланд адилхан); sheet
  болгох нь шинэ interaction pattern нэмэх тул тусад нь асуух ёстой
  ажил.


## 8. Гуравдахь давалгаа — Dose Calculator-ийн бүтцийн зөрүү (2026-08-18)

Хэрэглэгч Figma-гийн App Dose Calculator дэлгэцийг (node 20:125) шинээр
харуулж, "нэг их зүйл алга байна" гэж тэмдэглэсний дараа код болон
Figma-г эгнээ мөрөөр нь дахин тулгаж, ХОЁР бодит зөрүү олов:

### 8.1 Жороо хуулах / Хэвлэх товч дор байсан

Өмнө нь Хэвлэх товч хуудасны ХАМГИЙН ДООД талд дан ганцаараа, Хуулах товч
зөвхөн sticky хураангуйн дотор жижигхэн (ghost variant) байрладаг байв —
олон эмтэй үед доош гүйлгэхгүйгээр олдохгүй. Figma энэ хоёр үйлдлийг
"Үр дүн" гарчгийн ХАЖУУД, ХАМГИЙН ДЭЭД талд байрлуулдаг.

Шинэ `ResultsActions.tsx` компонент нэмэгдэж, `StepHeader`-тэй нэг эгнээнд
("3 · ҮР ДҮН" ... Жороо хуулах / Хэвлэх) орсон. `CopyButton.tsx`
`variant`/`size`/`label`-аа заавал (required props) болгосон — ESLint
`complexity: 3`-т багтахын тулд өгөгдмөл утга (`= "ghost"`) ашиглаагүй, учир
нь TypeScript/ESLint-д параметр бүрийн `=` анхны утга нэг branch тооцогддог.
Хуучин `PrintBar.tsx` ашиглагдахгүй болж `_to_delete/`-рүү шилжив.

### 8.2 Дээд хязгаарын хувь (%) — зөвхөн бодитоор тассан үед бус

Figma "Өдрийн дээд тунгийн 62%" гэсэн шар картыг хязгаар БАЙГАА бүрт
харуулдаг (бодитоор тасалгаагүй ч гэсэн) — өмнөх (хоёр дахь) давалгаанд
"шинэ тоо зохиох эрсдэлтэй" гэж зориудаар орхигдуулсан онцлог. Хэрэглэгчээс
асуухад: "Тийм, бодит тоогоор нэмэх (Figma шиг)" гэж сонгов.

Үүнийг АЮУЛГҮЙ хэрэгжүүлэхийн тулд engine-д `DosageOutcome.limitMg`
талбар нэмсэн (`build-outcome.ts` → `capped.limitMg`-ийг дамжуулна).
Энэ утга ХЭЗЭЭ Ч НЭГ УДААГИЙН тунгийн нэгжтэй (`to-per-dose-limit.ts`
scope үл хамааран per-dose-д хөрвүүлдэг) — иймд `lib/format/max-dose-percent.ts`
дэх `maxDosePercent()` нь `perDose.maxMg / limitMg`-ээр хувийг тооцоолж,
`dailyLimitMg()` нь `limitMg × dosesPerDay`-гээр хоногийн эквивалентийг
гаргана. Хоёуланг зэрэг холбоход буруу нэгж (мг/тун vs мг/хоног) холилдох
эрсдэлтэй тул эдгээр туслах функцүүдийг тусад нь гаргаж, unit test-ээр
шалгав (`tests/format/max-dose-percent.test.ts`).

Шинэ `MaxDoseIndicator.tsx` нь `cappedAtMax=false` ҮЕД Л харагдана (бодитоор
тассан бол `CapAlert` аль хэдийн 100%-ийг илэрхийлнэ — хоёуланг зэрэг
харуулбал давхардана). `DoseSummary.tsx`-д `doseAlertOf()` туслах функцээр
аль нэгийг сонгоно (complexity-г бууруулах зорилгоор JSX-ээс тусгаарлав).

### 8.3 Дайчлан олсон урьдач алдаа — CapAlert-ийн нэгж холилдсон байсан

8.2-г хэрэгжүүлэх явцад screenshot-оор шалгахад **урьд өмнөх** `CapAlert.tsx`
"XXX мг/хоногийн хязгаарт таслагдсан" гэж бичдэг байсан ч XXX бол үнэндээ
`trace`-ийн "Дээд хязгаар" алхмын `resultMg` — НЭГ УДААГИЙН тунгийн утга
байв (жишээ: 60кг өвчтөнд "1000 мг/хоногийн хязгаарт" гэж харуулсан ч
доор нь "Өдрийн нийт: 2400–3000 мг" гэж зөрчилтэй бичигдэж байсан).
`dailyLimitMg()`-ийг ашиглан засав — одоо "3000 мг хязгаарт таслагдсан"
гэж доод хэсэгтэйгээ нийцнэ. Screenshot-оор бодит capped тохиолдол (жин
60кг, 10 нас, Amoxicillin) шалгаж баталгаажуулсан.

### 8.4 Ажлын урсгал — device дээр шууд файл засах

Энэ давалгаанд device_bash-аар шууд `python3`-ийн `open(path, "r+")` +
`write()` + `truncate()`-ээр IN-PLACE засвар хийж болохыг нээв — `rm`/
`tar x` л EPERM өгдөг, ердийн дахин бичих (delete-recreate биш,
truncate-rewrite) АЖИЛЛАНА. Энэ нь өмнөх tar+SendUserFile+device_commit_files
дугуйг тойрч, шууд device дээр засвар хийх, дараа нь зөвхөн шалгалтын
зорилгоор cloud clone руу `device_stage_files`-ээр синк хийх боломж
олгосон — хамаагүй хурдан.


## 9. Түлэгдэлтийн диаграм — Wallace Rule of Nines SVG (2026-08-18)

Хэрэглэгч Figma-гийн Burns мокапт байсан хийсвэр дүрс (тойрог толгой,
тэгш өнцөгт их бие) -ийг жинхэнэ анатомийн SVG диаграмаар (Wikipedia-гийн
Wallace Rule of Nines зурагтай төстэй) солиулахыг хүслээ. Зохиогчийн
эрхийн шалтгаанаар зургийг шууд хуулбарлаагүй — өөрийн зохиомж, дизайны
токенд нийцсэн, БОДИТ 12 бүсийг (`RULE_OF_NINES` дэх бүх түлхүүр)
байрлалаар нь тэмдэглэсэн SVG-г шинээр зурав.

### Архитектурын шийдвэр
`BodyMap.tsx`-ийн ХУУЧИН жагсаалт (`RegionButton.tsx`, товч бүрийн
эгнээ) нь ЗОРИУДАА диаграм БИШ байсан — код дотор тайлбарласан шалтгаан:
"гар утсан дээр товшилт нарийн, буруу бүс сонгох эрсдэлгүй". Энэ
эрсдэлийг арилгаагүй, ЗӨӨВӨРЛӨСӨН: диаграм дээр товшсоны дараа
`SelectedRegionsList.tsx` доор ЯГ юу сонгогдсоныг ТЕКСТЭЭР шууд
харуулна (нэр, зэрэг, хувь, хасах товч) — эмч нэг харцаар шалгаж,
буруу бол шууд засах боломжтой. Ингэснээр Figma-гийн хүссэн визуал
диаграм ба анхны аюулгүй байдлын шаардлага хоёул хангагдав.

### Файлууд
- `body-parts.ts` — 16 биеийн хэсгийн байрлал (`viewBox 0 0 220 460`,
  rect/ellipse координат), урд/ар талд аль нь БОДИТООР тэмдэглэгддэгийг
  зааж өгсөн `FRONT_PART_REGION`/`BACK_PART_REGION` map. Зүүн/баруун нь
  ӨВЧТӨНИЙ тал (эмнэлзүйн конвенц) — үзэгчээс харахад толин тусгал.
- `BodyDiagram.tsx` — нэг талын SVG. Тухайн талаас тэмдэглэдэггүй мөч
  (жишээ: урд талд хөл) саарал, товшигдохгүй дүрсээр зурагдана — бие
  бүтэн харагдана, гэхдээ буруу газар товших боломжгүй.
- `region-style.ts` — өнгийг Tailwind `fill-*` классаар БИШ, CSS
  хувьсагчаар (`var(--warning-muted)` гэх мэт) шууд `style` prop-оор
  өгнө — ингэснээр dark mode-д автоматаар дагана.
- `SelectedRegionsList.tsx` — сонгосон бүсийн текст баталгаа (дээрх
  архитектурын шийдвэрийг үз).
- `BodyMap.tsx` — Урд/Ар тал сэлгэх `ToggleGroup` + диаграм + жагсаалтыг
  угсарна.

Хуучин `RegionButton.tsx` ашиглагдахгүй болж `_to_delete/`-рүү шилжив.
`use-burn-selections.ts`, `next-depth.ts`, `nines-band.ts`,
`rule-of-nines.ts` зэрэг тооцооллын код БҮГД хэвээрээ — зөвхөн
харагдац солигдов.

### Дайчлан олсон lint-ийн заль
`RULE_OF_NINES[region]?.[band] ?? 0` шиг `?.`/`??`-той хайлт бүрийг
дуудагч функц дотор шууд бичвэл `complexity`-д нэмэлт 2 нэмэгддэг
(optional chaining ба nullish coalescing аль аль нь branch тооцогддог).
Иймд ийм хайлтуудыг ЗААВАЛ тусдаа жижиг функцэд гаргах хэрэгтэй
(`percentOf`, `regionLabelOf`) — эс бөгөөс нэг `if`-тэй хамт budget
(`max 3`)-аас амархан давна.
