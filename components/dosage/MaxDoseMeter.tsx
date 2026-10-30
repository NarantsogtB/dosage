import { ShieldCheck, TriangleAlert } from "lucide-react";
import type { DosageOutcome } from "@/lib/domain/calculation-result";
import { dailyLimitMg, maxDosePercent } from "@/lib/format/max-dose-percent";
import { maxDoseTone, type MaxDoseTone } from "@/lib/format/max-dose-tone";
import { roundDose } from "@/lib/engine/math/round-dose";
import { Meter } from "@/components/ui/meter";
import { cn } from "@/lib/utils";

const BOX: Record<MaxDoseTone, string> = {
  neutral: "border-border bg-muted/40",
  warning: "border-warning/35 bg-warning-muted text-warning-text",
  destructive: "border-destructive/25 bg-destructive-muted text-destructive",
};

const TITLE: Record<MaxDoseTone, string> = {
  neutral: "Хоногийн дээд тунгийн",
  warning: "Хоногийн дээд тунгийн",
  destructive: "Хоногийн дээд хязгаарт хязгаарлагдсан",
};

/**
 * Тайлбарын мөр. Тасалсан үед НЭГЖИЙГ хоногоор жигдрүүлсэн хязгаарыг
 * хэлнэ (`dailyLimitMg`) — нэг удаагийн тоог «мг/хоног» гэж бичихгүй.
 * Шинэ клиникийн тоо ГАРГААГҮЙ, бүгд engine-ийн гаралтаас.
 */
const detailOf = (outcome: DosageOutcome): string => {
  const limit = roundDose(dailyLimitMg(outcome));
  if (outcome.cappedAtMax) {
    return `Тооцоолсон тун өдөрт ${limit} мг хязгаарт таслагдсан. «Яаж бодсон бэ?»-ээс дэлгэрэнгүйг үзнэ үү.`;
  }
  return `${roundDose(outcome.perDay.maxMg)} / ${limit} мг хоногт`;
};

/**
 * Дээд тунгийн хэмжүүр — Figma "Max-dose meter" (V3 · 02).
 *
 * Өмнөх `MaxDoseIndicator` (хувь) ба `CapAlert` (таслалт) хоёрыг нэгтгэв:
 * хоёул нэг асуултад — «хязгаартаа хэр ойр вэ?» — хариулдаг байсан ч
 * хоёр өөр хэлбэрээр. Одоо нэг хэмжүүр, өнгө нь `maxDoseTone`-оор, хувь
 * нь ҮРГЭЛЖ текстээр.
 */
export default function MaxDoseMeter({
  outcome,
}: {
  readonly outcome: DosageOutcome;
}) {
  const percent = maxDosePercent(outcome);
  if (percent === undefined) return null;
  const tone = maxDoseTone(percent, outcome.cappedAtMax);
  const Icon = tone === "neutral" ? ShieldCheck : TriangleAlert;

  return (
    <div className={cn("space-y-2 rounded-lg border px-4 py-3", BOX[tone])}>
      <div className="flex items-start justify-between gap-3">
        <p className="flex items-start gap-2 text-sm font-semibold">
          <Icon aria-hidden className="mt-0.5 size-4 shrink-0" />
          {TITLE[tone]}
        </p>
        <span className="num text-base font-semibold">{percent}%</span>
      </div>
      <Meter value={percent} tone={tone} aria-label={`${TITLE[tone]} ${percent}%`} />
      <p className="text-xs opacity-90">{detailOf(outcome)}</p>
    </div>
  );
}
