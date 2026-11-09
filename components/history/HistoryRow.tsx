"use client";

import { useMemo } from "react";
import { Pill } from "lucide-react";
import type { DosageOutcome } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import type { EvidenceLevel } from "@/lib/domain/source";
import { calculateDosage } from "@/lib/engine";
import { formatAmount } from "@/lib/format/format-amount";
import { formatDose } from "@/lib/format/format-dose";
import { summaryOf, type HistoryEntry } from "@/lib/history/history";
import { EVIDENCE_LABELS } from "@/lib/domain/source";
import { EVIDENCE_LETTERS, EVIDENCE_TONES } from "@/components/dosage/evidence-tone";
import { selectedAmount } from "@/components/dosage/selected-amount";
import { cn } from "@/lib/utils";

interface Props {
  readonly entry: HistoryEntry;
  readonly drug?: Drug;
  readonly onOpen: (entry: HistoryEntry) => void;
}

const Evidence = ({ level }: { readonly level: EvidenceLevel }) => (
  <span role="img" aria-label={EVIDENCE_LABELS[level]} className="bg-muted inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium">
    <span aria-hidden className={cn("size-2 rounded-full", EVIDENCE_TONES[level].dot)} />
    <span aria-hidden>{EVIDENCE_LETTERS[level]}</span>
  </span>
);

const Amount = ({ outcome, formulation }: { readonly outcome: DosageOutcome; readonly formulation?: string }) => {
  const amount = selectedAmount(outcome, formulation);
  return (
    <p className="num text-lg font-bold">
      {formatDose(outcome.perDose, outcome.doseUnit)}
      {amount ? <span className="text-primary"> = {formatAmount(amount)}</span> : null}
    </p>
  );
};

const time = (at: number): string =>
  new Date(at).toLocaleTimeString("mn-MN", { hour: "2-digit", minute: "2-digit", hour12: false });

const outcomeOf = (drug: Drug | undefined, entry: HistoryEntry): DosageOutcome | undefined => {
  if (!drug) return undefined;
  const patient = { weightKg: entry.weightKg, ageMonths: entry.ageMonths };
  const result = calculateDosage(drug, patient, { indicationCode: entry.indication });
  return result.type === "dosage" ? result.data : undefined;
};

const nameOf = (drug: Drug | undefined, entry: HistoryEntry): string => drug?.innMn ?? entry.drugId;

const Body = ({ entry, outcome }: { readonly entry: HistoryEntry; readonly outcome?: DosageOutcome }) =>
  outcome ? (
    <>
      <Amount outcome={outcome} formulation={entry.formulation} />
      <span className="text-muted-foreground flex flex-wrap items-center gap-x-2 text-xs">
        <span className="num">{summaryOf(entry)}</span>
        {outcome.cappedAtMax ? <span className="bg-warning-muted text-warning-text rounded-full px-2 py-0.5 font-medium">Хязгаарласан</span> : null}
      </span>
    </>
  ) : (
    <p className="text-muted-foreground text-sm">Тооцоолол боломжгүй</p>
  );

const Title = ({ name, outcome }: { readonly name: string; readonly outcome?: DosageOutcome }) => (
  <span className="flex items-center gap-2">
    <span className="truncate font-semibold">{name}</span>
    {outcome ? <Evidence level={outcome.rule.evidenceLevel} /> : null}
  </span>
);

/**
 * Түүхийн нэг мөр. Тунг хадгалсан оролтоос ОДООГИЙН өгөгдлөөр дахин тооцно —
 * хадгалсан тоо байхгүй. «Хязгаарласан» нь шар (улаан биш): жагсаалтад олон мөр
 * хязгаарлагдаж болох тул «нэг дэлгэцэнд нэг danger» дүрмийг зөрчихгүй.
 */
export default function HistoryRow({ entry, drug, onOpen }: Props) {
  const outcome = useMemo(() => outcomeOf(drug, entry), [drug, entry]);
  return (
    <li>
      <button
        type="button"
        disabled={!outcome}
        onClick={() => onOpen(entry)}
        className="bg-card hover:bg-accent focus-visible:ring-ring/50 flex min-h-20 w-full items-center gap-3 rounded-2xl p-3 text-left outline-none focus-visible:ring-[3px] disabled:opacity-60"
      >
        <span className="bg-tile text-tile-foreground grid size-11 shrink-0 place-items-center rounded-full">
          <Pill aria-hidden className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <Title name={nameOf(drug, entry)} outcome={outcome} />
          <Body entry={entry} outcome={outcome} />
        </span>
        <time className="num text-muted-foreground shrink-0 self-start text-sm" dateTime={new Date(entry.at).toISOString()}>
          {time(entry.at)}
        </time>
      </button>
    </li>
  );
}
