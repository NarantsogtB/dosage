import type { DosageOutcome } from "@/lib/domain/calculation-result";
import { FREQUENCY_LABELS } from "@/lib/data/labels/frequency-labels";
import { formatDose } from "@/lib/format/format-dose";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CapNotice from "./CapNotice";
import DurationBlock from "./DurationBlock";
import SectionLabel from "./SectionLabel";

/** Нэг удаагийн тун, давтамж, өдрийн нийт тун. */
export default function DoseSummary({
  outcome,
}: {
  readonly outcome: DosageOutcome;
}) {
  return (
    <CardContent className="p-0">
      <div className="px-5 py-3.5">
        <SectionLabel>Нэг удаагийн тун</SectionLabel>
        <p className="mt-1 text-3xl font-bold tracking-tight tabular-nums">
          {formatDose(outcome.perDose)}
        </p>
        <CapNotice capped={outcome.cappedAtMax} />
      </div>

      <Separator />

      <div className="flex items-center justify-between px-5 py-3.5">
        <div>
          <SectionLabel>Давтамж</SectionLabel>
          <p className="mt-1 text-base font-semibold">
            {FREQUENCY_LABELS[outcome.frequency]}
          </p>
        </div>
        <DurationBlock duration={outcome.rule.duration} />
      </div>

      <Separator />

      <div className="px-5 py-3.5">
        <SectionLabel>Өдрийн нийт тун</SectionLabel>
        <p className="mt-1 text-base font-semibold tabular-nums">
          {formatDose(outcome.perDay)}
        </p>
      </div>
    </CardContent>
  );
}
