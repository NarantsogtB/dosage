"use client";

import { ChevronRight } from "lucide-react";
import { DRUGS } from "@/lib/data/drugs";
import { groupByCategory } from "@/lib/search/group-by-category";
import { openSearch } from "@/components/search/search-open";

const GROUPS = groupByCategory(DRUGS);

/** Ангилал бүр нэг карт: нэр, тоо, жишээ эмүүд. Дарахад хайлт тухайн ангиллаар нээгдэнэ. */
export default function CategoryCards() {
  return (
    <section aria-labelledby="categories-title" className="space-y-3">
      <h2 id="categories-title" className="text-xl font-bold">
        Ангилал
      </h2>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {GROUPS.map((group) => (
          <li key={group.category}>
            <button
              type="button"
              onClick={() => openSearch({ category: group.category })}
              className="bg-card hover:bg-accent focus-visible:ring-ring/50 flex min-h-20 w-full items-center gap-3 rounded-2xl p-4 text-left outline-none focus-visible:ring-[3px]"
            >
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline gap-2 font-semibold">
                  {group.labelMn}
                  <span className="num text-muted-foreground text-sm font-normal">{group.count}</span>
                </span>
                <span className="text-muted-foreground block truncate text-sm">{group.sample.join(", ")}</span>
              </span>
              <ChevronRight aria-hidden className="text-muted-foreground size-5 shrink-0" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
