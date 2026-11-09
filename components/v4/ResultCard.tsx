import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  readonly id?: string;
  readonly icon: LucideIcon;
  readonly title: string;
  readonly sub?: ReactNode;
  readonly children?: ReactNode;
  readonly className?: string;
}

/** Үр дүнгийн карт (Figma Maintenance/Parkland): r 24, p 16/18, col g 12; толгой — tile 40 r 12 + гарчиг 17 + дэд 12. */
export default function ResultCard({ id, icon: Icon, title, sub, children, className }: Props) {
  return (
    <section id={id} aria-label={title} className={cn("bg-card flex scroll-mt-20 flex-col gap-3 rounded-3xl px-[18px] py-4", className)}>
      <div className="flex items-center gap-2.5">
        <span className="bg-tile text-tile-foreground grid size-10 shrink-0 place-items-center rounded-xl">
          <Icon aria-hidden className="size-5" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <h2 className="text-[17px]/[22px] font-semibold">{title}</h2>
          {sub ? <p className="text-muted-foreground text-xs/[15px]">{sub}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}
