import type { AgeBand } from "@/lib/domain/body-region";
import { AGE_BAND_LABELS } from "@/lib/data/burns/region-labels";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  readonly tbsaPercent: number;
  readonly band: AgeBand;
}

/** Хүндийн шалгуур: II зэргийн түлэгдэл ≥10% (mn-burns-2015, х.42). */
const SEVERE_THRESHOLD = 10;

/**
 * Аль насны БАГАНА ашиглаж байгааг ил гаргана.
 *
 * Энэ нь чимэглэл биш: Lund-Browder-ийн хувь нь наснаас хамаарч
 * ХОЁР ДАХИН хүртэл зөрдөг (толгой: нярайд 19%, насанд хүрэгчид 7%).
 * Эмч оруулсан насаа буруу бичсэн бол үүнийг эндээс шууд анзаарна.
 */
export default function TbsaSummary({ tbsaPercent, band }: Props) {
  const severe = tbsaPercent >= SEVERE_THRESHOLD;
  return (
    <Card className="gap-1 px-5 py-4">
      <p className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">
        Биеийн нийт гадаргуугийн талбай
      </p>
      <p className="num text-4xl font-semibold">
        {Math.round(tbsaPercent * 10) / 10}%
      </p>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <Badge variant="secondary">
          Lund-Browder · {AGE_BAND_LABELS[band]}
        </Badge>
        {severe ? (
          <Badge variant="destructive">≥10% — хүнд, шингэн сэлбэнэ</Badge>
        ) : null}
      </div>
    </Card>
  );
}
