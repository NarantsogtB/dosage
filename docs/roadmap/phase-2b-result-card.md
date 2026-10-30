# Шат 2b — V3: Нэгдсэн Dose result card

**Хугацаа:** 4–5 өдөр · Plan mode · **Хамаарал:** 2a · **Унших:** `components/CLAUDE.md`,
`components/dosage/` (DosageCard-аас эхэл)

**Figma:** Organisms 92:6 «Dose result card», Molecules 92:5 (Max-dose meter,
Evidence popover, Rx line, Disclosure row).

## Хийх
- Дараалал: readout → formulation picker → max-dose meter → Rx line →
  disclosure (trace / анхааруулга / эх сурвалж). Эх сурвалжийн мөр үргэлж харагдана.
- MaxDoseIndicator + CapAlert → нэг meter: <80% neutral, 80–99% warning,
  capped destructive; үргэлж текст + %.
- Evidence legend → chip дээрх popover.
- UndoBar → Sonner toast «Буцаах».
- Зөвхөн presentation — engine/format-д гар хүрэхгүй.

## Хийхгүй (эмнэлзүйн хяналт хүлээж байна)
Disclaimer хураах; mL-ийг гол тоо болгох. Одоогийн байдлаар үлдээ.

## Шалгуур
Snapshot өөрчлөлт бүрийг тайлбарла. Хэвлэх загвар эвдрээгүй. `bun run check`.
