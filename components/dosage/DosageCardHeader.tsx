import type { Drug } from "@/lib/domain/drug";
import type { Patient } from "@/lib/domain/patient";
import type { Route } from "@/lib/domain/route";
import { CATEGORY_LABELS } from "@/lib/data/labels/category-labels";
import { ROUTE_LABELS } from "@/lib/data/labels/route-labels";
import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle } from "@/components/ui/card";
import RemoveButton from "@/components/summary/RemoveButton";
import AgeDisplay from "./AgeDisplay";

interface Props {
  readonly drug: Drug;
  readonly route: Route;
  readonly patient: Patient;
  readonly onRemove: (id: string) => void;
}

/** Картын толгой: эмийн нэр, ангилал, өвчтөн, хасах товч. */
export default function DosageCardHeader({
  drug,
  route,
  patient,
  onRemove,
}: Props) {
  return (
    <CardHeader className="border-primary bg-primary/5 border-l-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1.5">
          <CardTitle className="text-xl">{drug.inn}</CardTitle>
          <p className="text-muted-foreground text-sm">{drug.innMn}</p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="soft">{CATEGORY_LABELS[drug.category]}</Badge>
            <span className="text-muted-foreground text-xs">
              {ROUTE_LABELS[route]}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 items-start gap-1">
          <div className="text-muted-foreground text-right text-xs">
            <div className="text-foreground font-medium">
              {patient.weightKg} кг
            </div>
            <AgeDisplay ageMonths={patient.ageMonths} />
          </div>
          <div className="print:hidden">
            <RemoveButton
              label={drug.inn}
              onRemove={() => onRemove(drug.id)}
            />
          </div>
        </div>
      </div>
    </CardHeader>
  );
}
