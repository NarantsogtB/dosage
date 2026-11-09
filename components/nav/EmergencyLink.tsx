"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Siren } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isActive } from "./active-route";

/**
 * Mobile толгойн «Яаралтай тусламж» — доод навигац 3 таб болсон ч яаралтай
 * хуудас ХЭЗЭЭ Ч 1 товшилтаас холдохгүй. Улаан БИШ: нэг дэлгэцэнд нэг danger.
 * `/emergency` дээр нуугдана; desktop-д толгойн табд байгаа.
 */
export default function EmergencyLink() {
  if (isActive(usePathname(), "/emergency")) return null;
  return (
    <Button asChild variant="outline" size="icon" className="md:hidden">
      <Link href="/emergency" aria-label="Яаралтай тусламж">
        <Siren aria-hidden />
      </Link>
    </Button>
  );
}
