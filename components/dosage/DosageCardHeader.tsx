import type { Drug } from "@/lib/domain/drug";
import type { EvidenceLevel } from "@/lib/domain/source";
import type { Route } from "@/lib/domain/route";
import { CATEGORY_LABELS } from "@/lib/data/labels/category-labels";
import { ROUTE_LABELS } from "@/lib/data/labels/route-labels";
import { Badge } from "@/components/ui/badge";
import RemoveButton from "@/components/summary/RemoveButton";
import EvidenceChip from "./EvidenceChip";

interface Props {
  readonly drug: Drug;
  readonly route: Route;
  /** Идэвхтэй дүрмийн түвшин — харагдаж буй тоо яг тэр дүрмээс гарсан. */
  readonly level: EvidenceLevel;
  readonly onRemove: (id: string) => void;
}

/**
 * Шилэн толгойн дээд мөр: нэр + замын badge + нотолгоо (цэг+үсэг) + хасах.
 *
 * Нотолгоо нь идэвхтэй ДҮРМИЙНХ (Figma 123:100) — эмийн хамгийн хүчтэй
 * түвшин биш. Илүү сайн заалт байвал `BetterEvidenceHint` хэлнэ.
 */
export default function DosageCardHeader({ drug, route, level, onRemove }: Props) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className="flex flex-wrap items-center gap-2 text-xl font-bold tracking-tight">
          {drug.innMn}
          <Badge variant="outline">{ROUTE_LABELS[route]}</Badge>
        </h3>
        <p className="text-muted-foreground text-sm">
          {drug.inn} · {CATEGORY_LABELS[drug.category]}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <EvidenceChip level={level} />
        <div className="print:hidden">
          <RemoveButton label={drug.inn} onRemove={() => onRemove(drug.id)} />
        </div>
      </div>
    </div>
  );
}
