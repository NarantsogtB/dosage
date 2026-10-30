# Байршуулалт — dosage.mn

> Энэ баримт нь «хаана, яагаад» гэдгийг тогтооно. Шийдвэр өөрчлөгдвөл
> энд бич — эс бөгөөс шалтгаан нь мартагдаж, дараагийн хүн таамаглана.

---

## 1. Одоогийн байдал

```
output: "export"   →   out/   →   аль ч статик host
```

Бүх маршрут prerender хийгддэг. SSR, middleware, route handler,
server action — **нэг нь ч байхгүй**.

```
┌ ○ /                    танилцуулга
├ ○ /dose                эмийн тун
├ ○ /burns               түлэгдэлтийн шингэн
├ ○ /_not-found          404
├ ○ /opengraph-image.png сошиалын зураг
├ ○ /robots.txt
└ ○ /sitemap.xml
```

Нийт `out/` ≈ 1.9 МБ.

**Үр дагавар:** OpenNext (`@opennextjs/cloudflare`) зэрэг adapter
ХЭРЭГГҮЙ. Тэдгээр нь Next-ийн серверийн хэсгийг workerd дээр
ажиллуулахад зориулагдсан бөгөөд бидэнд ажиллуулах сервер байхгүй.

---

## 2. Host сонголт

| | Vercel | Cloudflare |
|---|---|---|
| Одоо | ✅ ажиллаж байна | — |
| Статик тавих | шууд | Workers Static Assets |
| УБ-д PoP | ✗ (ойр нь Токио/Сөүл) | ✅ |
| Үнэгүй багц | арилжааны хэрэглээ хязгаартай | илүү уужим |

**Шийдвэрийн шалгуур: Улаанбаатараас хэмжсэн бодит latency.**
Таамгаар биш. Домэйнг холбосны дараа хоёуланг нь хэмж:

```bash
curl -o /dev/null -s -w "%{time_total}s\n" https://dosage.mn/dose
```

Статик экспорт нь энэ шийдвэрийг **хямд** болгосон: host солих нь
DNS-ийн ажил, кодын биш.

---

## 3. Байршуулах командууд

```bash
bun run build          # → out/
bunx serve out         # локалд шалгах (next start энэ горимд ажиллахгүй)
```

Cloudflare руу:

```bash
bun run deploy   # next build && wrangler pages deploy (wrangler.jsonc → out/)
```

`wrangler pages deploy` нь root-ийн `functions/`-г (одоогоор зөвхөн
`functions/api/e.ts` — analytics) автоматаар хамт байршуулна.
`wrangler.jsonc`-ийн `analytics_engine_datasets` binding шаардлагатай —
Analytics Engine идэвхгүй гэж алдаа өгвөл dashboard → Workers & Pages →
Analytics Engine-ийг нэг удаа идэвхжүүлнэ. Дэлгэрэнгүй: `docs/ANALYTICS.md`.

---

## 4. Орчны хувьсагч

| Нэр | Анхдагч | Тайлбар |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://dosage.mn` | canonical, og:url, sitemap |

⚠️ `output: "export"` үед энэ утга **build үед кодод шигдэнэ**. Домэйн
солигдвол дахин build хийнэ. Preview байршуулалт өөрийн хаягаа зөв
зарлахын тулд энэ хувьсагчийг тохируулна.

---

## 4b. Offline — service worker

`bun run build` = `next build` + `scripts/build-sw.ts` → `out/sw.js`.
`deploy`, `preview` хоёулаа `bun run build`-ийг дууддаг — `next build`-ийг
шууд ажиллуулбал `sw.js` үүсэхгүй (хуучин SW хэвээр үлдэнэ).

| Хүсэлт | Стратеги |
|---|---|
| HTML, RSC `.txt` | network-first, 3 сек-ээс удаан эсвэл offline → кэш |
| `/_next/static/*`, дүрс | cache-first (нэр нь hash-тай) |
| `/api/*` | хэзээ ч кэшлэхгүй — analytics offline үед чимээгүй алдагдана |

- **Урьдчилан кэшлэх** (`lib/pwa/precache.ts`): `/`, `/dose`, `/burns`, 404,
  `_next/static`, дүрс — ~0.6MB gzip. Эмийн SEO хуудас (`/dose/<slug>`,
  HTML бүр ~200KB) **урьдчилан кэшлэгдэхгүй**, зочилсон үед кэшлэгдэнэ.
  `/dose` тооцоолуур 50 эмийг бүгдийг агуулдаг тул offline-д бүрэн ажиллана.
