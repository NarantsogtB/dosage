# Шат 9 — Төлөвийн шалгалт (2026-11-09) + V4 dark redesign заавар

> Агент: эхлээд §1–2-ыг уншаад, зөвхөн өгөгдсөн дэд шатаа (9a…9h) хий.
> Ерөнхий дүрэм: root `CLAUDE.md`, `components/CLAUDE.md`. Figma: `W1la5Yp9xqZwQmUnuJZyXZ`,
> хуудас **«V4 · Dark (Golomt-style) — draft»** (node `119:2`). Дизайны тайлбар:
> Claude Project-ийн `claude/v3-atomic-redesign.md`.

## 1. Roadmap-ийг кодтой тулгасан дүн (commit `5ab31ce`)

`bun run lint` ✓ · `tsc --noEmit` ✓ · `bun run test` 43 файл / 278 тест ✓ ·
`contrast` — зөвхөн зөвлөмж (border/card 1.45, чимэглэл).

| Шат | README-д | Кодонд нотолгоо | Дүн |
|---|---|---|---|
| S1 legacy | ☑ | `lib/drugs.ts`, `lib/calculations.ts` устсан | ✅ |
| 0 эх сурвалж | Бүлэг 1,2,4 ☑ | 40 эм, 37 баталгаажсан; E: aciclovir, propranolol, hydrocortisone (draft); 9 known-gap; бүх `lastReviewed` = 1970-01-01 | ⏳ Бүлэг 3 + эмчийн хяналтын давалгаа үлдсэн |
| 1 offline | ☑ | `scripts/build-sw.ts`, `sw.template.js`, `pwa/ServiceWorkerUpdate`, `nav/OfflineBadge` | ✅ |
| 2a patient bar | ☑ | `calculator/PatientBar.tsx`, `WeightUnit "kg"|"g"`, `patient-store.ts` (sessionStorage — `/dose` ↔ `/dose/[slug]` шилжихэд хадгалагдана) | ✅ |
| 2b result card | ☑ | `dosage/MaxDoseMeter`, `EvidenceChip` (popover), `FormulationTable`, `RxLine`, `DisclosureRow`; `BetterEvidenceHint` заалтын доор | ✅ |
| 2c navigation | ☑ | `nav/BottomNav`, `calculator/ActionBar`, `nav/SearchTrigger` (⌘K) | ✅ |
| S3 registry | ☑ | `lib/calculators/registry.ts` | ✅ |
| 3 fluids | ☑ | `app/fluids`, `components/fluids` | ✅ |
| S2 / 4 заалт | ☑ | `lib/data/labels/indications.ts`, хайлтын заалт | ✅ |
| 5 share link | ☑ | `lib/share/share-link.ts`, `ShareLinkButton` (fragment) | ✅ |
| S4 нэгж | ☑ | `lib/domain/dose-unit.ts` | ✅ (хурд — зөвхөн төрөл) |
| 6 IV/IM | ☑ | `formulation.ts` powder, замын badge | ✅ |
| 7 emergency | 7a,7b ☑ | `app/emergency`, `lib/calculators/emergency` | ⏳ 7c (amiodarone, дефибрилляци, midazolam, ETT) |
| 8 scores | ☐ | `lib/calculators/` дотор scores алга | ☐ |
| S5 lazy drugs | ☐ | Trigger хүрээгүй (40 эм) | ☐ — хүлээнэ |

## 2. Шинээр олдсон дутуу (V4-өөс өмнө засах)

