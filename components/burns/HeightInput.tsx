"use client";

import { useId } from "react";

interface Props {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

/**
 * Өндөр — зөвхөн Гальвестоны БГТ-д. Өвчтөний бүртгэлд өндөр байхгүй тул энд (Figma-д
 * оролт зураагүй — HANDOFF §7). Шингэн алдалтын талбартай ижил хэлбэр: raised, r 18.
 */
export default function HeightInput({ value, onChange }: Props) {
  const id = useId();
  return (
    <div className="bg-muted flex items-center gap-2 rounded-[18px] px-4 py-2 focus-within:ring-[3px] focus-within:ring-ring/50">
      <label htmlFor={id} className="text-muted-foreground flex-1 text-xs/[15px]">
        Өндөр <span className="opacity-80">· заавал биш, Гальвестонд</span>
      </label>
      <input
        id={id}
        inputMode="decimal"
        autoComplete="off"
        placeholder="—"
        value={value}
        onChange={(event) => onChange(event.target.value.trim())}
        className="num w-14 bg-transparent text-right text-xl/[26px] font-bold outline-none placeholder:text-muted-foreground"
      />
      <span className="text-muted-foreground text-sm/[18px] font-semibold">см</span>
    </div>
  );
}
