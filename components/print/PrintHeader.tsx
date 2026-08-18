import type { Patient } from "@/lib/domain/patient";
import AgeDisplay from "@/components/dosage/AgeDisplay";

/** Хэвлэх хуудасны толгой: өвчтөний товч мэдээлэл. */
export default function PrintHeader({ patient }: { readonly patient: Patient }) {
  return (
    <div className="mb-4 border-b-2 border-slate-800 pb-3">
      <h1 className="text-lg font-bold text-slate-900">Эмийн тунгийн хуудас</h1>
      <div className="mt-1 flex gap-6 text-sm text-slate-700">
        <span>
          Жин: <strong>{patient.weightKg} кг</strong>
        </span>
        <span>
          Нас: <strong><AgeDisplay ageMonths={patient.ageMonths} /></strong>
        </span>
      </div>
    </div>
  );
}
