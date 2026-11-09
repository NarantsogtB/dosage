"use client";

import { useId, useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { calculateDosage } from "@/lib/engine";
import EvidenceChip from "@/components/v4/EvidenceChip";
import { DEMO } from "./demo-case";
import DemoOutput from "./DemoOutput";
import Eyebrow from "./Eyebrow";

const STEP = (value: string, delta: number): string => `${Math.max(1, Math.round((Number(value) || 0) + delta))}`;

const Stepper = ({ label, onClick, children }: { readonly label: string; readonly onClick: () => void; readonly children: React.ReactNode }) => (
  <button type="button" aria-label={label} onClick={onClick} className="bg-muted focus-visible:ring-ring grid size-12 shrink-0 place-items-center rounded-[14px] outline-none focus-visible:ring-[3px]">
    {children}
  </button>
);

/** «Жин 14 кг − +» — teal 2px хүрээ, r 18 (Figma demo card). */
const WeightField = ({ value, onChange }: { readonly value: string; readonly onChange: (value: string) => void }) => {
  const id = useId();
  return (
    <div className="bg-card border-primary flex items-center gap-2.5 rounded-[18px] border-2 py-1.5 pr-1.5 pl-[18px] focus-within:ring-[3px] focus-within:ring-ring/50">
      <label htmlFor={id} className="flex min-w-0 flex-1 flex-col">
        <span className="text-muted-foreground text-xs/[15px]">Жин</span>
        <span className="flex items-baseline gap-1.5 text-[26px]/[33px] font-bold">
          <input id={id} inputMode="decimal" autoComplete="off" value={value} onChange={(event) => onChange(event.target.value.trim())} style={{ width: `${Math.max(value.length, 1) + 0.2}ch` }} className="num min-w-0 bg-transparent outline-none" />
          кг
        </span>
      </label>
      <Stepper label="Жин хасах" onClick={() => onChange(STEP(value, -1))}><Minus aria-hidden className="size-5" /></Stepper>
      <Stepper label="Жин нэмэх" onClick={() => onChange(STEP(value, 1))}><Plus aria-hidden className="size-5" /></Stepper>
    </div>
  );
};

/**
 * ★ Амьд жишээ — бодит engine. Эмч жинг өөрчлөхөд тун шууд өөрчлөгдөж, доор нь ДЭМБ-ын
 * эх бичвэрийн ишлэл гарна. Зураг биш тул өгөгдөл өөрчлөгдөхөд танилцуулга хуучрахгүй.
 */
export default function HeroDemo() {
  const [weight, setWeight] = useState<string>(DEMO.defaultWeightKg);
  const result = useMemo(
    () => calculateDosage(DEMO.drug, { weightKg: Number(weight) || 0, ageMonths: DEMO.ageMonths }, { indicationCode: DEMO.indicationCode }),
    [weight],
  );
  return (
    <div className="flex flex-col gap-2.5">
      <Eyebrow>Амьд жишээ · жинг өөрчлөөд үз</Eyebrow>
      <section aria-label="Амьд жишээ" className="flex flex-col gap-3 rounded-[28px] border border-border bg-card dark:border-white/14 dark:bg-white/6 p-5">
        <div className="flex items-center gap-2">
          <h2 className="flex-1 text-lg/[23px] font-semibold">{DEMO.drug.innMn}</h2>
          <EvidenceChip drug={DEMO.drug} />
        </div>
        <p className="text-muted-foreground text-[13px]/[17px]">{DEMO.ageLabelMn} · {DEMO.conditionMn}</p>
        <WeightField value={weight} onChange={setWeight} />
        <DemoOutput result={result} />
      </section>
    </div>
  );
}
