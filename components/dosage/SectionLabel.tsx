import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  readonly children: ReactNode;
  readonly className?: string;
}

/** Картын доторх хэсгийн жижиг гарчиг. */
export default function SectionLabel({ children, className }: Props) {
  return (
    <p
      className={cn(
        "text-muted-foreground flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest",
        className,
      )}
    >
      {children}
    </p>
  );
}
