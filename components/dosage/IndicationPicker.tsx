"use client";

import type { Drug } from "@/lib/domain/drug";
import type { Patient } from "@/lib/domain/patient";
import {
  hasIndicationChoice,
  listIndications,
} from "@/lib/engine/rule/list-indications";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SectionLabel from "./SectionLabel";

interface Props {
  readonly drug: Drug;
  readonly patient: Patient;
  readonly selected?: string;
  readonly onSelect: (drugId: string, code?: string) => void;
}

/**
 * Хэрэглэх заалт сонгох.
 *
 * Зөвхөн ӨВЧТӨНД ТОХИРОХ заалтуудыг харуулна. Жишээ нь ДЭМБ-ын 2024 оны
 * уушгины хатгааны дүрэм 2–59 сартайд хамаарах тул нярайд харагдахгүй.
 */
export default function IndicationPicker(props: Props) {
  const { drug, patient, selected, onSelect } = props;
  if (!hasIndicationChoice(drug, patient)) return null;

  return (
    <>
      <Separator />
      <div className="px-5 py-3">
        <SectionLabel>Хэрэглэх заалт</SectionLabel>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {listIndications(drug, patient).map((option) => (
            <Button
              key={option.code ?? "general"}
              type="button"
              size="pill"
              variant={selected === option.code ? "default" : "secondary"}
              aria-pressed={selected === option.code}
              onClick={() => onSelect(drug.id, option.code)}
            >
              {option.labelMn}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
