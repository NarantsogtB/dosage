import type { ReactNode } from "react";
import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "plain" | "warning";

const TONE: Record<Tone, string> = {
  plain: "bg-foreground/5 dark:bg-white/8",
  warning: "bg-warning/14 border-warning/40 text-warning border",
};

/** Hero-ийн chip: r-full, p 7/12, 13 Medium (Figma 163:1961). `warning` — alert 14 + шар. */
export default function HeroChip({ tone = "plain", children }: { readonly tone?: Tone; readonly children: ReactNode }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-[7px] text-[13px]/[17px] font-medium", TONE[tone])}>
      {tone === "warning" ? <TriangleAlert aria-hidden className="size-3.5" /> : null}
      {children}
    </span>
  );
}
