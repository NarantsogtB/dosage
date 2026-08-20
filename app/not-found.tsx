import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Хуудас олдсонгүй",
};

/**
 * 404 — статик export үед `404.html` болж үүснэ.
 *
 * Өмнө нь Next-ийн англи хэлтэй анхдагч хуудас гарч байсан. Монгол
 * эмч буруу холбоос дээр дарахад англиар «This page could not be
 * found» гэж уншихаас илүү муу зүйл нь ГАРАХ ЗАМ санал болгоогүй нь.
 */
export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <p className="num text-muted-foreground text-sm font-semibold tracking-widest">
        404
      </p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">
        Хуудас олдсонгүй
      </h1>
      <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-relaxed">
        Холбоос буруу эсвэл хуудас зөөгдсөн байж болно. Доорх
        тооцоолуурууд ажиллаж байна.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2.5">
        <Button asChild>
          <Link href="/dose">Эмийн тун</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/burns">Түлэгдэлтийн шингэн</Link>
        </Button>
      </div>
    </main>
  );
}
