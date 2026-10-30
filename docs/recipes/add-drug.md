# Жор: шинэ эм нэмэх

1. Төрлүүд: `lib/domain/drug.ts`, `dosing-rule.ts`, `dosing-basis.ts`,
   `dose-cap.ts`, `formulation.ts`. Загвар болгож нэг баталгаажсан эмийг
   (`lib/data/drugs/amoxicillin.ts`) уншина — бусдыг унших хэрэггүй.
2. `lib/data/drugs/<id>.ts` үүсгэ (`id` = kebab-case INN). Толгойд эх
   сурвалжийн түүхийн тайлбар.
3. Эх сурвалжгүй бол: дүрэм бүр `evidenceLevel: "E_unverified"`, `sources: []`,
   `status: "draft"` — тун оруулахгүй, хэрэглэгчээс асуу. Эх сурвалжтай бол
   `recipes/verify-drug.md`-ийн дагуу.
4. Бэлдмэл (`formulations`): druginfo.mohs.mn-д бүртгэлтэй концентрацууд,
   `availableInMn`. Худалдааны нэр оруулахгүй.
5. `lib/data/drugs/index.ts`: импорт + `DRUGS`-д мөр (цагаан толгойгоор).
6. Шинэ эх сурвалж хэрэгтэй бол `lib/data/sources/registry.ts` —
   `docs/sources/tiers.md`-ээр зөвшөөрөгдсөн эсэхийг шалга.
7. `/dose/<id>` хуудас, sitemap автоматаар (баталгаажсан бол индексжинэ).
8. `bun run check`. Commit: `feat(data): <эм> нэмэх`.
