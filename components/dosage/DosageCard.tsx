"use client";

import type { CalculationResult, DosageOutcome, FormulationAmount } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import type { Patient } from "@/lib/domain/patient";
import { amountKey } from "@/lib/format/reconstitution";
import { Card } from "@/components/ui/card";
import { drugAnchorId } from "@/components/summary/drug-anchor";
import BetterEvidenceHint from "./BetterEvidenceHint";
import { selectedAmount } from "./selected-amount";
import DosageCardHeader from "./DosageCardHeader";
import DoseBand from "./DoseBand";
import DoseTiles from "./DoseTiles";
import FormulationTable from "./FormulationTable";
import IndicationPicker from "./IndicationPicker";
import IneligibleCard from "./IneligibleCard";
import MaxDoseMeter from "./MaxDoseMeter";
import NotesPanel from "./NotesPanel";
import RxLine from "./RxLine";
import SourceFooter from "./SourceFooter";
import TraceDetails from "./TraceDetails";
import WarningList from "./WarningList";

interface Props {
  readonly drug: Drug;
  readonly result: CalculationResult;
  readonly patient: Patient;
  readonly indication?: string;
  readonly formulation?: string;
  readonly onRemove: (id: string) => void;
  readonly onIndication: (drugId: string, code?: string) => void;
  readonly onFormulation: (drugId: string, formulationId: string) => void;
  /**
   * `detail` — desktop дэлгэрэнгүй (Figma 127:426): «Яаж бодсон бэ?», тэмдэглэл, эх сурвалж
   * картаас гарч баруун aside-д (`desk/DetailAside`); устгах товч, жорын мөр байхгүй.
   */
  readonly variant?: "list" | "detail";
  /** Шилэн толгойн доорх үйлдлүүд (Жор хуулах, Хэвлэх) — зөвхөн `detail`. */
  readonly headerActions?: React.ReactNode;
}

type DosageProps = Omit<Props, "result"> & { readonly outcome: DosageOutcome };

/** Шилэн толгой — нэр, нотолгоо, тун (Figma 123:100). Хэвлэхэд энгийн цайвар. */
const GlassHeader = (props: DosageProps & { readonly selected?: FormulationAmount }) => {
  const { drug, outcome, patient, selected, onRemove } = props;
  const detail = props.variant === "detail";
  return (
    <div className="from-tile/25 bg-linear-to-b to-transparent p-3 print:bg-none">
      <div className="bg-card/55 rounded-2xl border p-4 backdrop-blur-md print:bg-transparent print:backdrop-blur-none">
        <DosageCardHeader drug={drug} route={outcome.rule.route} level={outcome.rule.evidenceLevel} onRemove={detail ? undefined : onRemove} />
        <DoseBand outcome={outcome} patient={patient} selected={selected} reviewed={drug.lastReviewed} />
        {props.headerActions}
      </div>
    </div>
  );
};

/** Яаж бодсон, тэмдэглэл, эх сурвалж — mobile/жагсаалтад картын дотор; `detail`-д aside-д. */
const Disclosures = ({ props, outcome }: { readonly props: Props; readonly outcome: DosageOutcome }) =>
  props.variant === "detail" ? <div className="h-4" /> : (
    <>
      <div className="mt-2">
        <TraceDetails trace={outcome.trace} />
        <NotesPanel notes={props.drug.notesMn} />
      </div>
      <SourceFooter outcome={outcome} />
    </>
  );

/**
 * Нэг эмийн тооцооллын үр дүн — V4 «баримт» (Figma 123:100, 130:1234, 130:1413).
 *
 * Дараалал нь эмчийн асуултын дараалал: ямар эм, ямар тун (шилэн толгой) →
 * ямар заалт → илүү сайн заалт бий юу → давтамж/хугацаа/өдрийн нийт →
 * хязгаартаа хэр ойр → аль бэлдмэлээр → анхааруулга → жорд юу бичих →
 * (хүсвэл) яаж бодсон, тэмдэглэл → эх сурвалж. Бүтэц өмнөхтэй ижил.
 */
export default function DosageCard(props: Props) {
  const { drug, result, patient, indication, onIndication } = props;
  if (result.type === "ineligible") {
    return <IneligibleCard drugName={drug.inn} outcome={result.data} />;
  }

  const outcome = result.data;
  const selected = selectedAmount(outcome, props.formulation);
  return (
    <Card id={drugAnchorId(drug.id)} className="scroll-mt-20 gap-0 overflow-hidden py-0 print:shadow-none">
      <GlassHeader {...props} outcome={outcome} selected={selected} />
      <IndicationPicker drug={drug} patient={patient} selected={indication} onSelect={onIndication} />
      <BetterEvidenceHint drug={drug} current={outcome.rule} patient={patient} onIndication={onIndication} />
      <div className="space-y-3 px-4 pt-3">
        <DoseTiles outcome={outcome} />
        <MaxDoseMeter outcome={outcome} />
      </div>
      <div className="mt-4">
        <FormulationTable
          amounts={outcome.amounts}
          selectedId={selected ? amountKey(selected) : undefined}
          onSelect={(id) => props.onFormulation(drug.id, id)}
        />
      </div>
      <WarningList warnings={outcome.warnings} />
      <RxLine drug={drug} outcome={outcome} selected={selected} />
      <Disclosures props={props} outcome={outcome} />
    </Card>
  );
}
