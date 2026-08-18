import type { CalculationResult } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import type { Patient } from "@/lib/domain/patient";
import type { IndicationMap } from "./use-indications";
import DosageCard from "@/components/dosage/DosageCard";
import EmptyState from "./EmptyState";

interface Props {
  readonly drugs: readonly Drug[];
  readonly results: ReadonlyMap<string, CalculationResult>;
  readonly patient: Patient;
  readonly ready: boolean;
  readonly indications: IndicationMap;
  readonly onRemove: (id: string) => void;
  readonly onIndication: (drugId: string, code?: string) => void;
}

const EMPTY = {
  noDrug: {
    title: "Тун харагдахгүй байна",
    hint: "Өвчтөний жин оруулж, эм сонгоно уу.",
  },
  noWeight: {
    title: "Жин оруулаагүй байна",
    hint: "Тун тооцоолохын тулд өвчтөний жинг оруулна уу.",
  },
};

/** Сонгосон эмүүдийн үр дүн, эсвэл хоосон төлөв. */
export default function ResultsPanel(props: Props) {
  const { drugs, results, patient, ready } = props;
  if (drugs.length === 0) return <EmptyState {...EMPTY.noDrug} />;
  if (!ready) return <EmptyState {...EMPTY.noWeight} />;

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
