import { Siren } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

/** Яаралтай тусламжийн хуудасны анхааруулга (Шат 7). */
export default function EmergencyDisclaimer() {
  return (
    <Alert variant="warning" className="print:hidden">
      <Siren />
      <AlertTitle>Зөвхөн эх сурвалжтай мөр</AlertTitle>
      <AlertDescription>
        Эх сурвалж баталгаажаагүй тун энд харагдахгүй. Жинг бодитоор жигнэсэн
        эсвэл хэмжсэнийг шалгана; насаар жин тооцохгүй. Протокол, багийн
        шийдвэрийг орлохгүй.
      </AlertDescription>
    </Alert>
  );
}
