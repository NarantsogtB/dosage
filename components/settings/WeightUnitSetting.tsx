"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { WeightUnit } from "@/components/calculator/patient-form";
import { setPrefs, usePrefs } from "./prefs-store";

const ITEM = "data-[state=on]:bg-tile data-[state=on]:text-tile-foreground h-9 min-w-11 rounded-full!";

/** Шинэ өвчтөн нэмэхэд жин аль нэгжээр эхлэхийг сонгоно (нярайд «г»). */
export default function WeightUnitSetting() {
  const { weightUnit } = usePrefs();
  return (
    <ToggleGroup
      type="single"
      value={weightUnit}
      aria-label="Жингийн нэгж"
      className="bg-muted rounded-full p-0.5"
      onValueChange={(next) => next && setPrefs({ weightUnit: next as WeightUnit })}
    >
      <ToggleGroupItem value="kg" className={ITEM}>кг</ToggleGroupItem>
      <ToggleGroupItem value="g" className={ITEM}>г</ToggleGroupItem>
    </ToggleGroup>
  );
}
