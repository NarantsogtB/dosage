# Analytics — үйлдлийн түвшний хэмжилт

> Cloudflare Web Analytics нь хуудас үзэлтийг л харуулдаг. Энэ баримт
> нь **тооцоолуур дотор юу болж байгааг** (ямар эм, юу олдоогүй,
> тооцоолол дууссан эсэх) хэрхэн хэмждэгийг тогтооно.

---

## 1. Бүтэц

```
UI hook / handler ──► lib/analytics/track.ts ──sendBeacon──► POST /api/e ──► Analytics Engine
                      lib/analytics/events.ts ◄──────────── functions/api/e.ts      dataset: dosage_events
                      (schema, parseEvent, toBlobs — client, сервер хоёул)
```

- **Client:** UI зөвхөн `track(event)` дуудна. Production биш үед
  сүлжээнд явуулахгүй, `console.debug`-д бичнэ. Алдааг чимээгүй
  залгина — analytics тооцоолуурыг хэзээ ч эвдэхгүй.
- **Сервер:** `functions/api/e.ts` — Cloudflare Pages Function. Next-ийн
  статик экспорт үүнийг хардаггүй; `wrangler pages deploy` root-ийн
  `functions/`-г автоматаар bundle хийж, зөвхөн `/api/*`-д ажиллуулна.
- **Binding:** `wrangler.jsonc` → `analytics_engine_datasets`
  (`EVENTS` → `dosage_events`).
- **Backend солих бол:** зөвхөн `track.ts` (ба Function) өөрчлөгдөнө.

## 2. Хувийн нууцлал

| Хадгална | Хадгалахгүй |
|---|---|
| Event-ийн нэр, эмийн id, бэлдмэлийн id | Өвчтөний яг жин — зөвхөн bucket (`<10`, `10-20`, `20-40`, `>40` кг) |
| Хайлтын үг (normalize, ≤ 40 тэмдэгт) | Нас |
| Улсын код (`request.cf.country`) | IP, User-Agent, cookie, хэрэглэгчийн ID |

«Сүүлд хэрэглэсэн» эм (`dosage.recent.v1`) болон сануулгыг хаасан
тэмдэг (`dosage.install-prompt.v1`) нь зөвхөн төхөөрөмжийн localStorage-д
— серверт явахгүй, хэрэглэгчийг танихад ашиглахгүй.

Сервер schema-д байхгүй талбарыг **хаядаг** (`parseEvent` → `pick`) —
client алдаагаар жин илгээсэн ч хадгалагдахгүй.

## 3. Event-үүд

| Event | Хэзээ | Талбар |
|---|---|---|
| `calculator_opened` | `/dose` (эмийн хуудас орно) эсвэл `/burns` нээгдэх | `calculator`, `mode` (`browser` / `standalone` — нүүр дэлгэцээс) |
| `drug_selected` | эм жагсаалтад НЭМЭХ (хасах биш) | `drugId` |
| `search_no_result` | хайлтын үгнээс болж хоосон, 1.2 сек тогтсон (ангилал / «баталгаажсан» шүүлттэй үед тоолохгүй) | `query` |
| `weight_entered` | хүчинтэй жин, 1 сек тогтсон | `bucket` |
| `calc_completed` | эмийн тун амжилттай гарч 1.5 сек тогтсон | `drugId`, `formulationId` (анхдагч бэлдмэл — эхний шингэн), `bucket` |
| `copy_result` | «Хуулах» амжилттай — хуулсан эм бүрд нэг | `drugId` |
| `recent_drug_used` | «Сүүлд хэрэглэсэн» chip-ээр эм НЭМЭХ | `drugId` |
| `install_prompt_shown` | «Нүүр дэлгэцэд нэмэх» сануулга гарах (нэг удаа) | `platform` (`android` / `ios`) |
| `install_prompt_result` | сануулгад хариулах | `platform`, `outcome` (`accepted` / `dismissed` — Android; `acknowledged` — iOS «Ойлголоо», суусныг мэдэх боломжгүй) |

Ижил агуулгатай event-ийг нэг хуудас нээлтэд **нэг л удаа** илгээнэ
(`components/analytics/use-track-settled.ts`).

### Blob-ийн байрлал

| Багана | Утга |
|---|---|
| `index1` | event-ийн нэр |
| `blob1` | event-ийн нэр |
| `blob2` | `calculator` / `drugId` / `query` / `bucket` / `platform` (эхний талбар) |
| `blob3` | `formulationId` (`calc_completed`), `mode` (`calculator_opened`), `outcome` (`install_prompt_result`) |
| `blob4` | `bucket` (`calc_completed`) |
| `blob5` | улсын код |
| `double1` | 1 |

Тоолохдоо `count()` биш **`SUM(_sample_interval)`** ашиглана —
Analytics Engine их ачааллын үед түүвэрлэдэг.

