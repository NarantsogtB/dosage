"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Pencil, User } from "lucide-react";
import type { CalculationResult } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import type { Patient } from "@/lib/domain/patient";
import { FREQUENCY_SHORT } from "@/lib/format/format-frequency-short";
import { formatDose } from "@/lib/format/format-dose";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AgeDisplay from "@/components/dosage/AgeDisplay";
import { drugAnchorId } from "@/components/summary/drug-anchor";
import { PATIENT_CARD_ID } from "./PatientInput";

interface Props {
  readonly patient: Patient;
  readonly ready: boolean;
  readonly drugs: readonly Drug[];
  readonly results: ReadonlyMap<string, CalculationResult>;
  readonly onClear: () => void;
}

/** Өвчтөний карт дэлгэцийн ДЭЭГҮҮР гарсан эсэх (доор нь биш). */
const usePatientCardScrolledAway = () => {
  const [away, setAway] = useState(false);
  useEffect(() => {
    const card = document.getElementById(PATIENT_CARD_ID);
    if (!card) return;
    const observer = new IntersectionObserver(([entry]) =>
      setAway(!entry.isIntersecting && entry.boundingClientRect.top < 0),
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);
  return away;
};

const editPatient = () => {
  const card = document.getElementById(PATIENT_CARD_ID);
  if (!card) return;
  card.scrollIntoView({ behavior: "smooth", block: "start" });
  card.querySelector("input")?.focus({ preventScroll: true });
};

const doseText = (result?: CalculationResult): string =>
  result?.type === "dosage"
    ? `${formatDose(result.data.perDose)} · ${FREQUENCY_SHORT[result.data.frequency]}`
    : "тооцоолол боломжгүй";

const DrugMenu = ({
  drugs,
  results,
  onClear,
}: Omit<Props, "patient" | "ready">) =>
  drugs.length === 0 ? null : (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" className="rounded-full">
          <span className="num">{drugs.length}</span> эм
          <ChevronDown aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-1.5">
        <ul>
          {drugs.map((drug) => (
            <li key={drug.id}>
              <a
                href={`#${drugAnchorId(drug.id)}`}
                className="hover:bg-accent flex min-h-11 flex-col justify-center rounded-sm px-2.5 py-1.5"
              >
                <span className="text-sm font-medium">{drug.inn}</span>
                <span className="num text-muted-foreground text-xs">
                  {doseText(results.get(drug.id))}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <Button
          type="button"
          variant="ghost"
          className="text-destructive w-full justify-start"
          onClick={onClear}
        >
          Бүгдийг хасах
        </Button>
      </PopoverContent>
    </Popover>
  );

/**
 * Наалдамхай өвчтөний мөр — Figma "Patient bar" (V3 · 03).
 *
 * Өвчтөний карт гүйлгэгдэж алга болмогц дээд талд гарна: тунг уншиж
 * байхдаа хэний жингээр бодсоныг ХЭЗЭЭ Ч алдахгүй. Дарахад карт руу
 * буцаж засна; «N эм» нь картууд руу үсрэх цэс — өмнөх наалдамхай
 * `SelectedSummary`-г орлоно.
 */
export default function PatientBar(props: Props) {
  const away = usePatientCardScrolledAway();
  if (!props.ready || !away) return null;
  return (
    <div className="bg-card/95 supports-[backdrop-filter]:bg-card/85 fixed inset-x-0 top-0 z-20 border-b backdrop-blur md:top-16 print:hidden">
      <div className="mx-auto flex h-15 max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-20">
        <Button
          type="button"
          variant="secondary"
          className="bg-accent text-accent-foreground rounded-full"
          onClick={editPatient}
        >
          <User aria-hidden />
          <span className="num font-semibold">{props.patient.weightKg} кг</span>
          ·
          <span className="font-semibold">
            <AgeDisplay ageMonths={props.patient.ageMonths} />
          </span>
          <Pencil aria-hidden />
          <span className="sr-only">— өвчтөний мэдээлэл засах</span>
        </Button>
        <DrugMenu
          drugs={props.drugs}
          results={props.results}
          onClear={props.onClear}
        />
      </div>
    </div>
  );
}
