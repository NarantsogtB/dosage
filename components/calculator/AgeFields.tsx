"use client";

import NumberField from "./NumberField";

interface Props {
  readonly years: string;
  readonly months: string;
  readonly onYears: (value: string) => void;
  readonly onMonths: (value: string) => void;
}

/** Нас, сар оруулах хос талбар. */
export default function AgeFields({
  years,
  months,
  onYears,
  onMonths,
}: Props) {
  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <NumberField
          label="Нас"
          suffix="нас"
          placeholder="0"
          value={years}
          onChange={onYears}
        />
      </div>
      <div className="flex-1">
        <NumberField
          label="Сар"
          suffix="сар"
          placeholder="0"
          value={months}
          onChange={onMonths}
        />
      </div>
    </div>
  );
}
