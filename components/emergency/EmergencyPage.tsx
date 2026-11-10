"use client";

import { useMemo } from "react";
import { Printer } from "lucide-react";
import { EMERGENCY_DRUGS, EMERGENCY_SHOWN_ITEMS } from "@/lib/emergency";
import { emergencyDrugRows, emergencyItemRows } from "@/lib/emergency/emergency-rows";
import type { Patient } from "@/lib/domain/patient";
import { useTrackOpened } from "@/components/analytics/use-track-opened";
import HeroChip from "@/components/v4/HeroChip";
import NeedPatient from "@/components/v4/NeedPatient";
import PatientSummary from "@/components/v4/PatientSummary";
import ToolScreen from "@/components/v4/ToolScreen";
import type { HeroData } from "@/components/v4/ToolHero";
import { useToolPatient, type ToolPatient } from "@/components/v4/use-tool-patient";
import EmergencyDisclaimer from "./EmergencyDisclaimer";
import EmergencyPrintCard from "./EmergencyPrintCard";
import { DrugGroup, ItemGroup, NoRows } from "./EmergencyRows";

const NEED = "Жин, нас оруулбал яаралтай тусламжийн тун гарна.";

const useRows = (patient: Patient | null, ready: boolean) => {
  const drugRows = useMemo(() => (ready && patient ? emergencyDrugRows(EMERGENCY_DRUGS, patient) : []), [ready, patient]);
  const itemRows = useMemo(() => (ready && patient ? emergencyItemRows(EMERGENCY_SHOWN_ITEMS, patient) : []), [ready, patient]);
  return { drugRows, itemRows, count: drugRows.length + itemRows.length };
};

type Rows = ReturnType<typeof useRows>;

const heroOf = (tool: ToolPatient): HeroData => ({
  value: tool.ready && tool.patient ? tool.patient.weightKg : "—",
  unit: "кг",
  label: "Тун бүр энэ жингээс — насаар жин тооцохгүй",
  chips: <HeroChip tone="warning">Жинг хэмжсэн үү?</HeroChip>,
});

/** «7 мөр · зөвхөн эх сурвалжтай» + хэвлэх (Figma 163:2232). */
const Toolbar = ({ count }: { readonly count: number }) => (
  <div className="flex items-center gap-2">
    <p className="text-muted-foreground flex-1 text-[13px]/[17px] font-medium">{count} мөр · зөвхөн эх сурвалжтай</p>
    <button
      type="button"
      onClick={() => window.print()}
      className="bg-card focus-visible:ring-ring relative flex items-center gap-1.5 rounded-full px-3.5 py-[9px] text-[13px]/[17px] font-semibold outline-none after:absolute after:-inset-y-1.5 after:inset-x-0 focus-visible:ring-[3px]"
    >
      <Printer aria-hidden className="size-4" /> Хэвлэх карт
    </button>
  </div>
);

const Rows = ({ rows }: { readonly rows: Rows }) => (rows.count === 0 ? <NoRows /> : null);

const Mobile = ({ rows }: { readonly rows: Rows }) => (
  <>
    <Toolbar count={rows.count} />
    <DrugGroup rows={rows.drugRows} />
    <ItemGroup rows={rows.itemRows} />
    <Rows rows={rows} />
    <EmergencyDisclaimer />
  </>
);

/** Desktop: эм зүүн, шингэн + анхааруулга баруун (Figma 163:2855). */
const Desktop = ({ rows }: { readonly rows: Rows }) => (
  <>
    <Toolbar count={rows.count} />
    <Rows rows={rows} />
    <div className="grid grid-cols-2 items-start gap-4">
      <div className="flex flex-col gap-2.5"><DrugGroup rows={rows.drugRows} /></div>
      <div className="flex flex-col gap-2.5">
        <ItemGroup rows={rows.itemRows} />
        <EmergencyDisclaimer />
      </div>
    </div>
  </>
);

const bodyOf = (tool: ToolPatient, rows: Rows) => {
  if (tool.ready) return { mobile: <Mobile rows={rows} />, desktop: <Desktop rows={rows} /> };
  const need = <><NeedPatient tool={tool} text={NEED} /><EmergencyDisclaimer /></>;
  return { mobile: need, desktop: need };
};

const PrintCard = ({ tool, rows }: { readonly tool: ToolPatient; readonly rows: Rows }) =>
  tool.patient ? <EmergencyPrintCard patient={tool.patient} drugRows={rows.drugRows} itemRows={rows.itemRows} /> : null;

/**
 * Яаралтай тусламжийн горим (Шат 7, V4 9h): идэвхтэй өвчтөний НЭГ жин → нэг дэлгэц.
 * Тусдаа маягтгүй — жин, насыг өвчтөний цэсээр засна.
 */
export default function EmergencyPage() {
  useTrackOpened("emergency");
  const tool = useToolPatient();
  const rows = useRows(tool.patient, tool.ready);
  return (
    <>
      <ToolScreen title="Яаралтай тусламж" tool={tool} hero={heroOf(tool)} crumbRight={<PatientSummary tool={tool} />} {...bodyOf(tool, rows)} />
      <PrintCard tool={tool} rows={rows} />
    </>
  );
}
