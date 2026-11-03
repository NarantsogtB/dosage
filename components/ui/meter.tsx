import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Хэмжүүр — Figma "Meter" (V3 · 01 Atoms).
 *
 * Өнгө ганцаараа утга дамжуулахгүй: хэрэглэгч тал нь хувийг ҮРГЭЛЖ
 * текстээр хажууд нь бичнэ. 100%-иас давсан утгыг дүүргэлт таслана.
 */
const meterFillVariants = cva("h-full rounded-full transition-[width]", {
  variants: {
    tone: {
      neutral: "bg-primary",
      warning: "bg-warning",
      destructive: "bg-destructive",
    },
  },
  defaultVariants: { tone: "neutral" },
})

function Meter({
  value,
  tone,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> &
  VariantProps<typeof meterFillVariants> & { value: number }) {
  const width = Math.min(Math.max(value, 0), 100)
  return (
    <div
      data-slot="meter"
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value)}
      className={cn("bg-muted h-2 w-full overflow-hidden rounded-full", className)}
      {...props}
    >
      <div
        className={meterFillVariants({ tone })}
        style={{ width: `${width}%` }}
      />
    </div>
  )
}

export { Meter, meterFillVariants }
