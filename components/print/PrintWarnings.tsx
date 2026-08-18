import type { Warning } from "@/lib/domain/warning";

interface Props {
  readonly warnings: readonly Warning[];
}

/** Анхааруулгууд, хэвлэх хувилбар. */
export default function PrintWarnings({ warnings }: Props) {
  if (warnings.length === 0) return null;
  return (
    <ul className="mt-1 space-y-0.5 text-xs text-slate-700">
      {warnings.map((warning) => (
        <li key={warning.messageMn}>⚠ {warning.messageMn}</li>
      ))}
    </ul>
  );
}
