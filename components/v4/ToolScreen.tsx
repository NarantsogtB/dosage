"use client";

import type { ReactNode } from "react";
import { useIsDesktop } from "@/components/use-media-query";
import PatientColumn from "@/components/desk/PatientColumn";
import PatientSheet from "@/components/home/PatientSheet";
import PatientLine from "./PatientLine";
import ScreenTopBar from "./ScreenTopBar";
import ToolBreadcrumb from "./ToolBreadcrumb";
import { DeskHero, MobileHero, type HeroData } from "./ToolHero";
import { usePatientDrugResults } from "./use-patient-drug-results";
import type { ToolPatient } from "./use-tool-patient";

export interface ToolScreenProps {
  readonly title: string;
  readonly tool: ToolPatient;
  readonly hero: HeroData;
  /** Өвчтөний мөрийн төгсгөл — «110 см». */
  readonly patientExtra?: string;
  readonly crumbRight?: ReactNode;
  /** Mobile sheet доторх агуулга. */
  readonly mobile: ReactNode;
  /** Desktop гол багана (hero-гийн доор). */
  readonly desktop: ReactNode;
  /** false — desktop hero карт харуулахгүй (түлэгдэлт: БГТ aside-д). */
  readonly deskHero?: boolean;
}

/** Sheet pb 36 + BottomNav-ын зай 94 = Figma-гийн 130. Hero gradient нь SiteHeader-ийн ард (Figma-д status bar) эхэлдэг тул −56px-ээс. */
const HERO_BG = "bg-[linear-gradient(to_bottom,var(--hero-top)_-56px,var(--hero-bottom))]";

function Mobile(props: ToolScreenProps) {
  const { tool } = props;
  return (
    <main className="flex flex-1 flex-col print:hidden">
      <div className={`${HERO_BG} pb-[68px]`}>
        <ScreenTopBar title={props.title} />
        <MobileHero patientLine={<PatientLine tool={tool} extra={props.patientExtra} />} hero={props.hero} />
      </div>
      <div className="bg-sheet -mt-10 flex flex-1 flex-col gap-4 rounded-t-[32px] px-4 pt-6 pb-9">{props.mobile}</div>
      <PatientSheet open={tool.actions.target !== null} editing={tool.actions.target?.editing} onClose={tool.actions.close} />
    </main>
  );
}

/** Desktop: хуудасны дээд 420px gradient (Figma 140:1676), толгойн ард эхэлнэ (−65px). */
const DESK_BG = "from-hero-top to-hero-bottom absolute inset-x-0 -top-[65px] -z-10 h-[420px] bg-linear-to-b";

function Desktop(props: ToolScreenProps) {
  const { drugs, results } = usePatientDrugResults();
  return (
    <div className="relative isolate flex-1 print:hidden">
      <div aria-hidden className={DESK_BG} />
      <main className="mx-auto grid w-full max-w-[1152px] grid-cols-[296px_minmax(0,1fr)] items-start gap-6 px-4 pt-8 pb-10 xl:px-0">
        <aside aria-label="Өвчтөн">
          <PatientColumn actions={props.tool.actions} drugs={drugs} results={results} />
        </aside>
        <div className="flex min-w-0 flex-col gap-4">
          <ToolBreadcrumb title={props.title} right={props.crumbRight} />
          {props.deskHero === false ? null : <DeskHero hero={props.hero} />}
          {props.desktop}
        </div>
      </main>
    </div>
  );
}

/**
 * V4 хэрэгслийн дэлгэцийн бүрхүүл (9h, HANDOFF §4): mobile — gradient hero + sheet,
 * desktop (≥1024) — зүүн өвчтөний багана + замын мөр + hero карт + агуулга.
 * `CalculatorPage`-тэй адил нэг л биеийг mount хийнэ.
 */
export default function ToolScreen(props: ToolScreenProps) {
  return useIsDesktop() ? <Desktop {...props} /> : <Mobile {...props} />;
}
