import NoticeBox from "@/components/v4/NoticeBox";

/** Түлэгдэлтийн анхааруулга (Figma 138:1708) — саармаг (шар биш): аюул биш, хэрэглээний хязгаар. */
export default function BurnsDisclaimer() {
  return (
    <NoticeBox tone="plain" title="Зөвхөн сэхээний шингэн">
      <p className="text-[13px]/[17px]">
        Тэтгэх шингэнийг оруулаагүй — нэмж тооцоолно. Хугацааг осол болсон цагаас тоолно, эмнэлэгт ирсэн цагаас биш.
      </p>
      <p>Эх сурвалж: Түлэгдэлт (Эрүүл Үрс Гэрэлт Ирээдүй ТББ, 2015) — х.41, 70–73, 155.</p>
    </NoticeBox>
  );
}
