import { X } from "lucide-react";
import type { AgeBand, BodyRegionId, BurnDepth } from "@/lib/domain/body-region";
import { LUND_BROWDER } from "@/lib/data/burns/lund-browder";
import { DEPTH_LABELS, REGION_LABELS } from "@/lib/data/burns/region-labels";
import { cn } from "@/lib/utils";
import type { SelectionMap } from "./use-burn-selections";

interface Props {
  readonly band: AgeBand;
  readonly selections: SelectionMap;
  readonly onToggle: (region: BodyRegionId, depth?: BurnDepth) => void;
  /** Desktop — bg-sheet, px 18 (Figma 140:1675). */
  readonly desk?: boolean;
}

const DOT: Record<BurnDepth, string> = {
  superficial: "border-muted-foreground border border-dashed",
  partial: "bg-warning",
  full: "bg-destructive",
};
const DEPTH_TEXT: Record<BurnDepth, string> = {
  superficial: "text-muted-foreground",
  partial: "text-warning",
  full: "text-destructive",
};

interface RowProps extends Omit<Props, "selections" | "desk"> {
  readonly region: BodyRegionId;
  readonly depth: BurnDepth;
}

/**
 * Диаграм дээр товшсоны ТЕКСТ баталгаа — буруу бүс → буруу БНГТ% → буруу шингэн.
 * Мөр (Figma 138:1622): цэг 10 · нэр 15 Medium · зэрэг 13 · % 15 Bold · ✕ 32 (дарах талбай 44).
 */
const Row = ({ region, depth, band, onToggle }: RowProps) => (
  <li className="flex items-center gap-3 border-b py-[13px] last:border-b-0">
    <span aria-hidden className={cn("size-2.5 shrink-0 rounded-full", DOT[depth])} />
    <span className="min-w-0 flex-1 truncate text-[15px]/[19px] font-medium">{REGION_LABELS[region]}</span>
    <span className={cn("text-[13px]/[17px]", DEPTH_TEXT[depth])}>{DEPTH_LABELS[depth]}</span>
    <span className="num text-[15px]/[19px] font-bold">{LUND_BROWDER[region][band]}%</span>
    <button
      type="button"
      aria-label={`${REGION_LABELS[region]} хасах`}
      onClick={() => onToggle(region, undefined)}
      className="bg-muted focus-visible:ring-ring relative grid size-8 shrink-0 place-items-center rounded-full outline-none after:absolute after:-inset-1.5 focus-visible:ring-[3px]"
    >
      <X aria-hidden className="size-3.5" />
    </button>
  </li>
);

export default function RegionList({ band, selections, onToggle, desk }: Props) {
  const entries = [...selections.entries()];
  if (entries.length === 0) return null;
  return (
    <ul aria-label="Сонгосон бүс" className={cn("rounded-3xl", desk ? "bg-sheet px-[18px]" : "bg-card px-4")}>
      {entries.map(([region, depth]) => <Row key={region} region={region} depth={depth} band={band} onToggle={onToggle} />)}
    </ul>
  );
}
