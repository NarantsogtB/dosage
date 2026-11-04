import type { Formulation } from "../../domain/formulation";
import type { Route } from "../../domain/route";

/** Дүрмийн зам → зөвшөөрөгдөх бэлдмэлийн замууд (Шат 6). */
const ROUTE_GROUPS: Record<Route, readonly Route[]> = {
  oral: ["oral"],
  iv: ["iv"],
  im: ["im"],
  iv_im: ["iv", "im"],
  oral_iv: ["oral", "iv"],
  pr: ["pr"],
  neb: ["neb"],
  sc: ["sc"],
  io: ["io"],
  iv_io: ["iv", "io"],
};

const ORAL: readonly Route[] = ["oral"];

const reconstitutionRoutes = (formulation: Formulation): readonly Route[] =>
  formulation.kind === "powder" ? formulation.reconstitutions.map((item) => item.route) : ORAL;

/** Бэлдмэлийн замууд — заагаагүй бол амаар (нунтаг: найруулгуудын замаар). */
export const formulationRoutes = (formulation: Formulation): readonly Route[] =>
  (formulation.kind === "powder" ? undefined : formulation.routes) ?? reconstitutionRoutes(formulation);

/** Тухайн зам дүрмийн замд багтах эсэх. */
export const routeAllowed = (ruleRoute: Route, route: Route): boolean =>
  ROUTE_GROUPS[ruleRoute].includes(route);

/** Бэлдмэл дүрмийн замаар хэрэглэгдэх эсэх. */
export const matchesRoute = (formulation: Formulation, ruleRoute: Route): boolean =>
  formulationRoutes(formulation).some((route) => routeAllowed(ruleRoute, route));
