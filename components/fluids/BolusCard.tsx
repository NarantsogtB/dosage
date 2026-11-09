import { Siren } from "lucide-react";
import type { Patient } from "@/lib/domain/patient";
import {
  BOLUS_OPTIONS_ML_PER_KG,
  bolusMl,
  MALNOURISHED_BOLUS_ML_PER_KG,
  malnourishedBolusMl,
} from "@/lib/calculators/fluid/bolus";
import { ml } from "@/components/burns/burn-format";
import DangerRow from "@/components/v4/DangerRow";
import NoteRow from "@/components/v4/NoteRow";
import ResultCard from "@/components/v4/ResultCard";
import ValueTile, { TileGrid } from "@/components/v4/ValueTile";

/** Шокийн болюс — RCH IV fluids (2026-01), WHO Pocket Book (2013) Chart 7–8. Figma «Bolus». */
export default function BolusCard({ patient }: { readonly patient: Patient }) {
  return (
    <ResultCard id="bolus" icon={Siren} title="Шокийн болюс" sub="0.9% NaCl — аль болох хурдан, болюс бүрийн дараа дахин үнэлнэ">
      <TileGrid>
        {BOLUS_OPTIONS_ML_PER_KG.map((mlPerKg) => (
          <ValueTile key={mlPerKg} label={`${mlPerKg} мл/кг`} value={ml(bolusMl(patient, mlPerKg))} />
        ))}
      </TileGrid>
      <DangerRow
        title="Хүнд хоол тэжээлийн дутагдал"
        hint={`${MALNOURISHED_BOLUS_ML_PER_KG} мл/кг 1 цагт (WHO) — стандарт болюс аюултай`}
        value={ml(malnourishedBolusMl(patient))}
      />
      <NoteRow tone="warning">
        Нийт ≥20 мл/кг — ахлах эмч; ≥40 мл/кг — инотроп бодолцоно (RCH). Болюсыг дараагийн тооцоонд оруулахгүй.
      </NoteRow>
    </ResultCard>
  );
}
