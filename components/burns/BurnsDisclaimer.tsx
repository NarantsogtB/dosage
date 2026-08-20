import { TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

/** Түлэгдэлтийн тооцоолуурын анхааруулга. */
export default function BurnsDisclaimer() {
  return (
    <Alert variant="warning">
      <TriangleAlert />
      <AlertTitle>Зөвхөн сэхээний шингэн</AlertTitle>
      <AlertDescription>
        Эдгээр томьёо нь <strong>тэтгэх шингэнийг оруулаагүй</strong> — түүнийг
        нэмж тооцоолно. Хугацааг <strong>осол болсон цагаас</strong> тоолно,
        эмнэлэгт ирсэн цагаас биш. Эх сурвалж: Түлэгдэлт (Эрүүл Үрс Гэрэлт
        Ирээдүй ТББ, 2015) — Естийн дүрэм х.41, шингэн сэлбэлт х.70–73, 155.
      </AlertDescription>
    </Alert>
  );
}
