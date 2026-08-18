"use client";

import { MAX_WEIGHT_KG, MIN_WEIGHT_KG } from "@/lib/engine/eligibility/limits";
import NumberField from "./NumberField";
import WeightWarning from "./WeightWarning";

interface Props {
  readonly value: string;
  readonly invalid: boolean;
  readonly onChange: (value: string) => void;
}

/** Жин оруулах талбар ба түүний анхааруулга. */
export default function WeightField({ value, invalid, onChange }: Props) {
  return (
    <div>
      <NumberField
        label="Жин"
        suffix="кг"
        step="0.1"
        placeholder="жишээ: 15"
        value={value}
        invalid={invalid}
        onChange={onChange}
      />
      <WeightWarning
        invalid={invalid}
        min={MIN_WEIGHT_KG}
        max={MAX_WEIGHT_KG}
      />
    </div>
  );
}
