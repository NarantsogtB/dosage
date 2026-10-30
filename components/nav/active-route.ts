import { ROUTES, type CalculatorRoute } from "./routes";

/** `/dose/amoxicillin` дээр «Эмийн тун» идэвхтэй хэвээр. */
export const isActive = (pathname: string, href: string): boolean =>
  pathname === href || pathname.startsWith(`${href}/`);

/** Одоогийн тооцоолуур. Landing зэрэг бусад хуудсанд undefined. */
export const activeRoute = (pathname: string): CalculatorRoute | undefined =>
  ROUTES.find((route) => isActive(pathname, route.href));
