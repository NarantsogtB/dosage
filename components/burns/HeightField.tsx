"use client";

import { Card, CardContent } from "@/components/ui/card";
import NumberField from "@/components/calculator/NumberField";

interface Props {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

/**
 * Өндөр — зөвхөн Гальвестоны БГТ тооцоололд хэрэгтэй.
 *
 * "Заавал биш" гэдгийг тусдаа `<p>`-ээр биш, талбайн `description`-оор
 * өгнө: ингэснээр `aria-describedby`-аар холбогдож, дэлгэц уншигч
 * талбарт орох үедээ уншина — оруулсны ДАРАА биш.
 */
export default function HeightField({ value, onChange }: Props) {
  return (
    <Card>
      <CardContent className="py-4">
        <NumberField
          label="Өндөр"
          suffix="см"
          step="1"
          placeholder="жишээ: 110"
          value={value}
          description="Заавал биш. Оруулбал Гальвестоны томьёо нэмж тооцоолно."
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
}
