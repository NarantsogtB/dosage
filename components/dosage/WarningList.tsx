import { TriangleAlert } from "lucide-react";
import type { Warning } from "@/lib/domain/warning";
import { Separator } from "@/components/ui/separator";
import SectionLabel from "./SectionLabel";

interface Props {
  readonly warnings: readonly Warning[];
}

/** Анхааруулгын жагсаалт. Хоосон бол харагдахгүй. */
export default function WarningList({ warnings }: Props) {
  if (warnings.length === 0) return null;
  return (
    <>
      <Separator />
      <div className="bg-warning-muted/60 px-5 py-4">
        <SectionLabel className="text-warning">
          <TriangleAlert className="size-3.5" />
          Анхааруулга
        </SectionLabel>
        <ul className="mt-2 space-y-1.5">
          {warnings.map((warning) => (
            <li key={warning.messageMn} className="text-warning flex gap-2 text-sm">
              <span className="mt-0.5 shrink-0 opacity-60">•</span>
              <span>{warning.messageMn}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
