"use client";

import { useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  readonly label: string;
  readonly suffix: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly invalid?: boolean;
  readonly placeholder?: string;
  readonly step?: string;
}

/** Нэгжийн тэмдэглэгээтэй тоон оролт. */
export default function NumberField(props: Props) {
  const { label, suffix, value, onChange, invalid, placeholder, step } = props;
  const id = useId();
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type="number"
          inputMode="decimal"
          min="0"
          step={step ?? "1"}
          placeholder={placeholder}
          value={value}
          aria-invalid={invalid}
          onChange={(event) => onChange(event.target.value)}
          className="pr-12 tabular-nums"
        />
        <span className="text-muted-foreground pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm">
          {suffix}
        </span>
      </div>
    </div>
  );
}
