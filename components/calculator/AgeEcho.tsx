import AgeDisplay from "@/components/dosage/AgeDisplay";

interface Props {
  readonly ageMonths: number;
  readonly entered: boolean;
}

/**
 * Оруулсан насыг НИЙТ САРААР эргүүлж харуулна.
 *
 * «3» гэж бичсэн нь 3 нас уу, 3 сар уу гэдэг нь хамгийн түгээмэл
 * оролтын алдаа. Систем өөрийн ойлгосноор эргүүлж хэлэх нь тэр
 * алдааг оруулсан даруйд илрүүлнэ (Nielsen H1).
 *
 * Одоо энэ нь `AgeFields`-ийн `FieldDescription` дотор амьдардаг тул
 * гадуураа `<p>` БИЧИХГҮЙ — `FieldDescription` өөрөө абзац юм.
 */
export default function AgeEcho({ ageMonths, entered }: Props) {
  if (!entered) {
    return (
      <>
        Нас нь аль заавар хамаарахыг тодорхойлно. Нярайд: жил = 0, сарыг
        оруулна уу.
      </>
    );
  }
  return (
    <>
      Тооцоололд:{" "}
      <span className="text-foreground font-medium">
        <AgeDisplay ageMonths={ageMonths} />
      </span>{" "}
      <span className="num">({ageMonths} сар)</span>
    </>
  );
}
