import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  readonly show: boolean;
  readonly icon: LucideIcon;
  readonly className?: string;
  /** Байвал дэлгэц уншигчид уншина. Байхгүй бол чимэглэл гэж үзнэ. */
  readonly label?: string;
}

/** Нэртэй бол зураг, нэргүй бол чимэглэл. */
const a11yProps = (label?: string) =>
  label ? { role: "img", "aria-label": label } : { "aria-hidden": true };

/** Нөхцөлт жижиг дүрс. Байрлалыг тогтвортой байлгахын тулд орон эзэлнэ. */
export default function DrugListItemIcon({
  show,
  icon: Icon,
  className,
  label,
}: Props) {
  if (!show) return <span className="size-4 shrink-0" aria-hidden />;
  return (
    <Icon
      {...a11yProps(label)}
      className={cn("text-primary size-4 shrink-0", className)}
    />
  );
}
