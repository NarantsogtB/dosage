import type { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import Section from "@/components/landing/Section";
import ToolGrid from "@/components/landing/ToolGrid";
import { TOOLS } from "@/components/landing/tools";
import EvidenceLadder from "@/components/landing/EvidenceLadder";
import SafetyPoints from "@/components/landing/SafetyPoints";
import LandingFooter from "@/components/landing/LandingFooter";
import { DRUG_COUNT } from "@/components/landing/landing-stats";
import { pageMeta } from "@/lib/page-meta";
import { siteJsonLd } from "@/lib/seo/json-ld";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  ...pageMeta("/"),
  // Эмч «хүүхдийн эмийн тун» гэж хайдаг — «эмнэлзүйн тооцоолуур» гэж биш.
  title: "dosage.mn — Хүүхдийн эмийн тун тооцоолуур",
  description: `Хүүхдийн жинд суурилсан эмийн тун, түлэгдэлтийн шингэн сэлбэлтийг эх сурвалж заасан хэлбэрээр тооцоолно. ${DRUG_COUNT} эм, монгол хэл дээр, үнэгүй.`,
};

/**
 * Танилцуулга (V4, Figma 154:1859 / 156:1911). Mobile — нэг багана px 16, хэсэг бүр pt 40;
 * desktop — 1152 контейнер, хэрэгсэл 4 багана, эх сурвалж + хязгаарлалт зэрэгцэн, g 72.
 */
export default function Home() {
  return (
    <main className="flex-1">
      <JsonLd data={siteJsonLd()} />
      <Hero />
      <div className="mx-auto flex max-w-[1152px] flex-col gap-10 px-4 pt-10 pb-10 lg:gap-[72px] lg:pt-[72px] lg:pb-12 xl:px-0">
        <Section eyebrow="Хэрэгслүүд" title={`Одоо ажиллаж байгаа ${TOOLS.length} тооцоолуур`}>
          <ToolGrid />
        </Section>
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          <Section
            className="lg:flex-1"
            eyebrow="Эх сурвалж"
            title="Тун бүр эх сурвалжтай"
            lede="Эм тус бүрд эх сурвалжийн түвшин харагдана. Энэ нь эх сурвалжийн чанарыг заана — эмнэлзүйн хяналтыг биш."
          >
            <EvidenceLadder />
          </Section>
          <Section className="lg:flex-1" eyebrow="Хязгаарлалт" title="Энэ хэрэгсэл юу хийхгүй вэ">
            <SafetyPoints />
          </Section>
        </div>
        <LandingFooter />
      </div>
    </main>
  );
}
