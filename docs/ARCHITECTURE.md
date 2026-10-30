# Архитектур — dosage.mn

> Энэ баримт нь хавтасны бүтэц, давхаргын хариуцлага, кодын дүрмийг
> тодорхойлно. Эх сурвалжийн стратегийг `docs/SOURCES.md`-ээс үзнэ үү.

---

## 1. Үндсэн зарчим

```
Өгөгдөл  →  Тооцооллын engine  →  UI
 (data)        (engine)          (components)
```

**Нэг чиглэлтэй.** Engine нь UI-г мэдэхгүй. Өгөгдөл нь engine-г мэдэхгүй.

**Хамгийн чухал дүрэм:** engine дотор эмийн `id`-гаар салаалсан нөхцөл
бичихийг **хориглоно**. Эмийн онцлог бүхэн `DosingRule` эсвэл `DoseCap`
хэлбэрээр өгөгдөлд байрлана.

Хуучин кодод байсан жишээ:

```ts
// ❌ БОЛОХГҮЙ — өгөгдөл engine рүү нэвчсэн
if (drug.id === "domperidone") {
  const weightCap = roundDose(0.75 * patient.weightKg);
}
```

Шинэ бичиглэл:

```ts
// ✅ Өгөгдлөөр илэрхийлсэн
caps: [{ kind: "per_kg", scope: "per_day", maxMgPerKg: 0.75 }]
```

50 эмтэй үед энэ ялгаа мэдэгдэхгүй. 500 эмтэй үед энэ л ялгаа engine-ийг
дахин бичих эсэхийг шийднэ.

---

## 2. Хавтасны бүтэц

