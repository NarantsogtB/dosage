# tests — Vitest

| Хавтас/файл | Юу |
|---|---|
| `engine/` | calculate-dosage, select-rule, dose-cap, indications |
| `data/verified-drugs.test.ts` | Эх сурвалжийн дүрэм (≥2 эх сурвалж, locator, quote) |
| `data/known-gaps.ts` | Түр зөвшөөрсөн цоорхой — хоосон болох нь зорилт |
| `calculators/` | burns, fluid, galveston |
| `fixtures/make-drug.ts`, `patients.ts` | Тестийн эм/өвчтөн үүсгэгч — ашигла |
| `legacy-engine.test.ts`, `equivalence.test.ts`, `helpers/compare-engines.ts` | Хуучин engine-ийн хамгаалалт (`lib/drugs.ts`) |
| `__snapshots__/` | **492KB — бүү унш.** Зөвхөн legacy |

- Шинэ логик бүрд тест. Эмийн тоо шалгахдаа бодит эм биш fixture ашигла
  (өгөгдөл баталгаажих тусам өөрчлөгдөнө).
- Snapshot-ийг зөвхөн санаатай өөрчлөлтөд `bun run test:update`; шалтгааныг commit-д.
- Тест унавал дүрмийг сулруулахгүй — шалтгааныг ол.
