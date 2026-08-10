import type { Metadata } from "next";
import CalculatorPage from "@/components/CalculatorPage";

export const metadata: Metadata = {
  title: "Эмийн тун тооцоолуур",
  description: "Жингийн дагуу эмийн тун тооцоолох эмчид зориулсан хэрэгсэл. 30 нийтлэг эм.",
};

export default function Home() {
  return <CalculatorPage />;
}
