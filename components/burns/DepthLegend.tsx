import { cn } from "@/lib/utils";

const Item = ({ label, swatch }: { readonly label: string; readonly swatch: string }) => (
  <li className="flex items-center gap-1.5">
    <span aria-hidden className={cn("size-3.5 rounded-[4px] border-[1.5px]", swatch)} />
    {label}
  </li>
);

/** Зэргийн легенд (Figma 138:1610): өнгө + текст (өнгө ганцаараа утга биш). 12 muted, g 12 (desktop 16). */
export default function DepthLegend({ className }: { readonly className?: string }) {
  return (
    <ul className={cn("text-muted-foreground flex flex-wrap gap-x-3 gap-y-1 text-xs/[15px]", className)}>
      <Item label="II зэрэг" swatch="border-warning bg-warning/40" />
      <Item label="III зэрэг" swatch="border-destructive bg-destructive/40" />
      <Item label="I зэрэг · БГТ-д орохгүй" swatch="border-muted-foreground border-dashed" />
    </ul>
  );
}
