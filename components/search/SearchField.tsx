"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Props {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

/** Эмийн нэрээр хайх талбар. Латин ба кирилл хоёуланг дэмжинэ. */
export default function SearchField({ value, onChange }: Props) {
  return (
    <div className="relative">
      <Search className="text-muted-foreground pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" />
      <Input
        type="search"
        aria-label="Эмийн нэрээр хайх"
        placeholder="paracetamol / парацетамол"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="pl-9"
      />
    </div>
  );
}
