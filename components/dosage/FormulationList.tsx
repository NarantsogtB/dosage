import type { FormulationAmount } from "@/lib/domain/calculation-result";
import { formatAmount } from "@/lib/format/format-amount";
import { Separator } from "@/components/ui/separator";
import SectionLabel from "./SectionLabel";

interface Props {
  readonly amounts: readonly FormulationAmount[];
}

/** Бэлдмэл тус бүрд нэг удаад өгөх хэмжээ. */
export default function FormulationList({ amounts }: Props) {
  if (amounts.length === 0) return null;
  return (
    <>
      <Separator />
      <div className="bg-muted/40 px-5 py-4">
        <SectionLabel>Хэлбэр тус бүрд (нэг удаа)</SectionLabel>
        <dl className="mt-3 space-y-2">
          {amounts.map((amount) => (
            <div
              key={amount.formulation.id}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <dt className="text-muted-foreground">
                {amount.formulation.labelMn}
              </dt>
              <dd className="num text-right font-semibold">
                {formatAmount(amount)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
