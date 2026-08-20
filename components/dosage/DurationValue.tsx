import type { Duration } from "@/lib/domain/dosing-rule";
import SectionLabel from "./SectionLabel";

const text = (duration: Duration): string =>
  duration.minDays === duration.maxDays
    ? `${duration.maxDays}`
    : `${duration.minDays}–${duration.maxDays}`;

/** Эмчилгээний үргэлжлэх хугацаа. Заагаагүй бол багана эзэлэхгүй. */
export default function DurationValue({
  duration,
}: {
  readonly duration?: Duration;
}) {
  if (!duration) return null;
  return (
    <div>
      <SectionLabel>Хугацаа</SectionLabel>
      <p className="mt-0.5 text-sm font-medium">
        <span className="num">{text(duration)}</span> хоног
      </p>
    </div>
  );
}
