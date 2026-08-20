"use client";

import { useMemo, useState } from "react";
import { calculateDosage } from "@/lib/engine";
import NumberField from "@/components/calculator/NumberField";
import { DEMO } from "./demo-case";
import DemoOutput from "./DemoOutput";

/**
 * ★ ГАРЫН ҮСЭГ — амьд ажиллах жишээ.
 *
 * Танилцуулга хуудсууд ихэвчлэн бүтээгдэхүүний ЗУРГИЙГ харуулдаг.
 * Энд бодит engine ажиллаж байна: эмч жингээ өөрчлөхөд тун шууд
 * өөрчлөгдөнө, доор нь ДЭМБ-ын эх бичвэрийн ишлэл гарна.
 *
 * Амлалтыг ярихын оронд гүйцэтгэж харуулах нь хамгийн богино зам.
 * Мөн зураг биш тул өгөгдөл өөрчлөгдөхөд танилцуулга хуучирахгүй.
 */
export default function HeroDemo() {
  const [weight, setWeight] = useState<string>(DEMO.defaultWeightKg);

  const result = useMemo(
    () =>
      calculateDosage(
        DEMO.drug,
        { weightKg: Number(weight) || 0, ageMonths: DEMO.ageMonths },
        { indicationCode: DEMO.indicationCode },
      ),
    [weight],
  );

  return (
    <div className="bg-card rounded-xl border p-4 shadow-xs sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">
          {DEMO.drug.inn}
        </p>
        <p className="text-muted-foreground text-xs">
          {DEMO.ageLabelMn} · {DEMO.conditionMn}
        </p>
      </div>
      <div className="mt-3">
        <NumberField
          label="Жин"
          suffix="кг"
          step="0.5"
          value={weight}
          onChange={setWeight}
        />
      </div>
      <DemoOutput result={result} />
    </div>
  );
}
