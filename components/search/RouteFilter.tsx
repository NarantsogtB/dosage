"use client";

import { ROUTE_FILTER_LABELS, type RouteFilter as Route } from "@/lib/search/route-filter";
import CategoryPill from "./CategoryPill";

interface Props {
  readonly selected?: Route;
  readonly onSelect: (route?: Route) => void;
}

const ROUTES = Object.keys(ROUTE_FILTER_LABELS) as Route[];

/** Замын шүүлт: «Бүх зам / Амаар / Тарилга» (Шат 6). */
export default function RouteFilter({ selected, onSelect }: Props) {
  return (
    <div className="flex gap-1.5 overflow-x-auto px-5 pb-2" role="group" aria-label="Хэрэглэх зам">
      <CategoryPill label="Бүх зам" active={selected === undefined} onClick={() => onSelect(undefined)} />
      {ROUTES.map((route) => (
        <CategoryPill
          key={route}
          label={ROUTE_FILTER_LABELS[route]}
          active={selected === route}
          onClick={() => onSelect(selected === route ? undefined : route)}
        />
      ))}
    </div>
  );
}
