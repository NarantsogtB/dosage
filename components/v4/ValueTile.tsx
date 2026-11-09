import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  readonly label: ReactNode;
  readonly value: ReactNode;
  readonly rate?: ReactNode;
  /** Гол утга (жишээ нь нөхөх хурд) — teal. */
  readonly accent?: boolean;
}

/** Утгын хайрцаг (Figma tile): surface/raised, r 18, p 12/14, col g 4; шошго 12 · утга 20 Bold · хурд 14 SemiBold teal. */
const Rate = ({ rate }: { readonly rate?: ReactNode }) =>
  rate ? <p className="num text-primary text-sm/[18px] font-semibold">{rate}</p> : null;

export default function ValueTile({ label, value, rate, accent }: Props) {
  return (
    <div className="bg-muted flex flex-col gap-1 rounded-[18px] px-3.5 py-3">
      <p className="text-muted-foreground text-xs/[15px]">{label}</p>
      <p className={cn("num text-xl/[26px] font-bold whitespace-nowrap", accent && "text-primary")}>{value}</p>
      <Rate rate={rate} />
    </div>
  );
}

/** 2 tile хажуу, g 10, өндөр тус бүр HUG. */
export const TileGrid = ({ children }: { readonly children: ReactNode }) => (
  <div className="grid grid-cols-2 items-start gap-2.5">{children}</div>
);
