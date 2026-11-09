"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import type { AnalyticsEvent } from "@/lib/analytics/events";
import { DRUG_BY_ID } from "@/lib/data/drugs";
import { filterEntries, groupByDay, patientsOf, type DayGroup, type HistoryEntry } from "@/lib/history/history";
import { Input } from "@/components/ui/input";
import { useTrackSettled } from "@/components/analytics/use-track-settled";
import CategoryPill from "@/components/search/CategoryPill";
import HistoryRow from "./HistoryRow";
import { useHistory } from "./history-store";
import { reopenEntry } from "./reopen-entry";

const OPENED: readonly AnalyticsEvent[] = [{ name: "history_opened" }];

const Chips = ({ entries, selected, onSelect }: { readonly entries: readonly HistoryEntry[]; readonly selected?: string; readonly onSelect: (key?: string) => void }) => (
  <div className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
    <CategoryPill label={`Бүх өвчтөн · ${entries.length}`} active={selected === undefined} onClick={() => onSelect(undefined)} />
    {patientsOf(entries).map((patient) => (
      <CategoryPill key={patient.key} label={`${patient.key} · ${patient.count}`} active={selected === patient.key} onClick={() => onSelect(patient.key)} />
    ))}
  </div>
);

const Groups = ({ groups, onOpen }: { readonly groups: readonly DayGroup[]; readonly onOpen: (entry: HistoryEntry) => void }) => (
  <>
    {groups.length === 0 ? <p className="text-muted-foreground text-sm">Таарах мөр олдсонгүй.</p> : null}
    {groups.map((group) => (
      <section key={group.label} aria-label={group.label} className="space-y-2">
        <h2 className="text-muted-foreground text-sm font-semibold">{group.label}</h2>
        <ul className="space-y-2">
          {group.entries.map((entry) => (
            <HistoryRow key={entry.id} entry={entry} drug={DRUG_BY_ID.get(entry.drugId)} onOpen={onOpen} />
          ))}
        </ul>
      </section>
    ))}
  </>
);

/** «Түүх» (V4, Figma 139:1636): өдрөөр бүлэглэсэн, зөвхөн эмийн тооцоо. */
export default function HistoryPage() {
  const router = useRouter();
  const entries = useHistory();
  const [query, setQuery] = useState("");
  const [patientKey, setPatientKey] = useState<string>();
  const [now] = useState(() => Date.now());
  const groups = useMemo(() => groupByDay(filterEntries(entries, { query, patientKey }), now), [entries, query, patientKey, now]);
  useTrackSettled(OPENED, 0);

  const open = (entry: HistoryEntry) => {
    reopenEntry(entry);
    router.push("/dose");
  };

  return (
    <main className="mx-auto w-full max-w-2xl space-y-5 px-4 py-6 sm:px-6">
      <div className="from-tile/30 -mx-4 bg-linear-to-b to-transparent px-4 pt-6 pb-2 sm:-mx-6 sm:px-6">
        <h1 className="text-4xl font-bold tracking-tight">Түүх</h1>
      </div>
      {entries.length === 0 ? (
        <p className="text-muted-foreground">Түүх хоосон байна. Тооцоо тогтсоны дараа энд бичигдэнэ.</p>
      ) : (
        <>
          <Chips entries={entries} selected={patientKey} onSelect={setPatientKey} />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Түүхээс хайх" aria-label="Түүхээс хайх" />
          <Groups groups={groups} onOpen={open} />
        </>
      )}
      <p className="text-muted-foreground bg-card flex items-start gap-2 rounded-2xl p-3 text-xs">
        <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0" />
        Зөвхөн энэ төхөөрөмж дээр, 30 хоног. Дахин нээхэд одоогийн эмийн өгөгдлөөр шинээр тооцоолно.
      </p>
    </main>
  );
}
