import type { DosageOutcome } from "@/lib/domain/calculation-result";
import { primaryFormulationLine } from "@/lib/format/primary-formulation-line";
import { doseParts } from "@/lib/format/dose-parts";
import { cn } from "@/lib/utils";
import { EVIDENCE_TONES } from "./evidence-tone";
import DoseMetaGrid from "./DoseMetaGrid";
import DoseReadout from "./DoseReadout";
import SectionLabel from "./SectionLabel";

/**
 * ★ ГАРЫН ҮСЭГ — тунгийн зурвас. Figma "Dose readout" (node 14:76).
 *
 * Хуудасны цорын ганц чанга элемент. Эмчийн хайж буй зүйл нэг л тоо:
 * нэг удаад хэдийг өгөх вэ. Тэрийг хамгийн том, хамгийн тод болгож,
 * эргэн тойрны бүхнийг нам гүм болгосон.
 *
 * Зүүн ирмэгийн зураас нь нотолгооны түвшин — «ямар тун» ба «хэр
 * итгэх вэ» хоёрыг НЭГ дүрсэлбэрт нэгтгэв. Өнгө ганцаараа утга
 * дамжуулахгүй: SourceFooter дээр мөн текстээр бичигдэнэ.
 *
 * Figma-гийн эх загвараас: overline "Нэг удаагийн тун" → том тоо →
 * хөрвүүлгийн мөр ("= 7.5 мл · 250 мг / 5 мл") → зураас → 3 баганат
 * мета (давтамж/хугацаа/өдрийн нийт). Дээд хязгаарт хүрсэн үед доор нь
 * `CapAlert` (тусдаа компонент, `DosageCard`-д залгагдсан).
 */
export default function DoseBand({
  outcome,
}: {
  readonly outcome: DosageOutcome;
}) {
  const per = doseParts(outcome.perDose);
  const conversion = primaryFormulationLine(outcome.amounts);
  const tone = EVIDENCE_TONES[outcome.rule.evidenceLevel].rule;

  return (
    <div className="relative space-y-3 py-4 pl-6 pr-5">
      <span
        aria-hidden
        className={cn("absolute inset-y-0 left-0 w-[3px]", tone)}
      />
      <SectionLabel>Нэг удаагийн тун</SectionLabel>
      <DoseReadout
        value={per.value}
        unit={per.unit}
        className="text-4xl leading-none sm:text-[44px] sm:leading-[48px]"
        unitClassName="text-xl font-semibold sm:text-[22px]"
      />
      {conversion ? (
        <p className="text-muted-foreground text-[15px] font-semibold leading-6 sm:text-[17px]">
          {conversion}
        </p>
      ) : null}
      <div className="border-border/70 border-t pt-3">
        <DoseMetaGrid outcome={outcome} />
      </div>
    </div>
  );
}
