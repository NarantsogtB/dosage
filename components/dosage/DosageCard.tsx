"use client";

import type { CalculationResult, DosageOutcome, FormulationAmount } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import type { Patient } from "@/lib/domain/patient";
import { primaryOf } from "@/lib/format/primary-formulation-line";
import { amountKey } from "@/lib/format/reconstitution";
import { Card } from "@/components/ui/card";
import { drugAnchorId } from "@/components/summary/drug-anchor";
import BetterEvidenceHint from "./BetterEvidenceHint";
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
}

/**
 * Сонгосон хэлбэр. Заалт солигдоход өмнөх сонголт шинэ жагсаалтад
 * байхгүй бол анхдагч (эхний шингэн) руу буцна. Төлөв нь `useChoices`-д.
 */
const selectedOf = (outcome: DosageOutcome, id?: string) =>
  outcome.amounts.find((amount) => amountKey(amount) === id) ?? primaryOf(outcome.amounts);

type DosageProps = Omit<Props, "result"> & { readonly outcome: DosageOutcome };

/** Шилэн толгой — нэр, нотолгоо, тун (Figma 123:100). Хэвлэхэд энгийн цайвар. */
const GlassHeader = (props: DosageProps & { readonly selected?: FormulationAmount }) => {
  const { drug, outcome, patient, selected, onRemove } = props;
  return (
    <div className="from-tile/25 bg-linear-to-b to-transparent p-3 print:bg-none">
      <div className="bg-card/55 rounded-2xl border p-4 backdrop-blur-md print:bg-transparent print:backdrop-blur-none">
        <DosageCardHeader drug={drug} route={outcome.rule.route} level={outcome.rule.evidenceLevel} onRemove={onRemove} />
        <DoseBand outcome={outcome} patient={patient} selected={selected} reviewed={drug.lastReviewed} />
      </div>
    </div>
  );
};

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
  const selected = selectedOf(outcome, props.formulation);
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
      <div className="mt-2">
        <TraceDetails trace={outcome.trace} />
        <NotesPanel notes={drug.notesMn} />
      </div>
      <SourceFooter outcome={outcome} />
    </Card>
  );
}
