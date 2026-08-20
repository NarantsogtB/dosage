import type { CalculationResult } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import type { Patient } from "@/lib/domain/patient";
import type { InputStatus } from "./blocker";
import type { IndicationMap } from "./use-indications";
import DosageCard from "@/components/dosage/DosageCard";
import { blockerFor } from "./blocker";
import EmptyState from "./EmptyState";

interface Props {
  readonly drugs: readonly Drug[];
  readonly results: ReadonlyMap<string, CalculationResult>;
  readonly patient: Patient;
  readonly status: InputStatus;
  readonly indications: IndicationMap;
  readonly onRemove: (id: string) => void;
  readonly onIndication: (drugId: string, code?: string) => void;
}

/** Сонгосон эмүүдийн үр дүн, эсвэл дутуу зүйлийг нэрлэсэн хоосон төлөв. */
export default function ResultsPanel(props: Props) {
  const { drugs, results, patient, status } = props;
  const blocker = blockerFor(status);
  if (blocker) return <EmptyState {...blocker} />;

  return (
    <div className="space-y-4">
      {drugs.map((drug) => (
        <DosageCard
          key={drug.id}
          drug={drug}
          result={results.get(drug.id)!}
          patient={patient}
          indication={props.indications.get(drug.id)}
          onRemove={props.onRemove}
          onIndication={props.onIndication}
        />
      ))}
    </div>
  );
}
