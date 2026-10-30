<!-- ARCHITECTURE.md-аас хуваасан. Бусад хэсэг: ./README.md -->
## 3. Кодын дүрэм

`eslint.config.mjs` дотор механикаар албадуулсан:

| Дүрэм | Хязгаар | Яагаад |
|---|---|---|
| `complexity` | **3** | Функц бүр нэг үүрэгтэй байхыг албадана |
| `max-depth` | 3 | Гүн үүрлэсэн нөхцөлөөс сэргийлнэ |
| `max-lines` | 160 | Файл нэг сэдэвтэй байх |
| `max-lines-per-function` | 40 | Функц дэлгэцэнд багтах |
| `max-nested-callbacks` | 2 | Callback-ийн шат хязгаарлана |
| `max-params` | 4 | Илүү бол объект оролт ашиглана |

`lib/data/**` болон `components/ui/**` дээр хэмжээний дүрэм хаалттай —
эхнийх нь өгөгдөл, хоёр дахь нь shadcn-ий vendored эх код.

**Хязгаар давбал функцээ салгана. Дүрмийг сулруулж БОЛОХГҮЙ.**

Тайлан: `lib/data/**` дээр `max-lines` хаалттай — өгөгдөл нь кодын
нарийн төвөгтэй байдал биш.

### complexity 3 хэрхэн нөлөөлөв

`switch` бичих боломжгүй болсон (4 сонголт = complexity 5). Оронд нь
**dispatch хүснэгт**:

```ts
const EVALUATORS: Evaluators = {
  per_kg_per_dose: (basis, patient) => perKgPerDose(basis, patient),
  per_kg_per_day: (basis, patient, doses) => perKgPerDay(basis, patient, doses),
  weight_band: (basis, patient) => weightBand(basis, patient),
  fixed: (basis) => fixed(basis),
};
```

Шинэ төрөл нэмэхэд **нэг мөр** нэмнэ — салаалалт өсөхгүй. Энэ бол
хязгаарлалт биш, харин дүрмээс гарсан илүү сайн дизайн.
