import { cn } from "@/lib/utils";

interface Props {
  readonly value: string;
  readonly unit: string;
  readonly className?: string;
  readonly unitClassName?: string;
}

/**
 * Тоо ба нэгжийг ЯЛГААТАЙ жин, хэмжээгээр харуулна.
 *
 * Тоо нь `.num` — tabular фигур тул өргөн нь тогтмол бөгөөд 2.5 ба 25
 * хоёр өөр урттай харагдана. Олон эмийг дээр дооргүй жагсаахад 10
 * дахин алдаа нь уншаад биш, ХАРААД илэрнэ. (Өмнө үүнийг Mono
 * бичиглэлээр хийдэг байсан — үр дүн ижил, харагдац нь эмчид ойр.)
 *
 * Нэгж нь жижиг, бүдэг — тооны уншилтад саад болохгүй боловч хэзээ ч
 * алга болохгүй.
 */
export default function DoseReadout({
  value,
  unit,
  className,
  unitClassName,
}: Props) {
  return (
    <span className="flex items-baseline gap-1.5">
      <span className={cn("num font-semibold", className)}>{value}</span>
      <span
        className={cn(
          "text-muted-foreground text-sm font-medium",
          unitClassName,
        )}
      >
        {unit}
      </span>
    </span>
  );
}
