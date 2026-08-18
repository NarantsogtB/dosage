"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  readonly label: string;
  readonly onRemove: () => void;
}

/** Сонгосон эмийг хасах товч. */
export default function RemoveButton({ label, onRemove }: Props) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={`${label} — хасах`}
      title={`${label} — хасах`}
      className="text-muted-foreground hover:text-destructive size-7 shrink-0"
      onClick={onRemove}
    >
      <X className="size-4" />
    </Button>
  );
}
