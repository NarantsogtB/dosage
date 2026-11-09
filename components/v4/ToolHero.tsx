import type { ReactNode } from "react";
import BigValue from "./BigValue";

export interface HeroData {
  readonly value: ReactNode;
  readonly unit: ReactNode;
  readonly label: ReactNode;
  readonly chips?: ReactNode;
  /** Түлэгдэлтийн «%» — 34 SemiBold (Figma 138:1567). */
  readonly unitClassName?: string;
}

/** Mobile hero (Figma «Hero»): col g 8, төвд — өвчтөний мөр · 72 тоо · тайлбар 13 · chip-үүд. */
export function MobileHero({ patientLine, hero }: { readonly patientLine: ReactNode; readonly hero: HeroData }) {
  return (
    <div className="mt-4 flex flex-col items-center gap-2 px-4 text-center">
      {patientLine}
      <BigValue size="hero" value={hero.value} unit={hero.unit} unitClassName={hero.unitClassName} />
      <p className="text-muted-foreground text-[13px]/[17px]">{hero.label}</p>
      {hero.chips ? <div className="flex flex-wrap justify-center gap-2">{hero.chips}</div> : null}
    </div>
  );
}

/** Desktop hero карт (Figma 163:2510): r 28, p 24/28, gradient → баруун; тоо зүүн, chip баруун. */
export function DeskHero({ hero }: { readonly hero: HeroData }) {
  return (
    <section aria-label="Гол утга" className="from-hero-top to-hero-mid flex items-center gap-6 rounded-[28px] bg-linear-to-r px-7 py-6">
      <div className="flex flex-1 flex-col gap-1">
        <BigValue size="hero" value={hero.value} unit={hero.unit} unitClassName={hero.unitClassName} />
        <p className="text-muted-foreground text-[13px]/[17px]">{hero.label}</p>
      </div>
      {hero.chips ? <div className="flex gap-2">{hero.chips}</div> : null}
    </section>
  );
}
