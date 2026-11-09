"use client";

import { History, Info, Pill, Scale, ShieldCheck } from "lucide-react";
import { FEEDBACK_URL } from "@/lib/site";
import { MessageSquare } from "lucide-react";
import { useFavoriteIds } from "@/components/recent/favorites-store";
import { useHistory } from "@/components/history/history-store";
import ClearHistoryRow from "./ClearHistoryRow";
import ClearPatientsRow from "./ClearPatientsRow";
import EvidenceLadderRow from "./EvidenceLadderRow";
import Section from "./Section";
import SettingsRow from "./SettingsRow";
import ThemeSetting from "./ThemeSetting";
import WeightUnitSetting from "./WeightUnitSetting";

const PRIVACY = "Зөвхөн энэ төхөөрөмж дээр. Жин, нас, шошго. Серверт явахгүй. Нэр хадгалахгүй.";

/** «Тохиргоо» таб (V4, Figma 131:1511). */
export default function SettingsPage() {
  const favorites = useFavoriteIds().length;
  const history = useHistory().length;
  return (
    <main className="mx-auto w-full max-w-2xl space-y-6 px-4 py-6 sm:px-6">
      <div className="from-tile/30 -mx-4 bg-linear-to-b to-transparent px-4 pt-6 pb-4 sm:-mx-6 sm:px-6">
        <h1 className="text-4xl font-bold tracking-tight">Тохиргоо</h1>
      </div>
      <section className="space-y-3">
        <h2 className="text-lg font-bold">Өнгө төрх</h2>
        <ThemeSetting />
      </section>
      <Section title="Тооцоолол">
        <SettingsRow icon={Scale} label="Жингийн нэгж" control={<WeightUnitSetting />} />
        <SettingsRow icon={Pill} label="Миний эмүүд" value={`${favorites}`} href="/drugs" />
        <SettingsRow icon={History} label="Түүх" value={`${history}`} href="/history" />
      </Section>
      <Section title="Өвчтөний мэдээлэл">
        <SettingsRow icon={ShieldCheck} label={PRIVACY} control={<span />} />
        <ClearPatientsRow />
        <ClearHistoryRow />
      </Section>
      <Section title="Эх сурвалж ба тухай">
        <EvidenceLadderRow />
        <SettingsRow icon={Info} label="dosage.mn тухай" href="/" />
        {FEEDBACK_URL ? <SettingsRow icon={MessageSquare} label="Санал хүсэлт" href={FEEDBACK_URL} /> : null}
      </Section>
    </main>
  );
}
