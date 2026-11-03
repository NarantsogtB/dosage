import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import type { Drug } from "@/lib/domain/drug";
import type { DosingRule } from "@/lib/domain/dosing-rule";
import { EVIDENCE_LABELS } from "@/lib/domain/source";
import { FREQUENCY_SHORT } from "@/lib/format/format-frequency-short";
import { ruleSummary } from "@/lib/search/drug-row-summary";
import { drugSources } from "@/lib/drug-page/drug-sources";
import ReviewDate from "@/components/dosage/ReviewDate";
import SectionLabel from "@/components/dosage/SectionLabel";
import SourceList from "@/components/dosage/SourceList";

interface SectionProps {
  readonly title: string;
  readonly items: readonly string[];
}

/** Жагсаалттай хэсэг. Хоосон бол харагдахгүй. */
const ListSection = ({ title, items }: SectionProps) =>
  items.length === 0 ? null : (
    <section className="space-y-1.5">
      <SectionLabel>{title}</SectionLabel>
      <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );

const ruleLine = (rule: DosingRule): string =>
  `${ruleSummary(rule)} · ${FREQUENCY_SHORT[rule.frequency]} — ${EVIDENCE_LABELS[rule.evidenceLevel]}`;

const Unverified = () => (
  <p className="text-warning-text text-sm">
    ⚠️ Энэ эмийн тунд эх сурвалж хараахан хавсаргаагүй. Тооцооллыг
    эмнэлзүйн шийдвэрээр заавал нягтална уу.
  </p>
);

const Sources = ({ drug }: { readonly drug: Drug }): ReactNode => {
  const sources = drugSources(drug);
  return sources.length > 0 ? <SourceList sources={sources} /> : <Unverified />;
};

/**
 * Эмийн өгөгдлийг СЕРВЕР талд, статик HTML болгон харуулна — Google
 * уншина, тооцоолуур ачаалагдаагүй ч харагдана.
 *
 * Шинэ өгөгдөл ЗОХИОХГҮЙ: бүх мөр `lib/data/drugs/*`-ээс шууд.
 * Эх сурвалжийн мөрдөлт (source traceability) нь хуудасны гол утга.
 *
 * V3.1 «Drug reference»: хураагдсан `<details>` — тооцоолуурыг доош
 * түлхэхгүй. Агуулга нь DOM-д бүтнээрээ байгаа тул Google, Ctrl+F,
 * хэвлэлт бүгд олно.
 */
export default function DrugInfo({ drug }: { readonly drug: Drug }) {
  return (
    <details className="group bg-card text-card-foreground rounded-xl border shadow-sm">
      <summary className="hover:bg-accent/50 flex min-h-14 cursor-pointer list-none items-center gap-3 rounded-xl px-5 py-3">
        <h2 className="flex-1 text-lg font-semibold">Эмийн лавлах мэдээлэл</h2>
        <ChevronDown aria-hidden className="text-muted-foreground size-5 transition-transform group-open:rotate-180" />
      </summary>
      <div className="space-y-5 border-t px-5 py-5">
        <ListSection title="Заалт ба тун" items={drug.rules.map(ruleLine)} />
        <ListSection
          title="Бэлдмэл"
          items={drug.formulations.map((formulation) => formulation.labelMn)}
        />
        <ListSection
          title="Анхааруулга"
          items={drug.warnings.map((warning) => warning.messageMn)}
        />
        <ListSection title="Эсрэг заалт" items={drug.contraindicationsMn} />
        <ListSection title="Тэмдэглэл" items={drug.notesMn ? [drug.notesMn] : []} />
        <section className="space-y-1.5">
          <SectionLabel>Эх сурвалж</SectionLabel>
          <Sources drug={drug} />
          <p className="text-xs">
            <ReviewDate date={drug.lastReviewed} />
          </p>
        </section>
      </div>
    </details>
  );
}
