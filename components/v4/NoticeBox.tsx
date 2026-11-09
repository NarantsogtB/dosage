import type { ReactNode } from "react";
import { Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "warning" | "plain";

const BOX: Record<Tone, string> = {
  warning: "bg-warning/10 border-warning/35 border",
  plain: "bg-foreground/5 dark:bg-white/5",
};
const TITLE: Record<Tone, string> = { warning: "text-warning", plain: "" };
const ICON = { warning: TriangleAlert, plain: Info } as const;

interface Props {
  readonly tone?: Tone;
  readonly title: string;
  readonly children: ReactNode;
}

/** Disclaimer (Figma): r 20, p 14/16, col g 6; гарчиг 14 SemiBold + дүрс 16; бие 12–13 muted. */
export default function NoticeBox({ tone = "warning", title, children }: Props) {
  const Icon = ICON[tone];
  return (
    <aside aria-label={title} className={cn("flex flex-col gap-1.5 rounded-[20px] px-4 py-3.5", BOX[tone])}>
      <p className={cn("flex items-center gap-2 text-sm/[18px] font-semibold", TITLE[tone])}>
        <Icon aria-hidden className="size-4 shrink-0" />
        {title}
      </p>
      <div className="text-muted-foreground space-y-1.5 text-xs/[15px]">{children}</div>
    </aside>
  );
}
