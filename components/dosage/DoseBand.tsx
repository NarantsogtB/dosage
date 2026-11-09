import type { DosageOutcome, FormulationAmount } from "@/lib/domain/calculation-result";
import type { Patient } from "@/lib/domain/patient";
import { FLAGS } from "@/lib/flags";
import { formatRange } from "@/lib/format/format-range";
import { concentrationOf, formulationLine } from "@/lib/format/primary-formulation-line";
import { doseParts } from "@/lib/format/dose-parts";
import { EVIDENCE_LABELS, type EvidenceLevel } from "@/lib/domain/source";
import { cn } from "@/lib/utils";
import AgeDisplay from "./AgeDisplay";
import DoseReadout from "./DoseReadout";
import ReviewDate from "./ReviewDate";
import { CROSS_CHECK_NOTE } from "./unverified-note";

interface Props {
  readonly outcome: DosageOutcome;
  readonly patient: Patient;
  /** Хэлбэрийн хүснэгтэд сонгосон мөр — «= … мл»-ийг удирдана. */
  readonly selected?: FormulationAmount;
}

interface BandProps extends Props {
  /** `drug.lastReviewed` — хяналтын огноо. */
  readonly reviewed: string;
}

const NUMBER = "text-4xl leading-none sm:text-[44px] sm:leading-[48px]";
const UNIT = "text-xl font-semibold sm:text-[22px]";

/** Мкг/мг давхар бичиглэл (Шат S4) — 10× алдаанаас сэргийлнэ. */
const Alternate = ({ text }: { readonly text?: string }) =>
  text ? <p className="num text-muted-foreground text-sm font-semibold">({text})</p> : null;

/** Одоогийн хэлбэр: тун том, хөрвүүлэлт доор нь бүдэг мөрөөр. */
const ClassicReadout = ({ outcome, selected }: Omit<Props, "patient">) => {
  const per = doseParts(outcome.perDose, outcome.doseUnit);
  return (
    <>
      <DoseReadout value={per.value} unit={per.unit} className={NUMBER} unitClassName={UNIT} />
      <Alternate text={per.alternate} />
      {selected ? (
        <p className="text-muted-foreground text-[15px] leading-6 font-semibold sm:text-[17px]">
          {formulationLine(selected)}
        </p>
      ) : null}
    </>
  );
};

/**
 * V3: мг = мл хоёулаа том тоо, мл primary өнгөтэй. Эмнэлзүйн хяналт
 * хүлээж байна (`FLAGS.mlFocal`) — зөвхөн шингэн хэлбэрт.
 */
const FocalReadout = ({ outcome, selected }: Omit<Props, "patient"> & { readonly selected: FormulationAmount }) => {
  const per = doseParts(outcome.perDose, outcome.doseUnit);
  return (
    <>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <DoseReadout value={per.value} unit={per.unit} className={NUMBER} unitClassName={UNIT} />
        <span className="text-muted-foreground text-2xl font-semibold">=</span>
        <DoseReadout
          value={formatRange(selected.min, selected.max, 0.05)}
          unit="мл"
          className={cn(NUMBER, "text-primary")}
          unitClassName={cn(UNIT, "text-primary")}
        />
      </div>
      <p className="text-muted-foreground text-sm">{concentrationOf(selected)}</p>
    </>
  );
};

const isFocal = (selected?: FormulationAmount): selected is FormulationAmount =>
  FLAGS.mlFocal && selected?.formulation.kind === "liquid";

const Readout = ({ outcome, selected }: Omit<Props, "patient">) =>
  isFocal(selected) ? (
    <FocalReadout outcome={outcome} selected={selected} />
  ) : (
    <ClassicReadout outcome={outcome} selected={selected} />
  );

const indicationOf = (outcome: DosageOutcome): string =>
  outcome.rule.indication === "general" ? "Ерөнхий заалт" : outcome.rule.indication.labelMn;

/** E: цорын ганц шар мөр. Өгүүлбэрийн хоёр дахь хагас нь `Disclaimer`-тэй НЭГ эх. */
const Unverified = () => (
  <p className="border-warning/35 bg-warning-muted text-warning-text mt-3 rounded-xl border px-3 py-2 text-sm">
    {EVIDENCE_LABELS.E_unverified}. {CROSS_CHECK_NOTE}
  </p>
);

const Provenance = ({ level, reviewed }: { readonly level: EvidenceLevel; readonly reviewed: string }) =>
  level === "E_unverified" ? (
    <Unverified />
  ) : (
    <p className="mt-3 text-xs">
      <span className="text-muted-foreground">{EVIDENCE_LABELS[level]} · </span>
      <ReviewDate date={reviewed} />
    </p>
  );

/**
 * ★ ГАРЫН ҮСЭГ — шилэн толгойн тунгийн зурвас (Figma 123:100).
 *
 * Хуудасны цорын ганц чанга элемент: нэг удаад хэдийг өгөх вэ. Тоог ХЭНИЙ
 * жингээр, ЮУНЫ заалтаар бодсон нь тоотой нэг дор (мета мөр). Эх сурвалж
 * баталгаажсан бол түвшин + хяналтын огноо; E бол шар мөр (нэг л өнгө).
 */
export default function DoseBand({ outcome, patient, selected, reviewed }: BandProps) {
  return (
    <div className="mt-3">
      <p className="num text-muted-foreground text-sm">
        {patient.weightKg} кг · <AgeDisplay ageMonths={patient.ageMonths} /> · {indicationOf(outcome)}
      </p>
      <div className="mt-3 space-y-1">
        <Readout outcome={outcome} selected={selected} />
      </div>
      <Provenance level={outcome.rule.evidenceLevel} reviewed={reviewed} />
    </div>
  );
}
