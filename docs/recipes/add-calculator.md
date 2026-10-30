# Жор: шинэ тооцоолуур (хуудас) нэмэх

> Шат S3 (тооцоолуурын бүртгэл) хийгдсэний дараа 4–7-р алхам нэг бүртгэлийн
> мөр болно. Энэ файлыг тэр үед шинэчил.

1. Логик: `lib/calculators/<нэр>/<томьёо>.ts` — цэвэр функц, JSDoc-д эх
   сурвалж. Байгаа функцийг дахин ашигла (жишээ `fluid/` нь burns-д бий).
2. Тест: `tests/calculators/<нэр>.test.ts` — нийтлэгдсэн жишээ, хил.
3. UI: `components/<нэр>/` — `<Нэр>Page.tsx` орц; тоо `.num`, тооцоолохгүй.
   Загвар болгож `components/burns/BurnsPage.tsx`-ийн бүтцийг хар.
4. Route: `app/<path>/page.tsx` — `metadata` нь `pageMeta("/<path>")` + Монгол
   title/description (жишээ `app/burns/page.tsx`).
5. Навигаци: `components/nav/routes.ts`.
6. Sitemap: `lib/site.ts` → `SITE_ROUTES`.
7. Analytics: `lib/analytics/events.ts` → `CALCULATORS`-д нэр нэм,
   `docs/ANALYTICS.md`-ийн хүснэгтийг шинэчил; хуудсанд `use-track-opened`.
8. Offline (Шат 1-ийн дараа): precache жагсаалтад автоматаар орох эсэхийг шалга.
9. `bun run check`.
