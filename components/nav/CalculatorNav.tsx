"use client";

import { usePathname } from "next/navigation";
import NavTab from "./NavTab";
import { isActive } from "./active-route";
import { ROUTES } from "./routes";

/**
 * Тооцоолуур хооронд шилжих таб — desktop-д толгойн мөрөнд (V3).
 * Mobile-д `BottomNav` хариуцна: эрхий хурууны бүс.
 *
 * Client-ийн төлөв биш, ЗАМД суурилсан: URL хуваалцах, хэвлэх, буцах
 * товч бүгд ажиллана.
 */
export default function CalculatorNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Тооцоолуур" className="hidden self-stretch md:flex md:gap-1">
      {ROUTES.map((route) => (
        <NavTab key={route.href} route={route} active={isActive(pathname, route.href)} />
      ))}
    </nav>
  );
}
