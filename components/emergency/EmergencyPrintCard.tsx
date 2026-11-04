import type { Patient } from "@/lib/domain/patient";
import type { EmergencyDrugRow, EmergencyItemRow } from "@/lib/emergency/emergency-rows";
import { formatAmount } from "@/lib/format/format-amount";
import { formatDose } from "@/lib/format/format-dose";
import PrintHeader from "@/components/print/PrintHeader";

interface Props {
  readonly patient: Patient;
  readonly drugRows: readonly EmergencyDrugRow[];
  readonly itemRows: readonly EmergencyItemRow[];
}

/** Нэг хуудас «жингийн карт» — зөвхөн хэвлэхэд (Шат 7). */
export default function EmergencyPrintCard({ patient, drugRows, itemRows }: Props) {
  if (drugRows.length + itemRows.length === 0) return null;
  return (
    <section className="hidden print:block">
      <PrintHeader patient={patient} />
      <table className="w-full text-sm">
        <tbody>
          {drugRows.map((row) => (
            <tr key={row.key} className="border-b border-slate-200">
              <td className="py-1.5 font-semibold">{row.drug.inn} · {row.indicationMn}</td>
              <td className="py-1.5 text-right">{formatDose(row.outcome.perDose, row.outcome.doseUnit)}</td>
              <td className="py-1.5 text-right">{row.amount ? formatAmount(row.amount) : ""}</td>
            </tr>
          ))}
          {itemRows.map((row) => (
            <tr key={row.item.id} className="border-b border-slate-200">
              <td className="py-1.5 font-semibold">{row.item.labelMn}</td>
              <td className="py-1.5 text-right">{row.value.value} {row.value.unitMn}</td>
              <td />
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-xs text-slate-500">
        Энэ карт нь эмнэлгийн мэргэжилтний эмнэлзүйн шийдвэрийг орлохгүй.
      </p>
    </section>
  );
}