| # | Асуудал | Хаана | Засах | Эрсдэл |
|---|---|---|---|---|
| G1 ✅ (`fix/decimal-comma-input`) | Жин `type="number"` — зарим хөтөч/locale-д (таслалтай тоон гар) «12,5» бичихэд `value` = `""` болж «жин алга» гэж чимээгүй ойлгогдох эрсдэлтэй. Эхлээд iOS Safari + Android Chrome (mn/ru locale) дээр гараар баталгаажуул | `calculator/NumberField.tsx:58` | `type="text" inputMode="decimal"`, `,`→`.` normalize нэг цэвэр функцэд (`patient-form.ts`), буруу тэмдэгтэд талбарын доор алдаа. Тест: «12,5», «12.5», «1,2,3» | **Өндөр** |
| G2 ✅ (`fix/round-within-cap`) | Тоймлолт хязгаараас ≤0.05 мг давна (domperidone) | `math/round-dose.ts` | Эмчийн шийдвэр хүлээж буй — код бүү өөрчил | Эмч |
| G3 ✅ (`fix/age-mismatch-reason`) | Нас тохирохгүй үеийн мессеж ерөнхий | `calculate-dosage.ts` | Аль насны хязгаар гэдгийг нэрлэх | Дунд |
| G4 ✅ | Burns: гуя/шилбэ/хөл зөвхөн ар талаас сонгогдоно | `burns/body-paths.ts` | 9f-д засагдсан (хоёр талаас, нэг бүс) | Дунд |

## 3. V4 — хэрэглэгчийн шийдвэр (2026-11-04)

Голомт банкны шинэ апп загвар · **dark анхдагч** · банкны dashboard нүүр ·
фонт **Onest** · **олон өвчтөний карт** · таб: Нүүр · Эмүүд · Тохиргоо;
нүүрний 4 товч = бодит 4 тооцоолуур (Эмийн тун, Түлэгдэлт, Шингэн, Яаралтай) ·
desktop = Голомтын 3 багана.

**Хөдлөшгүй дүрэм:** engine/format/data-д гар хүрэхгүй (зөвхөн UI) · шинэ тоо
зохиохгүй · бутархайг бүдгэрүүлэхгүй · улаан = зөвхөн аюул · нотолгоо = цэг+үсэг ·
өвчтөний нэр хадгалахгүй (жин, нас, өндөр, шошго л) · хүрэх талбай ≥44px ·
glass (`backdrop-filter`) зөвхөн tab bar / hero товч / hero карт.

## 4. Дэд шатууд

Дараалал: G1 → 9a → 9b → 9c → 9d → 9e → 9f → 9g → 9h → 9i (9i-г 9a-гийн дараа хэзээ ч хийж болно). Том шат бүрийг plan mode-оор.
Шат бүрийн дараа: `bun run check`, 390px + 1440px + 1366px screenshot, энэ файлд ☑.

| # | Ажил | Figma node | Хугацаа | Төлөв |
|---|---|---|---|---|
| 9a | Token + фонт + dark анхдагч | `119:22` фонт, collection «V4 Dark (draft)» | 1 өдөр | ☑ |
| 9b | Нүүр dashboard + олон өвчтөн | `120:62`, `131:1359`, `128:792`, `128:858` | 3–4 өдөр | ☑ |
| 9c | Үр дүнгийн «баримт» | `123:100`, `130:1234`, `130:1413` | 2–3 өдөр | ☑ |
| 9d | Эмүүд таб + бүтэн дэлгэцийн хайлт + Тохиргоо | `123:263`, `128:917`, `131:1511` | 2–3 өдөр | ☑ |
| 9e | Түүх | `139:1636` | 2 өдөр | ☑ |
| 9f | Түлэгдэлт + хүн шиг диаграм | `138:1549`, comp `137:1584`, `140:1675` | 2 өдөр | ☑ |
| 9g | Desktop 3 багана, modal, ⌘K | `126:354`, `127:426`, `127:725`, `129:823`, `129:948` | 3 өдөр | ☑ |
| 9h | `/fluids`, `/emergency` V4 загварт | **Figma-д алга** — эхлээд зурж батлуулна | — | ☐ |
| 9i | Landing V4 + Яаралтай картыг нэмэх | `154:1859` mobile, `156:1911` desktop 1440 | 1–1.5 өдөр | ☐ |

