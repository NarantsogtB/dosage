"use client";

import { CardHeader, CardTitle } from "@/components/ui/card";
import SearchField from "./SearchField";
import VerifiedToggle from "./VerifiedToggle";

interface Props {
  readonly query: string;
  readonly onQuery: (value: string) => void;
  readonly verifiedOnly: boolean;
  readonly verifiedCount: number;
  readonly onVerified: () => void;
}

/** Хайлтын талбар ба баталгаажсан шүүлтүүр. */
export default function SearchHeader(props: Props) {
  return (
    <CardHeader className="pb-3">
      <CardTitle className="text-muted-foreground text-xs uppercase tracking-widest">
        Эм сонгох
      </CardTitle>
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
