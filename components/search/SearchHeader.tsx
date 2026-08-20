"use client";

import { CardHeader } from "@/components/ui/card";
import StepHeader from "@/components/step/StepHeader";
import SearchField from "./SearchField";
import VerifiedToggle from "./VerifiedToggle";

interface Props {
  readonly query: string;
  readonly onQuery: (value: string) => void;
  readonly verifiedOnly: boolean;
  readonly verifiedCount: number;
  readonly selectedCount: number;
  readonly onVerified: () => void;
}

/** Хайлтын талбар ба баталгаажсан шүүлтүүр. Алхам 2. */
export default function SearchHeader(props: Props) {
  return (
    <CardHeader className="pb-3">
      <StepHeader step={2} label="Эм сонгох" done={props.selectedCount > 0} />
      <div className="pt-2">
        <SearchField value={props.query} onChange={props.onQuery} />
      </div>
      <div className="pt-2.5">
        <VerifiedToggle
          active={props.verifiedOnly}
          count={props.verifiedCount}
          onToggle={props.onVerified}
        />
      </div>
    </CardHeader>
  );
}