```
lib/
├── domain/                    Типүүд. ЛОГИК БАЙХГҮЙ.
│   ├── patient.ts             Өвчтөний оролт
│   ├── drug.ts                Эм
│   ├── dosing-rule.ts         Тунгийн дүрэм (эм бүр ОЛОН дүрэмтэй)
│   ├── dosing-basis.ts        мг/кг/тун · мг/кг/өдөр · жингийн муж · тогтмол
│   ├── dose-cap.ts            Дээд хязгаар (тогтмол эсвэл жинд суурилсан)
│   ├── dose-range.ts          { minMg, maxMg }
│   ├── formulation.ts         Шингэн / хатуу бэлдмэл
│   ├── frequency.ts           Давтамжийн код → өдрийн тунгийн тоо
│   ├── indication.ts          Хэрэглэх заалт
│   ├── source.ts              Эх сурвалж, нотолгооны түвшин
│   ├── warning.ts             Анхааруулга
│   ├── category.ts            Эмийн ангилал
│   ├── route.ts               Хэрэглэх зам
│   └── calculation-result.ts  Үр дүнгийн бүтэц
│
├── engine/                    ЦЭВЭР функцүүд. I/O байхгүй.
│   ├── calculate-dosage.ts    ★ ГАНЦ нийтийн орц
│   ├── compute-dose.ts        Дүрэм → тун
│   ├── build-outcome.ts       Үр дүн угсрах
│   ├── ineligible.ts          Тооцоолох боломжгүй тохиолдол
│   ├── index.ts               Нийтийн API
│   │
│   ├── basis/                 Тунгийн үндэслэл тус бүрд нэг файл
│   │   ├── evaluate-basis.ts  Dispatch хүснэгт (switch БИШ)
│   │   ├── per-kg-per-dose.ts
│   │   ├── per-kg-per-day.ts
│   │   ├── weight-band.ts
│   │   ├── match-weight-band.ts
│   │   └── fixed.ts
│   │
│   ├── caps/                  Дээд хязгаарын логик
│   │   ├── apply-caps.ts
│   │   ├── resolve-dose-limit.ts
│   │   ├── to-per-dose-limit.ts
│   │   └── resolve-cap-mg.ts
│   │
│   ├── rule/                  Дүрэм сонголт
│   │   ├── select-rule.ts
│   │   ├── prefer-rule.ts     Заалт > isDefault > эхнийх
│   │   ├── match-rule.ts
│   │   ├── match-age.ts
│   │   ├── match-weight.ts
│   │   ├── match-indication.ts
│   │   └── is-exact-indication.ts
│   │
│   ├── eligibility/           Тооцоолох эрх
│   │   ├── check-eligibility.ts
│   │   ├── check-weight-range.ts
│   │   ├── check-age-range.ts   18-с дээш (насанд хүрэгч) — зогсооно
│   │   └── limits.ts
│   │
│   ├── formulation/           Тун → мл / шахмал
│   │   ├── calculate-amounts.ts
│   │   ├── formulation-amount.ts
│   │   ├── liquid-volume.ts
│   │   └── solid-count.ts
│   │
│   ├── math/                  Тоймлол, муж
│   │   ├── round-to.ts · round-dose.ts · round-volume.ts
│   │   ├── round-range.ts · limit-range.ts · scale-range.ts
│   │   └── is-within-range.ts
│   │
│   └── trace/                 Тооцооллын алхмууд
│       ├── build-trace.ts
│       ├── describe-basis.ts
│       ├── cap-trace-steps.ts
│       └── trace-step.ts
│
├── format/                    Харуулах формат. Тооцоолол ХИЙХГҮЙ.
│   ├── format-dose.ts · format-amount.ts
│   ├── format-range.ts · format-number.ts
│   ├── format-tablet-fraction.ts · format-frequency-short.ts
│   └── format-prescription.ts   Хуулах текст (V6 жорын суурь)
│
├── data/                      ӨГӨГДӨЛ. max-lines дүрэм үйлчлэхгүй.
│   ├── drugs/                 ★ Эм бүр НЭГ файл (50 ширхэг)
│   │   ├── index.ts           DRUGS жагсаалт + DRUG_BY_ID
│   │   ├── paracetamol.ts
│   │   ├── amoxicillin.ts
│   │   └── … (48 бусад)
│   ├── sources/
│   │   ├── registry.ts        Эх сурвалжийн бүртгэл
│   │   ├── get-source.ts
│   │   └── do-not-copy.ts
│   └── labels/
│       ├── category-labels.ts · frequency-labels.ts · route-labels.ts
│
├── validation/                Build үеийн шалгалт
│   └── validate-source-refs.ts
│
├── search/                    Хайлт. Латин + кирилл INN.
│   ├── filter-drugs.ts · match-drug-query.ts · normalize.ts
│
├── drugs.ts        ⚠️ ЗӨВХӨН ТЕСТЭД — тэнцвэр шалгах лавлагаа
└── calculations.ts ⚠️ ЗӨВХӨН ТЕСТЭД — хуучин engine

components/
├── ui/                        shadcn/ui. Vendored эх код — гар хүрэхгүй.
│   ├── button.tsx · card.tsx · input.tsx · label.tsx
│   └── badge.tsx · alert.tsx · separator.tsx
├── Disclaimer.tsx
├── calculator/                Төлөв эзэмшигч (client)
│   ├── CalculatorPage.tsx     ★ Орц
│   ├── use-selected-drugs.ts · use-dosage-results.ts
│   ├── patient-form.ts        Түүхий оролт → Patient
│   ├── PatientInput.tsx · WeightField.tsx · AgeFields.tsx
│   ├── NumberField.tsx · WeightWarning.tsx
│   ├── InputColumn.tsx · ResultsColumn.tsx · ResultsPanel.tsx
│   ├── EmptyState.tsx · use-indications.ts
│   └── AppHeader.tsx · PrintButton.tsx · AppFooter.tsx
├── search/                    Эм хайх, сонгох
│   ├── DrugSearch.tsx · SearchField.tsx
│   ├── SearchHeader.tsx · CategoryFilter.tsx · CategoryPill.tsx
│   ├── VerifiedToggle.tsx     «Зөвхөн баталгаажсан» шүүлтүүр
│   └── DrugList.tsx · DrugListItem.tsx · DrugListItemIcon.tsx
├── dosage/                    Үр дүнгийн карт
│   ├── DosageCard.tsx         ★ Угсрагч
│   ├── DosageCardHeader.tsx · DoseSummary.tsx
│   ├── FormulationList.tsx · WarningList.tsx · NotesPanel.tsx
│   ├── TraceDetails.tsx       Дэлгэгдэх «Яаж бодсон бэ?»
│   ├── SourceFooter.tsx       Нотолгооны түвшин + эх сурвалж
│   ├── SourceList.tsx · ReviewDate.tsx
│   ├── EvidenceBadge.tsx      Нотолгооны түвшний Badge (карт дотор)
│   ├── EvidenceDot.tsx        Нотолгооны цэг (жагсаалтад)
│   ├── IndicationPicker.tsx   Хэрэглэх заалт сонгох
│   ├── BetterEvidenceHint.tsx Илүү сайн эх сурвалж руу зам заах
│   ├── CapNotice.tsx · DurationBlock.tsx
│   ├── IneligibleCard.tsx · AgeDisplay.tsx · SectionLabel.tsx
├── summary/                   Сонгосон эмийн наалдамхай хураангуй
│   ├── SelectedSummary.tsx    ★ Тун · үсрэх · хасах · хуулах
│   ├── SummaryRow.tsx · SummaryDose.tsx
│   ├── RemoveButton.tsx · CopyButton.tsx
│   └── drug-anchor.ts         Карт руу үсрэх зангуу
├── print/                     Зөвхөн хэвлэхэд
│   └── PrintTemplate.tsx · PrintHeader.tsx · PrintRow.tsx
│                              PrintFormulations.tsx · PrintWarnings.tsx


tests/
├── legacy-engine.test.ts      ★ ХАМГААЛАЛТЫН ТОР (snapshot)
├── equivalence.test.ts        ★ Хуучин vs шинэ engine ижил үр дүн
├── search/filter-drugs.test.ts
├── helpers/compare-engines.ts
├── engine/
│   ├── calculate-dosage.test.ts
│   ├── select-rule.test.ts    Заалтын эрэмбэ
│   └── dose-cap.test.ts
└── fixtures/
    ├── patients.ts
    └── make-drug.ts           Тестийн эм/дүрэм үүсгэгч
```

