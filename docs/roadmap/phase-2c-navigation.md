# Шат 2c — V3: Навигаци ба action bar

**Хугацаа:** 2–3 өдөр · **Хамаарал:** 2b · **Унших:** `components/nav/`,
`components/calculator/ResultsActions.tsx`, `components/ui/command.tsx`

**Figma:** Templates 92:7, Pages 92:8, Organisms 92:6 (Bottom nav, Action bar).

## Хийх
- Mobile: bottom nav (бодит route-ууд л) + sticky action bar (Жор хуулах / Хэвлэх).
  Route 4-өөс олон болоход «Бусад» руу ордог бүтэц.
- Desktop: tabs + ⌘K command palette (`cmdk` бий), үйлдлүүд үр дүнгийн толгойд.
- aria-label, focus дараалал, keyboard.

## Шалгуур
390px ба 1440px дээр гараар шалгах жагсаалт. `bun run check`.
