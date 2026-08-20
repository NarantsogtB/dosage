"use client";

import { MAX_WEIGHT_KG, MIN_WEIGHT_KG } from "@/lib/engine/eligibility/limits";
import NumberField from "./NumberField";

interface Props {
  readonly value: string;
  readonly invalid: boolean;
  readonly onChange: (value: string) => void;
}

/**
 * Жин оруулах талбар.
 *
 * Хязгаарын мөр (жишээ нь "0.5–120 кг") ХЭЗЭЭ Ч алгуурдахгүй, зөвхөн
 * улаан болно: Figma-гийн Field спек-ээр хязгаар ЯМАГТ харагдана,
 * зөвхөн алдаа гарахад л улаан (`FieldError`) болж хувирна — эмч
 * анзаарсан даруйдаа өөрчлөгдсөнийг олж хардаг байх ёстой.
 */
export default function WeightField({ value, invalid, onChange }: Props) {
  const range = `${MIN_WEIGHT_KG}–${MAX_WEIGHT_KG} кг`;
  return (
    <NumberField
      label="Жин"
      suffix="кг"
      step="0.1"
      placeholder="жишээ: 15"
      value={value}
      invalid={invalid}
      error={range}
      description={range}
      onChange={onChange}
    />
  );
}
