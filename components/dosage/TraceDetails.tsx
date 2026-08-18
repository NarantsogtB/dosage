import { ChevronRight } from "lucide-react";
import type { TraceStep } from "@/lib/engine/trace/trace-step";
import { Separator } from "@/components/ui/separator";

interface Props {
  readonly trace: readonly TraceStep[];
}

/**
 * Тооцооллын алхмууд — дэлгэгдэх хэсэг.
 *
 * Radix Collapsible-ийн оронд native <details> ашигласан: JavaScript
 * хэрэггүй, hydration хүлээхгүй, гар болон дэлгэц уншигчид ажиллана.
 * Bedside workflow-д хамгийн хурдан хувилбар.
 */
export default function TraceDetails({ trace }: Props) {
  if (trace.length === 0) return null;
  return (
    <>
      <Separator />
      <details className="group print:hidden">
        <summary className="text-primary hover:bg-accent flex cursor-pointer list-none items-center gap-1.5 px-5 py-3 text-xs font-medium transition-colors">
          <ChevronRight className="size-3.5 transition-transform group-open:rotate-90" />
          Яаж бодсон бэ?
        </summary>
        <dl className="bg-muted/40 space-y-1.5 px-5 pb-4 pt-1">
          {trace.map((step) => (
            <div key={step.labelMn} className="flex justify-between gap-3 text-sm">
              <dt className="text-muted-foreground">{step.labelMn}</dt>
              <dd className="text-right font-mono text-xs tabular-nums">
                {step.expression}
              </dd>
            </div>
          ))}
        </dl>
      </details>
    </>
  );
}
