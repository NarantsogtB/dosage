import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Size = "hero" | "large" | "card" | "compact";

/** Тоо + нэгж, baseline (Figma): hero 72 + 22 · large 56 + 26 (БГТ aside) · card 40 + 16 · compact 30 + 14 (desktop aside). */
const NUMBER: Record<Size, string> = {
  hero: "text-[72px]/[92px] font-bold",
  large: "text-[56px]/[71px] font-bold",
  card: "text-[40px]/[51px] font-bold",
  compact: "text-[30px]/[38px] font-bold",
};
const UNIT: Record<Size, string> = {
  hero: "text-[22px]/[28px] font-semibold",
  large: "text-[26px]/[33px] font-semibold",
  card: "text-base/5 font-medium",
  compact: "text-sm/[18px] font-medium",
};
const GAP: Record<Size, string> = { hero: "gap-1.5", large: "gap-1.5", card: "gap-2", compact: "gap-1.5" };

interface Props {
  readonly value: ReactNode;
  readonly unit: ReactNode;
  readonly size?: Size;
  readonly unitClassName?: string;
}

export default function BigValue({ value, unit, size = "card", unitClassName }: Props) {
  return (
    <p className={cn("flex items-baseline", GAP[size])}>
      <span className={cn("num", NUMBER[size])}>{value}</span>
      <span className={cn("text-muted-foreground", UNIT[size], unitClassName)}>{unit}</span>
    </p>
  );
}
