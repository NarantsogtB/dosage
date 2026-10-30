# components — UI

| Хавтас | Юу |
|---|---|
| `ui/` | shadcn vendored — **гараар засахгүй**, `cn()`-ээр гаднаас |
| `calculator/` | `/dose` төлөв эзэмшигч. Орц `CalculatorPage.tsx` |
| `search/` | Эм хайх, ангилал, «баталгаажсан» шүүлт |
| `dosage/` | Үр дүнгийн карт. Угсрагч `DosageCard.tsx` |
| `summary/` | Сонгосон эмийн наалдамхай хураангуй, хуулах |
| `print/` | Зөвхөн хэвлэх загвар |
| `burns/` | `/burns` бүхэлдээ |
| `landing/`, `nav/`, `drug-page/`, `recent/`, `pwa/`, `theme/`, `brand/`, `analytics/` | нэрээрээ |

## Дүрэм

- Компонент тооцоолохгүй: тун → `lib/engine`, текст → `lib/format`.
- Түүхий hex/өнгө нэмэхгүй — `app/globals.css`-ийн семантик токен.
  Өнгө өөрчилбөл `bun run contrast` (light + dark).
- Эмнэлзүйн тоо бүр `.num` класстай. Үр дүнгийн тоо анимацгүй.
- Хүрэх талбай ≥44px (`min-h-11`); үндсэн оролт (жин, нас, хайлт) 56px.
- Өнгө дангаараа утга илэрхийлэхгүй — текст/үсэг давхар (evidence A–E).
- Focus ring арилгахгүй. Шошго ≠ placeholder; алдаа талбайн доор.
- Нэг дэлгэцэнд нэг л «danger».
- Analytics: зөвхөн `track()` (`lib/analytics/track.ts`).
- Шинэ route-ийн навигаци: `nav/routes.ts`.
- Дизайн системийн дэлгэрэнгүй: `docs/design-system/README.md` (индекс →
  хэрэгтэй хэсгээ л унш). Figma: `W1la5Yp9xqZwQmUnuJZyXZ`.
