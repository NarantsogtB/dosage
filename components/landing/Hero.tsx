import HeroCopy from "./HeroCopy";
import HeroDemo from "./HeroDemo";

/** 3 зогсоолтой gradient, толгойн (57/65px) ард эхэлнэ. */
const MOBILE_BG = "bg-[linear-gradient(to_bottom,var(--hero-top)_-57px,var(--hero-mid)_70%,var(--hero-bottom))]";
const DESK_BG = "lg:bg-[linear-gradient(to_bottom,var(--hero-top)_-65px,var(--hero-mid)_70%,var(--hero-bottom))]";

/**
 * Эхний дэлгэц (Figma 154:1859 / 156:1911). Mobile — gradient дотор текст, ДООР нь амьд жишээ
 * (px 16); desktop — нэг gradient, 2 багана (текст · жишээ 440), g 64.
 */
export default function Hero() {
  return (
    <section className={`${DESK_BG} lg:px-4 lg:pt-[47px] lg:pb-[72px]`}>
      <div className="mx-auto flex max-w-[1152px] flex-col lg:flex-row lg:items-center lg:gap-16">
        <div className={`${MOBILE_BG} px-5 pt-[81px] pb-8 lg:flex-1 lg:bg-none lg:p-0`}>
          <HeroCopy />
        </div>
        <div className="px-4 pb-2 lg:w-[440px] lg:shrink-0 lg:p-0">
          <HeroDemo />
        </div>
      </div>
    </section>
  );
}
