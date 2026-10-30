<!-- DESIGN-SYSTEM.md-аас хуваасан. Бусад хэсэг: ./README.md -->
## 4b. Тагтны өндөр — shadcn-ийг ДАХИН бичсэн

`bunx shadcn add` нь `components/ui/button.tsx`-ийг ДАРЖ бичсэн байсан тул
өмнөх session-ий 44px тохиргоо мөн `pill` хэмжээ АЛГА болж, `bun run typecheck`
гурван алдаатай байв (`size="pill"` — `CategoryPill`, `VerifiedToggle`,
`IndicationPicker`). Сэргээв:

| Компонент | Хуучин | Одоо |
|---|---|---|
| `button` default | 36 | **44** |
| `button` lg | 40 | **56** |
| `button` sm / xs | 32 / 24 | 36 / 28 (зөвхөн хулгана) |
| `button` pill | — | **44**, дугуй |
| `button` icon | 36 | **44** |
| `input` | 36 | **44** |
| `input-group` | 36 | **44** |
| `command` input | 36 | **44** |
| `NavTab` | 40 | **44** (`min-h-11`) |

> `bunx shadcn add …` ажиллуулсны ДАРАА `bun run typecheck` + энэ хүснэгтийг
> заавал шалгана. shadcn нь өөрийн анхдагчаар дарж бичдэг.
