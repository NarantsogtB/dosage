import type { ReactNode } from "react";
import type { Drug } from "@/lib/domain/drug";
import type { DosingRule } from "@/lib/domain/dosing-rule";
import { EVIDENCE_LABELS } from "@/lib/domain/source";
import { FREQUENCY_SHORT } from "@/lib/format/format-frequency-short";
import { ruleSummary } from "@/lib/search/drug-row-summary";
import { drugSources } from "@/lib/drug-page/drug-sources";
import { Card, CardContent } from "@/components/ui/card";
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
 */
export default function DrugInfo({ drug }: { readonly drug: Drug }) {
  return (
    <Card>
      <CardContent className="space-y-5">
        <h2 className="text-lg font-semibold">Эмийн мэдээлэл</h2>
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
      </CardContent>
    </Card>
  );
}
