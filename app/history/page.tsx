import type { Metadata } from "next";
import HistoryPage from "@/components/history/HistoryPage";

export const metadata: Metadata = {
  title: "Түүх",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <HistoryPage />;
}
