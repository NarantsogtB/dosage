import HeroCopy from "./HeroCopy";
import HeroDemo from "./HeroDemo";

/** Эхний дэлгэц: амлалт зүүн талд, түүний нотолгоо баруун талд. */
export default function Hero() {
  return (
    <section className="border-b py-12 sm:py-16">
      <div className="mx-auto grid max-w-4xl gap-8 px-4 sm:px-6 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-10">
        <HeroCopy />
        <HeroDemo />
      </div>
    </section>
  );
}
