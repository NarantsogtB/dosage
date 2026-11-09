"use client";

import { useMemo, useState } from "react";
import { Ruler } from "lucide-react";
import type { AgeBand } from "@/lib/domain/body-region";
import type { Patient } from "@/lib/domain/patient";
import { ageBandOf } from "@/lib/calculators/burns/age-band";
import { totalBsaPercent } from "@/lib/calculators/burns/tbsa";
import { AGE_BAND_LABELS } from "@/lib/data/burns/region-labels";
import { useTrackOpened } from "@/components/analytics/use-track-opened";
import HeroChip from "@/components/v4/HeroChip";
import NeedPatient from "@/components/v4/NeedPatient";
import ToolScreen from "@/components/v4/ToolScreen";
import type { HeroData } from "@/components/v4/ToolHero";
import { useToolPatient, type ToolPatient } from "@/components/v4/use-tool-patient";
import BurnsAside from "./BurnsAside";
import BurnsDisclaimer from "./BurnsDisclaimer";
import { BodyMapDesk, BodyMapMobile } from "./BodyMap";
import { parklandData } from "./burn-formulas";
import FormulaCard from "./FormulaCard";
import GalvestonCard from "./GalvestonCard";
import RegionList from "./RegionList";
import { SEVERE_TBSA, tbsaText } from "./tbsa-hero";
import UrineTargetCard from "./UrineTargetCard";
import { useBurnSelections } from "./use-burn-selections";

const LABEL = "Биеийн нийт гадаргуугийн талбай (БГТ)";

const EMPTY_HERO: HeroData = { value: "—", unit: "%", unitClassName: "text-[34px]/[43px]", label: LABEL };

const Severe = ({ tbsa }: { readonly tbsa: number }) =>
  tbsa >= SEVERE_TBSA ? <HeroChip tone="warning">≥10% — хүнд, шингэн сэлбэнэ</HeroChip> : null;

const heroOf = (tbsa: number, band: AgeBand | null): HeroData => {
  if (!band) return EMPTY_HERO;
  return {
    ...EMPTY_HERO,
    value: tbsaText(tbsa),
    chips: <><HeroChip>Lund-Browder · {AGE_BAND_LABELS[band]}</HeroChip><Severe tbsa={tbsa} /></>,
  };
};

const withHeight = (patient: Patient | null, height: string): Patient | null =>
  patient ? { ...patient, heightCm: Number(height) || undefined } : null;

const bandOf = (ready: boolean, patient: Patient | null): AgeBand | null => (ready && patient ? ageBandOf(patient) : null);

/** Түлэгдэлтийн дэлгэцийн төлөв: идэвхтэй өвчтөн + өндөр (зөвхөн энд) + бүс. */
const useBurns = () => {
  const tool = useToolPatient();
  const [height, setHeight] = useState("");
  const regions = useBurnSelections();
  const patient = useMemo(() => withHeight(tool.patient, height), [tool.patient, height]);
  const band = bandOf(tool.ready, patient);
  const tbsa = band ? totalBsaPercent(regions.selections, band) : 0;
  return { tool, height, setHeight, regions, patient, band, tbsa };
};

type Burns = ReturnType<typeof useBurns>;

interface ReadyProps {
  readonly burns: Burns;
  readonly patient: Patient;
  readonly band: AgeBand;
}

const mapProps = ({ burns, band }: ReadyProps) => ({
  band,
  selections: burns.regions.map,
  onToggle: burns.regions.setDepth,
  onClear: burns.regions.clear,
});

const Pick = () => (
  <p className="bg-card text-muted-foreground rounded-3xl px-[18px] py-6 text-center text-sm/[18px]">
    Түлэгдсэн бүсээ сонгоно уу. I зэргийн түлэгдэлт талбайд тооцогдохгүй.
  </p>
);

const MobileResults = ({ burns, patient }: ReadyProps) =>
  burns.tbsa <= 0 ? <Pick /> : (
    <>
      <FormulaCard data={parklandData(patient, burns.tbsa)} />
      <GalvestonCard patient={patient} tbsaPercent={burns.tbsa} height={burns.height} onHeight={burns.setHeight} />
      <UrineTargetCard patient={patient} />
    </>
  );

const Mobile = (props: ReadyProps) => (
  <>
    <BodyMapMobile {...mapProps(props)} />
    <RegionList {...mapProps(props)} />
    <MobileResults {...props} />
    <BurnsDisclaimer />
  </>
);

/** Desktop: төв 520 (хоёр тал + жагсаалт), aside 288 (Figma 140:1675). */
const Desktop = (props: ReadyProps) => (
  <div className="grid grid-cols-[minmax(0,1fr)_288px] items-start gap-6">
    <div className="flex flex-col gap-4">
      <BodyMapDesk {...mapProps(props)} />
      <RegionList {...mapProps(props)} desk />
    </div>
    <div className="flex flex-col gap-4">
      <BurnsAside patient={props.patient} tbsa={props.burns.tbsa} band={props.band} height={props.burns.height} onHeight={props.burns.setHeight} />
      <BurnsDisclaimer />
    </div>
  </div>
);

const need = (tool: ToolPatient) => <><NeedPatient tool={tool} text="Жин, нас оруулбал түлэгдэлтийн тооцоолол гарна." /><BurnsDisclaimer /></>;

const bodyOf = (burns: Burns) => {
  const { patient, band } = burns;
  if (!patient || !band) return { mobile: need(burns.tool), desktop: need(burns.tool) };
  const props = { burns, patient, band };
  return { mobile: <Mobile {...props} />, desktop: <Desktop {...props} /> };
};

const heightText = (height: string): string | undefined => (Number(height) > 0 ? `${height} см` : undefined);

/**
 * Түлэгдэлтийн шингэн сэлбэх тооцоолуур (V4 9h). Насны ангиллыг Lund-Browder-ийн ЗУРГААН
 * баганаас (`ageBandOf`) — Естийн дүрмийн 2 ангиллыг ХЭРЭГЛЭХГҮЙ (14 настайг нярайгаар тооцдог байсан).
 */
export default function BurnsPage() {
  useTrackOpened("burns");
  const burns = useBurns();
  const height = heightText(burns.height);
  return (
    <ToolScreen
      title="Түлэгдэлт"
      tool={burns.tool}
      hero={heroOf(burns.tbsa, burns.band)}
      patientExtra={height}
      crumbRight={<><Ruler aria-hidden />{height ? `Өндөр ${height} · Гальвестоны томьёонд` : "Өндөр — Гальвестоны томьёонд"}</>}
      deskHero={false}
      {...bodyOf(burns)}
    />
  );
}
