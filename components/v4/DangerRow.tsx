import type { ReactNode } from "react";

interface Props {
  readonly title: string;
  readonly hint: ReactNode;
  readonly value: ReactNode;
}

/** Нэг дэлгэцэд нэг л danger: r 18, p 12/14, danger/10 + 1px danger/35; гарчиг 14 SemiBold, утга 20 Bold. */
export default function DangerRow({ title, hint, value }: Props) {
  return (
    <div className="border-destructive/35 bg-destructive/10 flex items-center gap-2.5 rounded-[18px] border px-3.5 py-3">
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-destructive text-sm/[18px] font-semibold">{title}</p>
        <p className="text-muted-foreground text-xs/[15px]">{hint}</p>
      </div>
      <p className="num shrink-0 text-xl/[26px] font-bold">{value}</p>
    </div>
  );
}
