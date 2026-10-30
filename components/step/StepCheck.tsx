import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Бэлэн байдлын жагсаалтын тэмдэг — Figma "Step check" (V3 · 01 Atoms).
 *
 * Хийгдсэн бол дүүрэн дугуй + чагт, дутуу бол хоосон дугуй. Утга нь
 * хажуугийн текстэд байх тул энэ нь чимэглэл (`aria-hidden`).
 */
export default function StepCheck({ done }: { readonly done: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-full border",
        done
          ? "bg-primary border-primary text-primary-foreground"
          : "border-border",
      )}
    >
      {done ? <Check className="size-3" strokeWidth={3} /> : null}
    </span>
  );
}