⚠️ Өгөгдөл **3 сар** хадгалагдана. Урт хугацааны чиг хандлага хэрэгтэй
бол сар бүр доорх асуулгын үр дүнг хадгалж ав.

## 4. Асуулга ажиллуулах

Cloudflare dashboard → My Profile → API Tokens → «Account Analytics:
Read» эрхтэй token үүсгэнэ. Account ID нь Workers & Pages-ийн баруун
талд бий.

```bash
export CF_ACCOUNT_ID=...
export CF_API_TOKEN=...

curl -s "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/analytics_engine/sql" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  --data "SELECT blob1 AS event, SUM(_sample_interval) AS n
          FROM dosage_events
          WHERE timestamp > NOW() - INTERVAL '1' DAY
          GROUP BY event FORMAT JSON"
```

## 5. SQL жишээ

```sql
-- Хамгийн их сонгосон эм (30 хоног)
SELECT blob2 AS drug, SUM(_sample_interval) AS n
FROM dosage_events
WHERE blob1 = 'drug_selected'
  AND timestamp > NOW() - INTERVAL '30' DAY
GROUP BY drug
ORDER BY n DESC
LIMIT 20;
```

```sql
-- Олдоогүй хайлт — шинэ эм нэмэх, нэрийн хувилбар (латин/кирилл) засах дараалал
SELECT blob2 AS query, SUM(_sample_interval) AS n
FROM dosage_events
WHERE blob1 = 'search_no_result'
  AND timestamp > NOW() - INTERVAL '30' DAY
GROUP BY query
ORDER BY n DESC
LIMIT 50;
```

```sql
-- Юүлүүр: нээсэн → жин → тооцоолол → хуулсан (7 хоног, зөвхөн /dose)
SELECT blob1 AS step, SUM(_sample_interval) AS n
FROM dosage_events
WHERE timestamp > NOW() - INTERVAL '7' DAY
  AND (
    (blob1 = 'calculator_opened' AND blob2 = 'dose')
    OR blob1 IN ('weight_entered', 'calc_completed', 'copy_result')
  )
GROUP BY step
ORDER BY n DESC;
```

```sql
-- Эм тус бүрийн тооцоолол ба хуулалт — аль эмийн үр дүнг эмч бодитоор ашигладаг вэ
SELECT blob1 AS event, blob2 AS drug, SUM(_sample_interval) AS n
FROM dosage_events
WHERE blob1 IN ('calc_completed', 'copy_result')
  AND timestamp > NOW() - INTERVAL '30' DAY
GROUP BY event, drug
ORDER BY drug, event;
```

```sql
-- Жингийн тархалт (өвчтөний насны бүлгийг ойролцоогоор)
SELECT blob2 AS bucket, SUM(_sample_interval) AS n
FROM dosage_events
WHERE blob1 = 'weight_entered'
  AND timestamp > NOW() - INTERVAL '30' DAY
GROUP BY bucket
ORDER BY n DESC;
```

### Эргэж ирэлт (Ажил 3)

```sql
-- Нүүр дэлгэцээс нээсэн хувь (суулгасан аппын хэрэглээ), 7 хоногоор
SELECT blob3 AS mode, SUM(_sample_interval) AS n
FROM dosage_events
WHERE blob1 = 'calculator_opened'
  AND timestamp > NOW() - INTERVAL '7' DAY
GROUP BY mode;
```

```sql
-- Суулгалтын юүлүүр: харсан → хариулт (платформоор)
SELECT blob1 AS step, blob2 AS platform, blob3 AS outcome, SUM(_sample_interval) AS n
FROM dosage_events
WHERE blob1 IN ('install_prompt_shown', 'install_prompt_result')
  AND timestamp > NOW() - INTERVAL '30' DAY
GROUP BY step, platform, outcome
ORDER BY platform, step;
```

```sql
-- «Сүүлд хэрэглэсэн»-ээр сонголт нийт сонголтын хэдэн хувь вэ
SELECT blob1 AS event, SUM(_sample_interval) AS n
FROM dosage_events
WHERE blob1 IN ('drug_selected', 'recent_drug_used')
  AND timestamp > NOW() - INTERVAL '30' DAY
GROUP BY event;
```

`recent_drug_used` нь `drug_selected`-ийн ДЭД олонлог — chip-ээр сонгосон
эм хоёуланг нь үүсгэнэ.

## 6. Локалд шалгах

```bash
bun run preview                      # next build && wrangler pages dev out → :8788
curl -i -X POST localhost:8788/api/e -d '{"name":"drug_selected","drugId":"amoxicillin"}'  # 204
curl -i -X POST localhost:8788/api/e -d '{"name":"foo"}'                                   # 400
```

Браузерын DevTools → Network → `e` хүсэлтүүдийн payload-д жингийн тоо
байх ёсгүй.
