import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Eyebrow from "./Eyebrow";

interface Props {
  readonly id?: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly lede?: string;
  readonly className?: string;
  readonly children: ReactNode;
}

/** Хуудасны нэг хэсэг (Figma): eyebrow · гарчиг 28 Bold · lede 15 muted · агуулга, g 14. */
export default function Section({ id, className, children, ...head }: Props) {
  return (
    <section id={id} aria-label={head.title} className={cn("flex min-w-0 flex-col gap-3.5", className)}>
      <Eyebrow>{head.eyebrow}</Eyebrow>
      <h2 className="text-[28px]/9 font-bold">{head.title}</h2>
      {head.lede ? <p className="text-muted-foreground text-[15px]/[19px]">{head.lede}</p> : null}
      {children}
    </section>
  );
}
