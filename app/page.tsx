import type { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import Section from "@/components/landing/Section";
import ToolGrid from "@/components/landing/ToolGrid";
import EvidenceLadder from "@/components/landing/EvidenceLadder";
import SafetyPoints from "@/components/landing/SafetyPoints";
import LandingFooter from "@/components/landing/LandingFooter";
import { DRUG_COUNT } from "@/components/landing/landing-stats";

export const metadata: Metadata = {
  title: "dosage.mn — Монгол эмчийн эмнэлзүйн тооцоолуур",
  description: `Хүүхдийн жинд суурилсан эмийн тун, түлэгдэлтийн шингэн сэлбэлтийг эх сурвалж заасан хэлбэрээр тооцоолно. ${DRUG_COUNT} эм, монгол хэл дээр, үнэгүй.`,
};

export default function Home() {
  return (
    <main>
      <Hero />

      <Section
        eyebrow="Хэрэгслүүд"
        title="Одоо ажиллаж байгаа тооцоолуурууд"
        lede="Тус бүр нь тусдаа хаягтай — хуваалцах, хавчуурга хийх, хэвлэх бүгд ажиллана."
        raised
      >
        <ToolGrid />
      </Section>

      <Section
        eyebrow="Эх сурвалж"
        title="Тун бүр хаанаас гарсныг заана"
        lede="Эм тус бүрд эх сурвалжийн түвшин харагдана. Энэ нь эх сурвалжийн чанарыг заана — эмнэлзүйн хяналтыг биш."
      >
        <EvidenceLadder />
      </Section>

      <Section
        eyebrow="Хязгаарлалт"
        title="Энэ хэрэгсэл юу хийхгүй вэ"
        raised
      >
        <SafetyPoints />
      </Section>

      <LandingFooter />
    </main>
  );
}
