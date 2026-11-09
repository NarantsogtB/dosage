import type { FormulationAmount } from "@/lib/domain/calculation-result";
import { formatAmount } from "@/lib/format/format-amount";

const liquidOf = (amounts: readonly FormulationAmount[]): FormulationAmount | undefined =>
  amounts.find((amount) => amount.formulation.kind === "liquid");

/** Мг-аас мл рүү — эмч тарианд татах бодит хэмжээ: «= 22.4 мл · 125 мг/5 мл уусмал». */
export default function DemoVolume({ amounts }: { readonly amounts: readonly FormulationAmount[] }) {
  const liquid = liquidOf(amounts);
  if (!liquid) return null;
  return (
    <p className="flex flex-wrap items-baseline gap-1.5">
      <span className="num text-primary text-[28px]/9 font-bold">= {formatAmount(liquid)}</span>
      <span className="text-muted-foreground text-[13px]/[17px]">· {liquid.formulation.labelMn}</span>
    </p>
  );
}