---

## 3. Кодын дүрэм

`eslint.config.mjs` дотор механикаар албадуулсан:

| Дүрэм | Хязгаар | Яагаад |
|---|---|---|
| `complexity` | **3** | Функц бүр нэг үүрэгтэй байхыг албадана |
| `max-depth` | 3 | Гүн үүрлэсэн нөхцөлөөс сэргийлнэ |
| `max-lines` | 160 | Файл нэг сэдэвтэй байх |
| `max-lines-per-function` | 40 | Функц дэлгэцэнд багтах |
| `max-nested-callbacks` | 2 | Callback-ийн шат хязгаарлана |
| `max-params` | 4 | Илүү бол объект оролт ашиглана |

`lib/data/**` болон `components/ui/**` дээр хэмжээний дүрэм хаалттай —
эхнийх нь өгөгдөл, хоёр дахь нь shadcn-ий vendored эх код.

**Хязгаар давбал функцээ салгана. Дүрмийг сулруулж БОЛОХГҮЙ.**

Тайлан: `lib/data/**` дээр `max-lines` хаалттай — өгөгдөл нь кодын
нарийн төвөгтэй байдал биш.

### complexity 3 хэрхэн нөлөөлөв

`switch` бичих боломжгүй болсон (4 сонголт = complexity 5). Оронд нь
**dispatch хүснэгт**:

```ts
const EVALUATORS: Evaluators = {
  per_kg_per_dose: (basis, patient) => perKgPerDose(basis, patient),
  per_kg_per_day: (basis, patient, doses) => perKgPerDay(basis, patient, doses),
  weight_band: (basis, patient) => weightBand(basis, patient),
  fixed: (basis) => fixed(basis),
};
```

Шинэ төрөл нэмэхэд **нэг мөр** нэмнэ — салаалалт өсөхгүй. Энэ бол
хязгаарлалт биш, харин дүрмээс гарсан илүү сайн дизайн.

---

## 3b. Дизайн систем — shadcn/ui

`components.json` тохируулагдсан. `bunx shadcn@latest add <name>` шинэ
компонент нэмнэ, `components/ui/` доор орно.

**Дүрэм: `components/ui/` доторхыг гар аргаар засварлахгүй.** Засвал
дараагийн `shadcn add` дарж бичихэд зөрчил гарна. Хэрэгцээт өөрчлөлтийг
`cn()`-ээр гаднаас нь дамжуулна.

### Өнгөний token

`app/globals.css` дотор oklch хувьсагчаар. shadcn-ий стандарт багцад
эмнэлзүйн хэрэгцээт **`warning`** гурвал нэмсэн:

| Token | Хэрэглээ |
|---|---|
| `--primary` | Нам гүм эмнэлгийн хөх |
| `--destructive` | Тооцоолол боломжгүй, хориглох заалт |
| `--warning` / `--warning-muted` | Дээд хязгаар, анхааруулга, `D_unverified` |

`Badge`-д `soft`, `warning`, `success`, `Alert`-д `info`, `warning`
хувилбар нэмсэн — эдгээр нь `EvidenceLevel`-ийн 4 түвшинг илэрхийлнэ.

### Radix ашиглаагүй хоёр газар — зориудаар

| Хэсэг | Оронд нь | Шалтгаан |
|---|---|---|
| Trace дэлгэх | native `<details>` | JavaScript, hydration хэрэггүй. Bedside-д хамгийн хурдан |
| Эмийн жагсаалтын гүйлгээ | native `overflow-y-auto` | Гар утсан дээр momentum scroll native нь илүү |

Bundle-ийн жин нь bedside workflow-д шууд нөлөөтэй тул Radix-ийг зөвхөн
бодит хэрэгцээтэй газарт нь оруулна.

---

## 4. Тооцооллын урсгал

