import type { ReactNode } from "react";
import type { EmergencyDrugRow, EmergencyItemRow } from "@/lib/emergency/emergency-rows";
import { ROUTE_LABELS } from "@/lib/data/labels/route-labels";
import { doseParts } from "@/lib/format/dose-parts";
import { formatAmount } from "@/lib/format/format-amount";
import EvidenceChip from "@/components/v4/EvidenceChip";

const ROW = "flex items-center gap-3 border-b py-3.5 last:border-b-0";

/** Баруун талын тоо: 28 Bold + нэгж 14 muted (Figma 163:2232). */
const Value = ({ value, unit }: { readonly value: string; readonly unit: string }) => (
  <p className="flex items-baseline gap-1">
    <span className="num text-[28px]/9 font-bold">{value}</span>
    <span className="text-muted-foreground text-sm/[18px] font-semibold">{unit}</span>
  </p>
);

const Amount = ({ row }: { readonly row: EmergencyDrugRow }) =>
  row.amount ? (
    <>
      <p className="num text-primary text-base/5 font-bold">{formatAmount(row.amount)}</p>
      <p className="text-muted-foreground text-[11px]/[14px]">{row.amount.formulation.labelMn}</p>
    </>
  ) : null;

const DrugRow = ({ row }: { readonly row: EmergencyDrugRow }) => {
  const dose = doseParts(row.outcome.perDose, row.outcome.doseUnit);
  return (
    <li className={ROW}>
      <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
        <p className="flex items-center gap-1.5 text-base/5 font-semibold">{row.drug.inn} <EvidenceChip drug={row.drug} /></p>
        <p className="text-muted-foreground text-xs/[15px]">{row.indicationMn} · {ROUTE_LABELS[row.outcome.rule.route]}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-0.5 text-right">
        <Value value={dose.value} unit={dose.unit} />
        {dose.alternate ? <p className="num text-muted-foreground text-xs/[15px]">({dose.alternate})</p> : null}
        <Amount row={row} />
      </div>
    </li>
  );
};

const ItemRow = ({ row }: { readonly row: EmergencyItemRow }) => (
  <li className={ROW}>
    <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
      <p className="text-base/5 font-semibold">{row.item.labelMn}</p>
      <p className="text-muted-foreground text-xs/[15px]">{row.value.expressionMn}</p>
    </div>
    <Value value={String(row.value.value)} unit={row.value.unitMn} />
  </li>
);

/** «ЭМ», «ШИНГЭН» — 12 SemiBold teal, том үсэг. */
const Group = ({ label, children }: { readonly label: string; readonly children: ReactNode }) => (
  <section aria-label={label} className="flex flex-col gap-4 lg:gap-2.5">
    <h2 className="text-primary text-xs/[15px] font-semibold tracking-[0.06em] uppercase">{label}</h2>
    <ul className="bg-card rounded-3xl px-[18px]">{children}</ul>
  </section>
);

export const DrugGroup = ({ rows }: { readonly rows: readonly EmergencyDrugRow[] }) =>
  rows.length === 0 ? null : <Group label="Эм">{rows.map((row) => <DrugRow key={row.key} row={row} />)}</Group>;

/** Одоогийн бүх `EMERGENCY_SHOWN_ITEMS` нь шингэний болюс (Figma «Шингэн»). Өөр төрөл нэмбэл шошгыг шинэчил. */
export const ItemGroup = ({ rows }: { readonly rows: readonly EmergencyItemRow[] }) =>
  rows.length === 0 ? null : <Group label="Шингэн">{rows.map((row) => <ItemRow key={row.item.id} row={row} />)}</Group>;

/** Баталгаажсан мөр нэг ч байхгүй үед. */
export const NoRows = () => (
  <p className="bg-card text-muted-foreground rounded-3xl px-[18px] py-6 text-center text-sm/[18px]">
    Баталгаажсан мөр алга — эх сурвалж, эмчийн баталгаа хүлээж байна.
  </p>
);
