"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/** Хурдан сонголт: хөнгөн / дунд / дунд / хүнд. Оролт 1–10 бүхэл хэвээр (`isValidDeficitPercent`). */
const PRESETS = ["3", "5", "7", "10"] as const;

interface Props {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly invalid: boolean;
}

const Preset = ({ value, current, onChange }: { readonly value: string; readonly current: string; readonly onChange: (value: string) => void }) => (
  <button
    type="button"
    aria-pressed={value === current}
    onClick={() => onChange(value)}
    className={cn(
      "focus-visible:ring-ring num relative rounded-xl px-2.5 py-2 text-sm/[18px] font-semibold outline-none after:absolute after:-inset-[5px] focus-visible:ring-[3px]",
      value === current ? "bg-tile text-tile-foreground" : "bg-card",
    )}
  >
    {value}
  </button>
);

/**
 * «Шингэн алдалт 5 %» + 3/5/7/10 (Figma 163:1961 Deficit): raised, teal 2px хүрээ, r 18, p 8/8/8/16.
 * Товч 34px харагдах ч дарах талбай ≥44px (`after:-inset`).
 */
export default function DeficitInput({ value, onChange, invalid }: Props) {
  const id = useId();
  return (
    <div className="space-y-1.5">
      <div className="bg-muted border-primary flex items-center gap-2 rounded-[18px] border-2 py-2 pr-2 pl-4 focus-within:ring-[3px] focus-within:ring-ring/50">
        <label htmlFor={id} className="flex min-w-0 flex-1 flex-col">
          <span className="text-muted-foreground text-xs/[15px]">Шингэн алдалт</span>
          <span className="flex items-baseline gap-1 text-2xl/[31px] font-bold">
            <input
              id={id}
              inputMode="numeric"
              autoComplete="off"
              placeholder="—"
              value={value}
              aria-invalid={invalid}
              onChange={(event) => onChange(event.target.value.trim())}
              style={{ width: `${Math.max(value.length, 1) + 0.2}ch` }}
              className="num min-w-0 bg-transparent outline-none placeholder:text-muted-foreground"
            />
            %
          </span>
        </label>
        {PRESETS.map((preset) => <Preset key={preset} value={preset} current={value} onChange={onChange} />)}
      </div>
      {invalid ? <p role="alert" className="text-destructive text-xs/[15px]">1–10 хооронд бүхэл тоо</p> : null}
    </div>
  );
}
