import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FEEDBACK_URL } from "@/lib/site";
import { SOURCE_COUNT } from "./landing-stats";

/** Хаалтын үйлдэл (Figma «Final CTA»): teal gradient карт — mobile төвд, desktop хэвтээ. */
export default function LandingFooter() {
  return (
    <footer className="flex flex-col gap-3.5">
      <section aria-label="Туршаад үз" className="from-tile to-hero-top flex flex-col items-center gap-3 rounded-[28px] bg-linear-to-br px-[22px] py-[26px] text-center lg:flex-row lg:gap-8 lg:rounded-[32px] lg:bg-linear-to-r lg:px-12 lg:py-10 lg:text-left">
        <div className="flex flex-col gap-3 lg:flex-1 lg:gap-2.5">
          <h2 className="text-[28px]/9 font-bold lg:text-4xl/[46px]">Туршаад үз</h2>
          <p className="text-[15px]/[19px] lg:text-[17px]/[22px]">Бүртгэл шаардлагагүй. Утсан дээр ажиллана. Тооцоолол бүрийн ард эх сурвалж харагдана.</p>
        </div>
        <Link href="/dose" className="bg-foreground text-background focus-visible:ring-ring inline-flex items-center gap-2 rounded-full px-[22px] py-4 text-base/5 font-semibold outline-none focus-visible:ring-[3px] lg:px-[26px] lg:py-[18px] lg:text-[17px]/[22px]">
          Тун тооцоолох <ChevronRight aria-hidden className="size-[18px]" />
        </Link>
      </section>
      <p className="text-muted-foreground text-center text-xs/[15px] lg:text-left">
        <span className="num">{SOURCE_COUNT}</span> эх сурвалжийн бүртгэл · Олон улсын нэршил (INN) ·{" "}
        <a href={FEEDBACK_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Санал хүсэлт · Instagram
        </a>
      </p>
    </footer>
  );
}