```
calculateDosage(drug, patient, options)
  │
  ├─ checkEligibility(patient)          жин хязгаарт байна уу, 18-с доош уу
  │    └─ ineligible → зогсоно
  │       ⚠️ 2026-08-20: дэлхийн 18 насны (216 сар) хязгаар нэмсэн.
  │       dosage.mn ЗӨВХӨН хүүхдийн мг/кг тун тооцоолдог — насанд
  │       хүрэгчид ихэнх эм ФИКС тунтай (жингээс үл хамаарна) тул мг/кг
  │       томьёог үргэлжлүүлж болохгүй (жишээ: captopril).
  │
  ├─ selectRule(drug, patient, code)    нас · жин · заалтаар шүүх
  │    ├─ matchRule → matchAge + matchWeight + matchIndication
  │    └─ preferRule: заалт > isDefault > эхнийх
  │
  └─ computeDose(drug, rule, patient)
       ├─ DOSES_PER_DAY[rule.frequency]
       ├─ evaluateBasis → НЭГ УДААГИЙН тунгийн муж
       └─ buildOutcome
            ├─ applyCaps      бүх хязгаарыг per-dose болгож min авна
            ├─ roundRange     тоймлол
            ├─ scaleRange     өдрийн нийт тун
            ├─ calculateAmounts  мл / шахмал
            └─ buildTrace     эмчид харуулах алхмууд
```

### Trace — яагаад чухал вэ

"180 мг" гэж хэлэхээс илүү:

```
Үндсэн тооцоо:      15 мг/кг × 12 кг      → 180 мг
Нэг удаагийн тун:   180 мг
Өдрийн нийт тун:    180 мг × 4            → 720 мг
```

Эмч өөрөө шалгах боломжтой болно. Энэ бол black-box калькулятор ба
эмнэлзүйн хэрэгслийн ялгаа.

---

## 5. Шилжүүлэлтийн төлөвлөгөө

Одоогийн байдал: **шинэ engine бэлэн, өгөгдөл хуучин хэвээр.**
Апп ажиллаж байна — `lib/calculations.ts` хөндөгдөөгүй.

| Алхам | Ажил | Төлөв |
|---|---|---|
| 1 | Lint дүрэм, Vitest, хавтасны бүтэц | ✅ |
| 2 | Domain типүүд (Drug + DosingRule[] + DoseCap) | ✅ |
| 3 | Engine функцүүд, файл тутамд нэг үүрэг | ✅ |
| 4 | Snapshot хамгаалалт (хуучин engine) | ✅ |
| 5 | 50 эмийг `lib/data/drugs/<id>.ts` рүү шилжүүлэх | ✅ |
| 6 | UI-г шинэ engine рүү залгах | ✅ |
| 7 | Эх сурвалж нэмэх (50 эм), `D_unverified` арилгах | ⬜ |

### Алхам 5 — юу хийгдсэн, юу үлдсэн

`scripts/migrate-drugs.mjs` нь **нэг удаагийн** codemod. Ажилласан, дахин
ажиллуулахгүй. Одооноос `lib/data/drugs/` нь эх сурвалж — гараар засварлана.

**Хийгдсэн:** бүтцийн хөрвүүлэлт. `domperidone`-ы hardcode хязгаар
өгөгдөл болов. Тунгийн утга **нэг ч миллиграммаар өөрчлөгдөөгүй** —
`tests/equivalence.test.ts` 350 тохиолдол дээр 0 ялгаа баталсан.

**Үлдсэн:** эм бүр `evidenceLevel: "D_unverified"`, `sources: []`,
`lastReviewed: "1970-01-01"`. Эдгээр нь **зориуд илэрхий худал** утга —
бөглөгдөөгүйг нуухгүй, харин тоолж болохуйц өр болгож харуулна.
`docs/SOURCES.md`-ийн ажлын урсгалын дагуу эм бүрд:

```
sources[] → evidenceLevel → lastReviewed → reviewedBy
          → contraindicationsMn → availableInMn → warnings[].level
```

Файл бүрийн толгойд энэ 6 алхмын жагсаалт тайлбар болгон байгаа.

### Эм бүр нэг файл — яагаад

`lib/data/drugs/paracetamol.ts` (~40 мөр) хэлбэрээр. Шалтгаан:

- 500 эмтэй болоход нэг файл 15,000 мөр болохгүй
- Git diff цэвэр — нэг эм өөрчлөгдвөл нэг файл өөрчлөгдөнө
- Хянасан эмчийн нэрийг эм тус бүрд бүртгэхэд тохиромжтой
- Дараа database рүү шилжихэд мөр бүр нэг бичлэг болно

---

## 6. Одоо ажиллуулах командууд

```bash
bun install        # vitest суулгах
bun run typecheck  # tsc --noEmit
bun run lint       # eslint
bun run test       # vitest run  (эхний удаад snapshot үүснэ)
```

**Чухал:** `bun run test`-ийг эхлээд ажиллуулж, `tests/__snapshots__/`
доор үүсэх файлыг **заавал commit хийнэ**. Энэ файл бол хамгаалалтын тор.

---

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
