import type { Drug } from "../domain/drug";
import type { Route } from "../domain/route";
import { routeAllowed } from "../engine/formulation/route-match";

/** Хайлтын замын шүүлт (Шат 6). */
export type RouteFilter = "oral" | "injection";

const TARGETS: Record<RouteFilter, readonly Route[]> = {
  oral: ["oral"],
  injection: ["iv", "im", "sc"],
};

export const ROUTE_FILTER_LABELS: Record<RouteFilter, string> = {
  oral: "Амаар",
  injection: "Тарилга",
};

/** Эмийн ямар нэг дүрэм тухайн замаар хэрэглэгдэх эсэх. Шүүлтгүй бол бүгд. */
export const matchRouteFilter = (drug: Drug, filter?: RouteFilter): boolean =>
  filter === undefined ||
  drug.rules.some((rule) => TARGETS[filter].some((route) => routeAllowed(rule.route, route)));
