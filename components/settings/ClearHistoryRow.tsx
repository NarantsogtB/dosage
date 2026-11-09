"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { replaceHistory, useHistory } from "@/components/history/history-store";
import SettingsRow from "./SettingsRow";

/**
 * «Түүхийг устгах» — улаан БИШ: энэ дэлгэцийн цорын ганц улаан нь «Бүх өвчтөнийг
 * устгах». «Буцаах»-аар сэргээнэ (`ClearPatientsRow`-той ижил зарчим).
 */
export default function ClearHistoryRow() {
  const entries = useHistory();
  const clear = () => {
    replaceHistory([]);
    toast("Түүх устгагдлаа", { action: { label: "Буцаах", onClick: () => replaceHistory(entries) } });
  };
  return <SettingsRow icon={Trash2} label="Түүхийг устгах" value={`${entries.length}`} disabled={entries.length === 0} onClick={clear} />;
}
