import Link from "next/link";
import { Button } from "@/components/ui/button";
import Eyebrow from "./Eyebrow";
import { DRUG_COUNT, VERIFIED_COUNT } from "./landing-stats";

/**
 * Гарчиг нь бүтээгдэхүүнийг ЗАРАХГҮЙ, юу болохыг хэлнэ.
 *
 * Гурван богино өгүүлбэр нь эмчийн хийх гурван алхамтай яг таарна.
 * «Хамгийн шилдэг», «хувьсгалт» гэх мэт үг байхгүй — эмнэлгийн
 * хэрэгсэл өөрийгөө магтаж эхэлбэл итгэл алдана.
 */
export default function HeroCopy() {
  return (
    <div>
      <Eyebrow>dosage.mn</Eyebrow>
      <h1 className="mt-3 text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
        Жин оруулна.
        <br />
        Тун гарна.
        <br />
        <span className="text-primary">Эх сурвалж нь хамт.</span>
      </h1>
      <p className="text-muted-foreground mt-4 max-w-md leading-relaxed">
        Монголын эмч, эмнэлгийн мэргэжилтэнд зориулсан хүүхдийн эмийн тунгийн
        тооцоолуур. Монгол хэл дээр, бүртгэлгүй, үнэгүй.
      </p>
      <div className="mt-6 flex flex-wrap gap-2.5">
        <Button asChild size="lg">
          <Link href="/dose">Тун тооцоолох</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/burns">Түлэгдэлтийн шингэн</Link>
        </Button>
      </div>
      <p className="text-muted-foreground mt-5 text-xs">
        <span className="num text-foreground font-medium">{DRUG_COUNT}</span> эм
        · <span className="num text-foreground font-medium">{VERIFIED_COUNT}</span>{" "}
        нь эх сурвалж заасан
      </p>
    </div>
  );
}
