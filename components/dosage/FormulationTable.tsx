"use client";

import { useId } from "react";
import { Circle, CircleCheck } from "lucide-react";
import type { FormulationAmount } from "@/lib/domain/calculation-result";
import { formatAmount } from "@/lib/format/format-amount";
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

const SELECTED = { Icon: CircleCheck, row: "bg-primary/10 text-primary", icon: "" };
const IDLE = { Icon: Circle, row: "hover:bg-accent", icon: "text-muted-foreground/60" };

const Row = ({ amount, name, selected, onSelect }: RowProps) => {
  const { Icon, row, icon } = selected ? SELECTED : IDLE;
  return (
    <label
      className={cn(
        "has-[:focus-visible]:ring-ring/50 flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors has-[:focus-visible]:ring-[3px]",
        row,
      )}
    >
      <input
        type="radio"
        name={name}
        className="sr-only"
        checked={selected}
        onChange={() => onSelect(amount.formulation.id)}
      />
      <Icon aria-hidden className={cn("size-4.5 shrink-0", icon)} />
      <span className="flex-1">{amount.formulation.labelMn}</span>
      <span className="num text-right font-semibold">{formatAmount(amount)}</span>
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
    <fieldset className="px-5 pb-3">
      <legend className="text-muted-foreground pb-2 text-xs font-semibold tracking-widest uppercase">
        Хэлбэр тус бүрд (нэг удаа)
      </legend>
      <div className="space-y-0.5">
        {amounts.map((amount) => (
          <Row
            key={amount.formulation.id}
            amount={amount}
            name={name}
            selected={amount.formulation.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </fieldset>
  );
}
