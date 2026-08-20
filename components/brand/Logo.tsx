import BrandMark from "./BrandMark";

/**
 * Тэмдэг + нэр. Толгой, хэвлэлийн загвар зэрэгт нийтлэг.
 *
 * `.num` нь фонт солихын тулд БИШ — tabular фигурууд нь "dosage.mn"
 * бичиглэлийг бүх хуудсанд яг ижил өргөнтэй байлгана.
 *
 * `.mn` нь номин өнгөтэй: домэйныг нэрнээс ялгаж, монгол бүтээгдэхүүн
 * гэдгийг чимэглэлгүйгээр хэлнэ.
 */
export default function Logo() {
  return (
    <span className="flex items-center gap-2">
      <BrandMark className="text-primary size-[1.35rem] shrink-0" />
      <span className="num text-lg leading-none font-semibold tracking-tight">
        dosage<span className="text-primary">.mn</span>
      </span>
    </span>
  );
}
