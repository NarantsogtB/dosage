"use client";

import { BookOpen } from "lucide-react";
import { EVIDENCE_LABELS } from "@/lib/domain/source";
import { EVIDENCE_ORDER } from "@/lib/engine/rule/drug-evidence";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EVIDENCE_LETTERS, EVIDENCE_TONES } from "@/components/dosage/evidence-tone";
import { cn } from "@/lib/utils";
import SettingsRow from "./SettingsRow";

/** «Нотолгооны шат A–E» — түвшин бүрийн тайлбар (цэг + үсэг + текст). */
export default function EvidenceLadderRow() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <SettingsRow icon={BookOpen} label="Нотолгооны шат" value="A–E" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Нотолгооны шат</DialogTitle>
          <DialogDescription>Эх сурвалжийн чанар — эмнэлзүйн хяналт БИШ.</DialogDescription>
        </DialogHeader>
        <ul className="space-y-2">
          {EVIDENCE_ORDER.map((level) => (
            <li key={level} className="flex items-center gap-3 text-sm">
              <span aria-hidden className={cn("size-2.5 shrink-0 rounded-full", EVIDENCE_TONES[level].dot)} />
              <span className="num w-4 font-semibold">{EVIDENCE_LETTERS[level]}</span>
              {EVIDENCE_LABELS[level]}
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
