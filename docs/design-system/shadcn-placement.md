<!-- DESIGN-SYSTEM.md-аас хуваасан. Бусад хэсэг: ./README.md -->
## 4c. Аль shadcn компонент хаана суусан

| Дэлгэц | Компонент | Файл |
|---|---|---|
| Жин, өндөр, нас | `field` + `input-group` | `calculator/NumberField.tsx`, `AgeFields.tsx`, `AgeInput.tsx` |
| Талбайн доорх мөр | `field` (`FieldError`/`FieldDescription`) | `calculator/FieldNote.tsx` |
| Эмийн хайлт | `command` | `search/SearchField.tsx`, `DrugSearch.tsx` |
| Эмийн жагсаалтын мөр | `command` + `item` | `search/DrugListItem.tsx` |
| Хайлтын хоосон төлөв | `empty` | `search/SearchEmpty.tsx` |
| "Хуулагдлаа" | `sonner` | `summary/CopyButton.tsx`, `app/layout.tsx` |

**`command`-ийн тухай хоёр анхаарах зүйл:**

1. `shouldFilter={false}`. Шүүлт нь `lib/search/filter-drugs.ts`-д үлдэнэ
   (латин↔кирилл, ангилал, баталгаажилт — тесттэй домэйн логик). cmdk-ээс
   авах нь ганцхан зүйл: хайлтын талбараас салалгүй ↑ ↓ Enter.
2. Талбайн НЭР нь `<Command label=…>`-д байна. cmdk түүнийг оролтын
   `aria-labelledby` болгодог тул оролт дээрх `aria-label` үр дүнгүй.

**Хоёр "сонгогдсон" төлөвийг ялгана** (`search/drug-row-style.ts`):
cmdk-ийн тодруулга = саарал (`bg-muted`, түр зуурын), эмчийн сонголт = номин
(`bg-accent` + чагт + тод нэр, тогтвортой). Хоёулаа `bg-accent` байвал эмч
«сонгосон уу, зүгээр зогсож байна уу?» гэж эргэлзэнэ.

### `components/ui/command.tsx`-д хийсэн ГАНЦ засвар

`CommandInput`-д `wrapperClassName` нэмэв. Анхдагч боодол нь `border-b`-тэй
бөгөөд зөвхөн бүтэн дэлгэцийн command palette-д зохимжтой; энд хайлтын талбар
картын дотор ердийн оролт шиг харагдах ёстой. Дахин `shadcn add command`
хийвэл ЭНЭ ЗАСВАРЫГ дахин тавина.
