"use client";

import { useId } from "react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import AgeInput from "./AgeInput";

interface Props {
  readonly years: string;
  readonly months: string;
  readonly onYears: (value: string) => void;
  readonly onMonths: (value: string) => void;
  /** Оруулсан насыг эргүүлж хэлэх мөр. Талбайн доор. */
  readonly echo: React.ReactNode;
}

/**
 * Нас — жил ба сар.
 *
 * НЭГ талбар, хоёр оролт. Өмнө нь эдгээр нь "Нас" ба "Сар" гэсэн хоёр
 * ТУСДАА талбар байв; тэр нь "3 нас 6 сар" гэсэн НЭГ утгыг хоёр өөр
 * ойлголт мэт харуулж, "Сар" гэдгийг оны сар гэж уншуулах эрсдэлтэй байв.
 * Одоо нэг `Field`, доор нь эргэх мэдээлэл.
 *
 * Дагаварыг "нас" биш "жил" болгов — "3 нас" гэж бичихээр тоо нь юуны
 * тоо болох нь эргэлзээтэй; "3 жил" бол эргэлзээгүй.
 */
export default function AgeFields(props: Props) {
  const id = useId();
  const echoId = `${id}-echo`;

  return (
    <Field>
      <FieldLabel htmlFor={`${id}-years`}>Нас</FieldLabel>
      <div className="flex gap-2">
        <AgeInput
          id={`${id}-years`}
          suffix="жил"
          label="Нас — бүтэн жил"
          value={props.years}
          describedBy={echoId}
          onChange={props.onYears}
        />
        <AgeInput
          id={`${id}-months`}
          suffix="сар"
          label="Нас — нэмэлт сар"
          value={props.months}
          describedBy={echoId}
          onChange={props.onMonths}
        />
      </div>
      <FieldDescription id={echoId}>{props.echo}</FieldDescription>
    </Field>
  );
}
