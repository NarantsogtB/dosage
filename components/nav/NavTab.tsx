"use client";

import Link from "next/link";
import type { CalculatorRoute } from "./routes";
import { cn } from "@/lib/utils";

interface Props {
  readonly route: CalculatorRoute;
  readonly active: boolean;
}

/** Нэг таб. Идэвхтэй нь доогуураа зураастай. */
export default function NavTab({ route, active }: Props) {
  const Icon = route.icon;
  return (
    <Link
      href={route.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "-mb-px flex items-center gap-2 border-b-2 px-3.5 text-[15px] font-medium transition-colors",
        "focus-visible:ring-ring rounded-t-sm focus-visible:ring-2 focus-visible:outline-none",
        active
          ? "border-primary text-primary"
          : "text-muted-foreground hover:text-foreground border-transparent",
      )}
    >
      <Icon aria-hidden className="size-4.5" />
      {route.labelMn}
    </Link>
  );
}
