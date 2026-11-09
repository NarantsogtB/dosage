"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { DRUGS } from "@/lib/data/drugs";
import { groupByCategory } from "@/lib/search/group-by-category";
import Disclaimer from "@/components/Disclaimer";
import { openSearch } from "@/components/search/search-open";

const TOP_COUNT = 6;

const TOP = [...groupByCategory(DRUGS)].sort((a, b) => b.count - a.count).slice(0, TOP_COUNT);

/** Ангилал (дээд нь тоогоор) — дарахад хайлт тухайн ангиллаар нээгдэнэ. */
const Categories = () => (
  <section aria-labelledby="aside-categories" className="bg-card space-y-2 rounded-2xl p-4">
    <h2 id="aside-categories" className="text-lg font-bold">Ангилал</h2>
    <ul>
      {TOP.map((group) => (
        <li key={group.category}>
          <button type="button" onClick={() => openSearch({ category: group.category })} className="hover:bg-accent flex min-h-10 w-full items-center gap-2 rounded-lg px-1 text-left text-sm">
            <span className="flex-1">{group.labelMn}</span>
            <span className="num text-muted-foreground">{group.count}</span>
            <ChevronRight aria-hidden className="text-muted-foreground size-4" />
          </button>
        </li>
      ))}
    </ul>
    <Link href="/drugs" className="text-primary text-sm hover:underline">Бүх ангилал</Link>
  </section>
);

/** `/dose` dashboard-ын баруун багана: ангилал, анхааруулга. */
export default function DashboardAside() {
  return (
    <div className="space-y-4">
      <Categories />
      <Disclaimer />
    </div>
  );
}
