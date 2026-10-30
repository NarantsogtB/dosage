# Шат S3 — Тооцоолуурын нэг бүртгэл

**Хугацаа:** 0.5–1 өдөр · **Унших:** `components/nav/routes.ts`, `lib/site.ts`,
`lib/analytics/events.ts` (эхний 40 мөр), `docs/recipes/add-calculator.md`

## Яагаад
Одоо тооцоолуур нэмэхэд 5 газар засна (routes.ts, site.ts SITE_ROUTES,
events.ts CALCULATORS, app/, page meta). 10+ тооцоолуурт алдаа гарна.

## Хийх
- `lib/calculators/registry.ts` (эсвэл ойролцоо): id, path, labelMn, shortMn,
  icon, group (`dose` / `fluids` / `scores` / `emergency`), sitemap priority.
- `nav/routes.ts`, `SITE_ROUTES`, analytics `CALCULATORS` түүнээс уншина.
  Analytics schema серверт ч ажилладаг тул icon-гүй (React-гүй) хэсгийг тусад нь.
- `docs/recipes/add-calculator.md`-ийг шинэ (богино) алхмаар шинэчил.

## Шалгуур
Одоогийн `/dose`, `/burns`-ийн nav, sitemap, analytics өөрчлөгдөөгүй (тест).
