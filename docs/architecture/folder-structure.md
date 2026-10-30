<!-- ARCHITECTURE.md-аас хуваасан. Бусад хэсэг: ./README.md -->
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
└── search/                    Хайлт. Латин + кирилл INN.
    ├── filter-drugs.ts · match-drug-query.ts · normalize.ts

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
├── search/filter-drugs.test.ts
├── engine/
│   ├── calculate-dosage.test.ts
│   ├── select-rule.test.ts    Заалтын эрэмбэ
│   ├── dose-cap.test.ts       applyCaps нэгж
│   ├── cap-outcome.test.ts    Таслалт бүхэл гаралтад
│   ├── basis.test.ts          per_kg_per_day · weight_band · fixed
│   ├── formulation-amounts.test.ts
│   └── real-drug-invariants.test.ts  ★ Бодит эм × SAMPLE_PATIENTS, тоо биш шинж
└── fixtures/
    ├── patients.ts            Төлөөлөх өвчтөнүүд (хилийн утгатай)
    └── make-drug.ts           Тестийн эм/дүрэм үүсгэгч
```
