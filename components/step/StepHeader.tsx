import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  readonly step: number;
  readonly label: string;
  readonly done: boolean;
}

const toneOf = (done: boolean): string =>
  done
    ? "bg-primary text-primary-foreground border-primary"
    : "border-border text-muted-foreground";

/**
 * Дугаарласан алхмын гарчиг.
 *
 * Дугаарлалт нь чимэглэл БИШ: жин → эм → үр дүн гэдэг нь жинхэнэ
 * дараалал бөгөөд эхний хоёргүйгээр гурав дахь нь оршин байх
 * боломжгүй. Дараалал утга агуулаагүй бол дугаарлахгүй байх ёстой.
 *
 * Дууссан алхам чагт авна — эмч аль хэсэгт дутуу байгааг хайхгүйгээр
 * харна (Nielsen H1: системийн төлөв харагдах).
 */
export default function StepHeader({ step, label, done }: Props) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden
        className={cn(
          "num flex size-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold",
          toneOf(done),
        )}
      >
        {done ? <Check className="size-3" strokeWidth={3} /> : step}
      </span>
      <span className="text-xs font-semibold uppercase tracking-widest">
        {label}
      </span>
      <span className="sr-only">{done ? "— дууссан" : "— дутуу"}</span>
    </div>
  );
}
