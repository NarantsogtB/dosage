"use client";

import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  readonly active: boolean;
  readonly count: number;
  readonly onToggle: () => void;
}

/** Зөвхөн эх сурвалж баталгаажсан эмийг харуулах шүүлтүүр. */
export default function VerifiedToggle({ active, count, onToggle }: Props) {
  return (
    <Button
      type="button"
      size="pill"
      variant={active ? "default" : "secondary"}
      aria-pressed={active}
      onClick={onToggle}
      title="Эх сурвалж баталгаажсан эм"
    >
      <ShieldCheck />
      Баталгаажсан · {count}
    </Button>
  );
}
