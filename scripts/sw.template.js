/*
 * dosage.mn service worker — `scripts/build-sw.ts` энэ загвараас `out/sw.js`
 * үүсгэнэ. ГАРААР `out/sw.js`-ийг засахгүй.
 *
 * Стратеги (docs/DEPLOY.md «Offline»):
 *   HTML, RSC (.txt)   network-first → offline/удаан үед кэш
 *   _next/static, дүрс cache-first (нэр нь hash-тай, өөрчлөгдөхгүй)
 *   /api/*             хэзээ ч кэшлэхгүй (analytics offline үед чимээгүй алдагдана)
 *
 * Шинэ хувилбар АВТОМАТААР идэвхжихгүй: эмийн өгөгдөл өөрчлөгдсөн байж
 * болох тул хэрэглэгч «Шинэчлэх» дарна (`SKIP_WAITING`).
 */
const CACHE = "dosage-__VERSION__";
const PRECACHE = __PRECACHE__;

/** Сүлжээ удаан бол кэш рүү шилжих хугацаа — сумын эмнэлгийн 2G/3G. */
const TIMEOUT_MS = 3000;

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)));
});

const isOld = (key) => key.startsWith("dosage-") && key !== CACHE;

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter(isOld).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

const isStatic = (url) =>
  url.pathname.startsWith("/_next/static/") || /\.(png|svg|ico|webmanifest|woff2?)$/.test(url.pathname);

const cacheFirst = async (request) => (await caches.match(request)) ?? fetch(request);

/** Query-гүй замаар хадгална — `?_rsc=…` бүрд шинэ мөр үүсгэхгүй. */
const store = (url) => async (response) => {
  if (response.ok && response.type === "basic") {
    const cache = await caches.open(CACHE);
    await cache.put(url.pathname, response.clone());
  }
  return response;
};

const timeout = () =>
  new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), TIMEOUT_MS));

const networkFirst = async (request, url) => {
  const network = fetch(request).then(store(url));
  try {
    return await Promise.race([network, timeout()]);
  } catch {
    return (await caches.match(url.pathname)) ?? network;
  }
};

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;
  event.respondWith(isStatic(url) ? cacheFirst(request) : networkFirst(request, url));
});
