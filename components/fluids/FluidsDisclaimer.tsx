import { TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

/** Шингэний тооцоолуурын анхааруулга. */
export default function FluidsDisclaimer() {
  return (
    <Alert variant="warning">
      <TriangleAlert />
      <AlertTitle>Эхлэх цэг — дахин үнэлгээ заавал</AlertTitle>
      <AlertDescription>
        Боломжтой бол амаар/хамрын гуурсаар өгнө. Судсаар өгөхөд өдөр бүр жин,
        электролит хянана. Нярай, дутуу төрсөн хүүхэд, түлэгдэлт, ДКА,
        тархины гэмтэлд тусгай заавар хэрэглэнэ. Эх сурвалж: RCH Melbourne
        «Intravenous fluids» (2026-01), «Dehydration» (2026-04); WHO Pocket
        Book (2013).
      </AlertDescription>
    </Alert>
  );
}
