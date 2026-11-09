import { Droplet } from "lucide-react";
import type { Patient } from "@/lib/domain/patient";
import {
  isAtCeiling,
  maintenanceMlPerDay,
  maintenanceMlPerHour,
  maintenanceParts,
  restrictedMlPerHour,
  type TierPart,
} from "@/lib/calculators/fluid/maintenance";
import { mlPerHour, mlValue } from "@/components/burns/burn-format";
import BigValue from "@/components/v4/BigValue";
import NoteRow from "@/components/v4/NoteRow";
import ResultCard from "@/components/v4/ResultCard";
import ValueTile, { TileGrid } from "@/components/v4/ValueTile";

const partText = (part: TierPart): string => `${part.kg} кг × ${part.mlPerKg}`;

const traceOf = (patient: Patient): string =>
  isAtCeiling(patient)
    ? ">60 кг — хэвийн дээд 2400 мл/хон (100 мл/цаг)"
    : `${maintenanceParts(patient).map(partText).join(" + ")} мл`;

/** Тэтгэх шингэн — RCH IV fluids (2026-01). Figma 163:1961 «Maintenance». */
export default function MaintenanceCard({ patient }: { readonly patient: Patient }) {
  return (
    <ResultCard id="maintenance" icon={Droplet} title="Тэтгэх шингэн" sub={`Яаж тооцсон: ${traceOf(patient)}`}>
      <BigValue value={mlValue(maintenanceMlPerDay(patient))} unit="мл / хоногт" />
      <TileGrid>
        <ValueTile label="Бүтэн — цагт · 4/2/1 мл/кг/цаг" value={mlPerHour(maintenanceMlPerHour(patient))} />
        <ValueTile label="⅔ — цагт" value={mlPerHour(restrictedMlPerHour(patient))} />
      </TileGrid>
      <NoteRow>⅔ — ихэнх өвчтэй хүүхэд (ADH ихсэх), шингэн алдаагүй бол.</NoteRow>
    </ResultCard>
  );
}
