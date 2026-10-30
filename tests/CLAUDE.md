# tests — Vitest

| Хавтас/файл | Юу |
|---|---|
| `engine/` | calculate-dosage, select-rule, dose-cap, cap-outcome, basis, formulation-amounts, indications |
| `engine/real-drug-invariants.test.ts` | Бодит эм × `SAMPLE_PATIENTS` — тоо биш, үргэлж үнэн шинж |
| `data/verified-drugs.test.ts` | Эх сурвалжийн дүрэм (≥2 эх сурвалж, locator, quote) |
| `data/known-gaps.ts` | Түр зөвшөөрсөн цоорхой — хоосон болох нь зорилт |
| `calculators/` | burns, fluid, galveston |
| `fixtures/make-drug.ts`, `patients.ts` | Тестийн эм/өвчтөн үүсгэгч — ашигла |

- Шинэ логик бүрд тест. Эмийн тоо шалгахдаа бодит эм биш fixture ашигла
  (өгөгдөл баталгаажих тусам өөрчлөгдөнө). Бодит өгөгдөлд зөвхөн инвариант.
- Тест унавал дүрмийг сулруулахгүй — шалтгааныг ол.
