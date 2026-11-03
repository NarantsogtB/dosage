import type { Patient } from "@/lib/domain/patient";
import {
  isAtCeiling,
  maintenanceMlPerDay,
  maintenanceMlPerHour,
  maintenanceParts,
  restrictedMlPerHour,
  type TierPart,
} from "@/lib/calculators/fluid/maintenance";
import { Card } from "@/components/ui/card";
import FluidRow from "@/components/burns/FluidRow";
import { ml, mlPerHour } from "@/components/burns/burn-format";

const partText = (part: TierPart): string => `${part.kg} кг × ${part.mlPerKg}`;

const traceOf = (patient: Patient): string =>
  isAtCeiling(patient)
    ? ">60 кг — хэвийн дээд 2400 мл/хон (100 мл/цаг)"
    : `${maintenanceParts(patient).map(partText).join(" + ")} мл`;

/** Тэтгэх шингэн — RCH IV fluids (2026-01). */
export default function MaintenanceCard({ patient }: { readonly patient: Patient }) {
  return (
    <Card className="gap-0 px-5 py-4">
      <p className="text-sm font-semibold">Тэтгэх шингэн</p>
      <p className="text-muted-foreground mb-2 text-xs">
        Яаж тооцсон: {traceOf(patient)}
      </p>
      <FluidRow label="Бүтэн — хоногт" value={ml(maintenanceMlPerDay(patient))} />
      <FluidRow label="Бүтэн — цагт" hint="4 / 2 / 1 мл/кг/цаг" value={mlPerHour(maintenanceMlPerHour(patient))} />
      <FluidRow
        label="⅔ — цагт"
        hint="Ихэнх өвчтэй хүүхэд (ADH ихсэх), шингэн алдаагүй бол"
        value={mlPerHour(restrictedMlPerHour(patient))}
      />
    </Card>
  );
}
