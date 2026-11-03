"use client";

import { useState } from "react";
import type { CalculationResult, DosageOutcome } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import type { Patient } from "@/lib/domain/patient";
import { primaryOf } from "@/lib/format/primary-formulation-line";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { drugAnchorId } from "@/components/summary/drug-anchor";
import BetterEvidenceHint from "./BetterEvidenceHint";
import DosageCardHeader from "./DosageCardHeader";
import DoseBand from "./DoseBand";
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
  readonly onRemove: (id: string) => void;
  readonly onIndication: (drugId: string, code?: string) => void;
}

/**
 * Сонгосон хэлбэр. Заалт солигдоход өмнөх сонголт шинэ жагсаалтад
 * байхгүй бол анхдагч (эхний шингэн) руу буцна.
 */
const useFormulation = (outcome: DosageOutcome) => {
  const [id, setId] = useState<string>();
  const selected =
    outcome.amounts.find((amount) => amount.formulation.id === id) ??
    primaryOf(outcome.amounts);
  return { selected, select: setId };
};

type DosageProps = Omit<Props, "result"> & { readonly outcome: DosageOutcome };

const DosageBody = (props: DosageProps) => {
  const { drug, outcome, patient } = props;
  const formulation = useFormulation(outcome);
  return (
    <>
      <DoseBand outcome={outcome} patient={patient} selected={formulation.selected} />
      <FormulationTable
        amounts={outcome.amounts}
        selectedId={formulation.selected?.formulation.id}
        onSelect={formulation.select}
      />
      <div className="space-y-3 px-5 pb-4">
        <MaxDoseMeter outcome={outcome} />
      </div>
      <WarningList warnings={outcome.warnings} />
      {outcome.warnings.length > 0 ? <div className="h-4" /> : null}
      <RxLine drug={drug} outcome={outcome} selected={formulation.selected} />
    </>
  );
};

/**
 * Нэг эмийн тооцооллын үр дүн — Figma "Dose result card" (V3.1 · 03).
 *
 * Дараалал нь эмчийн асуултын дараалал: ямар эм → ямар заалт → илүү
 * сайн заалт бий юу → хэд өгөх → аль бэлдмэлээр → хязгаартаа хэр ойр →
 * жорд юу бичих → (хүсвэл) яаж бодсон, тэмдэглэл → эх сурвалж.
 */
export default function DosageCard(props: Props) {
  const { drug, result, patient, indication, onRemove, onIndication } = props;
  if (result.type === "ineligible") {
    return <IneligibleCard drugName={drug.inn} outcome={result.data} />;
  }

  const outcome = result.data;
  return (
    <Card
      id={drugAnchorId(drug.id)}
      className="scroll-mt-20 gap-0 overflow-hidden py-0 print:shadow-none"
    >
      <DosageCardHeader drug={drug} route={outcome.rule.route} onRemove={onRemove} />
      <IndicationPicker drug={drug} patient={patient} selected={indication} onSelect={onIndication} />
      <BetterEvidenceHint drug={drug} current={outcome.rule} patient={patient} onIndication={onIndication} />
      <Separator />
      <DosageBody {...props} outcome={outcome} />
      <TraceDetails trace={outcome.trace} />
      <NotesPanel notes={drug.notesMn} />
      <SourceFooter drug={drug} outcome={outcome} />
    </Card>
  );
}
