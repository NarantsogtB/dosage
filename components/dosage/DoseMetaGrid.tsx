import type { DosageOutcome } from "@/lib/domain/calculation-result";
import { FREQUENCY_LABELS } from "@/lib/data/labels/frequency-labels";
import DurationValue from "./DurationValue";
import SectionLabel from "./SectionLabel";
import { formatDose } from "@/lib/format/format-dose";
import { showsDailyTotal } from "@/lib/format/daily-total";

/**
 * Гурван баганат мета мөр — Figma "Dose readout" (node 14:76) "Meta".
 *
 * Давтамж, хугацаа, өдрийн нийтийг НЭГ мөрөнд харуулна. Өмнө нь эдгээр
 * гурав өөр газар, өөр жинтэй байсан (Давтамж/Хугацаа энд, Өдрийн
 * нийт SectionLabel-ийн доторх бяцхан текст болж уусчихсан). Одоо
 * гурвуулаа тэнцүү жинтэй, нэг харцаар уншигдана.
 */
export default function DoseMetaGrid({
  outcome,
}: {
  readonly outcome: DosageOutcome;
}) {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-3">
      <div>
        <SectionLabel>Давтамж</SectionLabel>
        <p className="mt-0.5 text-sm font-medium">
          {FREQUENCY_LABELS[outcome.frequency]}
        </p>
      </div>
      <DurationValue duration={outcome.rule.duration} />
      {showsDailyTotal(outcome.frequency) ? (
        <div>
          <SectionLabel>Өдрийн нийт</SectionLabel>
          <p className="num mt-0.5 text-sm font-medium">
            {formatDose(outcome.perDay, outcome.doseUnit)}
          </p>
        </div>
      ) : null}
    </div>
  );
}
