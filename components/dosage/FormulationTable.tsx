"use client";

import { useId } from "react";
import { CircleCheck, Pill } from "lucide-react";
import type { FormulationAmount } from "@/lib/domain/calculation-result";
import { formatAmount } from "@/lib/format/format-amount";
import { amountKey, reconstitutionText } from "@/lib/format/reconstitution";
import { cn } from "@/lib/utils";

interface Props {
  readonly amounts: readonly FormulationAmount[];
  readonly selectedId?: string;
  readonly onSelect: (formulationId: string) => void;
}

interface RowProps {
  readonly amount: FormulationAmount;
  readonly name: string;
  readonly selected: boolean;
  readonly onSelect: (formulationId: string) => void;
}

const SELECTED = { row: "bg-primary/10", tile: "bg-tile text-tile-foreground", amount: "text-primary" };
const IDLE = { row: "hover:bg-accent", tile: "bg-muted text-muted-foreground", amount: "" };

/** Нунтаг бол найруулгын мөр (Шат 6). */
const Reconstituted = ({ amount }: { readonly amount: FormulationAmount }) => {
  const text = reconstitutionText(amount);
  return text ? <span className="text-muted-foreground block text-xs">{text}</span> : null;
};

const Row = ({ amount, name, selected, onSelect }: RowProps) => {
  const { row, tile, amount: tone } = selected ? SELECTED : IDLE;
  return (
    <label
      className={cn(
        "has-[:focus-visible]:ring-ring/50 flex min-h-14 cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-sm transition-colors has-[:focus-visible]:ring-[3px]",
        row,
      )}
    >
      <input
        type="radio"
        name={name}
        className="sr-only"
        checked={selected}
        onChange={() => onSelect(amountKey(amount))}
      />
      <span className={cn("grid size-10 shrink-0 place-items-center rounded-lg", tile)}>
        <Pill aria-hidden className="size-4.5" />
      </span>
      <span className="flex-1 font-medium">
        {amount.formulation.labelMn}
        <Reconstituted amount={amount} />
      </span>
      <span className={cn("num text-right font-semibold", tone)}>{formatAmount(amount)}</span>
      {selected ? <CircleCheck aria-label="Сонгосон" className="text-primary size-4.5 shrink-0" /> : null}
    </label>
  );
};

/**
 * Хэлбэр тус бүрд нэг удаад өгөх хэмжээ — Figma "Formulation table"
 * (V3.1 · 02).
 *
 * БҮХ мөр үргэлж харагдана: эмчийн гарт байгаа бэлдмэл юу болохыг бид
 * мэдэхгүй. Сонгосон мөр нь тунгийн зурвасын «= … мл» мөрийг удирдана.
 * Native radio — сум товчоор шилжинэ, дэлгэц уншигч «3-аас 1» гэж уншина.
 * Сонголт зөвхөн ХАРАГДАЦАД нөлөөлнө, тооцоолсон тоонд хүрэхгүй.
 */
export default function FormulationTable({ amounts, selectedId, onSelect }: Props) {
  const name = useId();
  if (amounts.length === 0) return null;
  return (
    <fieldset className="px-4">
      <legend className="pb-2 text-lg font-bold">
        Хэлбэрүүд <span className="text-muted-foreground text-xs font-medium">нэг удаа</span>
      </legend>
      <div className="bg-muted/50 space-y-0.5 rounded-2xl p-1.5">
        {amounts.map((amount) => (
          <Row
            key={amountKey(amount)}
            amount={amount}
            name={name}
            selected={amountKey(amount) === selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </fieldset>
  );
}
