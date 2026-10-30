import type { Drug } from "@/lib/domain/drug";
import type { Route } from "@/lib/domain/route";
import { CATEGORY_LABELS } from "@/lib/data/labels/category-labels";
import { ROUTE_LABELS } from "@/lib/data/labels/route-labels";
import { drugEvidence } from "@/lib/engine/rule/drug-evidence";
import { CardHeader, CardTitle } from "@/components/ui/card";
import RemoveButton from "@/components/summary/RemoveButton";
import EvidenceChip from "./EvidenceChip";

interface Props {
  readonly drug: Drug;
  readonly route: Route;
  readonly onRemove: (id: string) => void;
}

/**
 * Картын толгой: эмийн нэр, ангилал · хэрэглэх зам, нотолгоо, хасах.
 *
 * Өвчтөний жин/нас толгойноос тунгийн зурвасын гарчиг руу шилжсэн —
 * тоо, түүнийг бодсон жин хоёр нэг дор байх ёстой. Энд харагдах
 * нотолгоо нь ЭМИЙН хамгийн хүчтэй түвшин; идэвхтэй дүрмийнх нь тунгийн
 * хажууд (хоёр өөр байж болно — Figma V3.1 · 05 · 5).
 */
export default function DosageCardHeader({ drug, route, onRemove }: Props) {
  return (
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <CardTitle className="text-xl tracking-tight">{drug.inn}</CardTitle>
          <p className="text-muted-foreground text-sm">
            {drug.innMn} · {CATEGORY_LABELS[drug.category]} · {ROUTE_LABELS[route]}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <EvidenceChip level={drugEvidence(drug)} />
          <div className="print:hidden">
            <RemoveButton label={drug.inn} onRemove={() => onRemove(drug.id)} />
          </div>
        </div>
      </div>
    </CardHeader>
  );
}