**9a.** `app/globals.css`-ийн `.dark` токеныг Figma «V4 Dark (draft)»-ийн утгаар
(bg/ink #05070D, sheet #0A0D14, card #1B1F27, raised #272C36, teal #5DBCC1,
tile #16808A, danger #EF736C, warning #E6B55D). Light токен хэвээр. `ThemeProvider`
`defaultTheme="dark"` (Тохиргооноос Цайвар/Систем). Фонт `next/font/google` **Onest**
(cyrillic, `tnum`); `.num` хэвээр. `docs/DECISIONS.md` + `docs/design-system/typography.md`.
Шалгуур: `bun run contrast` light+dark заавал хэсэг ногоон; хэвлэх загвар цайвар хэвээр.

**9b.** Mobile нүүр: hero = өвчтөний карт («Ор 3 · 8 сар ⌄», «12.5 кг»), гүйлгэж солих,
4 шилэн товч (registry-с), «Энэ өвчтөнд» картууд (хуулах = жорын мөр). Өвчтөнгүй үед
«+ Жин оруулах». Өвчтөн нэмэх = 2 алхам (Жин → Нас), том тоо голд. Олон өвчтөн:
`patient-store.ts`-ийг `Patient[]` + `activeId` болго, **sessionStorage хэвээр**,
шошго заавал биш, max 6. Шилжилт route-оор биш (одоогийн `/dose` дотор).
Тест: store parse/serialize, хуучин нэг-өвчтөний формат → шинэ рүү migrate.

**9c.** `DosageCard`-ийн бүтэц, дараалал хэвээр — зөвхөн харагдах байдал: шилэн толгой
(мг ба мл ижил тод, нотолгоо тунгийн overline-д), заалт segmented, 3 tile (давтамж,
хугацаа, өдрийн нийт), meter, хэлбэрийн мөр сонгогдох, «Яаж бодсон бэ?», доод pill
«Жор хуулах». E бол картан дотор шар мөр; capped бол улаан мөр + 100% meter (нэг
дэлгэцэнд нэг danger).

**9d.** Эмүүд таб: «Миний эмүүд» (localStorage, recent-store-ийн хажууд) + ангиллын
картууд (`category-labels.ts`). Хайлт = бүтэн дэлгэц, дээр нь өвчтөний мөр. `DrugIndex`
А–Я бүлэгтэй. Тохиргоо: theme, жингийн нэгж, хэвлэх, «Бүх өвчтөнийг устгах» (undo toast).

**9e.** Түүх: localStorage `dosage.history.v1`, зөвхөн оролт (жин, нас, шошго, drugId,
indication, formulation, цаг) — **үр дүнг хадгалахгүй**, нээхэд одоогийн өгөгдлөөр дахин
тооцоолно. Max 100, 30 хоног. Өдрөөр бүлэглэх, хайлт, шүүлт. Analytics event + `docs/ANALYTICS.md`.

**9f.** `burns/body-parts.ts`-ийн rect/ellipse-ийг Figma comp `137:1584`-ийн path-аар
сольж (viewBox 0 0 200 410; vector нэр = `BodyRegionId`). `BodyDiagram` `<path>` рендер.
Санал (G4, эмчтэй тохир): мөч хоёр талаас дарагдана, нэг бүс рүү map — тэгвэл
«бүс бүр яг нэг талд» тестийг «бүс бүр ≥1 талд, давхар тооцохгүй» болгож шинэчил.
Шалгуур: `totalPercent(band)===100` тест хэвээр; hit area mobile-д ≥44px (жижиг алга,
хөлд шаардлагатай бол үл үзэгдэх томсгосон hit path).

**9g.** ≥1280: 1152px контейнер, зүүн 296 (өвчтөн + товч + өвчтөнүүд + энэ өвчтөнд),
гол 520 (= mobile дэлгэц), баруун aside (нотолгоо, trace, эх сурвалж, disclaimer).
1024–1279: 2 багана. <1024: mobile. Дээд pill nav. Өвчтөн нэмэх = modal (Enter/Esc).
⌘K palette одоогийн `SearchTrigger`-ийг өргөтгөнө.

**9h.** Fluids, Emergency-д V4 дэлгэц Figma-д байхгүй — эхлээд зур, хэрэглэгчээр батлуул.
Emergency: E мөр хэзээ ч харагдахгүй (одоогийн дүрэм).

**9i. Landing V4** (`app/page.tsx`, `components/landing/*`). Бүтэц, агуулга хэвээр — зөвхөн загвар + 1 алдаа.
1. **Алдаа:** `tools.ts` 3 хэрэгсэлтэй, `/emergency` алга. `TOOLS`-ийг `CALCULATOR_REGISTRY`-ээс
   үүсгэ (path, labelMn); тайлбар (`bodyMn`) ба дүрсийг id-аар map хийнэ (`components/nav/routes.ts`
   шиг). Emergency тайлбар = тухайн хуудасны meta description. Тест: landing хэрэгслийн тоо ===
   registry-ийн `live` тоо (шинэ тооцоолуур нэмэхэд landing автоматаар шинэчлэгдэнэ).
2. **Hero** — gradient (`bg/hero-top` → `bg/ink`), H1 3 мөр (3 дахь нь `accent/teal`), цагаан pill
   CTA «Тун тооцоолох» + glass CTA. Mobile: CTA доошоо, desktop: хажуу. Статистик 3 chip
   (`landing-stats.ts`-ээс — тоог гараар бичихгүй).
3. **HeroDemo** — glass «баримт» карт: эмийн нэр + evidence chip, жингийн талбар ±, том мг, teal мл,
   эх сурвалж + ишлэл. `demo-case.ts` болон engine-ийн дуудлага хэвээр; зөвхөн CSS.
   Desktop ≥1024: hero 2 багана (зүүн текст, баруун 440px demo).
4. **ToolGrid** — mobile жагсаалт (tile 48 + chevron), desktop 4 багана. Дүрс: calculator, flame,
   droplet, siren.
5. **EvidenceLadder** — нэг `surface/card` дотор A–E мөр, хуваагч шугамтай. **SafetyPoints** — 4 glass
   карт (Баталгаажаагүй = `signal/warning` дүрс). Desktop: хоёулаа зэрэгцэн 2 багана.
6. **LandingFooter** — teal gradient CTA карт («Туршаад үз»), доор нь эх сурвалж · INN · санал · Instagram.
7. Copy-г кодоос авна. Figma дахь «жинг өөрчлөөд үз», «Нүүр дэлгэцэд нэмж апп шиг ашиглана»,
   evidence-ийн lede — **санал болгосон шинэ copy**; хэрэглэгчээр батлуулаагүй бол оруулахгүй.
Шалгуур: `bun run check`; landing 390/1440 screenshot Figma-тай; 4 хэрэгсэл харагдана; demo тоо
14 кг → 560 мг, 22.4 мл (`landing.test` хэвээр ногоон); Lighthouse a11y ≥ 95, LCP өөрчлөгдөхгүй.

## 5. Хийхгүй / эмчийн шийдвэр хүлээж буй

Disclaimer хураах · мл-ийг гол тоо болгох (9c-д мг, мл **ижил** жинтэй) · Rx мөрөнд мл
нэмэх · Шат 8 scores, 7c — тусдаа шатаар.

## 6. CLI prompt

```
docs/roadmap/phase-9-v4-redesign.md-ийн <G1 | 9a | 9b …>-г хэрэгжүүл. Figma
W1la5Yp9xqZwQmUnuJZyXZ node <id>-г get_design_context-оор ав. engine/format/data-д
гар хүрэхгүй. Дуусахад bun run check, 390/1440 screenshot, энэ файлд ☑.
```
