import { ROUTES, TABS, type CalculatorRoute, type Tab } from "./routes";

/** `/dose/amoxicillin` дээр «Эмийн тун» идэвхтэй хэвээр. */
export const isActive = (pathname: string, href: string): boolean =>
  pathname === href || pathname.startsWith(`${href}/`);

/** Одоогийн тооцоолуур. Landing зэрэг бусад хуудсанд undefined. */
export const activeRoute = (pathname: string): CalculatorRoute | undefined =>
  ROUTES.find((route) => isActive(pathname, route.href));

const matchesPrefix = (pathname: string, prefix: string): boolean =>
  prefix.endsWith("/") ? pathname.startsWith(prefix) : isActive(pathname, prefix);

const HOME_TAB = TABS[0]!;

/** `/dose/amoxicillin` (эмийн хуудас) нь Эмүүд табын дор; `/history` нь Тохиргооны дэд хуудас. */
const TAB_PATHS: readonly (readonly [string, Tab])[] = [
  ["/dose/", TABS[1]!],
  ["/drugs", TABS[1]!],
  ["/settings", TABS[2]!],
  ["/history", TABS[2]!],
];

const homeTab = (pathname: string): Tab | undefined => (activeRoute(pathname) ? HOME_TAB : undefined);

/**
 * Доод навигацын идэвхтэй таб: бүх тооцоолуур «Нүүр»-ийн дор. Таб байхгүй
 * хуудсанд (landing) undefined — навигац харагдахгүй.
 */
export const activeTab = (pathname: string): Tab | undefined =>
  TAB_PATHS.find(([prefix]) => matchesPrefix(pathname, prefix))?.[1] ?? homeTab(pathname);
