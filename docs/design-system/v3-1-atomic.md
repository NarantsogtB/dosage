# V3.1 — Atomic redesign (2026-10-30)

Figma: `W1la5Yp9xqZwQmUnuJZyXZ`, хуудас `V3 · 00`–`V3 · 05` (92:3–92:8).
Бүх тоо engine-ийн бодит гаралт (Amoxicillin 12.5 кг · 8 сар → уушгины
хатгаа 500 мг = 20 мл, 50%; ерөнхий 166.7–375 мг, 38%; 60 кг · 10 нас →
800–1000 мг, тасалсан 100%) — build-ийг Playwright-аар тулгаж шалгасан.

### Компонентын зураглал

| Figma (V3 · 0x) | Код |
|---|---|
| Kbd, Meter, Step check · 01 | `ui/kbd.tsx`, `ui/meter.tsx`, `step/StepCheck.tsx` |
| Evidence chip + popover · 02 | `dosage/EvidenceChip.tsx` (`ui/popover.tsx`) |
| Weight field (кг \| г) · 02 | `calculator/WeightField.tsx`, `patient-form.ts` (`weightUnit`, `convertWeight`) |
| Max-dose meter · 02 | `dosage/MaxDoseMeter.tsx`, `lib/format/max-dose-tone.ts` — `MaxDoseIndicator` + `CapAlert`-ийг орлосон |
| Formulation table · 02 | `dosage/FormulationTable.tsx` — `FormulationList`-ийг орлосон |
| Rx line · 02 | `dosage/RxLine.tsx` |
| Disclosure row · 02 | `dosage/DisclosureRow.tsx` (Яаж бодсон / Тэмдэглэл) |
| Readiness checklist · 02 | `calculator/ReadinessChecklist.tsx` — `EmptyState`-ийг орлосон |
| Undo toast · 02 | `calculator/use-undoable-removal.ts` — `UndoBar`-ийг орлосон |
| App header · 03 | `nav/SiteHeader.tsx`, `nav/CalculatorNav.tsx`, `nav/SearchTrigger.tsx` |
| Bottom nav · 03 | `nav/BottomNav.tsx` |
| Patient bar · 03 | `calculator/PatientBar.tsx` — `SelectedSummary`-г орлосон |
| Action bar · 03 | `calculator/ActionBar.tsx` |
| Drug search panel · collapsed · 03 | `search/DrugSearchCollapsed.tsx` |
| Dose result card · 03 | `dosage/DosageCard.tsx` |
| Drug page header / reference / index · 03 | `drug-page/*` (`<details>`, SSR) |
| Templates · 04 | `calculator/CalculatorPage.tsx` (lg: 5/7) |

Товчлол: `/` ба ⌘K / Ctrl+K → хайлт (`search/search-focus.ts`).
Өвчтөний хэлбэр `sessionStorage`-д (`calculator/patient-store.ts`) —
`/dose` ↔ `/dose/[slug]` шилжилтэд үлдэнэ, таб хаахад арилна.

### Эмнэлзүйн/хуулийн хяналт хүлээж буй — feature flag

`lib/flags.ts`, build үед. Анхдагч УНТРААЛТТАЙ (одоогийн байдал):

| Env | Асаавал |
|---|---|
| `NEXT_PUBLIC_V3_COLLAPSED_DISCLAIMER=1` | Disclaimer-ийн 2-р догол мөр сумны цаана (текст ижил) |
| `NEXT_PUBLIC_V3_ML_FOCAL=1` | «500 мг = **20 мл**» — мл primary өнгөтэй том тоо (шингэн хэлбэрт) |
| `NEXT_PUBLIC_V3_RX_FORMULATION=1` | Rx мөрөнд сонгосон хэлбэр/мл. Бүх эмийн «Жор хуулах» текст өөрчлөгдөхгүй |

### Figma-аас зориуд ЗӨРҮҮТЭЙ

- Desktop-ийн баруун багана sticky БИШ — картууд дэлгэцээс өндөр тул
  наалдвал доод хэсэг нь хүрэгдэхгүй. Disclaimer дээд талд хэвээр.
- Жин+нас бөглөгдмөгц хайлт руу автоматаар фокус ШИЛЖҮҮЛЭЭГҮЙ —
  mobile-д сар бичиж байхад гар солигдох эрсдэлтэй.
- Эмийн лавлах мэдээлэл desktop-д ч хураагдсан (Figma-д нээлттэй) —
  `<details>`-ийг CSS-ээр нээх найдвартай арга байхгүй.
- Жагсаалтын «Өнгөт цэг юу заадаг вэ?» legend хэвээр — жагсаалтын
  мөрийн цэг товч биш тул popover-гүй.
