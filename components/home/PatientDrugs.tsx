"use client";

import { Pill, Plus } from "lucide-react";
import type { CalculationResult, DosageOutcome } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import { formatAmount } from "@/lib/format/format-amount";
import { formatDose } from "@/lib/format/format-dose";
import { prescriptionLine } from "@/lib/format/format-prescription";
import { primaryOf } from "@/lib/format/primary-formulation-line";
import { Button } from "@/components/ui/button";
import EvidenceDot from "@/components/dosage/EvidenceDot";
import { requestSearchFocus } from "@/components/search/search-focus";
import CopyButton from "@/components/summary/CopyButton";
import { drugAnchorId } from "@/components/summary/drug-anchor";

interface Props {
  readonly drugs: readonly Drug[];
  readonly results: ReadonlyMap<string, CalculationResult>;
}

/** «500 мг = 20 мл» — мг, мл хоёр ижил жинтэй (9c-ийн дүрэм). */
const Amount = ({ data }: { readonly data: DosageOutcome }) => {
  const primary = primaryOf(data.amounts);
  return (
    <p className="num text-lg font-bold">
      {formatDose(data.perDose, data.doseUnit)}
      {primary ? <span className="text-primary"> = {formatAmount(primary)}</span> : null}
    </p>
  );
};

const Body = ({ result }: { readonly result?: CalculationResult }) =>
  result?.type === "dosage" ? (
    <Amount data={result.data} />
  ) : (
    <p className="text-muted-foreground text-sm">тооцоолол боломжгүй</p>
  );

const DrugRow = ({ drug, result }: { readonly drug: Drug; readonly result?: CalculationResult }) => {
  const line = prescriptionLine(drug, result);
  return (
    <li className="bg-card flex items-center gap-3 rounded-2xl p-3">
      <span className="bg-tile text-tile-foreground grid size-11 shrink-0 place-items-center rounded-xl">
        <Pill aria-hidden className="size-5" />
      </span>
      <a href={`#${drugAnchorId(drug.id)}`} className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate font-semibold">{drug.innMn}</span>
          <EvidenceDot drug={drug} />
        </span>
        <Body result={result} />
      </a>
      {line ? (
        <CopyButton text={line} drugIds={[drug.id]} variant="ghost" size="icon" label="Жор хуулах" iconOnly />
      ) : null}
    </li>
  );
};

/** «Энэ өвчтөнд» — идэвхтэй өвчтөний эмүүд, нэг мөр = нэг эм. */
export default function PatientDrugs({ drugs, results }: Props) {
  return (
    <section aria-labelledby="patient-drugs" className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 id="patient-drugs" className="text-xl font-bold">
          Энэ өвчтөнд
        </h2>
        <Button type="button" variant="secondary" size="icon" aria-label="Эм нэмэх" onClick={requestSearchFocus}>
          <Plus aria-hidden />
        </Button>
      </div>
      {drugs.length === 0 ? (
        <p className="text-muted-foreground text-sm">Эм сонгоогүй байна. Доороос хайж нэмнэ үү.</p>
      ) : (
        <ul className="space-y-2">
          {drugs.map((drug) => (
            <DrugRow key={drug.id} drug={drug} result={results.get(drug.id)} />
          ))}
        </ul>
      )}
    </section>
  );
}
