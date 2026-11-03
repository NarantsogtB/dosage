import * as React from "react"

import { cn } from "@/lib/utils"

/** Гарын товчлол — Figma "Kbd" (V3 · 01 Atoms). */
function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "bg-muted text-muted-foreground pointer-events-none inline-flex h-5.5 min-w-5.5 items-center justify-center rounded-sm border px-1.5 font-sans text-xs font-medium select-none",
        className
      )}
      {...props}
    />
  )
}

export { Kbd }
