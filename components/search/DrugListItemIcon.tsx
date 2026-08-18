import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  readonly selected: boolean;
  readonly icon: LucideIcon;
  readonly className?: string;
}

/** Нөхцөлт жижиг дүрс. Байрлалыг тогтвортой байлгахын тулд орон эзэлнэ. */
export default function DrugListItemIcon({ selected, icon: Icon, className }: Props) {
  if (!selected) return <span className="size-4 shrink-0" aria-hidden />;
  return <Icon className={cn("text-primary size-4 shrink-0", className)} />;
}
