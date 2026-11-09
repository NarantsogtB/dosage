"use client";

import type { Drug } from "@/lib/domain/drug";
import type { Patient } from "@/lib/domain/patient";
import {
  hasIndicationChoice,
  listIndications,
} from "@/lib/engine/rule/list-indications";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Props {
  readonly drug: Drug;
  readonly patient: Patient;
  readonly selected?: string;
  readonly onSelect: (drugId: string, code?: string) => void;
}

/** Ерөнхий заалт кодгүй — toggle-ийн утга хоосон байж болохгүй. */
const GENERAL = "general";

const ITEM =
  "data-[state=on]:bg-tile data-[state=on]:text-tile-foreground h-auto min-h-11 min-w-[40%] flex-1 basis-0 rounded-full! px-3 py-2 text-center whitespace-normal";

/**
 * Хэрэглэх заалт — segmented (Figma 123:100).
 *
 * Зөвхөн ӨВЧТӨНД ТОХИРОХ заалтуудыг харуулна. Жишээ нь ДЭМБ-ын 2024 оны
 * уушгины хатгааны дүрэм 2–59 сартайд хамаарах тул нярайд харагдахгүй.
 * Сонгосныг дахин дарахад юу ч болохгүй (заавал нэг заалт идэвхтэй).
 */
export default function IndicationPicker(props: Props) {
  const { drug, patient, selected, onSelect } = props;
  if (!hasIndicationChoice(drug, patient)) return null;

  return (
    <ToggleGroup
      type="single"
      value={selected ?? GENERAL}
      aria-label="Хэрэглэх заалт"
      className="bg-muted mx-4 mt-3 w-[calc(100%-2rem)] flex-wrap rounded-3xl p-1"
      onValueChange={(next) => next && onSelect(drug.id, next === GENERAL ? undefined : next)}
    >
      {listIndications(drug, patient).map((option) => (
        <ToggleGroupItem key={option.code ?? GENERAL} value={option.code ?? GENERAL} className={ITEM}>
          {option.labelMn}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
