"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { activeTab } from "./active-route";
import { TABS } from "./routes";

/**
 * Desktop толгойн 3 pill таб — Нүүр · Эмүүд · Тохиргоо (V4, Figma 126:354).
 * Mobile-д доод навигац (`BottomNav`). Замд суурилсан: URL хуваалцах, буцах товч ажиллана.
 */
export default function PillNav() {
  const current = activeTab(usePathname());
  return (
    <nav aria-label="Үндсэн навигац" className="bg-muted/60 hidden gap-1 rounded-full border p-1 md:flex">
      {TABS.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          aria-current={tab === current ? "page" : undefined}
          className={cn(
            "focus-visible:ring-ring/50 rounded-full px-4 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-[3px]",
            tab === current ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {tab.labelMn}
        </Link>
      ))}
    </nav>
  );
}
