import { Calculator } from "lucide-react";
import type { TraceStep } from "@/lib/engine/trace/trace-step";
import DisclosureRow from "./DisclosureRow";

interface Props {
  readonly trace: readonly TraceStep[];
}

/** Тооцооллын алхмууд — «Яаж бодсон бэ?» дэлгэгдэх мөр. */
export default function TraceDetails({ trace }: Props) {
  if (trace.length === 0) return null;
  return (
    <DisclosureRow icon={Calculator} label="Яаж бодсон бэ?">
      <dl className="space-y-1.5">
        {trace.map((step) => (
          <div key={step.labelMn} className="flex justify-between gap-3 text-sm">
            <dt className="text-muted-foreground">{step.labelMn}</dt>
            <dd className="num text-right text-xs">{step.expression}</dd>
          </div>
        ))}
      </dl>
    </DisclosureRow>
  );
}
