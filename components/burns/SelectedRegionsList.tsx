import { X } from "lucide-react";
import type { AgeBand, BodyRegionId, BurnDepth } from "@/lib/domain/body-region";
import { LUND_BROWDER } from "@/lib/data/burns/lund-browder";
import { DEPTH_LABELS, REGION_LABELS } from "@/lib/data/burns/region-labels";
import { Button } from "@/components/ui/button";
import type { SelectionMap } from "./use-burn-selections";

interface Props {
  readonly band: AgeBand;
  readonly selections: SelectionMap;
  readonly onToggle: (region: BodyRegionId, depth?: BurnDepth) => void;
}

interface RowProps {
  readonly region: BodyRegionId;
  readonly depth: BurnDepth;
  readonly band: AgeBand;
  readonly onToggle: Props["onToggle"];
}

const percentOf = (region: BodyRegionId, band: AgeBand): number =>
  LUND_BROWDER[region][band];

/**
 * Диаграм дээр товшсоны текст баталгаа.
 *
 * Диаграм дээр буруу товших эрсдэлтэй (жижиг бүс, гар утас) — энд ЯГ
 * юу сонгогдсоныг үг, тоогоор шууд харуулж, эмч нэг харцаар шалгах
 * боломжтой болгоно. Хасах товч ч энд байрладаг тул диаграм руу буцах
 * шаардлагагүй.
 */
const Row = ({ region, depth, band, onToggle }: RowProps) => (
  <li className="flex items-center justify-between gap-2 py-1.5 text-sm">
    <span className="min-w-0 truncate">
      <span className="font-medium">{REGION_LABELS[region]}</span>{" "}
      <span className="text-muted-foreground">{DEPTH_LABELS[depth]}</span>
    </span>
    <span className="flex shrink-0 items-center gap-1">
      <span className="num text-xs font-semibold">{percentOf(region, band)}%</span>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label={`${REGION_LABELS[region]} хасах`}
        onClick={() => onToggle(region, undefined)}
      >
        <X />
      </Button>
    </span>
  </li>
);

export default function SelectedRegionsList({ band, selections, onToggle }: Props) {
  const entries = [...selections.entries()];
  if (entries.length === 0) {
    return (
      <p className="text-muted-foreground px-1 text-sm">Бүс сонгоогүй байна.</p>
    );
  }
  return (
    <ul className="divide-border divide-y px-1">
      {entries.map(([region, depth]) => (
        <Row key={region} region={region} depth={depth} band={band} onToggle={onToggle} />
      ))}
    </ul>
  );
}
