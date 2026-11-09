"use client";

import { useState } from "react";
import type { AgeBand, BodyRegionId, BurnDepth } from "@/lib/domain/body-region";
import { cn } from "@/lib/utils";
import BodyDiagram from "./BodyDiagram";
import DepthLegend from "./DepthLegend";
import type { SelectionMap } from "./use-burn-selections";

export interface BodyMapProps {
  readonly band: AgeBand;
  readonly selections: SelectionMap;
  readonly onToggle: (region: BodyRegionId, depth?: BurnDepth) => void;
  readonly onClear: () => void;
}

type View = "front" | "back";

const VIEWS: readonly { readonly id: View; readonly label: string }[] = [
  { id: "front", label: "Урд тал" },
  { id: "back", label: "Ар тал" },
];

/** Баруун/зүүн — ӨВЧТӨНИЙ тал. Урд талаас харахад өвчтөний баруун нь зүүн талд. */
const SIDES: Record<View, readonly [string, string]> = {
  front: ["Баруун (өвчтөний)", "Зүүн"],
  back: ["Зүүн", "Баруун (өвчтөний)"],
};

const Header = ({ onClear, desk }: { readonly onClear: () => void; readonly desk?: boolean }) => (
  <div className="flex items-center gap-2">
    <h2 className={cn("flex-1 font-bold", desk ? "text-xl/[26px]" : "text-lg/[23px]")}>Түлэгдсэн бүс</h2>
    <button
      type="button"
      onClick={onClear}
      className={cn("bg-muted focus-visible:ring-ring relative rounded-full font-medium outline-none after:absolute after:-inset-y-2 after:inset-x-0 focus-visible:ring-[3px]", desk ? "px-3.5 py-2 text-sm/[18px]" : "px-3 py-1.5 text-[13px]/[17px]")}
    >
      Цэвэрлэх
    </button>
  </div>
);

const Sides = ({ view, className }: { readonly view: View; readonly className?: string }) => (
  <p aria-hidden className={cn("text-muted-foreground flex justify-between text-[11px]/[14px]", className)}>
    <span>{SIDES[view][0]}</span>
    <span>{SIDES[view][1]}</span>
  </p>
);

const Toggle = ({ view, onView }: { readonly view: View; readonly onView: (view: View) => void }) => (
  <div role="group" aria-label="Биеийн тал" className="bg-muted flex gap-1 rounded-full p-1">
    {VIEWS.map((item) => (
      <button
        key={item.id}
        type="button"
        aria-pressed={item.id === view}
        onClick={() => onView(item.id)}
        className={cn("focus-visible:ring-ring h-10 flex-1 rounded-full text-sm/[18px] outline-none focus-visible:ring-[3px]", item.id === view ? "bg-foreground text-background font-semibold" : "font-medium")}
      >
        {item.label}
      </button>
    ))}
  </div>
);

/**
 * Mobile биеийн зураг (Figma 138:1579): карт r 24 p 16/18 g 14 — гарчиг, Урд/Ар, диаграм 480,
 * тал, легенд, тайлбар. Сонгосон бүс бүр доорх `RegionList`-д текстээр давтагдана.
 */
export function BodyMapMobile(props: BodyMapProps) {
  const [view, setView] = useState<View>("front");
  return (
    <section aria-label="Түлэгдсэн бүс" className="bg-card flex flex-col gap-3.5 rounded-3xl px-[18px] py-4">
      <Header onClear={props.onClear} />
      <Toggle view={view} onView={setView} />
      <BodyDiagram view={view} band={props.band} selections={props.selections} onToggle={props.onToggle} className="mx-auto h-[480px] w-auto" />
      <Sides view={view} />
      <DepthLegend />
      <p className="text-muted-foreground text-xs/[15px]">Бүс дээр дарах бүрд: II → III → I → хасах. Сонгосон бүс доорх жагсаалтад текстээр давтагдана.</p>
    </section>
  );
}

const DeskView = ({ view, ...props }: BodyMapProps & { readonly view: View }) => (
  <div className="bg-card flex flex-1 flex-col items-center gap-2 rounded-[20px] px-2 py-3">
    <p className="text-sm/[18px] font-semibold">{VIEWS.find((item) => item.id === view)?.label}</p>
    <BodyDiagram view={view} band={props.band} selections={props.selections} onToggle={props.onToggle} className="h-[410px] w-[200px]" />
    <Sides view={view} className="w-full px-2" />
  </div>
);

/** Desktop (Figma 140:1675): bg-sheet карт, хоёр тал зэрэг. */
export function BodyMapDesk(props: BodyMapProps) {
  return (
    <section aria-label="Түлэгдсэн бүс" className="bg-sheet flex flex-col gap-3.5 rounded-3xl p-[18px]">
      <Header onClear={props.onClear} desk />
      <div className="flex gap-3">
        <DeskView view="front" {...props} />
        <DeskView view="back" {...props} />
      </div>
      <DepthLegend className="gap-x-4" />
      <p className="text-muted-foreground text-xs/[15px]">Хоёр талыг зэрэг харуулна. Дарах бүрд: II → III → I → хасах.</p>
    </section>
  );
}
