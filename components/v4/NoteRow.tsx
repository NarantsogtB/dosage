import type { ReactNode } from "react";
import { Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "info" | "warning";

const ICON = { info: Info, warning: TriangleAlert } as const;
const COLOR: Record<Tone, string> = { info: "text-muted-foreground", warning: "text-warning" };

/** Картын доорх тэмдэглэл: дүрс 16 + 12 Regular muted, g 8. */
export default function NoteRow({ tone = "info", children }: { readonly tone?: Tone; readonly children: ReactNode }) {
  const Icon = ICON[tone];
  return (
    <p className="text-muted-foreground flex gap-2 text-xs/[15px]">
      <Icon aria-hidden className={cn("size-4 shrink-0", COLOR[tone])} />
      <span>{children}</span>
    </p>
  );
}
