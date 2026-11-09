"use client";

import { MAX_WEIGHT_KG, MIN_WEIGHT_KG } from "@/lib/engine/eligibility/limits";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import NumberField from "./NumberField";
import { isNumeric, type WeightUnit } from "./patient-form";

interface Props {
  readonly value: string;
  readonly unit: WeightUnit;
  /** Тооцоололд орох жин, кг. Граммаар оруулсан үед эргүүлж хэлнэ. */
  readonly weightKg: number;
  readonly invalid: boolean;
  readonly onChange: (value: string) => void;
  readonly onUnit: (unit: WeightUnit) => void;
}

const GRAMS = 1000;

const RANGES: Record<WeightUnit, string> = {
  kg: `${MIN_WEIGHT_KG}–${MAX_WEIGHT_KG} кг`,
  g: `${MIN_WEIGHT_KG * GRAMS}–${MAX_WEIGHT_KG * GRAMS} г`,
};

const UNIT_FIELD: Record<WeightUnit, { placeholder: string; suffix: string }> = {
  kg: { placeholder: "жишээ: 15", suffix: "кг" },
  g: { placeholder: "жишээ: 3200", suffix: "г" },
};

/** Тоо биш бол юуг засахыг хэлнэ, үгүй бол хязгаар. */
const errorOf = ({ value, unit }: Props): string =>
  isNumeric(value) ? RANGES[unit] : `Зөвхөн тоо, жишээ: 12.5 · ${RANGES[unit]}`;

const SEGMENT =
  "data-[state=on]:bg-card h-9 min-w-11 rounded-sm data-[state=on]:shadow-xs";

/**
 * «= 3.2 кг гэж тооцоолно» — систем граммыг хэрхэн ойлгосныг эргүүлж
 * хэлнэ (Nielsen H1). Кг-аар бичсэн үед давхардал тул хязгаарыг л харуулна.
 */
const echoOf = (props: Props): React.ReactNode => {
  if (props.unit === "kg" || props.value === "") return RANGES[props.unit];
  return (
    <>
      <span className="text-foreground font-medium">
        = <span className="num">{props.weightKg}</span> кг
      </span>{" "}
      гэж тооцоолно · {RANGES.g}
    </>
  );
};

const UnitToggle = ({ unit, onUnit }: Pick<Props, "unit" | "onUnit">) => (
  <ToggleGroup
    type="single"
    value={unit}
    aria-label="Жингийн нэгж"
    className="bg-muted rounded-md p-0.5"
    onValueChange={(next) => next && onUnit(next as WeightUnit)}
  >
    <ToggleGroupItem value="kg" className={SEGMENT}>
      кг
    </ToggleGroupItem>
    <ToggleGroupItem value="g" className={SEGMENT}>
      г
    </ToggleGroupItem>
  </ToggleGroup>
);

/**
 * Жин оруулах талбар, кг | г нэгжтэй — Figma "Weight field" (V3 · 02).
 *
 * Хязгаарын мөр ХЭЗЭЭ Ч алга болохгүй, зөвхөн алдаа гарахад улаан болно.
 * Граммаар оруулбал хязгаарын өмнө кг-д хөрвүүлсэн утга харагдана.
 */
export default function WeightField(props: Props) {
  const field = UNIT_FIELD[props.unit];
  return (
    <NumberField
      label="Жин"
      suffix={field.suffix}
      addon={<UnitToggle unit={props.unit} onUnit={props.onUnit} />}
      placeholder={field.placeholder}
      value={props.value}
      invalid={props.invalid}
      error={errorOf(props)}
      description={echoOf(props)}
      onChange={props.onChange}
    />
  );
}
