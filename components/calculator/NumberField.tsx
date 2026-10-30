"use client";

import { useId } from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import FieldNote, { noteKindOf, shownError } from "./FieldNote";

interface Props {
  readonly label: string;
  readonly suffix: string;
  /** Дагаварын оронд — жишээ нь нэгж сонгогч. Байвал `suffix`-ийг дэлгэцэнд харуулахгүй. */
  readonly addon?: React.ReactNode;
  readonly step: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly invalid?: boolean;
  /** Талбайн ДООР улаанаар. Зөвхөн `invalid` үед харагдана. */
  readonly error?: string;
  /** Талбайн ДООР саарлаар. Алдаа гарахад түр нуугдана. */
  readonly description?: React.ReactNode;
  readonly placeholder?: string;
}

/**
 * Нэгжийн дагавартай тоон оролт — Figma "Field" (node 11:94).
 *
 * shadcn-ийн `field` + `input-group` дээр суусан. Дөрвөн шалтгаан:
 *
 * 1. Дагаварыг `absolute` span-аар биш, `InputGroupAddon`-оор тавьсан тул
 *    урт тоо (жишээ нь 105.5) дагаварын доогуур ОРОХГҮЙ — flex мөр өөрөө
 *    зай хуваарилна.
 * 2. Дагавар дээр дарахад талбар фокус авна — хуруугаараа "кг" рүү оносон
 *    эмчид ажиллана.
 * 3. Алдаа/тайлбарыг `aria-describedby`-аар холбоно.
 * 4. Утга нь Numeric/L (22/28 semibold) — Figma-гийн "Field" яг үүнийг
 *    заасан: bedside-д хол зайнаас, гэрэл муутайд ч тоог унших ёстой.
 *    `input-group.tsx`-ийн 56px өндөр нь мөн энэ л зорилготой.
 *
 * Шошго placeholder БИШ: `FieldLabel` үргэлж харагдана.
 */
export default function NumberField(props: Props) {
  const id = useId();
  const error = shownError(props.invalid, props.error);
  const kind = noteKindOf(error, props.description);
  const noteId = kind === "none" ? undefined : `${id}-note`;

  return (
    <Field data-invalid={props.invalid}>
      <FieldLabel htmlFor={id}>{props.label}</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id={id}
          type="number"
          inputMode="decimal"
          min="0"
          step={props.step}
          placeholder={props.placeholder}
          value={props.value}
          aria-invalid={props.invalid}
          aria-describedby={noteId}
          onChange={(event) => props.onChange(event.target.value)}
          className="num text-[22px] leading-7 font-semibold tracking-[-0.006em] md:text-[22px]"
        />
        <InputGroupAddon align="inline-end">
          {props.addon ?? (
            <InputGroupText className="text-xs font-medium tracking-wider">
              {props.suffix}
            </InputGroupText>
          )}
        </InputGroupAddon>
      </InputGroup>
      <FieldNote
        kind={kind}
        id={noteId}
        error={error}
        description={props.description}
      />
    </Field>
  );
}
