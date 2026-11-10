"use client";

import { useRouter } from "next/navigation";
import { CircleHelp } from "lucide-react";
import { resetTour } from "@/components/tour/tour-store";
import SettingsRow from "./SettingsRow";

/** «Хэрхэн ашиглах заавар» — зааврыг дахин эхлүүлж нүүр рүү буцна. */
export default function RestartTourRow() {
  const router = useRouter();
  const restart = () => {
    resetTour();
    router.push("/dose");
  };
  return <SettingsRow icon={CircleHelp} label="Хэрхэн ашиглах заавар" onClick={restart} />;
}
