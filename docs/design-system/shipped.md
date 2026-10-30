<!-- DESIGN-SYSTEM.md-аас хуваасан. Бусад хэсэг: ./README.md -->
## 0. Аль хэдийн кодод буусан өөрчлөлтүүд ✅

| Файл | Юу өөрчлөгдсөн |
|---|---|
| `app/layout.tsx` | IBM Plex Sans/Mono → **Source Sans 3** (variable, latin + cyrillic). Mono бүрмөсөн хасагдсан. |
| `app/globals.css` | `.num` нь `tabular-nums lining-nums` болов (font-family солихоо болив) · `--warning-foreground` хар бэх болов · **`.dark` блок нэмэгдэв** · `--font-mono` хасагдав |
| `components/ui/button.tsx` | `size` cva нь 44/56px тагтны хэмжээнд оров |
| `components/dosage/DoseReadout.tsx` | Тайлбар шинэчлэгдэв |
| `components/nav/SiteHeader.tsx` | Тайлбар шинэчлэгдэв |
| `scripts/contrast.mjs` | Light + Dark ХОЁУЛАНГ шалгана, `input` нь одоо ЗААВАЛ шалгалт |
| `components/ui/button.tsx` | 44/56px сэргээгдэв + `pill` хэмжээ буцаж ирэв |
| `components/ui/input.tsx`, `input-group.tsx`, `command.tsx` | 36 → 44px |
| `components/ui/alert.tsx`, `badge.tsx` | `success` variant, `-muted` токен |
| `components/theme/*`, `app/layout.tsx` | Шөнийн горим залгагдав |
| `eslint.config.mjs` | `components/ui/**`-д `complexity` унтраав (shadcn-ий эх код) |

`bun run typecheck` → цэвэр. `node scripts/contrast.mjs` → бүх заавал шалгалт ✓, exit 0.
