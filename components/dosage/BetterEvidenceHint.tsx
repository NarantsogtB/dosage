"use client";

import { ArrowRight, Info } from "lucide-react";
import type { Drug } from "@/lib/domain/drug";
import type { DosingRule } from "@/lib/domain/dosing-rule";
import type { Patient } from "@/lib/domain/patient";
import { EVIDENCE_LABELS } from "@/lib/domain/source";
import { findBetterRule } from "@/lib/engine/rule/find-better-rule";
import { Button } from "@/components/ui/button";

interface Props {
  readonly drug: Drug;
  readonly current: DosingRule;
  readonly patient: Patient;
  readonly onIndication: (drugId: string, code?: string) => void;
}

const codeOf = (rule: DosingRule): string | undefined =>
  rule.indication === "general" ? undefined : rule.indication.code;

const labelOf = (rule: DosingRule): string =>
  rule.indication === "general" ? "Ерөнхий" : rule.indication.labelMn;

/**
 * Илүү сайн эх сурвалжтай дүрэм байвал эмчид зам зааж өгнө.
 *
 * V3.1: картын ХАМГИЙН ДООРООС заалтын доор, тунгаас ӨМНӨ шилжүүлэв —
 * эмч тоог уншихаас өмнө «илүү сайн заалт бий» гэдгийг харах ёстой.
 *
 * Badge-ийг «баталгаажсан» болгож солихгүй — харагдаж буй тоо тэр
 * эх сурвалжаас гараагүй бол тэгж хэлэх нь худал болно.
 */
export default function BetterEvidenceHint(props: Props) {
  const better = findBetterRule(props.drug, props.current, props.patient);
  if (!better) return null;

  return (
    <div className="bg-primary/5 border-primary/20 mx-5 mb-3 flex gap-2.5 rounded-md border px-3 py-2.5 print:hidden">
      <Info aria-hidden className="text-primary mt-0.5 size-4 shrink-0" />
      <div>
      <p className="text-muted-foreground text-sm">
        <strong className="text-foreground">{labelOf(better)}</strong> заалтад{" "}
        {EVIDENCE_LABELS[better.evidenceLevel]} тун бий.
      </p>
      <Button
        type="button"
        variant="link"
        size="sm"
        className="h-auto min-h-9 p-0 text-sm"
        onClick={() => props.onIndication(props.drug.id, codeOf(better))}
      >
        Энэ заалтаар тооцоолох
        <ArrowRight className="size-3" />
      </Button>
      </div>
    </div>
  );
}
