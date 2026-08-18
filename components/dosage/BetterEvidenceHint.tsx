"use client";

import { ArrowRight } from "lucide-react";
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
 * Badge-ийг «баталгаажсан» болгож солихгүй — харагдаж буй тоо тэр
 * эх сурвалжаас гараагүй бол тэгж хэлэх нь худал болно.
 */
export default function BetterEvidenceHint(props: Props) {
  const better = findBetterRule(props.drug, props.current, props.patient);
  if (!better) return null;

  return (
    <div className="bg-primary/5 border-primary/20 mt-2 w-full rounded-md border px-3 py-2">
      <p className="text-muted-foreground text-xs">
        <strong className="text-foreground">{labelOf(better)}</strong> заалтад{" "}
        {EVIDENCE_LABELS[better.evidenceLevel]} тун бий.
      </p>
      <Button
        type="button"
        variant="link"
        size="sm"
        className="h-auto p-0 text-xs"
        onClick={() => props.onIndication(props.drug.id, codeOf(better))}
      >
        Энэ заалтаар тооцоолох
        <ArrowRight className="size-3" />
      </Button>
    </div>
  );
}
