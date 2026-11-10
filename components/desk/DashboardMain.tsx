"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { List, Plus, Search } from "lucide-react";
import { DRUG_BY_ID } from "@/lib/data/drugs";
import { drugPath } from "@/lib/drug-page/drug-page-meta";
import type { HistoryEntry } from "@/lib/history/history";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import FavoriteDrugs from "@/components/drugs/FavoriteDrugs";
import HistoryRow from "@/components/history/HistoryRow";
import { useHistory } from "@/components/history/history-store";
import { reopenEntry } from "@/components/history/reopen-entry";
import { openSearch } from "@/components/search/search-open";

const RECENT_COUNT = 5;

const SearchBar = () => (
  <button
    type="button"
    data-tour="search"
    onClick={() => openSearch()}
    className="bg-card hover:bg-accent focus-visible:ring-ring/50 flex h-14 w-full items-center gap-3 rounded-full border px-5 text-left outline-none focus-visible:ring-[3px]"
  >
    <Search aria-hidden className="text-muted-foreground size-5" />
    <span className="text-muted-foreground flex-1">paracetamol / парацетамол</span>
    <Kbd>/</Kbd>
  </button>
);

/** «Сүүлийн тооцоо» = түүхийн сүүлийн мөрүүд (9e). Мөр дарахад өвчтөн + эмийг сэргээж дэлгэрэнгүй рүү. */
const RecentCalcs = () => {
  const router = useRouter();
  const entries = useHistory().slice(0, RECENT_COUNT);
  const open = (entry: HistoryEntry) => {
    const drug = DRUG_BY_ID.get(entry.drugId);
    if (!drug) return;
    reopenEntry(entry);
    router.push(drugPath(drug));
  };
  return (
    <section aria-labelledby="recent-calcs" className="bg-card space-y-3 rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <h2 id="recent-calcs" className="text-xl font-bold">Сүүлийн тооцоо</h2>
        <span className="flex gap-2">
          <Button type="button" variant="secondary" size="icon-sm" aria-label="Эм нэмэх" onClick={() => openSearch()}><Plus aria-hidden /></Button>
          <Button asChild variant="secondary" size="icon-sm"><Link href="/history" aria-label="Түүх"><List aria-hidden /></Link></Button>
        </span>
      </div>
      {entries.length === 0 ? (
        <p className="text-muted-foreground text-sm">Тооцоо хараахан алга. Эм сонгож жин, насаа оруулмагц энд бичигдэнэ.</p>
      ) : (
        <ul className="space-y-2">
          {entries.map((entry) => (
            <HistoryRow key={entry.id} entry={entry} drug={DRUG_BY_ID.get(entry.drugId)} onOpen={open} />
          ))}
        </ul>
      )}
    </section>
  );
};

/** `/dose` dashboard-ын гол багана (520px): хайлт, сүүлийн тооцоо, миний эмүүд. */
export default function DashboardMain() {
  return (
    <div className="space-y-4">
      <SearchBar />
      <RecentCalcs />
      <div className="bg-card rounded-2xl p-4">
        <FavoriteDrugs />
      </div>
    </div>
  );
}
