<!-- ARCHITECTURE.md-аас хуваасан. Бусад хэсэг: ./README.md -->
## 3b. Дизайн систем — shadcn/ui

`components.json` тохируулагдсан. `bunx shadcn@latest add <name>` шинэ
компонент нэмнэ, `components/ui/` доор орно.

**Дүрэм: `components/ui/` доторхыг гар аргаар засварлахгүй.** Засвал
дараагийн `shadcn add` дарж бичихэд зөрчил гарна. Хэрэгцээт өөрчлөлтийг
`cn()`-ээр гаднаас нь дамжуулна.

### Өнгөний token

`app/globals.css` дотор oklch хувьсагчаар. shadcn-ий стандарт багцад
эмнэлзүйн хэрэгцээт **`warning`** гурвал нэмсэн:

| Token | Хэрэглээ |
|---|---|
| `--primary` | Нам гүм эмнэлгийн хөх |
| `--destructive` | Тооцоолол боломжгүй, хориглох заалт |
| `--warning` / `--warning-muted` | Дээд хязгаар, анхааруулга, `D_unverified` |

`Badge`-д `soft`, `warning`, `success`, `Alert`-д `info`, `warning`
хувилбар нэмсэн — эдгээр нь `EvidenceLevel`-ийн 4 түвшинг илэрхийлнэ.

### Radix ашиглаагүй хоёр газар — зориудаар

| Хэсэг | Оронд нь | Шалтгаан |
|---|---|---|
| Trace дэлгэх | native `<details>` | JavaScript, hydration хэрэггүй. Bedside-д хамгийн хурдан |
| Эмийн жагсаалтын гүйлгээ | native `overflow-y-auto` | Гар утсан дээр momentum scroll native нь илүү |

Bundle-ийн жин нь bedside workflow-д шууд нөлөөтэй тул Radix-ийг зөвхөн
бодит хэрэгцээтэй газарт нь оруулна.
