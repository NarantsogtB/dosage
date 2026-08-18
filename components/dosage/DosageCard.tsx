import type { CalculationResult } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import type { Patient } from "@/lib/domain/patient";
import { Card } from "@/components/ui/card";
import { drugAnchorId } from "@/components/summary/drug-anchor";
import DosageCardHeader from "./DosageCardHeader";
import IndicationPicker from "./IndicationPicker";
import DoseSummary from "./DoseSummary";
import FormulationList from "./FormulationList";
import IneligibleCard from "./IneligibleCard";
import NotesPanel from "./NotesPanel";
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

/** Нэг эмийн тооцооллын үр дүн. */
export default function DosageCard(props: Props) {
  const { drug, result, patient, indication, onRemove, onIndication } = props;
  if (result.type === "ineligible") {
    return <IneligibleCard drugName={drug.inn} outcome={result.data} />;
  }

  const outcome = result.data;
  return (
    <Card
      id={drugAnchorId(drug.id)}
      className="gap-0 scroll-mt-40 overflow-hidden py-0 print:shadow-none"
    >
      <DosageCardHeader
        drug={drug}
        route={outcome.rule.route}
        patient={patient}
        onRemove={onRemove}
      />
      <IndicationPicker
        drug={drug}
        patient={patient}
        selected={indication}
        onSelect={onIndication}
      />
      <DoseSummary outcome={outcome} />
      <FormulationList amounts={outcome.amounts} />
      <WarningList warnings={outcome.warnings} />
      <NotesPanel notes={drug.notesMn} />
      <TraceDetails trace={outcome.trace} />
      <SourceFooter
        drug={drug}
        outcome={outcome}
        patient={patient}
        onIndication={onIndication}
      />
    </Card>
  );
}
