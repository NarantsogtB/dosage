import { ROUTES, TABS, type CalculatorRoute, type Tab } from "./routes";

/** `/dose/amoxicillin` дээр «Эмийн тун» идэвхтэй хэвээр. */
export const isActive = (pathname: string, href: string): boolean =>
  pathname === href || pathname.startsWith(`${href}/`);

/** Одоогийн тооцоолуур. Landing зэрэг бусад хуудсанд undefined. */
export const activeRoute = (pathname: string): CalculatorRoute | undefined =>
  ROUTES.find((route) => isActive(pathname, route.href));

const HOME_TAB = TABS[0]!;

/**
 * Доод навигацын идэвхтэй таб: бүх тооцоолуур «Нүүр»-ийн дор. Таб байхгүй
 * хуудсанд (landing) undefined — навигац харагдахгүй.
 */
export const activeTab = (pathname: string): Tab | undefined =>
  TABS.find((tab) => tab !== HOME_TAB && isActive(pathname, tab.href)) ??
  (activeRoute(pathname) ? HOME_TAB : undefined);
