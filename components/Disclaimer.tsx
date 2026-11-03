import { ChevronDown, Info } from "lucide-react";
import { FLAGS } from "@/lib/flags";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const TITLE = "Эмчид зориулсан туслах хэрэгсэл";
const LEAD = "Тооцооллын үр дүн нь эмнэлгийн мэргэжилтний эмнэлзүйн шийдвэрийг орлохгүй.";

const Detail = () => (
  <p>
    Эм тус бүрийн доор <b>эх сурвалжийн түвшин</b> болон{" "}
    <b>сүүлд хянасан огноог</b> харуулсан. Тунг хэрэглэхийн өмнө шалгана
    уу. «Эх сурвалж баталгаажаагүй» гэсэн эмийн тунг ЭМЯ-ны заавар эсвэл
    ДЭМБ-ын удирдамжтай заавал тулгана уу.
  </p>
);

/**
 * V3 «Disclaimer compact»: эхний өгүүлбэр харагдана, 2-р догол мөр
 * сумны цаана. Текст ҮГ БҮРЭЭРЭЭ ижил. Хуулийн/эмнэлзүйн хяналт
 * хүлээж байна (`FLAGS.collapsedDisclaimer`).
 */
const Compact = () => (
  <details className="group border-primary/25 bg-primary/5 text-primary rounded-lg border text-sm print:hidden">
    <summary className="flex min-h-11 cursor-pointer list-none items-start gap-3 px-4 py-3">
      <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
      <span className="flex-1">
        <span className="font-semibold">{TITLE}.</span> {LEAD}
      </span>
      <ChevronDown aria-hidden className="mt-0.5 size-4 shrink-0 transition-transform group-open:rotate-180" />
    </summary>
    <div className="px-4 pb-3 pl-11 leading-relaxed opacity-90">
      <Detail />
    </div>
  </details>
);

/**
 * Эмнэлзүйн хэрэглээний анхааруулга.
 *
 * Хоёр зүйлийг ЯЛГААТАЙ хэлж байгааг анхаар: эх сурвалж (карт бүрд
 * харагдана) ба эмнэлзүйн хяналт (одоогоор бүртгэгдээгүй). Хоёрыг
 * хольж «баталгаажсан» гэж нэгтгэвэл эмчийг төөрөгдүүлнэ.
 */
export default function Disclaimer() {
  if (FLAGS.collapsedDisclaimer) return <Compact />;
  return (
    <Alert variant="info" className="print:hidden">
      <Info />
      <AlertTitle>{TITLE}</AlertTitle>
      <AlertDescription>
        {LEAD} <Detail />
      </AlertDescription>
    </Alert>
  );
}
