# Шат 3 — `/fluids` шингэний тооцоолуур

**Хугацаа:** 2–3 өдөр · **Хамаарал:** S3 · **Унших:** `docs/recipes/add-calculator.md`,
`lib/calculators/fluid/`, `tests/calculators/fluid.test.ts`

## Хийх
- `lib/calculators/fluid` (maintenance, bolus) дахин ашигла — хуулбарлахгүй.
- Оролт: жин (2a хийгдсэн бол ижил WeightField).
- Гаралт: maintenance (мл/цаг, мл/өдөр), bolus (сонголттой мл/кг),
  deficit (% шингэн алдалт × жин). Томьёо, сонголтын утга, дээд хязгаар бүр
  эх сурвалжтай (WHO 2024 хүүхдийн хатгаа/суулгалт эсвэл registry-д байгаа).
  Ишлэлгүй хэсгийг гаргахгүй — асуу.
- «Яаж тооцсон» trace харагдана.
- Analytics `calculator: "fluids"`.

## Шалгуур
Burns хуудас ижил функцийг ашигласаар (тест ногоон). `bun run check`.
