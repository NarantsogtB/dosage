import type { Duration } from "@/lib/domain/dosing-rule";
import SectionLabel from "./SectionLabel";

const text = (duration: Duration): string =>
  duration.minDays === duration.maxDays
    ? `${duration.maxDays} хоног`
    : `${duration.minDays}–${duration.maxDays} хоног`;

/** Эмчилгээний үргэлжлэх хугацаа. Заагаагүй бол харагдахгүй. */
export default function DurationBlock({
  duration,
}: {
  readonly duration?: Duration;
}) {
  if (!duration) return null;
  return (
    <div className="text-right">
      <SectionLabel className="justify-end">Курс</SectionLabel>
      <p className="mt-1 text-base font-semibold">{text(duration)}</p>
    </div>
  );
}
