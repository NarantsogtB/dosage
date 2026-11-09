import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Tool } from "./tools";

/**
 * Нэг хэрэгслийн карт — бүхэлдээ холбоос (Figma 154:1859 / 156:1911).
 * Mobile: мөр (tile 48 · гарчиг 17 · тайлбар 13 · ›). Desktop: багана (tile 52 · 19 · 14 · «Нээх ›»).
 */
export default function ToolCard({ tool }: { readonly tool: Tool }) {
  const Icon = tool.icon;
  return (
    <Link
      href={tool.href}
      className="bg-card focus-visible:ring-ring hover:bg-muted flex items-start gap-3.5 rounded-3xl p-4 outline-none focus-visible:ring-[3px] lg:flex-col lg:p-[22px]"
    >
      <span className="bg-tile text-tile-foreground grid size-12 shrink-0 place-items-center rounded-2xl lg:size-[52px]">
        <Icon aria-hidden className="size-[22px] lg:size-6" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1 lg:gap-3.5">
        <span className="text-[17px]/[22px] font-semibold lg:text-[19px]/6">{tool.titleMn}</span>
        <span className="text-muted-foreground text-[13px]/[17px] lg:flex-1 lg:text-sm/[1.45]">{tool.bodyMn}</span>
        <span className="text-primary hidden items-center gap-1.5 text-sm/[18px] font-semibold lg:mt-auto lg:flex">
          Нээх <ChevronRight aria-hidden className="size-4" />
        </span>
      </span>
      <ChevronRight aria-hidden className="text-muted-foreground size-[18px] shrink-0 lg:hidden" />
    </Link>
  );
}