- **Хувилбар** = `.next/BUILD_ID` → deploy бүр шинэ кэш, хуучин нь `activate`
  үед устна. Шинэ SW автоматаар идэвхжихгүй: «Шинэ хувилбар бэлэн —
  Шинэчлэх» toast (хаагдахгүй) → `SKIP_WAITING` → нэг удаа reload.
- `public/_headers`: `/sw.js` `no-cache` — эс бөгөөс шинэ deploy хүрэхгүй.
- SW зөвхөн production build-д бүртгэгдэнэ (`next dev`-д бүртгэгдэхгүй).

**Гараар шалгах** (`bun run preview` → http://localhost:8788):
1. `/dose`-ийг нээж DevTools → Application → Service Workers: `activated`.
2. Network → **Offline** → `/dose`, `/burns`, өмнө нь нээсэн `/dose/<slug>`
   reload хийхэд нээгдэнэ, толгойд «Офлайн»; жин/нас/эм оруулж тун гарна.
3. Online болгоод дахин build/deploy → reload → «Шинэ хувилбар бэлэн» toast
   → «Шинэчлэх» → Application → Cache Storage-д зөвхөн шинэ `dosage-<id>`.

⚠️ Playwright-ийн `setOffline` нь SW-ийн `fetch`-д үйлчлэхгүй — автомат
шалгалтад серверийг бүр зогсоож шалгана.

---

## 5. ⚠️ Статик экспортоос хэзээ гарах вэ

Одоогийн тохиргоо дараах зүйлсийг **боломжгүй** болгоно:

- Зургийн оновчлол (`next/image`)
- Route handler / API зам (Next-ийн дотор — оронд нь Cloudflare Pages
  Function `functions/`-д бичнэ, жишээ нь `/api/e`)
- ISR, incremental шинэчлэл
- Middleware
- Server action

Roadmap-ийн дараах цэгт эдгээр хэрэгтэй болно:

| Үе шат | Юу шаардах вэ | Үйлдэл |
|---|---|---|
| **V6** хэрэглэгчийн бүртгэл, тооцооллын түүх | сервер + өгөгдлийн сан | `output` мөрийг устгах |
| **V7** admin panel, audit trail | сервер + auth | host-оо дахин сонгох |

Тэр мөчид энэ баримтыг шинэчил.

---

## 6. Нээхийн өмнөх жагсаалт

- [x] `robots.txt`, `sitemap.xml`
- [x] `metadataBase` — үүнгүйгээр og:image харьцангуй замтай гарч
      Facebook дээр урьдчилан харах зураг эвдэрнэ
- [x] Хуудас бүр **өөрийн** canonical — root layout-д бичвэл /dose,
      /burns хоёр «нүүр хуудасны хуулбар» гэж зарлагдана
- [x] Сошиалын зураг (`app/opengraph-image.png`, 1200×630)
- [x] Монгол хэлтэй 404, гарах замтай
- [x] Create Next App-ийн үлдэгдэл зургууд устгасан
- [ ] Домэйн холбох
- [ ] УБ-аас latency хэмжих
- [x] Analytics — үйлдлийн түвшинд, `docs/ANALYTICS.md`

---

## 7. Хуучин домэйн — `dosage-doc.vercel.app`

Сошиалд анх тархсан холбоос нь `dosage-doc.vercel.app`. Vercel төсөл
`main`-аас автоматаар deploy хийсээр байгаа тул `vercel.json` дотор
**зөвхөн тэр host-оос** `https://dosage.mn/:path*` руу 308 redirect
хийнэ (зам, query хадгалагдана).

- `has: host` нөхцөлтэй тул Vercel-ийн preview URL-ууд хэвийн ажиллана.
- Cloudflare Pages `vercel.json`-г үл тоомсорлоно — `dosage.mn`-д нөлөөгүй.
- Шалтгаан: хэрэглэгч, холбоосын SEO жин, analytics хоёр домэйнд
  хуваагдаж байсан (2026-10, Cloudflare + Vercel usage-ийн харьцуулалт).
- Redirect нь хуудас ачаалагдахаас өмнө болдог тул Vercel Web
  Analytics цаашид бараг юу ч бүртгэхгүй — хэмжилт Cloudflare дээр.
