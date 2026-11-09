import type { CalculationResult } from "@/lib/domain/calculation-result";
import { FREQUENCY_SHORT } from "@/lib/format/format-frequency-short";
import { doseParts } from "@/lib/format/dose-parts";
import DemoSource from "./DemoSource";
import DemoVolume from "./DemoVolume";

/** Жишээ тооцооллын үр дүн (Figma demo): 56 Bold мг · давтамж · teal мл · эх сурвалж. */
export default function DemoOutput({ result }: { readonly result: CalculationResult }) {
  if (result.type !== "dosage") {
    return <p className="text-muted-foreground text-sm/[18px]">{result.data.reasonMn}</p>;
  }
  const outcome = result.data;
  const per = doseParts(outcome.perDose, outcome.doseUnit);
  return (
    <>
      <p className="flex flex-wrap items-baseline gap-2">
        <span className="num text-[56px]/[71px] font-bold">{per.value}</span>
        <span className="text-muted-foreground text-[22px]/7 font-semibold">{per.unit}</span>
        <span className="num text-muted-foreground text-base/5 font-medium">· {FREQUENCY_SHORT[outcome.frequency]}</span>
      </p>
      <DemoVolume amounts={outcome.amounts} />
      <DemoSource sources={outcome.sources} level={outcome.rule.evidenceLevel} />
    </>
  );
}
