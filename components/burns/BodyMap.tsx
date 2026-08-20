"use client";

import { useState } from "react";
import type { AgeBand, BodyRegionId, BurnDepth } from "@/lib/domain/body-region";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import BodyDiagram from "./BodyDiagram";
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
export default function BodyMap(props: Props) {
  const [view, setView] = useState<View>("front");

  return (
    <div className="space-y-3">
      <ToggleGroup
        type="single"
        value={view}
        onValueChange={(next) => isView(next) && setView(next)}
        className="justify-center"
      >
        <ToggleGroupItem value="front">Урд тал</ToggleGroupItem>
        <ToggleGroupItem value="back">Ар тал</ToggleGroupItem>
      </ToggleGroup>
      <BodyDiagram
        view={view}
        band={props.band}
        selections={props.selections}
        onToggle={props.onToggle}
      />
      <SelectedRegionsList
        band={props.band}
        selections={props.selections}
        onToggle={props.onToggle}
      />
    </div>
  );
}
