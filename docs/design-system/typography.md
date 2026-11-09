<!-- DESIGN-SYSTEM.md-аас хуваасан. Бусад хэсэг: ./README.md -->
## 1. Бичиглэл — яагаад сольсон

> **2026-11-09 (V4, Шат 9a):** Source Sans 3 → **Onest** (variable, latin + cyrillic, `next/font/google`). V4 dark загвар Onest-оор зурагдсан (Figma node `119:22`). `.num` / `tabular-nums` хэвээр, Onest-д ажиллана. Доорх нь өмнөх (IBM Plex → Source Sans) түүх.

**IBM Plex** нь техникийн баримт бичигт зориулж зохиогдсон бичиглэл. Бүх тоог **Plex Mono**-гоор бичсэн нь бүтээгдэхүүнийг эмчийн хэрэгсэл биш, терминал мэт харагдуулж байв.

**Source Sans 3** — Adobe-ийн хүмүүнлэг бичиглэл, шинжлэх ухаан, эмнэлгийн хэвлэлд өргөн хэрэглэгддэг. Кирилл үсэг бүрэн, variable font.

Mono-г хасахад **юу ч алдагдаагүй**. Mono-г сонгосон шалтгаан нь тоог баганаар жигдрүүлэх (2.5 ба 25 өөр урттай харагдах) байсан бөгөөд үүнийг OpenType-ийн `tabular-nums` яг адилхан хийнэ. BNF, Nelson зэрэг эмнэлзүйн лавлахууд ч mono ашигладаггүй.

```css
.num {
  font-variant-numeric: tabular-nums lining-nums;
  letter-spacing: -0.005em;
}
```

`.num` нь repo даяар 25 газар хэрэглэгддэг цорын ганц удирдах цэг байсан тул нэг файл засахад бүх тоо шинэчлэгдэв.

### Бичиглэлийн шат

| Хэв | Жин | Хэмжээ / мөр | Хэрэглээ |
|---|---|---|---|
| Display/XL | SemiBold | 44/50 | Landing hero, desktop |
| Display/L | SemiBold | 34/40 | Landing hero, mobile |
| Heading/XL | SemiBold | 28/34 | Хэсгийн гарчиг, desktop |
| Heading/L | SemiBold | 22/28 | Хэсгийн гарчиг, mobile |
| Heading/M | SemiBold | 18/24 | Эмийн нэр |
| Title/S | SemiBold | 16/22 | Карт, жагсаалтын мөр |
| Body/L | Regular | 17/27 | Landing параграф |
| Body/M | Regular | 15/23 | Апп-ын үндсэн бичвэр |
| Body/S | Regular | 13/20 | Тайлбар, эх сурвалж |
| Label/M | Medium | 14/18 | Талбайн шошго, товч |
| Label/S | Medium | 12/16 | Badge, chip, meta |
| Overline | SemiBold | 11/14 +10% | Eyebrow |
| **Numeric/XXL** | **Bold** | **44/48** | **Тунгийн ХАРИУ** |
| Numeric/XL | Bold | 32/36 | Mobile гол үр дүн |
| Numeric/L | SemiBold | 22/28 | Хоёрдогч утга (мл) |
| Numeric/M | SemiBold | 17/24 | Мөр доторх утга |
| Numeric/S | Medium | 14/20 | Хүснэгт, тооцооллын мөр |
| Unit/S | Medium | 12/16 +2% | Нэгжийн дагавар |

> Numeric/* нь sans болсон тул mono-гийн байгалийн жигдрэлт байхгүй — **кодод `.num` заавал** тавина. Figma Plugin API-д OpenType feature тохируулах боломж байхгүй тул Figma дээр тоо бага зэрэг жигд бус харагдаж болзошгүй; браузер дээр зөв байна.
