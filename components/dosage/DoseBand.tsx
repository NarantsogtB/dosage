import type { DosageOutcome, FormulationAmount } from "@/lib/domain/calculation-result";
import type { Patient } from "@/lib/domain/patient";
import { FLAGS } from "@/lib/flags";
import { formatRange } from "@/lib/format/format-range";
import { concentrationOf, formulationLine } from "@/lib/format/primary-formulation-line";
import { doseParts } from "@/lib/format/dose-parts";
import { cn } from "@/lib/utils";
import AgeDisplay from "./AgeDisplay";
import { EVIDENCE_TONES } from "./evidence-tone";
import DoseMetaGrid from "./DoseMetaGrid";
import DoseReadout from "./DoseReadout";
import EvidenceChip from "./EvidenceChip";
import SectionLabel from "./SectionLabel";

interface Props {
  readonly outcome: DosageOutcome;
  readonly patient: Patient;
  /** Хэлбэрийн хүснэгтэд сонгосон мөр — «= … мл»-ийг удирдана. */
  readonly selected?: FormulationAmount;
}

const NUMBER = "text-4xl leading-none sm:text-[44px] sm:leading-[48px]";
const UNIT = "text-xl font-semibold sm:text-[22px]";

/** Одоогийн хэлбэр: мг том, хөрвүүлэлт доор нь бүдэг мөрөөр. */
const ClassicReadout = ({ outcome, selected }: Omit<Props, "patient">) => {
  const per = doseParts(outcome.perDose);
  return (
    <>
      <DoseReadout value={per.value} unit={per.unit} className={NUMBER} unitClassName={UNIT} />
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
  const per = doseParts(outcome.perDose);
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

/**
 * ★ ГАРЫН ҮСЭГ — тунгийн зурвас. Figma "Dose readout v3" (V3 · 02).
 *
 * Хуудасны цорын ганц чанга элемент: нэг удаад хэдийг өгөх вэ. Зүүн
 * ирмэгийн зураас ба гарчгийн хажуугийн чип хоёулаа ИДЭВХТЭЙ дүрмийн
 * нотолгоо — харагдаж буй тоо яг тэр дүрмээс гарсан. Гарчиг нь өвчтөнийг
 * давтан хэлнэ: тоог хэний жингээр бодсон нь тоотой нэг дор.
 */
export default function DoseBand({ outcome, patient, selected }: Props) {
  const level = outcome.rule.evidenceLevel;
  return (
    <div className="relative space-y-3 py-4 pr-5 pl-6">
      <span aria-hidden className={cn("absolute inset-y-0 left-0 w-[3px]", EVIDENCE_TONES[level].rule)} />
      <div className="flex items-center gap-2">
        <SectionLabel>
          Нэг удаагийн тун · <span className="num">{patient.weightKg}</span> кг ·{" "}
          <AgeDisplay ageMonths={patient.ageMonths} />
        </SectionLabel>
        <EvidenceChip level={level} />
      </div>
      <Readout outcome={outcome} selected={selected} />
      <div className="border-border/70 border-t pt-3">
        <DoseMetaGrid outcome={outcome} />
      </div>
    </div>
  );
}
