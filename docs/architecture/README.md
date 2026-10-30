# Архитектур — индекс

```
Өгөгдөл (lib/data)  →  Engine (lib/engine)  →  UI (components)
```
Нэг чиглэлтэй. Engine UI-г мэдэхгүй, өгөгдөл engine-г мэдэхгүй. Engine-д
эмийн `id`-гаар салаалахгүй.

**Одоогийн газрын зураг:** root `CLAUDE.md` + хавтас бүрийн `CLAUDE.md`.
Доорх хэсгүүд 2026-08-ын байдлаар бичигдсэн — зөрвөл кодыг давуу үз.

| Файл | Агуулга |
|---|---|
| `scalability-2026-10.md` | ★ 500–5000 эм рүү тэлэх үнэлгээ, эрсдэл, шийдэл (2026-10-30) |
| `principles.md` | Үндсэн зарчим, `id` салаалалтын жишээ |
| `calculation-flow.md` | `calculateDosage` урсгал, trace яагаад чухал |
| `code-rules.md` | ESLint хязгаарууд, dispatch хүснэгт |
| `folder-structure.md` | Хавтасны мод (⚠️ 2026-08 — calculators, analytics, burns, drug-page дутуу) |
| `shadcn.md` | shadcn/ui, warning token, Radix-гүй 2 газар |
| `migration-history.md` | Хуучин engine → шинэ engine шилжилт, эм бүр нэг файл яагаад |
| `commands.md` | Командууд (⚠️ хуучин — root CLAUDE.md-г үз) |
| `tech-debt.md` | Өрийн хүснэгт (⚠️ хуучин — scalability-2026-10.md-г үз) |

Хуучирсан баримтын засвар (2026-10-30): нотолгооны түвшин нь
`A_mn_approved … E_unverified` (`D_unverified` биш); фонт Source Sans 3.
