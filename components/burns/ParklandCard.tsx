import type { Patient } from "@/lib/domain/patient";
import { parkland } from "@/lib/calculators/burns/parkland";
import { exceedsIvyLimit, ivyLimitMl } from "@/lib/calculators/burns/ivy-limit";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import FluidRow from "./FluidRow";
import { ml, mlPerHour } from "./burn-format";

interface Props {
  readonly patient: Patient;
  readonly tbsaPercent: number;
}

const IvyWarning = ({ over, limit }: { over: boolean; limit: number }) => {
  if (!over) return null;
  return (
    <Alert variant="destructive" className="mt-3">
      <AlertDescription>
        Тооцоолсон эзэлхүүн 24 цагийн дээд хязгаар ({ml(limit)})-ыг давлаа.
        Хэвлийн хөндийн даралт ихсэх эрсдэлтэй — эмнэлзүйн дахин үнэлгээ хийнэ.
      </AlertDescription>
    </Alert>
  );
};

/** Parkland — 4 мл/кг/БНГТ%. mn-burns-2015, х.70–73. */
export default function ParklandCard({ patient, tbsaPercent }: Props) {
  const result = parkland(patient, tbsaPercent);
  return (
    <Card className="gap-0 px-5 py-4">
      <p className="text-sm font-semibold">Parkland</p>
      <p className="text-muted-foreground mb-2 text-xs">
        4 мл × {patient.weightKg} кг × {tbsaPercent}% · Рингерийн Лактат
      </p>
      <FluidRow label="24 цагийн нийт" value={ml(result.totalMl)} />
      <FluidRow
        label="Эхний 8 цагт"
        hint={ml(result.firstHalfMl)}
        value={mlPerHour(result.firstHalfRateMlPerHour)}
      />
      <FluidRow
        label="Дараагийн 16 цагт"
        hint={ml(result.secondHalfMl)}
        value={mlPerHour(result.secondHalfRateMlPerHour)}
      />
      <IvyWarning
        over={exceedsIvyLimit(patient, result.totalMl)}
        limit={ivyLimitMl(patient)}
      />
    </Card>
  );
}
