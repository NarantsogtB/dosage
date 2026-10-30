<!-- DESIGN-SYSTEM.md-аас хуваасан. Бусад хэсэг: ./README.md -->
## 3. shadcn/ui-тэй уялдуулалт

Дизайн систем нь shadcn-ийн **семантик хувьсагч дээр** суусан тул `npx shadcn add ...` хийхэд шинэ компонент автоматаар палитр, радиус, шөнийн горимыг өвлөнө.

### Figma variant → cva 1:1

| Figma | shadcn |
|---|---|
| `Button` variant=default/outline/ghost/destructive, size=default/lg | `buttonVariants` |
| `Badge` variant=default/secondary/destructive/warning/success/outline/soft | `badgeVariants` |
| `Alert` variant=info/warning/destructive/**success** | `alertVariants` |
| `TabsTrigger` state=active/inactive/hover | `data-state` |
| `Toggle` state=on/off/disabled | `data-state` |
| `Field` FieldLabel / FieldContent / FieldDescription | `field` + `input-group` |
| `Item` ItemMedia / ItemContent / ItemActions | `item` |

`State` тэнхлэг нь Figma-д зориулсан — кодод CSS pseudo-class / `data-*`.

### Нэмэх компонентууд

```bash
npx shadcn@latest add field input-group command empty item tabs select toggle-group sheet table sonner
```

| Зурсан дэлгэц | Компонент |
|---|---|
| Жингийн талбар + "кг" дагавар | `field` + `input-group` |
| Эмийн хайлт | `command` |
| Хайлтын хоосон төлөв | `empty` |
| Эмийн жагсаалтын мөр | `item` |
| Толгойн таб | `tabs` |
| Хэлбэр сонгох | `select` |
| Түлэгдэлтийн гүн | `toggle-group` |
| Гар утсан дээрх сонголт | `sheet` |
| Яаралтай тусламжийн хүснэгт | `table` |
| "Хуулагдлаа" мэдэгдэл | `sonner` |

**Суулгасны дараа заавал:** шинэ компонентуудын өндөр shadcn-ийн анхдагчаар ирнэ (32–40px). Тагт бүрийг `min-h-11` болгоно.

### shadcn БОЛГОХГҮЙ

`DoseReadout`, `EvidenceBadge`, `TraceDetails`, `BodyMap` — эмнэлзүйн домэйн компонент. Примитивээс өөрсдөө угсарна.
