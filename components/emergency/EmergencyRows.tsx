import type { EmergencyDrugRow, EmergencyItemRow } from "@/lib/emergency/emergency-rows";
import { ROUTE_LABELS } from "@/lib/data/labels/route-labels";
import { formatAmount } from "@/lib/format/format-amount";
import { formatDose } from "@/lib/format/format-dose";
import EvidenceDot from "@/components/dosage/EvidenceDot";

const DrugRow = ({ row }: { readonly row: EmergencyDrugRow }) => (
  <li className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b py-3 last:border-b-0">
    <div className="min-w-0 flex-1">
      <p className="font-semibold">
        {row.drug.inn} <span className="text-muted-foreground text-sm font-normal">· {row.indicationMn}</span>
      </p>
      <p className="text-muted-foreground text-xs">{ROUTE_LABELS[row.outcome.rule.route]}</p>
    </div>
    <p className="num text-2xl font-bold">{formatDose(row.outcome.perDose, row.outcome.doseUnit)}</p>
    {row.amount ? (
      <p className="num text-primary w-full text-right text-lg font-semibold sm:w-auto">
        {formatAmount(row.amount)} <span className="text-muted-foreground text-xs">({row.amount.formulation.labelMn})</span>
      </p>
    ) : null}
    <EvidenceDot drug={row.drug} />
  </li>
);

const ItemRow = ({ row }: { readonly row: EmergencyItemRow }) => (
  <li className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b py-3 last:border-b-0">
    <div className="min-w-0 flex-1">
      <p className="font-semibold">{row.item.labelMn}</p>
      <p className="text-muted-foreground text-xs">{row.value.expressionMn}</p>
    </div>
    <p className="num text-2xl font-bold">
      {row.value.value} {row.value.unitMn}
    </p>
  </li>
);

interface Props {
  readonly drugRows: readonly EmergencyDrugRow[];
  readonly itemRows: readonly EmergencyItemRow[];
}

/** Нэг жингийн бүх мөр — том тоо, animation-гүй (Шат 7). */
export default function EmergencyRows({ drugRows, itemRows }: Props) {
  if (drugRows.length + itemRows.length === 0) {
    return (
      <p className="text-muted-foreground rounded-xl border border-dashed p-8 text-center text-sm">
        Баталгаажсан мөр алга — эх сурвалж, эмчийн баталгаа хүлээж байна.
      </p>
    );
  }
  return (
    <ul className="bg-card rounded-xl border px-5">
      {drugRows.map((row) => (
        <DrugRow key={row.key} row={row} />
      ))}
      {itemRows.map((row) => (
        <ItemRow key={row.item.id} row={row} />
      ))}
    </ul>
  );
}
