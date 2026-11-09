import type { ReactNode } from "react";
import { BookOpen, Calculator, Info, NotebookPen } from "lucide-react";
import type { CalculationResult, DosageOutcome } from "@/lib/domain/calculation-result";
import type { Drug } from "@/lib/domain/drug";
import { EVIDENCE_LABELS } from "@/lib/domain/source";
import { EVIDENCE_ORDER } from "@/lib/engine/rule/drug-evidence";
import Disclaimer from "@/components/Disclaimer";
import { EVIDENCE_LETTERS, EVIDENCE_TONES } from "@/components/dosage/evidence-tone";
import ReviewDate from "@/components/dosage/ReviewDate";
import SourceList from "@/components/dosage/SourceList";
import { cn } from "@/lib/utils";

const Panel = ({ icon: Icon, title, children }: { readonly icon: typeof Info; readonly title: string; readonly children: ReactNode }) => (
  <section className="bg-card space-y-2 rounded-2xl p-4">
    <h2 className="flex items-center gap-2 text-sm font-semibold">
      <Icon aria-hidden className="text-primary size-4" />
      {title}
    </h2>
    {children}
  </section>
);

/** Идэвхтэй дүрмийн нотолгоо + A–E шат. «Эх сурвалж ≠ эмчийн хяналт». */
const Evidence = ({ outcome }: { readonly outcome: DosageOutcome }) => {
  const level = outcome.rule.evidenceLevel;
  return (
    <Panel icon={Info} title={EVIDENCE_LABELS[level]}>
      <ul className="space-y-1 text-xs">
        {EVIDENCE_ORDER.map((item) => (
          <li key={item} className={cn("text-muted-foreground flex items-center gap-2", item === level && "text-foreground font-semibold")}>
            <span aria-hidden className={cn("size-2 rounded-full", EVIDENCE_TONES[item].dot)} />
            <span className="num w-3">{EVIDENCE_LETTERS[item]}</span>
            {EVIDENCE_LABELS[item]}
          </li>
        ))}
      </ul>
      <p className="text-muted-foreground text-xs">Эх сурвалжийн чанар — эмнэлзүйн хяналт БИШ.</p>
    </Panel>
  );
};

const Trace = ({ outcome }: { readonly outcome: DosageOutcome }) =>
  outcome.trace.length === 0 ? null : (
    <Panel icon={Calculator} title="Яаж бодсон бэ?">
      <dl className="space-y-1.5">
        {outcome.trace.map((step) => (
          <div key={step.labelMn} className="flex justify-between gap-3 text-xs">
            <dt className="text-muted-foreground">{step.labelMn}</dt>
            <dd className="num text-right font-semibold">{step.expression}</dd>
          </div>
        ))}
      </dl>
    </Panel>
  );

const Sources = ({ outcome, drug }: { readonly outcome: DosageOutcome; readonly drug: Drug }) => (
  <Panel icon={BookOpen} title={`Эх сурвалж · ${outcome.sources.length}`}>
    <SourceList sources={outcome.sources} />
    <p className="text-xs"><ReviewDate date={drug.lastReviewed} /></p>
  </Panel>
);

const Notes = ({ notes }: { readonly notes?: string }) =>
  notes ? (
    <Panel icon={NotebookPen} title="Тэмдэглэл">
      <p className="text-muted-foreground text-xs leading-relaxed">{notes}</p>
    </Panel>
  ) : null;

const Details = ({ drug, result }: { readonly drug: Drug; readonly result?: CalculationResult }) =>
  result?.type === "dosage" ? (
    <>
      <Evidence outcome={result.data} />
      <Trace outcome={result.data} />
      <Sources outcome={result.data} drug={drug} />
      <Notes notes={drug.notesMn} />
    </>
  ) : null;

/** Эмийн дэлгэрэнгүйн баруун багана: нотолгоо, trace, эх сурвалж, тэмдэглэл, анхааруулга (Figma 127:426). */
export default function DetailAside({ drug, result }: { readonly drug: Drug; readonly result?: CalculationResult }) {
  return (
    <div className="space-y-4 print:hidden">
      <Details drug={drug} result={result} />
      <Disclaimer />
    </div>
  );
}
