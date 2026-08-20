import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Eyebrow from "./Eyebrow";

interface Props {
  readonly id?: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly lede?: string;
  readonly raised?: boolean;
  readonly children: ReactNode;
}

/**
 * Хуудасны нэг хэсэг.
 *
 * Хэмнэл нь ГАДАРГУУГААС гарна — цайвар цаас ба цагаан ээлжилнэ.
 * Хар зурвас, өнгөт дэвсгэр нэмэхгүй: бүтээгдэхүүн өөрөө нам гүм тул
 * танилцуулга нь түүнээс чанга байж болохгүй.
 */
export default function Section({ id, raised, children, ...head }: Props) {
  return (
    <section id={id} className={cn("border-b py-14", raised && "bg-card")}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Eyebrow>{head.eyebrow}</Eyebrow>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {head.title}
        </h2>
        {head.lede ? (
          <p className="text-muted-foreground mt-2.5 max-w-2xl text-sm leading-relaxed sm:text-base">
            {head.lede}
          </p>
        ) : null}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
