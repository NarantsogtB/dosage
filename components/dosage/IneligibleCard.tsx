import { CircleX } from "lucide-react";
import type { IneligibleOutcome } from "@/lib/domain/calculation-result";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
  readonly drugName: string;
  readonly outcome: IneligibleOutcome;
}

/** Тооцоолох боломжгүй үед харуулах мэдэгдэл. */
export default function IneligibleCard({ drugName, outcome }: Props) {
  return (
    <Alert variant="destructive">
      <CircleX />
      <AlertTitle>{drugName} — тооцоолол боломжгүй</AlertTitle>
      <AlertDescription>{outcome.reasonMn}</AlertDescription>
    </Alert>
  );
}
