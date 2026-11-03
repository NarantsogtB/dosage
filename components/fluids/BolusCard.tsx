import type { Patient } from "@/lib/domain/patient";
import {
  BOLUS_OPTIONS_ML_PER_KG,
  bolusMl,
  MALNOURISHED_BOLUS_ML_PER_KG,
  malnourishedBolusMl,
} from "@/lib/calculators/fluid/bolus";
import { Card } from "@/components/ui/card";
import FluidRow from "@/components/burns/FluidRow";
import { ml } from "@/components/burns/burn-format";

/** Шокийн болюс — RCH IV fluids (2026-01), WHO Pocket Book (2013) Chart 7–8. */
export default function BolusCard({ patient }: { readonly patient: Patient }) {
  return (
    <Card className="gap-0 px-5 py-4">
      <p className="text-sm font-semibold">Шокийн болюс</p>
      <p className="text-muted-foreground mb-2 text-xs">
        0.9% NaCl — аль болох хурдан, болюс бүрийн дараа дахин үнэлнэ
      </p>
      {BOLUS_OPTIONS_ML_PER_KG.map((mlPerKg) => (
        <FluidRow
          key={mlPerKg}
          label={`${mlPerKg} мл/кг`}
          value={ml(bolusMl(patient, mlPerKg))}
        />
      ))}
      <FluidRow
        label="Хүнд хоол тэжээлийн дутагдал"
        hint={`${MALNOURISHED_BOLUS_ML_PER_KG} мл/кг 1 цагт (WHO) — стандарт болюс аюултай`}
        value={ml(malnourishedBolusMl(patient))}
      />
      <p className="text-muted-foreground mt-2 text-xs">
        Нийт ≥20 мл/кг — ахлах эмч; ≥40 мл/кг — инотроп бодолцоно (RCH).
        Болюсыг дараагийн тооцоонд оруулахгүй.
      </p>
    </Card>
  );
}
