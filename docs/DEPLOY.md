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
bunx wrangler@latest deploy   # эсвэл Pages: bunx wrangler pages deploy out
```

---

## 4. Орчны хувьсагч

| Нэр | Анхдагч | Тайлбар |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://dosage.mn` | canonical, og:url, sitemap |

⚠️ `output: "export"` үед энэ утга **build үед кодод шигдэнэ**. Домэйн
солигдвол дахин build хийнэ. Preview байршуулалт өөрийн хаягаа зөв
зарлахын тулд энэ хувьсагчийг тохируулна.

---

## 5. ⚠️ Статик экспортоос хэзээ гарах вэ

Одоогийн тохиргоо дараах зүйлсийг **боломжгүй** болгоно:

- Зургийн оновчлол (`next/image`)
- Route handler / API зам
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
- [ ] Analytics (одоогоор юу ч хэмжигдэхгүй байна)

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
