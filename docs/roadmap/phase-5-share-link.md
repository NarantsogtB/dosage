# Шат 5 — Тооцооллыг линкээр хуваалцах

**Хугацаа:** 1–2 өдөр · **Унших:** `components/calculator/` (CalculatorPage,
use-selected-drugs, patient-form), `lib/analytics/events.ts`

## Хийх
- Жин, нас, эм, заалт, бэлдмэл → URL query (жишээ
  `/dose?w=14&m=36&d=amoxicillin:pneumonia,paracetamol`). Ачаалахад сэргээ.
- «Линк хуулах» action bar-д. Сервер/account-гүй, таних мэдээлэлгүй.
- Буруу/хуучирсан параметрийг алгасаж, юу алгассанаа харуул.
- Хуваалцсан линк дээр: «Энэ тооцоог өөр хүн бэлдсэн — жинг шалгана уу».
- Event `share_link_copied` + `docs/ANALYTICS.md`.

## Шалгуур
Тест: serialize/parse round-trip, буруу оролт.
