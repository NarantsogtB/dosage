import type { FormulationAmount } from "@/lib/domain/calculation-result";
import { formatAmount } from "@/lib/format/format-amount";

const liquidOf = (
  amounts: readonly FormulationAmount[],
): FormulationAmount | undefined =>
  amounts.find((amount) => amount.formulation.kind === "liquid");

/** Мг-аас мл рүү. Эмч тарианд татах бодит хэмжээ. */
export default function DemoVolume({
  amounts,
}: {
  readonly amounts: readonly FormulationAmount[];
}) {
  const liquid = liquidOf(amounts);
  if (!liquid) return null;
  return (
    <p className="text-muted-foreground mt-2.5 text-sm">
      {liquid.formulation.labelMn} →{" "}
      <span className="num text-foreground font-semibold">
        {formatAmount(liquid)}
      </span>
    </p>
  );
}
