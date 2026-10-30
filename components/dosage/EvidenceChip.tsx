"use client";

import type { EvidenceLevel } from "@/lib/domain/source";
import { EVIDENCE_LABELS } from "@/lib/domain/source";
import { EVIDENCE_ORDER } from "@/lib/engine/rule/drug-evidence";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { EVIDENCE_LETTERS, EVIDENCE_TONES } from "./evidence-tone";

const Dot = ({ level }: { readonly level: EvidenceLevel }) => (
  <span
    aria-hidden
    className={cn("size-2 shrink-0 rounded-full", EVIDENCE_TONES[level].dot)}
  />
);

const LegendRow = ({ level, current }: { readonly level: EvidenceLevel; readonly current: boolean }) => (
  <li
    className={cn(
      "flex items-center gap-2 rounded-sm px-1.5 py-1 text-xs",
      current && "bg-accent text-accent-foreground font-medium",
    )}
  >
    <Dot level={level} />
    <span className="num w-3">{EVIDENCE_LETTERS[level]}</span>
    {EVIDENCE_LABELS[level]}
  </li>
);

/**
 * Нотолгооны чип + тайлбар popover — Figma "Evidence chip" + "Evidence
 * popover" (V3 · 02).
 *
 * Өмнө нь тайлбар `title`-д эсвэл жагсаалтын доорх `<details>`-д байсан.
 * `title` хүрэлцэх дэлгэц дээр ХЭЗЭЭ Ч гардаггүй — гар утас үндсэн
 * төхөөрөмж. Одоо чип өөрөө товч: дарахад бүх түвшний тайлбар,
 * одоогийнх нь тодорсон.
 *
 * Чип 24px боловч `after:` псевдо элементээр хүрэх талбайг 44px болгосон.
 */
export default function EvidenceChip({ level }: { readonly level: EvidenceLevel }) {
  return (
    <Popover>
      <PopoverTrigger
        aria-label={`Нотолгоо: ${EVIDENCE_LABELS[level]}. Тайлбар`}
        className="bg-card hover:bg-accent focus-visible:ring-ring/50 relative inline-flex h-6 shrink-0 items-center gap-1.5 rounded-full border px-2 text-xs font-medium outline-none after:absolute after:-inset-2.5 focus-visible:ring-[3px] print:hidden"
      >
        <Dot level={level} />
        <span className="tracking-[0.04em]">{EVIDENCE_LETTERS[level]}</span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 space-y-2 p-3">
        <p className="text-sm font-semibold">{EVIDENCE_LABELS[level]}</p>
        <p className="text-muted-foreground text-xs">
          Эх сурвалжийн чанар — эмнэлзүйн хяналт БИШ.
        </p>
        <ul className="space-y-0.5">
          {EVIDENCE_ORDER.map((item) => (
            <LegendRow key={item} level={item} current={item === level} />
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
