@AGENTS.md

# dosage.mn — агентын газрын зураг

Монгол эмчид зориулсан хүүхдийн эмийн тун + эмнэлзүйн тооцоолуур.
Next.js 16 статик export → Cloudflare Pages. Bun, Vitest, Tailwind 4, shadcn.

## Token хэмнэх дүрэм (ЗААВАЛ)

1. **Кодыг эхнээс нь бүү унш.** Доорх газрын зургаар зорилтот хавтсаа ол.
   Хавтас бүрд өөрийн `CLAUDE.md` бий — тэр хавтсанд ажиллахад автоматаар
   уншигдана, өөр баримт ихэвчлэн хэрэггүй.
2. Баримт хэрэгтэй бол эхлээд `docs/README.md` (нэг хуудас индекс) →
   зөвхөн хэрэгтэй **жижиг** файлаа унш. Том баримтыг бүхэлд нь бүү унш.
3. Grep/Glob-ийг үргэлж хавтсаар хязгаарла (`lib/engine`, `components/dosage` г.м.).
4. Энэ газрын зураг дээр байгаа зүйлийг кодоос дахин бүү баталгаажуул.
5. **Бүү унш** (том, хуучирсан эсвэл генерацлагдсан):
   `out/`, `.next/`, `graphify-out/`, `bun.lock`,
   `tsconfig.tsbuildinfo`, `node_modules/`
   (Next-ийн баримтаас бусад).
6. `graphify` суусан бол `graphify query "<асуулт>"` хэрэглэж болно; суугаагүй
   бол алгас — заавал биш.

## Газрын зураг

| Хавтас | Юу | Дэлгэрэнгүй |
|---|---|---|
| `lib/domain/` | Типүүд л (Drug, DosingRule, DoseCap, Formulation, Source…). Логикгүй | файлын нэр = төрөл |
| `lib/engine/` | Тунгийн цэвэр engine. Орц: `calculate-dosage.ts` | `lib/engine/CLAUDE.md` |
| `lib/data/drugs/` | Эм бүр нэг файл + `index.ts` (DRUGS) | `lib/data/CLAUDE.md` |
| `lib/data/sources/registry.ts` | Эх сурвалжийн бүртгэл | `lib/data/CLAUDE.md` |
| `lib/data/labels/`, `lib/data/burns/` | Шошго, түлэгдэлтийн өгөгдөл | — |
| `lib/calculators/` | Эм бус тооцоолуур (burns, fluid, bsa) + `registry.ts` (тооцоолуурын нэг бүртгэл) | `lib/calculators/CLAUDE.md` |
| `lib/format/` | Харуулах формат, жорын текст. Тооцоолохгүй | — |
| `lib/search/` | Эм хайлт (латин + кирилл) | — |
| `lib/analytics/` | Event schema + `track()` | `docs/ANALYTICS.md` |
| `lib/validation/` | Эх сурвалжийн ref шалгалт | — |
| `lib/drug-page/`, `app/dose/[slug]` | Эм бүрийн SEO хуудас | — |
| `lib/site.ts` | Сайтын route (бүртгэлээс) + sitemap | — |
| `components/` | UI (client). `ui/` = shadcn vendored | `components/CLAUDE.md` |
| `app/` | Route-ууд: `/`, `/dose`, `/dose/[slug]`, `/burns`, `/fluids` | — |
| `functions/api/e.ts` | Analytics хүлээн авагч (Pages Function) | `docs/ANALYTICS.md` |
| `tests/` | Vitest | `tests/CLAUDE.md` |
| `docs/` | Баримт — `docs/README.md`-ээс эхэл | — |

## Командууд

```bash
bun run dev          # :3002
bun run test         # vitest
bun run check        # lint + typecheck + contrast + test + build — дуусахаас өмнө ЗААВАЛ
bun run preview      # build + wrangler pages dev out
```

## Алтан дүрэм

1. **Data → engine → UI**, нэг чиглэлтэй. Engine дотор эмийн `id`-гаар
   салаалахыг хориглоно — эмийн онцлог бүхэн өгөгдөлд (`DosingRule`, `DoseCap`).
2. **Эмнэлзүйн тоо зохиохгүй.** Тун, коэффициент, хязгаар бүр registry-д
   бүртгэгдсэн эх сурвалжийн `locator` + `quotedValue`-тэй. Олдохгүй бол
   хоосон/идэвхгүй үлдээ, **зогсоод хэрэглэгчээс асуу**.
3. Эмнэлзүйн өгөгдлийн зөрүү/засварыг хэрэглэгч (эмч) батлахаас өмнө
   commit хийхгүй.
4. ESLint: complexity 3, max-lines 160, функц 40 мөр, params 4. Давбал
   функцээ хуваа — дүрмийг сулруулахгүй. `switch`-ийн оронд dispatch хүснэгт.
5. 18-аас дээш нас бүх эмд зогсдог (зөвхөн хүүхдийн мг/кг).
6. Шинэ dependency нэмэхээс өмнө асуу. Overengineering хийхгүй.
7. UI текст Монгол, hype үггүй («шилдэг», «хувьсгалт» хэрэглэхгүй).
8. Өвчтөний яг жин/нас серверт явуулахгүй (analytics зөвхөн bucket).

## Ажлын урсгал

- Жижиг, логик алхам тутамд commit: conventional + монгол тайлбар,
  жишээ `feat(fluids): maintenance шингэний хуудас нэмэх`.
- Архитектурын шийдвэр → `docs/DECISIONS.md`-ийн **дээд хэсэгт** шинэ бичлэг
  (файлыг бүхэлд нь уншихгүй: эхний 25 мөр хангалттай).
- Жорууд: шинэ эм → `docs/recipes/add-drug.md`; эм баталгаажуулах →
  `docs/recipes/verify-drug.md`; шинэ тооцоолуур → `docs/recipes/add-calculator.md`.
- Төлөвлөгөө: `docs/roadmap/README.md` (шат бүр тусдаа файл).
- Дуусахад: `bun run check` ногоон, юу хийсэн / юу үлдсэн / **гараар шалгах**
  зүйлсийг товч жагсаа.
