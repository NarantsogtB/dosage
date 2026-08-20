"use client";

import { Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  readonly count: number;
  readonly onUndo: () => void;
}

/** Хасалтыг буцаах зурвас. Хасах зүйл болоогүй бол харагдахгүй. */
export default function UndoBar({ count, onUndo }: Props) {
  if (count < 1) return null;
  return (
    <div className="border-border bg-card flex items-center justify-between gap-3 rounded-lg border border-dashed px-3 py-1.5 print:hidden">
      <span className="text-muted-foreground text-xs">
        <span className="num text-foreground font-medium">{count}</span> эм
        хасагдлаа
      </span>
      <Button type="button" variant="ghost" size="sm" onClick={onUndo}>
        <Undo2 />
        Буцаах
      </Button>
    </div>
  );
}
