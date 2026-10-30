import type { AnalyticsEvent } from "./events";

const ENDPOINT = "/api/e";

const isProduction = (): boolean => process.env.NODE_ENV === "production";

/**
 * Event-ийг серверт илгээнэ. UI зөвхөн энэ функцийг дуудна — backend
 * (одоо Cloudflare Analytics Engine) солигдвол зөвхөн энэ файл өөрчлөгдөнө.
 *
 * `sendBeacon`: хуудас хаагдаж байхад ч илгээгдэнэ, хариу хүлээхгүй.
 * Алдааг ЧИМЭЭГҮЙ залгина — analytics тооцоолуурыг хэзээ ч эвдэх ёсгүй.
 * Хөгжүүлэлтийн үед сүлжээнд явуулахгүй, зөвхөн console-д бичнэ.
 */
export const track = (event: AnalyticsEvent): void => {
  try {
    if (!isProduction()) return console.debug("[analytics]", event);
    navigator.sendBeacon(ENDPOINT, JSON.stringify(event));
  } catch {
    // Чимээгүй: ad-blocker, хуучин браузер, SSR.
  }
};
