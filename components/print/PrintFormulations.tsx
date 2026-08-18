import type { FormulationAmount } from "@/lib/domain/calculation-result";
import { formatAmount } from "@/lib/format/format-amount";

interface Props {
  readonly amounts: readonly FormulationAmount[];
}

/** Бэлдмэл тус бүрийн хэмжээ, хэвлэх хувилбар. */
export default function PrintFormulations({ amounts }: Props) {
  if (amounts.length === 0) return null;
  return (
    <ul className="mt-1 space-y-0.5 text-xs text-slate-600">
      {amounts.map((amount) => (
        <li key={amount.formulation.id}>
          {amount.formulation.labelMn}: <strong>{formatAmount(amount)}</strong>
        </li>
      ))}
    </ul>
  );
}
