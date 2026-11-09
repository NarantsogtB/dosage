"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface SectionTab {
  readonly id: string;
  readonly label: string;
}

const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ block: "start" });

/** «Тэтгэх · Болюс · Дутагдал» (Figma 163:1961): r-full card p 4 g 4; идэвхтэй — цагаан дэвсгэр, хар текст. Хуудас солихгүй, anchor руу гүйлгэнэ. */
export default function SectionTabs({ tabs }: { readonly tabs: readonly SectionTab[] }) {
  const [current, setCurrent] = useState(tabs[0]?.id);
  return (
    <nav aria-label="Хэсгүүд" className="bg-card flex gap-1 rounded-full p-1">
      {tabs.map((tab) => (
        <a
          key={tab.id}
          href={`#${tab.id}`}
          aria-current={tab.id === current ? "true" : undefined}
          onClick={(event) => {
            event.preventDefault();
            setCurrent(tab.id);
            jump(tab.id);
          }}
          className={cn(
            "focus-visible:ring-ring flex-1 rounded-full py-2.5 text-center text-sm/[18px] font-semibold outline-none focus-visible:ring-[3px]",
            tab.id === current ? "bg-foreground text-background" : "text-muted-foreground",
          )}
        >
          {tab.label}
        </a>
      ))}
    </nav>
  );
}
