"use client";

import type { CalculationResult } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import type { Patient } from "@/lib/domain/patient";
import type { InputStatus } from "./blocker";
import type { Choices } from "./use-choices";
import AgeDisplay from "@/components/dosage/AgeDisplay";
import InstallPrompt from "@/components/pwa/InstallPrompt";
import ResultsActions from "./ResultsActions";
import ResultsPanel from "./ResultsPanel";

interface Props {
  readonly drugs: readonly Drug[];
  readonly results: ReadonlyMap<string, CalculationResult>;
  readonly patient: Patient;
  readonly status: InputStatus;
  readonly ready: boolean;
  readonly choices: Choices;
  /** Хуваалцах линкийн fragment (Шат 5). */
  readonly shareFragment: string;
  readonly onRemove: (id: string) => void;
}

/** Ядаж нэг эмийн тун амжилттай гарсан эсэх — сануулгын нөхцөл. */
const hasDosage = (results: ReadonlyMap<string, CalculationResult>) =>
  [...results.values()].some((result) => result.type === "dosage");

const Meta = ({ patient, ready, count }: { readonly patient: Patient; readonly ready: boolean; readonly count: number }) => (
  <span className="num text-muted-foreground text-sm">
    {ready ? (
      <>
        {patient.weightKg} кг · <AgeDisplay ageMonths={patient.ageMonths} /> ·{" "}
      </>
    ) : null}
    {count} эм
  </span>
);

/**
 * Баруун багана: «Үр дүн» толгой + картууд. Алхам 3.
 *
 * Толгой нь өвчтөнийг давтан хэлнэ (Figma V3.1 · 05 · 7). Хуулах,
 * хэвлэх нь desktop-д энд; mobile-д `ActionBar`.
 */
export default function ResultsColumn(props: Props) {
  const { drugs, results, patient } = props;
  return (
    <section aria-labelledby="results-title" className="space-y-3">
      <div className="flex min-h-11 flex-wrap items-center gap-x-3 gap-y-2 px-1 print:hidden">
        <h2 id="results-title" className="text-lg font-semibold tracking-tight lg:text-xl">
          Үр дүн
        </h2>
        <Meta patient={patient} ready={props.ready} count={drugs.length} />
        <div className="ml-auto hidden md:block">
          <ResultsActions drugs={drugs} results={results} patient={patient} shareFragment={props.shareFragment} />
        </div>
      </div>
      <ResultsPanel
        drugs={drugs}
        results={results}
        patient={patient}
        status={props.status}
        choices={props.choices}
        onRemove={props.onRemove}
      />
      <InstallPrompt hasCalculated={hasDosage(results)} />
    </section>
  );
}
