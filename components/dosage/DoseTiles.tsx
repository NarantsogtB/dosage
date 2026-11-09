import { BarChart3, Clock, Repeat, type LucideIcon } from "lucide-react";
import type { DosageOutcome } from "@/lib/domain/calculation-result";
import type { Duration } from "@/lib/domain/dosing-rule";
import { showsDailyTotal } from "@/lib/format/daily-total";
import { formatDose } from "@/lib/format/format-dose";
import { FREQUENCY_SHORT } from "@/lib/format/format-frequency-short";

const durationText = (duration?: Duration): string => {
  if (!duration) return "—";
  const same = duration.minDays === duration.maxDays;
  return `${same ? duration.maxDays : `${duration.minDays}–${duration.maxDays}`} хоног`;
};

const dailyText = (outcome: DosageOutcome): string =>
  showsDailyTotal(outcome.frequency) ? formatDose(outcome.perDay, outcome.doseUnit) : "—";

interface TileProps {
  readonly icon: LucideIcon;
  readonly value: string;
  readonly caption: string;
}

const Tile = ({ icon: Icon, value, caption }: TileProps) => (
  <div className="bg-muted/50 min-w-0 rounded-2xl p-3">
    <Icon aria-hidden className="text-primary size-4" />
    <p className="num mt-2 text-[15px] leading-5 font-bold">{value}</p>
    <p className="text-muted-foreground text-xs">{caption}</p>
  </div>
);

/**
 * Давтамж · хугацаа · өдрийн нийт — гурван тэнцүү tile (Figma 123:100).
 * Утга бүр өгөгдлөөс: давтамжийн интервалыг шинээр тооцоолохгүй.
 */
export default function DoseTiles({ outcome }: { readonly outcome: DosageOutcome }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Tile icon={Repeat} value={FREQUENCY_SHORT[outcome.frequency]} caption="давтамж" />
      <Tile icon={Clock} value={durationText(outcome.rule.duration)} caption="хугацаа" />
      <Tile icon={BarChart3} value={dailyText(outcome)} caption="өдрийн нийт" />
    </div>
  );
}
