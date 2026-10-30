"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

interface Props {
  readonly id: string;
  readonly suffix: string;
  readonly label: string;
  readonly value: string;
  readonly describedBy: string;
  readonly invalid?: boolean;
  readonly onChange: (value: string) => void;
}

/** Насны нэг бүрэлдэхүүн — жил эсвэл сар. Numeric/L, Figma "Field"-тэй ижил хэмжээ. */
export default function AgeInput(props: Props) {
  return (
    <InputGroup>
      <InputGroupInput
        id={props.id}
        type="number"
        inputMode="numeric"
        min="0"
        step="1"
        placeholder="—"
        value={props.value}
        aria-label={props.label}
        aria-describedby={props.describedBy}
        aria-invalid={props.invalid}
        onChange={(event) => props.onChange(event.target.value)}
        className="num text-[22px] leading-[28px] font-semibold tracking-[-0.006em]"
      />
      <InputGroupAddon align="inline-end">
        <InputGroupText className="text-md font-medium tracking-[0.05em]">
          {props.suffix}
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
}
