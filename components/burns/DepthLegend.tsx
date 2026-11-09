import { cn } from "@/lib/utils";

interface ItemProps {
  readonly label: string;
  readonly swatch: string;
}

const Item = ({ label, swatch }: ItemProps) => (
  <li className="flex items-center gap-1.5">
    <span aria-hidden className={cn("size-3.5 rounded-sm border", swatch)} />
    {label}
  </li>
);

/** Зэргийн легенд: өнгө + текст (өнгө ганцаараа утга биш). */
export default function DepthLegend() {
  return (
    <div className="space-y-1.5 text-xs">
      <ul className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
        <Item label="II зэрэг" swatch="border-warning bg-warning/40" />
        <Item label="III зэрэг" swatch="border-destructive bg-destructive/40" />
        <Item label="I зэрэг · БГТ-д орохгүй" swatch="border-muted-foreground border-dashed" />
      </ul>
      <p className="text-muted-foreground">Дарах бүрд: II → III → I → хасах.</p>
    </div>
  );
}
