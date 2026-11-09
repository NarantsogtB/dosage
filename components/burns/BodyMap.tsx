"use client";

import { useState } from "react";
import type { AgeBand, BodyRegionId, BurnDepth } from "@/lib/domain/body-region";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import BodyDiagram from "./BodyDiagram";
import DepthLegend from "./DepthLegend";
import SelectedRegionsList from "./SelectedRegionsList";
import type { SelectionMap } from "./use-burn-selections";

interface Props {
  readonly band: AgeBand;
  readonly selections: SelectionMap;
  readonly onToggle: (region: BodyRegionId, depth?: BurnDepth) => void;
}

type View = "front" | "back";

const isView = (value: string): value is View => value === "front" || value === "back";

/**
 * Биеийн бүсийн сонголт — Lund-Browder-ийн диаграмаар.
 *
 * Өмнө нь энгийн жагсаалт байсан: диаграм дээр буруу товших эрсдэлээс
 * сэргийлэх зорилготой байв (буруу бүс → буруу БНГТ% → буруу шингэн).
 * Одоо диаграм дээр шууд товшдог болсон ч энэ эрсдэлийг арилгаагүй,
 * зөвхөн ШИЛЖҮҮЛСЭН: сонгосон бүс бүр доор `SelectedRegionsList`-д
 * ТЕКСТЭЭР шууд баталгаажина — эмч нэг харцаар шалгаж, буруу бол тэндээс
 * шууд хасах боломжтой.
 */
const SIDES: Record<View, readonly [string, string]> = {
  front: ["Баруун", "Зүүн"],
  back: ["Зүүн", "Баруун"],
};

const SideLabels = ({ view }: { readonly view: View }) => (
  <p className="text-muted-foreground mx-auto flex max-w-[240px] justify-between text-xs">
    <span>{SIDES[view][0]}</span>
    <span>{SIDES[view][1]}</span>
  </p>
);

const Side = ({ view, ...rest }: Props & { readonly view: View }) => (
  <div className="space-y-1">
    <BodyDiagram view={view} {...rest} />
    <SideLabels view={view} />
  </div>
);

/**
 * Биеийн бүсийн сонголт — Lund-Browder-ийн диаграмаар (Figma V4: хүн шиг дүрс).
 *
 * Диаграм дээр буруу товших эрсдэлтэй (жижиг бүс, гар утас) — сонгосон бүс бүр
 * доор `SelectedRegionsList`-д ТЕКСТЭЭР шууд баталгаажина, тэндээс хасч болно.
 * Mobile-д Урд/Ар сэлгэнэ; ≥lg-д хоёр тал зэрэг (Figma 140:1675).
 */
export default function BodyMap(props: Props) {
  const [view, setView] = useState<View>("front");

  return (
    <div className="space-y-3">
      <div className="space-y-3 lg:hidden">
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(next) => isView(next) && setView(next)}
          className="bg-muted mx-auto rounded-full p-0.5"
        >
          <ToggleGroupItem value="front" className="h-9 rounded-full! px-4">Урд тал</ToggleGroupItem>
          <ToggleGroupItem value="back" className="h-9 rounded-full! px-4">Ар тал</ToggleGroupItem>
        </ToggleGroup>
        <Side view={view} {...props} />
      </div>
      <div className="hidden gap-4 lg:grid lg:grid-cols-2">
        <Side view="front" {...props} />
        <Side view="back" {...props} />
      </div>
      <DepthLegend />
      <SelectedRegionsList band={props.band} selections={props.selections} onToggle={props.onToggle} />
    </div>
  );
}
