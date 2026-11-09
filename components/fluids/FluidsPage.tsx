"use client";

import { useState } from "react";
import { MIN_AGE_MONTHS, maintenanceMlPerDay, maintenanceMlPerHour, restrictedMlPerHour } from "@/lib/calculators/fluid/maintenance";
import type { Patient } from "@/lib/domain/patient";
import { useTrackOpened } from "@/components/analytics/use-track-opened";
import { mlPerHour, mlValue, rateValue } from "@/components/burns/burn-format";
import HeroChip from "@/components/v4/HeroChip";
import NeedPatient from "@/components/v4/NeedPatient";
import PatientSummary from "@/components/v4/PatientSummary";
import SectionTabs from "@/components/v4/SectionTabs";
import ToolScreen from "@/components/v4/ToolScreen";
import type { HeroData } from "@/components/v4/ToolHero";
import { useToolPatient, type ToolPatient } from "@/components/v4/use-tool-patient";
import BolusCard from "./BolusCard";
import DeficitCard from "./DeficitCard";
import FluidsDisclaimer from "./FluidsDisclaimer";
import MaintenanceCard from "./MaintenanceCard";

const TABS = [
  { id: "maintenance", label: "Тэтгэх" },
  { id: "bolus", label: "Болюс" },
  { id: "deficit", label: "Дутагдал" },
] as const;

const EMPTY_HERO: HeroData = { value: "—", unit: "мл/цаг", label: "Тэтгэх шингэн — бүтэн хурд" };

/** Нярай (<1 сар) — тооцоолуур хамаарахгүй. */
const isNeonate = (patient: Patient): boolean => patient.ageMonths < MIN_AGE_MONTHS;

const heroOf = (patient: Patient | null): HeroData => {
  if (!patient || isNeonate(patient)) return EMPTY_HERO;
  return {
    ...EMPTY_HERO,
    value: rateValue(maintenanceMlPerHour(patient)),
    chips: (
      <>
        <HeroChip>{mlValue(maintenanceMlPerDay(patient))} мл/хон</HeroChip>
        <HeroChip>⅔ = {mlPerHour(restrictedMlPerHour(patient))}</HeroChip>
      </>
    ),
  };
};

interface CardsProps {
  readonly patient: Patient;
  readonly percent: string;
  readonly onPercent: (value: string) => void;
}

const Mobile = (props: CardsProps) => (
  <>
    <SectionTabs tabs={TABS} />
    <MaintenanceCard patient={props.patient} />
    <BolusCard patient={props.patient} />
    <DeficitCard {...props} />
    <FluidsDisclaimer />
  </>
);

/** Desktop: тэтгэх + болюс зүүн, дутагдал + анхааруулга баруун (Figma 163:2510). */
const Desktop = (props: CardsProps) => (
  <div className="grid grid-cols-2 items-start gap-4">
    <div className="flex flex-col gap-4">
      <MaintenanceCard patient={props.patient} />
      <BolusCard patient={props.patient} />
    </div>
    <div className="flex flex-col gap-4">
      <DeficitCard {...props} />
      <FluidsDisclaimer />
    </div>
  </div>
);

const Neonate = () => (
  <p className="bg-card text-muted-foreground rounded-3xl px-[18px] py-6 text-center text-sm/[18px]">
    Нярай (&lt;1 сар), дутуу төрсөн хүүхдэд хамаарахгүй — нярайн заавар хэрэглэнэ.
  </p>
);

const notReady = (tool: ToolPatient) => {
  const body = tool.ready ? <><Neonate /><FluidsDisclaimer /></> : <><NeedPatient tool={tool} text="Жин, нас оруулбал шингэний тооцоолол гарна." /><FluidsDisclaimer /></>;
  return { mobile: body, desktop: body };
};

const readyPatient = (tool: ToolPatient): Patient | null => (tool.ready ? tool.patient : null);

const fluidPatient = (patient: Patient | null): Patient | null => (patient && !isNeonate(patient) ? patient : null);

const bodyOf = (tool: ToolPatient, percent: string, onPercent: (value: string) => void) => {
  const patient = fluidPatient(readyPatient(tool));
  if (!patient) return notReady(tool);
  const props = { patient, percent, onPercent };
  return { mobile: <Mobile {...props} />, desktop: <Desktop {...props} /> };
};

/** Хүүхдийн шингэний тооцоолуур (V4 9h): тэтгэх, болюс, дутагдал — идэвхтэй өвчтөнөөр. */
export default function FluidsPage() {
  useTrackOpened("fluids");
  const tool = useToolPatient();
  const [percent, setPercent] = useState("");
  const hero = heroOf(readyPatient(tool));
  return <ToolScreen title="Шингэн" tool={tool} hero={hero} crumbRight={<PatientSummary tool={tool} />} {...bodyOf(tool, percent, setPercent)} />;
}
