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

/**
 * Зөвхөн хэвлэх үед харагдах хураангуй.
 *
 * `results` нь жин, нас хүчинтэй үед л дүүрнэ. Түүнээс өмнө render
 * хийхгүй: эмийн хуудас (`/dose/[slug]`) эмийг урьдчилан сонгодог тул
 * эс бөгөөс «Жин: 0 кг» гэсэн хоосон хуудас статик HTML-д орж, Google
 * үүнийг хуудасны агуулга гэж уншина.
 */
export default function PrintTemplate({ drugs, results, patient }: Props) {
  if (results.size === 0) return null;
  return (
    <section className="hidden print:block">
      <PrintHeader patient={patient} />
      {drugs.map((drug) => (
        <PrintRow key={drug.id} drug={drug} result={results.get(drug.id)} />
      ))}
      <p className="mt-4 text-xs text-slate-500">{NOTE}</p>
    </section>
  );
}
