"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Siren } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isActive } from "./active-route";

/**
 * Mobile толгойн «Яаралтай тусламж» — доод навигац 3 таб болсон ч яаралтай
 * хуудас ХЭЗЭЭ Ч 1 товшилтаас холдохгүй. Улаан БИШ: нэг дэлгэцэнд нэг danger.
 * `/emergency` дээр нуугдана. Бүх өргөнд харагдана (V4 desktop толгойд тооцоолуурын таб байхгүй).
 */
export default function EmergencyLink() {
  if (isActive(usePathname(), "/emergency")) return null;
  return (
    <Button asChild variant="outline" size="icon">
      <Link href="/emergency" aria-label="Яаралтай тусламж">
        <Siren aria-hidden />
      </Link>
    </Button>
  );
}
