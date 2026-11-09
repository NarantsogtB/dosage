import type { Metadata } from "next";
import DrugsPage from "@/components/drugs/DrugsPage";

/** Эмүүд таб — client-ийн төлөвтэй хуудас; мөлхөх зам нь `/dose`-ийн `DrugIndex`. */
export const metadata: Metadata = {
  title: "Эмүүд",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <DrugsPage />;
}
