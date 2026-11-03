# Жор: шинэ тооцоолуур (хуудас) нэмэх

1. Логик: `lib/calculators/<нэр>/<томьёо>.ts` — цэвэр функц, JSDoc-д эх
   сурвалж. Байгаа функцийг дахин ашигла (жишээ `fluid/` нь burns-д бий).
2. Тест: `tests/calculators/<нэр>.test.ts` — нийтлэгдсэн жишээ, хил.
3. UI: `components/<нэр>/` — `<Нэр>Page.tsx` орц; тоо `.num`, тооцоолохгүй.
   Загвар болгож `components/burns/BurnsPage.tsx`-ийн бүтцийг хар.
4. Route: `app/<path>/page.tsx` — `metadata` нь `pageMeta("/<path>")` + Монгол
   title/description (жишээ `app/burns/page.tsx`); хуудсанд `use-track-opened`.
5. **Бүртгэл:** `lib/calculators/registry.ts`-д нэг мөр (id, path, labelMn,
   shortMn, group, priority) + `components/nav/routes.ts`-ийн `ICONS`-д дүрс
   (заагаагүй бол typecheck унана). Nav, sitemap, analytics автоматаар уншина.
6. `tests/calculators/registry.test.ts`-ийн хүлээгдэж буй жагсаалтыг шинэчил;
   `docs/ANALYTICS.md`-д шинэ `calculator` утгыг дурд.
7. Offline: precache жагсаалтад автоматаар орох эсэхийг шалга (`tests/pwa`).
8. `bun run check`.
