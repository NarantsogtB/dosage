import type { CalculationResult } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import type { Patient } from "@/lib/domain/patient";
import PrintHeader from "./PrintHeader";
import PrintRow from "./PrintRow";

interface Props {
  readonly drugs: readonly Drug[];
  readonly results: ReadonlyMap<string, CalculationResult>;
  readonly patient: Patient;
}

const NOTE =
  "Энэ тооцоолол нь эмнэлгийн мэргэжилтний эмнэлзүйн шийдвэрийг орлохгүй.";

/** Зөвхөн хэвлэх үед харагдах хураангуй. */
export default function PrintTemplate({ drugs, results, patient }: Props) {
  if (drugs.length === 0) return null;
  return (
    <section className="hidden print:block p-10">
      <PrintHeader patient={patient} />
      {drugs.map((drug) => (
        <PrintRow key={drug.id} drug={drug} result={results.get(drug.id)} />
      ))}
      <p className="mt-4 text-xs text-slate-500">{NOTE}</p>
    </section>
  );
}
