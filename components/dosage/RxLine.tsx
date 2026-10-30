import type { DosageOutcome, FormulationAmount } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import { FLAGS } from "@/lib/flags";
import { prescriptionLine } from "@/lib/format/format-prescription";
import { formulationLine } from "@/lib/format/primary-formulation-line";
import CopyButton from "@/components/summary/CopyButton";

interface Props {
  readonly drug: Drug;
  readonly outcome: DosageOutcome;
  readonly selected?: FormulationAmount;
}

/**
 * Хэлбэр/мл-ийг жорын мөрөнд нэмэх нь эмнэлзүйн хяналт хүлээж байна
 * (`FLAGS.rxFormulation`). Унтраалттай үед одоогийн «мг + давтамж».
 */
const withFormulation = (selected?: FormulationAmount): readonly string[] =>
  FLAGS.rxFormulation && selected ? [formulationLine(selected)] : [];

const linesOf = ({ drug, outcome, selected }: Props): readonly string[] => [
  prescriptionLine(drug, { type: "dosage", data: outcome }) ?? "",
  ...withFormulation(selected),
];

/**
 * Энэ эмийн жорын мөр + хуулах — Figma "Rx line" (V3 · 02).
 *
 * Эмч хуулахаасаа ӨМНӨ яг юу хуулагдахыг харна. Бүх эмийн жорыг хуулах
 * үндсэн үйлдэл нь action bar / үр дүнгийн толгойд; энэ нь ганц эмийнх.
 */
export default function RxLine(props: Props) {
  const lines = linesOf(props);
  return (
    <div className="mx-5 mb-4 flex items-start gap-3 rounded-lg border bg-muted/50 p-3.5">
      <p className="flex-1 text-sm leading-relaxed">
        <span className="font-semibold">{lines[0]}</span>
        {lines[1] ? (
          <span className="text-muted-foreground block text-xs">{lines[1]}</span>
        ) : null}
      </p>
      <CopyButton
        text={lines.join("\n")}
        drugIds={[props.drug.id]}
        variant="outline"
        size="icon"
        iconOnly
        label={`${props.drug.inn} — жорын мөр хуулах`}
        className="print:hidden"
      />
    </div>
  );
}
