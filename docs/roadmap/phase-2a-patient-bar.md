# Шат 2a — V3: Patient bar + жингийн нэгж

**Хугацаа:** 3–4 өдөр · Plan mode · **Унших:** `components/CLAUDE.md`,
`components/calculator/` (WeightField, PatientInput, patient-form), `docs/HEURISTICS.md` §5

**Figma:** `W1la5Yp9xqZwQmUnuJZyXZ` — Molecules 92:5 (Weight field, Patient chip),
Organisms 92:6 (Patient bar). Figma MCP байвал `get_design_context`; үгүй бол
хэрэглэгчээс screenshot гуй.

## Хийх
1. Sticky Patient bar — жин, нас scroll хийхэд алга болохгүй; дарахад засах талбар руу.
2. Weight field-д кг | г toggle + echo «= 3.2 кг гэж тооцоолно». Engine руу
   үргэлж кг; хөрвүүлэлт форм давхаргад. Validation нэгжээс үл хамаарна.
3. `docs/HEURISTICS.md`-д энэ нээлттэй асуудлыг хаагдсан гэж тэмдэглэ.

## Хийхгүй
Шинэ өнгө/фонт. Disclaimer, тунгийн readout-ийн өөрчлөлт.

## Шалгуур
Тест: г→кг, хил дээрх утга. Keyboard/screen reader. `bun run check`.
