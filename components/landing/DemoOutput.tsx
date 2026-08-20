import type { CalculationResult } from "@/lib/domain/calculation-result";
import { FREQUENCY_SHORT } from "@/lib/format/format-frequency-short";
import { doseParts } from "@/lib/format/dose-parts";
import DoseReadout from "@/components/dosage/DoseReadout";
import { EVIDENCE_TONES } from "@/components/dosage/evidence-tone";
import { cn } from "@/lib/utils";
import DemoSource from "./DemoSource";
import DemoVolume from "./DemoVolume";

/** Жишээ тооцооллын үр дүн. Бүтээгдэхүүн доторх зурвастай ижил хэлбэр. */
export default function DemoOutput({
  result,
}: {
  readonly result: CalculationResult;
}) {
  if (result.type !== "dosage") {
    return (
      <p className="text-muted-foreground mt-4 border-t pt-4 text-sm">
        {result.data.reasonMn}
      </p>
    );
  }

  const outcome = result.data;
  const per = doseParts(outcome.perDose);
  const tone = EVIDENCE_TONES[outcome.rule.evidenceLevel].rule;

  return (
    <div className="relative mt-4 border-t pl-4 pt-4">
      <span
        aria-hidden
        className={cn("absolute bottom-0 left-0 top-4 w-[3px]", tone)}
      />
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <DoseReadout
          value={per.value}
          unit={per.unit}
          className="text-4xl leading-none"
        />
        <span className="num text-muted-foreground text-base font-medium">
          {FREQUENCY_SHORT[outcome.frequency]}
        </span>
      </div>
      <DemoVolume amounts={outcome.amounts} />
      <DemoSource
        sources={outcome.sources}
        level={outcome.rule.evidenceLevel}
      />
    </div>
  );
}
