# Шат 1 — Offline (service worker)

**Хугацаа:** 1–2 өдөр · **Унших:** `docs/DEPLOY.md` §1, §3; `app/manifest.ts`;
`components/pwa/`; Next 16-ийн static export баримт (`node_modules/next/dist/docs/`)

## Зорилго
Интернэтгүй тасаг/сумын эмнэлэгт бүх хэрэгсэл ажиллах.

## Хийх
- Шинэ dependency-гүй. Build-ийн дараа `out/`-ийг уншиж precache жагсаалт
  гаргадаг жижиг script + гараар бичсэн `sw.js`. Cache нэр = build id.
- HTML: network-first, offline үед кэш. Static asset: cache-first.
  `/api/*`: хэзээ ч кэшлэхгүй.
- Шинэ SW суухад Sonner toast «Шинэ хувилбар бэлэн — Шинэчлэх» (эмийн
  өгөгдөл шинэчлэгдсэн байж болох тул заавал).
- Offline үед толгойд тайван «Офлайн» тэмдэг.
- Analytics offline үед чимээгүй алдагдана — queue хийхгүй.
- `docs/DEPLOY.md`, `docs/DECISIONS.md` шинэчил.

## Шалгуур
- Precache жагсаалт үүсгэгчид unit test.
- Нэг ачаалсны дараа DevTools Offline-д `/dose`, `/dose/<slug>`, `/burns` ажиллана.
- Шинэ deploy-ийн дараа хуучин өгөгдөл дээр удаан үлдэхгүй.
- Гараар шалгах алхмыг (`bun run preview` + DevTools) жагсаа.
