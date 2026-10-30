"use client";

import type { CalculationResult } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import type { Patient } from "@/lib/domain/patient";
import { prescriptionText } from "@/lib/format/format-prescription";
import CopyButton from "@/components/summary/CopyButton";
import PrintButton from "./PrintButton";

interface Props {
  readonly drugs: readonly Drug[];
  readonly results: ReadonlyMap<string, CalculationResult>;
  readonly patient: Patient;
}

/**
 * Жороо хуулах, хэвлэх товч — үр дүнгийн гарчгийн эгнээнд.
 *
 * Өмнө нь хэвлэх товч хуудасны ХАМГИЙН ДООД ТАЛД дан ганцаараа байсан:
 * олон эм сонгосон үед доош гүйлгэхгүйгээр олдохгүй байв. Figma-гийн Dose
 * Calculator (node 20:125) энэ хоёр үйлдлийг үр дүнгийн ХАМГИЙН ДЭЭД
 * талд, "Үр дүн" гарчгийн хажууд байрлуулдаг тул нүүлгэв.
 */
export default function ResultsActions({ drugs, results, patient }: Props) {
  if (drugs.length === 0) return null;
  return (
    <div className="flex items-center gap-2 print:hidden">
      <CopyButton
        text={prescriptionText(drugs, results, patient)}
        drugIds={drugs.map((drug) => drug.id)}
        variant="default"
        size="sm"
        label="Жороо хуулах"
      />
      <PrintButton visible onPrint={() => window.print()} />
    </div>
  );
}
