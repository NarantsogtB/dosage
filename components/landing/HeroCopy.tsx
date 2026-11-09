import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { DRUG_COUNT, SOURCE_COUNT, VERIFIED_COUNT } from "./landing-stats";

const PILL = "focus-visible:ring-ring inline-flex items-center justify-center gap-2 rounded-full px-[22px] py-4 text-base/5 font-semibold outline-none focus-visible:ring-[3px]";

const STATS = [
  { value: DRUG_COUNT, label: "эм" },
  { value: VERIFIED_COUNT, label: "эх сурвалжтай" },
  { value: SOURCE_COUNT, label: "эх сурвалж" },
] as const;

/**
 * Гарчиг нь бүтээгдэхүүнийг ЗАРАХГҮЙ, юу болохыг хэлнэ — гурван алхам.
 * Тоо бүр `landing-stats`-аас (гараар бичихгүй). Figma 154:1859 / 156:1911.
 */
export default function HeroCopy() {
  return (
    <div className="flex min-w-0 flex-col gap-5 lg:flex-1 lg:gap-6">
      <h1 className="text-[40px]/[46px] font-bold lg:text-[64px]/[70px]">
        Жин оруулна.
        <br />
        Тунг тооцоолно.
        <br />
        <span className="text-primary">Эх сурвалжтай.</span>
      </h1>
      <p className="text-muted-foreground text-base/5 lg:text-[19px]/6">
        Монголын эмч, эмнэлгийн мэргэжилтэнд зориулсан хүүхдийн эмийн тунгийн тооцоолуур. Монгол хэл дээр, үнэгүй.
      </p>
      <div className="flex flex-col gap-2.5 lg:flex-row">
        <Link href="/dose" className={`${PILL} bg-foreground text-background`}>
          Тун тооцоолох <ChevronRight aria-hidden className="size-[18px]" />
        </Link>
        <Link href="/burns" className={`${PILL} border border-border bg-card dark:border-white/18 dark:bg-white/10`}>
          Түлэгдэлтийн шингэн
        </Link>
      </div>
      <dl className="flex gap-2">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-1 flex-col-reverse gap-0.5 rounded-[18px] bg-card dark:bg-white/7 px-3 py-2.5 lg:w-[140px] lg:flex-none lg:px-[18px]">
            <dt className="text-muted-foreground text-xs/[15px]">{stat.label}</dt>
            <dd className="num text-[22px]/7 font-bold">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
