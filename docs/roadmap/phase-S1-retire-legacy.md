# Шат S1 — Хуучин engine-ийг зогсоох

**Хугацаа:** 0.5 өдөр · **Унших:** `tests/CLAUDE.md`, `tests/equivalence.test.ts`,
`tests/legacy-engine.test.ts` (snapshot-ийг БИШ)

## Яагаад
`lib/drugs.ts` (1496 мөр), `lib/calculations.ts` (265), 492KB snapshot нь
production-д ашиглагдахгүй, зөвхөн 2026-08-ын шилжилтийг хамгаалж байсан.
Одоо бодит өгөгдөл баталгаажих тусам хуучинтайгаа зөрөх нь зөв. Хоёр
өгөгдлийн эх агентыг төөрөгдүүлж, grep-ийн үр дүнг дүүргэдэг.

## Хийх
1. `equivalence.test.ts` / `legacy-engine.test.ts` шинэ engine-ийн юуг
   хамгаалж байгааг ол. Үнэ цэнэтэй тохиолдол (жишээ: domperidone cap,
   хуваах шахмал, cap тасрах) байвал `tests/engine/`-д fixture-ээр жижиг
   тест болгон шилжүүл.
2. Дараахыг `git rm`: `lib/drugs.ts`, `lib/calculations.ts`,
   `tests/legacy-engine.test.ts`, `tests/equivalence.test.ts`,
   `tests/helpers/compare-engines.ts`, `tests/__snapshots__/legacy-engine.test.ts.snap`.
   `scripts/migrate-drugs.mjs` (нэг удаагийн codemod) мөн.
3. Эдгээрийг дурдсан газрыг цэвэрлэ: root/`lib/engine`/`tests` `CLAUDE.md`,
   `docs/architecture/README.md`.
4. `docs/DECISIONS.md`-д бичлэг.

## Шалгуур
`bun run check` ногоон. `grep -r "lib/drugs\"\|calculations\"" .` хоосон.
