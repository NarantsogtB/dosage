# Roadmap 2026-11 → 2027-01 — индекс

Шат бүр тусдаа жижиг файл = агентын ажлын даалгавар. Агент зөвхөн
тухайн шатны файлыг уншина; ерөнхий дүрэм root `CLAUDE.md`-д аль хэдийн байна.

## CLI-д өгөх prompt

```
docs/roadmap/<файл>.md-ийг хэрэгжүүл.
```

Том шатуудыг (2a, 2b, 6, 7, S4) plan mode-оор эхлүүлж, төлөвлөгөөг батлуулсны
дараа код бичүүл. Шат дуусахад энэ хүснэгтийн «Төлөв»-ийг шинэчил.

## Дараалал

| # | Файл | Ажил | Хугацаа | Хамаарал | Төлөв |
|---|---|---|---|---|---|
| 1 | `phase-S1-retire-legacy.md` | Хуучин engine, 492KB snapshot устгах | 0.5 өдөр | — | ☑ |
| 2 | `phase-0-verification.md` | Эх сурвалж: статус тайлан + 7 хоног бүрийн batch | тасралтгүй | — | Бүлэг 1, 2, 4 ☑ · 3 E, 9 known-gap үлдсэн (PR #2–#7) |
| 3 | `phase-1-offline.md` | Service worker, offline | 1–2 өдөр | — | ☑ |
| 4 | `phase-2a-patient-bar.md` | V3: patient bar, кг/г | 3–4 өдөр | — | ☑ (PR #1) |
| 5 | `phase-2b-result-card.md` | V3: нэгдсэн үр дүнгийн карт | 4–5 өдөр | 2a | ☑ (PR #1) |
| 6 | `phase-2c-navigation.md` | V3: bottom nav, action bar, ⌘K | 2–3 өдөр | 2b | ☑ (PR #1; «Бусад» — route 4-өөс олон болоход) |
| 7 | `phase-S3-calculator-registry.md` | Тооцоолуурын нэг бүртгэл | 0.5–1 өдөр | — | ☑ |
| 8 | `phase-3-fluids.md` | `/fluids` | 2–3 өдөр | S3 | ☑ |
| 9 | `phase-S2-indications.md` | Заалтын бүртгэл + синоним | 1 өдөр | — | ☑ |
| 10 | `phase-4-indication-search.md` | Өвчин/заалтаар хайх | 1–2 өдөр | S2 | ☑ |
| 11 | `phase-5-share-link.md` | Линкээр хуваалцах | 1–2 өдөр | — | ☐ |
| 12 | `phase-S4-units.md` | Тунгийн нэгж (мкг, ED, ммоль, г) + хурд | 2–3 өдөр | — | ☐ |
| 13 | `phase-6-iv-im.md` | IV/IM + нунтаг найруулах | ~1.5 долоо хоног | S4 | ☐ |
| 14 | `phase-7-emergency.md` | `/emergency` | ~2 долоо хоног | 1, 6 | ☐ |
| 15 | `phase-8-scores.md` | GCS, Schwartz, corrected Na/Ca, AG | ~1 долоо хоног | S3 | ☐ |
| — | `phase-S5-lazy-drugs.md` | Хайлтын индекс + эмийг хойшлуулж ачаалах | 2–3 өдөр | trigger: ~150 эм эсвэл chunk >100KB gz | ☐ |

S-шатууд = бүтэц тэлэх засвар. Үндэслэл: `docs/architecture/scalability-2026-10.md`.

**Энэ төлөвлөгөөнд ороогүй:** нярайн PMA/PNA тун, Protocol/удирдамжийн RAG,
infusion (мкг/кг/мин) хуудас, насанд хүрэгчийн хүрээ, account/admin/DB.
Analytics-ийн 2–3 долоо хоногийн өгөгдлөөр 8–15-ыг дахин эрэмбэлж болно.

## Төлөв (2026-11-04)

50 эм (40 active, 10 retired, hydrocortisone draft) — 37 баталгаажсан, 3 `E` дүрэм,
9 known-gap (`docs/EVIDENCE-STATUS.md`, `docs/roadmap/phase-0-verification.md`).
Хэрэгсэл: `/dose`, `/burns`, `/fluids`. Offline — `docs/DEPLOY.md` §4b. V3 main-д (PR #1).
Тооцоолуурын бүртгэл: `lib/calculators/registry.ts` (S3).
