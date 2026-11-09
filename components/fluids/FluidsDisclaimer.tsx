import NoticeBox from "@/components/v4/NoticeBox";

/** Шингэний тооцоолуурын анхааруулга. */
export default function FluidsDisclaimer() {
  return (
    <NoticeBox title="Эхлэх цэг — дахин үнэлгээ заавал">
      <p>
        Боломжтой бол амаар/хамрын гуурсаар өгнө. Судсаар өгөхөд өдөр бүр жин,
        электролит хянана. Нярай, дутуу төрсөн хүүхэд, түлэгдэлт, ДКА,
        тархины гэмтэлд тусгай заавар хэрэглэнэ. Эх сурвалж: RCH Melbourne
        «Intravenous fluids» (2026-01), «Dehydration» (2026-04); WHO Pocket
        Book (2013).
      </p>
    </NoticeBox>
  );
}
